"""Flask dashboard for IBKR portfolio with Claude AI analysis."""

import atexit
from flask import Flask, jsonify, render_template_string, request
import config
import ibkr_client
import analyzer

app = Flask(__name__)

atexit.register(ibkr_client.disconnect)

DASHBOARD_HTML = r"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IBKR Portfolio Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.6.0/dist/jsvectormap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.6.0/dist/maps/world.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsvectormap@1.6.0/dist/jsvectormap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
               background: #0a0e1a; color: #e2e8f0; }
        .container { max-width: 1600px; margin: 0 auto; padding: 1.5rem; }
        h1 { color: #38bdf8; margin-bottom: 0.5rem; font-size: 1.8rem; }
        h2 { color: #7dd3fc; margin: 0 0 1rem; font-size: 1.2rem; }
        .subtitle { color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
        @media (max-width: 1200px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }
        .card { background: #111827; border-radius: 12px; padding: 1.25rem;
                margin-bottom: 1rem; border: 1px solid #1e293b; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .status-bar { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;
                      background: #111827; border-radius: 12px; padding: 1rem 1.25rem; border: 1px solid #1e293b; }
        .status { display: inline-block; padding: 3px 10px; border-radius: 9999px;
                  font-size: 0.75rem; font-weight: 600; }
        .status.ok { background: #065f46; color: #6ee7b7; }
        .status.error { background: #7f1d1d; color: #fca5a5; }
        .status.loading { background: #1e3a5f; color: #93c5fd; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #1e293b; font-size: 0.9rem; }
        th { color: #64748b; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .positive { color: #4ade80; }
        .negative { color: #f87171; }
        .clickable { cursor: pointer; transition: background 0.15s; }
        .clickable:hover { background: #1e293b; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.75rem; }
        .summary-item { background: #0a0e1a; border-radius: 8px; padding: 0.75rem; }
        .summary-item .label { color: #64748b; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .summary-item .value { font-size: 1.2rem; font-weight: 600; margin-top: 0.2rem; }
        .ai-text { line-height: 1.7; font-size: 0.9rem; color: #cbd5e1; }
        .ai-text strong { color: #f1f5f9; }
        .ai-text h1, .ai-text h2, .ai-text h3 { color: #7dd3fc; margin: 1rem 0 0.5rem; font-size: 1rem; }
        .ai-text ul, .ai-text ol { padding-left: 1.5rem; margin: 0.5rem 0; }
        .ai-text li { margin: 0.3rem 0; }
        .loading-text { color: #64748b; font-style: italic; font-size: 0.9rem; }
        .refresh-info { color: #475569; font-size: 0.7rem; }
        #world-map { width: 100%; height: 380px; }
        .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                         background: rgba(0,0,0,0.8); z-index: 1000; justify-content: center; align-items: center; }
        .modal-overlay.active { display: flex; }
        .modal { background: #111827; border-radius: 16px; width: 90%; max-width: 1000px;
                 max-height: 90vh; overflow: auto; border: 1px solid #1e293b; }
        .modal-header { display: flex; justify-content: space-between; align-items: center;
                        padding: 1rem 1.25rem; border-bottom: 1px solid #1e293b; }
        .modal-header h2 { margin: 0; }
        .modal-body { padding: 1.25rem; }
        .modal-close { background: none; border: none; color: #94a3b8; font-size: 1.5rem;
                       cursor: pointer; padding: 0.25rem 0.5rem; }
        .modal-close:hover { color: #f1f5f9; }
        .chart-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .chart-tab { background: #1e293b; color: #94a3b8; border: none; padding: 6px 16px;
                     border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
        .chart-tab.active { background: #2563eb; color: white; }
        .country-result { margin-top: 1rem; }
        .map-hint { color: #475569; font-size: 0.8rem; text-align: center; margin-top: 0.5rem; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .badge { font-size: 0.65rem; background: #1e3a5f; color: #93c5fd; padding: 2px 8px;
                 border-radius: 4px; margin-left: 0.5rem; }
    </style>
</head>
<body>
<div class="container">
    <h1>IBKR Portfolio Dashboard</h1>
    <p class="subtitle">AI-Powered Portfolio Intelligence</p>

    <div class="status-bar">
        <div><span id="conn-status" class="status loading">Connecting...</span></div>
        <div class="refresh-info">Auto-refresh: <span id="last-update">&mdash;</span></div>
    </div>

    <div class="card" id="briefing-card">
        <div class="card-header">
            <h2>AI Hedge Fund Manager Briefing</h2>
            <span class="badge pulse" id="briefing-badge">LOADING</span>
        </div>
        <div id="briefing" class="ai-text loading-text">Analyzing your portfolio...</div>
    </div>

    <div class="grid-2">
        <div class="card">
            <h2>Account Summary</h2>
            <div id="summary" class="summary-grid"><p class="loading-text">Loading...</p></div>
        </div>
        <div class="card">
            <div class="card-header">
                <h2>Sector Allocation</h2>
                <span class="badge" id="sector-badge">AI-CLASSIFIED</span>
            </div>
            <canvas id="sectorChart" height="220"></canvas>
            <div id="sector-recs" style="margin-top:0.75rem;font-size:0.8rem;color:#94a3b8;"></div>
        </div>
    </div>

    <div class="card">
        <h2>Portfolio Positions <span class="refresh-info">(click a symbol for charts)</span></h2>
        <div id="positions"><p class="loading-text">Loading...</p></div>
    </div>

    <div class="grid-2">
        <div class="card">
            <div class="card-header">
                <h2>Deep AI Analysis</h2>
                <span class="badge pulse" id="analysis-badge">LOADING</span>
            </div>
            <div id="analysis" class="ai-text loading-text">Running deep analysis...</div>
        </div>
        <div class="card">
            <h2>Global Investment Map</h2>
            <div id="world-map"></div>
            <p class="map-hint">Click any country for AI investment recommendations</p>
            <div id="country-result" class="country-result ai-text"></div>
        </div>
    </div>
</div>

<div class="modal-overlay" id="chart-modal">
    <div class="modal">
        <div class="modal-header">
            <h2 id="chart-title">Stock Chart</h2>
            <button class="modal-close" onclick="closeChartModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="chart-tabs" id="chart-tabs"></div>
            <div id="tradingview-widget" style="height:500px;"></div>
        </div>
    </div>
</div>

<script>
    var currentSymbol = '';
    var sectorChart = null;

    function fmt(n) {
        if (n === null || n === undefined) return '\u2014';
        return Number(n).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
    function renderMd(text) {
        try { return marked.parse(text); } catch(e) { return text; }
    }
    function updateTime() {
        document.getElementById('last-update').textContent = new Date().toLocaleTimeString();
    }

    async function checkAuth() {
        try {
            var res = await fetch('/api/auth-status');
            var data = await res.json();
            var el = document.getElementById('conn-status');
            if (data.authenticated) { el.className = 'status ok'; el.textContent = 'Connected'; }
            else { el.className = 'status error'; el.textContent = 'Disconnected'; }
        } catch(e) {
            var el2 = document.getElementById('conn-status');
            el2.className = 'status error'; el2.textContent = 'Error';
        }
    }

    async function loadSummary() {
        try {
            var res = await fetch('/api/summary');
            var data = await res.json();
            if (data.error) return;
            var labels = {
                'NetLiquidation': 'Net Liquidation', 'TotalCashValue': 'Cash',
                'GrossPositionValue': 'Positions', 'UnrealizedPnL': 'Unrealized P&L',
                'RealizedPnL': 'Realized P&L', 'BuyingPower': 'Buying Power',
                'AvailableFunds': 'Available'
            };
            var html = '';
            for (var key in labels) {
                if (data[key] !== undefined) {
                    var val = Number(data[key]);
                    var cls = key.indexOf('PnL') >= 0 ? (val >= 0 ? 'positive' : 'negative') : '';
                    html += '<div class="summary-item"><div class="label">' + labels[key] +
                        '</div><div class="value ' + cls + '">$' + fmt(val) + '</div></div>';
                }
            }
            document.getElementById('summary').innerHTML = html;
        } catch(e) {}
    }

    async function loadPositions() {
        try {
            var res = await fetch('/api/positions');
            var data = await res.json();
            if (data.error || !data.positions || data.positions.length === 0) {
                document.getElementById('positions').innerHTML = '<p class="loading-text">No positions found.</p>';
                return;
            }
            var html = '<table><tr><th>Symbol</th><th>Type</th><th>Qty</th>' +
                '<th>Avg Cost</th><th>Mkt Price</th><th>Mkt Value</th><th>P&L</th></tr>';
            data.positions.forEach(function(p) {
                var pnl = p.unrealizedPnl || 0;
                var cls = pnl >= 0 ? 'positive' : 'negative';
                html += '<tr class="clickable" onclick="openChartModal(\'' + p.ticker + '\')">' +
                    '<td><strong style="color:#38bdf8">' + p.ticker + '</strong></td>' +
                    '<td>' + (p.secType || '') + '</td>' +
                    '<td>' + p.position + '</td>' +
                    '<td>$' + fmt(p.avgCost) + '</td>' +
                    '<td>$' + fmt(p.marketPrice) + '</td>' +
                    '<td>$' + fmt(p.mktValue) + '</td>' +
                    '<td class="' + cls + '">$' + fmt(pnl) + '</td></tr>';
            });
            html += '</table>';
            document.getElementById('positions').innerHTML = html;
        } catch(e) {}
    }

    async function loadBriefing() {
        try {
            var res = await fetch('/api/briefing', { method: 'POST' });
            var data = await res.json();
            var badge = document.getElementById('briefing-badge');
            if (data.error) {
                document.getElementById('briefing').innerHTML = '<p class="negative">' + data.error + '</p>';
                badge.textContent = 'ERROR'; badge.classList.remove('pulse');
                return;
            }
            document.getElementById('briefing').innerHTML = renderMd(data.briefing);
            badge.textContent = 'LIVE'; badge.classList.remove('pulse');
            badge.style.background = '#065f46'; badge.style.color = '#6ee7b7';
        } catch(e) {
            document.getElementById('briefing').innerHTML = '<p class="negative">Failed to load briefing</p>';
        }
    }

    async function loadAnalysis() {
        try {
            var res = await fetch('/api/analyze', { method: 'POST' });
            var data = await res.json();
            var badge = document.getElementById('analysis-badge');
            if (data.error) {
                document.getElementById('analysis').innerHTML = '<p class="negative">' + data.error + '</p>';
                badge.textContent = 'ERROR'; badge.classList.remove('pulse');
                return;
            }
            document.getElementById('analysis').innerHTML = renderMd(data.analysis);
            badge.textContent = 'COMPLETE'; badge.classList.remove('pulse');
            badge.style.background = '#065f46'; badge.style.color = '#6ee7b7';
        } catch(e) {
            document.getElementById('analysis').innerHTML = '<p class="negative">Failed to load analysis</p>';
        }
    }

    async function loadSectors() {
        try {
            var res = await fetch('/api/sectors', { method: 'POST' });
            var data = await res.json();
            if (data.error || !data.holdings) return;

            var sectorMap = {};
            data.holdings.forEach(function(h) {
                sectorMap[h.sector] = (sectorMap[h.sector] || 0) + h.percentage;
            });

            var labels = Object.keys(sectorMap);
            var values = Object.values(sectorMap);
            var colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6',
                          '#ec4899','#06b6d4','#84cc16','#f97316','#6366f1','#14b8a6','#e11d48'];

            var ctx = document.getElementById('sectorChart').getContext('2d');
            if (sectorChart) sectorChart.destroy();
            sectorChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{ data: values, backgroundColor: colors.slice(0, labels.length),
                                 borderColor: '#111827', borderWidth: 2 }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 11 } } } }
                }
            });

            if (data.recommended_sectors && data.recommended_sectors.length > 0) {
                var recHtml = '<strong style="color:#7dd3fc">AI Recommendations:</strong><br>';
                data.recommended_sectors.slice(0, 3).forEach(function(r) {
                    var arrow = r.recommended > r.current ? '\u2191' : '\u2193';
                    recHtml += arrow + ' ' + r.sector + ': ' + r.current.toFixed(0) + '% \u2192 ' +
                        r.recommended + '% \u2014 ' + r.reason + '<br>';
                });
                document.getElementById('sector-recs').innerHTML = recHtml;
            }
        } catch(e) {}
    }

    var worldMap;
    function initMap() {
        worldMap = new jsVectorMap({
            selector: '#world-map',
            map: 'world',
            backgroundColor: 'transparent',
            regionStyle: {
                initial: { fill: '#1e293b', stroke: '#0a0e1a', strokeWidth: 0.5 },
                hover: { fill: '#2563eb', cursor: 'pointer' },
                selected: { fill: '#3b82f6' }
            },
            onRegionClick: function(event, code) {
                var name = worldMap.getRegionName(code);
                loadCountryInvestments(name);
            }
        });
    }

    async function loadCountryInvestments(country) {
        var el = document.getElementById('country-result');
        el.innerHTML = '<p class="loading-text pulse">Loading AI recommendations for ' + country + '...</p>';
        try {
            var res = await fetch('/api/country-investments', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({country: country})
            });
            var data = await res.json();
            if (data.error) { el.innerHTML = '<p class="negative">' + data.error + '</p>'; return; }
            el.innerHTML = renderMd(data.recommendations);
        } catch(e) {
            el.innerHTML = '<p class="negative">Failed to load recommendations</p>';
        }
    }

    function openChartModal(symbol) {
        currentSymbol = symbol;
        document.getElementById('chart-title').textContent = symbol + ' \u2014 Stock Chart';
        document.getElementById('chart-modal').classList.add('active');

        var periods = ['1M','3M','6M','1Y','5Y'];
        var tabsHtml = '';
        periods.forEach(function(p, i) {
            tabsHtml += '<button class="chart-tab' + (i === 0 ? ' active' : '') +
                '" onclick="switchChart(\'' + p + '\', this)">' + p + '</button>';
        });
        document.getElementById('chart-tabs').innerHTML = tabsHtml;
        showTradingViewChart('1M');
    }

    function closeChartModal() {
        document.getElementById('chart-modal').classList.remove('active');
        document.getElementById('tradingview-widget').innerHTML = '';
    }

    function switchChart(period, btn) {
        document.querySelectorAll('.chart-tab').forEach(function(t) { t.classList.remove('active'); });
        btn.classList.add('active');
        showTradingViewChart(period);
    }

    function showTradingViewChart(period) {
        var ranges = {'1M':'1M','3M':'3M','6M':'6M','1Y':'12M','5Y':'60M'};
        var el = document.getElementById('tradingview-widget');
        el.innerHTML = '<div id="tv_chart_container"></div>';

        var script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.onload = function() {
            new TradingView.widget({
                container_id: 'tv_chart_container',
                symbol: currentSymbol,
                interval: period === '5Y' ? 'M' : (period === '1Y' || period === '6M' ? 'W' : 'D'),
                timezone: 'Europe/Zurich',
                theme: 'dark',
                style: '1',
                locale: 'en',
                toolbar_bg: '#111827',
                enable_publishing: false,
                hide_top_toolbar: false,
                hide_legend: false,
                save_image: false,
                width: '100%',
                height: 480,
                range: ranges[period]
            });
        };
        document.head.appendChild(script);
    }

    document.getElementById('chart-modal').addEventListener('click', function(e) {
        if (e.target === this) closeChartModal();
    });

    async function init() {
        checkAuth();
        loadSummary();
        loadPositions();
        updateTime();
        setTimeout(function() {
            loadBriefing();
            loadSectors();
            loadAnalysis();
        }, 2000);
        initMap();
    }

    setInterval(function() {
        checkAuth();
        loadSummary();
        loadPositions();
        updateTime();
    }, 30000);

    setInterval(function() { loadBriefing(); }, 300000);

    init();
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


@app.route("/api/briefing", methods=["POST"])
def api_briefing():
    try:
        pos = ibkr_client.portfolio()
        summary = None
        try:
            summary = ibkr_client.account_summary()
        except Exception:
            pass
        briefing = analyzer.hedge_fund_briefing(pos, summary)
        return jsonify({"briefing": briefing})
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


@app.route("/api/sectors", methods=["POST"])
def api_sectors():
    try:
        pos = ibkr_client.portfolio()
        sectors = analyzer.sector_analysis(pos)
        return jsonify(sectors)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/country-investments", methods=["POST"])
def api_country_investments():
    try:
        data = request.get_json()
        country = data.get("country", "")
        if not country:
            return jsonify({"error": "Country is required"}), 400
        pos = None
        try:
            pos = ibkr_client.portfolio()
        except Exception:
            pass
        recs = analyzer.country_investments(country, pos)
        return jsonify({"recommendations": recs})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print(f"Starting IBKR Dashboard on http://localhost:{config.FLASK_PORT}")
    print(f"Connecting to TWS/IB Gateway at {config.IBKR_HOST}:{config.IBKR_PORT}")
    print(f"Account ID: {config.IBKR_ACCOUNT_ID}")
    app.run(host=config.FLASK_HOST, port=config.FLASK_PORT, debug=config.FLASK_DEBUG)
