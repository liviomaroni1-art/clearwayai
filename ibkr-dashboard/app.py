"""Flask dashboard for IBKR portfolio with Claude AI analysis."""

import atexit
from flask import Flask, jsonify, render_template_string
import config
import ibkr_client
import analyzer

app = Flask(__name__)

# Disconnect cleanly on shutdown
atexit.register(ibkr_client.disconnect)

DASHBOARD_HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IBKR Portfolio Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
               background: #0f172a; color: #e2e8f0; padding: 2rem; }
        h1 { color: #38bdf8; margin-bottom: 1.5rem; }
        h2 { color: #7dd3fc; margin: 1.5rem 0 0.75rem; }
        .card { background: #1e293b; border-radius: 12px; padding: 1.5rem;
                margin-bottom: 1rem; border: 1px solid #334155; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 9999px;
                  font-size: 0.85rem; font-weight: 600; }
        .status.ok { background: #065f46; color: #6ee7b7; }
        .status.error { background: #7f1d1d; color: #fca5a5; }
        table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; }
        th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #334155; }
        th { color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; }
        .positive { color: #4ade80; }
        .negative { color: #f87171; }
        button { background: #2563eb; color: white; border: none; padding: 10px 24px;
                 border-radius: 8px; cursor: pointer; font-size: 1rem; margin: 0.5rem 0.5rem 0.5rem 0; }
        button:hover { background: #1d4ed8; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
        #analysis { white-space: pre-wrap; line-height: 1.6; }
        .loading { color: #94a3b8; font-style: italic; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 1rem; margin-top: 1rem; }
        .summary-item { background: #0f172a; border-radius: 8px; padding: 1rem; }
        .summary-item .label { color: #94a3b8; font-size: 0.8rem; text-transform: uppercase; }
        .summary-item .value { font-size: 1.3rem; font-weight: 600; margin-top: 0.25rem; }
    </style>
</head>
<body>
    <h1>IBKR Portfolio Dashboard</h1>

    <div class="card">
        <h2>Connection Status</h2>
        <div id="auth-status" class="loading">Checking...</div>
    </div>

    <div class="card">
        <h2>Account Summary</h2>
        <button onclick="loadSummary()">Load Summary</button>
        <div id="summary"></div>
    </div>

    <div class="card">
        <h2>Portfolio Positions</h2>
        <button onclick="loadPositions()">Load Positions</button>
        <div id="positions"></div>
    </div>

    <div class="card">
        <h2>AI Analysis</h2>
        <button onclick="runAnalysis()" id="analyze-btn">Analyze Portfolio</button>
        <div id="analysis"></div>
    </div>

    <script>
        function fmt(n) {
            if (n === null || n === undefined) return '—';
            return Number(n).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }

        async function checkAuth() {
            try {
                const res = await fetch('/api/auth-status');
                const data = await res.json();
                const el = document.getElementById('auth-status');
                if (data.authenticated) {
                    el.innerHTML = '<span class="status ok">Connected</span> — ' + data.message;
                } else {
                    el.innerHTML = '<span class="status error">Disconnected</span> — ' + data.message;
                }
            } catch (e) {
                document.getElementById('auth-status').innerHTML =
                    '<span class="status error">Error</span> — Dashboard backend unreachable.';
            }
        }

        async function loadSummary() {
            const el = document.getElementById('summary');
            el.innerHTML = '<p class="loading">Loading...</p>';
            try {
                const res = await fetch('/api/summary');
                const data = await res.json();
                if (data.error) { el.innerHTML = '<p class="negative">' + data.error + '</p>'; return; }
                let html = '<div class="summary-grid">';
                const labels = {
                    'NetLiquidation': 'Net Liquidation',
                    'TotalCashValue': 'Cash',
                    'GrossPositionValue': 'Positions Value',
                    'UnrealizedPnL': 'Unrealized P&L',
                    'RealizedPnL': 'Realized P&L',
                    'BuyingPower': 'Buying Power',
                    'AvailableFunds': 'Available Funds',
                };
                for (const [key, label] of Object.entries(labels)) {
                    if (data[key] !== undefined) {
                        const val = Number(data[key]);
                        const cls = key.includes('PnL') ? (val >= 0 ? 'positive' : 'negative') : '';
                        html += '<div class="summary-item"><div class="label">' + label +
                            '</div><div class="value ' + cls + '">$' + fmt(val) + '</div></div>';
                    }
                }
                html += '</div>';
                el.innerHTML = html;
            } catch (e) {
                el.innerHTML = '<p class="negative">Error: ' + e.message + '</p>';
            }
        }

        async function loadPositions() {
            const el = document.getElementById('positions');
            el.innerHTML = '<p class="loading">Loading...</p>';
            try {
                const res = await fetch('/api/positions');
                const data = await res.json();
                if (data.error) { el.innerHTML = '<p class="negative">' + data.error + '</p>'; return; }
                if (!data.positions || data.positions.length === 0) {
                    el.innerHTML = '<p>No positions found.</p>'; return;
                }
                let html = '<table><tr><th>Symbol</th><th>Type</th><th>Qty</th>' +
                    '<th>Avg Cost</th><th>Mkt Price</th><th>Mkt Value</th><th>P&L</th></tr>';
                data.positions.forEach(p => {
                    const pnl = p.unrealizedPnl || 0;
                    const cls = pnl >= 0 ? 'positive' : 'negative';
                    html += '<tr><td><strong>' + p.ticker + '</strong></td>' +
                        '<td>' + (p.secType || '') + '</td>' +
                        '<td>' + p.position + '</td>' +
                        '<td>$' + fmt(p.avgCost) + '</td>' +
                        '<td>$' + fmt(p.marketPrice) + '</td>' +
                        '<td>$' + fmt(p.mktValue) + '</td>' +
                        '<td class="' + cls + '">$' + fmt(pnl) + '</td></tr>';
                });
                html += '</table>';
                el.innerHTML = html;
            } catch (e) {
                el.innerHTML = '<p class="negative">Error: ' + e.message + '</p>';
            }
        }

        async function runAnalysis() {
            const el = document.getElementById('analysis');
            const btn = document.getElementById('analyze-btn');
            btn.disabled = true;
            el.innerHTML = '<p class="loading">Running AI analysis (this may take ~15s)...</p>';
            try {
                const res = await fetch('/api/analyze', { method: 'POST' });
                const data = await res.json();
                if (data.error) { el.innerHTML = '<p class="negative">' + data.error + '</p>'; return; }
                el.innerText = data.analysis;
            } catch (e) {
                el.innerHTML = '<p class="negative">Error: ' + e.message + '</p>';
            } finally {
                btn.disabled = false;
            }
        }

        checkAuth();
    </script>
</body>
</html>
"""


@app.route("/")
def index():
    return render_template_string(DASHBOARD_HTML)


@app.route("/api/auth-status")
def api_auth_status():
    try:
        status = ibkr_client.auth_status()
        return jsonify(status)
    except Exception as e:
        return jsonify({"authenticated": False, "error": str(e)}), 502


@app.route("/api/positions")
def api_positions():
    try:
        pos = ibkr_client.portfolio()
        return jsonify({"positions": pos})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/summary")
def api_summary():
    try:
        summary = ibkr_client.account_summary()
        return jsonify(summary)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/analyze", methods=["POST"])
def api_analyze():
    try:
        pos = ibkr_client.portfolio()
        summary = None
        try:
            summary = ibkr_client.account_summary()
        except Exception:
            pass

        analysis = analyzer.analyze_portfolio(pos, summary)
        return jsonify({"analysis": analysis})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print(f"Starting IBKR Dashboard on http://localhost:{config.FLASK_PORT}")
    print(f"Connecting to TWS/IB Gateway at {config.IBKR_HOST}:{config.IBKR_PORT}")
    print(f"Account ID: {config.IBKR_ACCOUNT_ID}")
    app.run(host=config.FLASK_HOST, port=config.FLASK_PORT, debug=config.FLASK_DEBUG)
