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
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0e1a;color:#e2e8f0;font-size:13px}
        .container{max-width:1600px;margin:0 auto;padding:1rem}
        h1{color:#38bdf8;font-size:1.4rem;margin-bottom:0.25rem}
        h2{color:#7dd3fc;margin:0 0 0.5rem;font-size:1rem}
        h3{color:#7dd3fc;font-size:0.85rem;margin:0.5rem 0 0.3rem}
        .subtitle{color:#64748b;font-size:0.75rem;margin-bottom:1rem}
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem}
        .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem}
        .g4{display:grid;grid-template-columns:2fr 1fr;gap:0.75rem}
        @media(max-width:1200px){.g2,.g3,.g4{grid-template-columns:1fr}}
        .card{background:#111827;border-radius:10px;padding:0.85rem;margin-bottom:0.75rem;border:1px solid #1e293b}
        .card-sm{padding:0.6rem}
        .card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem}
        .status-bar{display:flex;gap:1rem;align-items:center;margin-bottom:0.75rem;background:#111827;border-radius:10px;padding:0.6rem 1rem;border:1px solid #1e293b}
        .status{display:inline-block;padding:2px 8px;border-radius:9999px;font-size:0.65rem;font-weight:600}
        .status.ok{background:#065f46;color:#6ee7b7}
        .status.error{background:#7f1d1d;color:#fca5a5}
        .status.loading{background:#1e3a5f;color:#93c5fd}
        table{width:100%;border-collapse:collapse}
        th,td{text-align:left;padding:4px 8px;border-bottom:1px solid #1e293b;font-size:0.8rem}
        th{color:#64748b;font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em}
        .positive{color:#4ade80}.negative{color:#f87171}
        .clickable{cursor:pointer;transition:background 0.15s}
        .clickable:hover{background:#1e293b}
        .summary-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:0.5rem}
        .summary-item{background:#0a0e1a;border-radius:6px;padding:0.5rem}
        .summary-item .label{color:#64748b;font-size:0.6rem;text-transform:uppercase;letter-spacing:0.05em}
        .summary-item .value{font-size:0.95rem;font-weight:600;margin-top:0.1rem}
        .ai-text{line-height:1.6;font-size:0.8rem;color:#cbd5e1;max-height:300px;overflow-y:auto}
        .ai-text strong{color:#f1f5f9}
        .ai-text h1,.ai-text h2,.ai-text h3{color:#7dd3fc;margin:0.5rem 0 0.3rem;font-size:0.85rem}
        .ai-text ul,.ai-text ol{padding-left:1.2rem;margin:0.3rem 0}
        .ai-text li{margin:0.15rem 0}
        .ai-text table{margin:0.5rem 0}
        .loading-text{color:#64748b;font-style:italic;font-size:0.8rem}
        .refresh-info{color:#475569;font-size:0.65rem}
        #world-map{width:100%;height:250px}
        .modal-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:1000;justify-content:center;align-items:center}
        .modal-overlay.active{display:flex}
        .modal{background:#111827;border-radius:12px;width:90%;max-width:1000px;max-height:90vh;overflow:auto;border:1px solid #1e293b}
        .modal-header{display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;border-bottom:1px solid #1e293b}
        .modal-header h2{margin:0}
        .modal-body{padding:1rem}
        .modal-close{background:none;border:none;color:#94a3b8;font-size:1.3rem;cursor:pointer}
        .modal-close:hover{color:#f1f5f9}
        .chart-tabs{display:flex;gap:0.4rem;margin-bottom:0.75rem}
        .chart-tab{background:#1e293b;color:#94a3b8;border:none;padding:4px 12px;border-radius:5px;cursor:pointer;font-size:0.75rem}
        .chart-tab.active{background:#2563eb;color:white}
        .sector-btn{background:#1e293b;color:#94a3b8;border:1px solid #334155;padding:5px 12px;border-radius:6px;cursor:pointer;font-size:0.75rem;transition:all 0.15s}
        .sector-btn:hover,.sector-btn.active{background:#2563eb;color:white;border-color:#2563eb}
        .sector-grid{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.75rem}
        .map-hint{color:#475569;font-size:0.7rem;text-align:center;margin-top:0.3rem}
        .pulse{animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        .badge{font-size:0.6rem;background:#1e3a5f;color:#93c5fd;padding:1px 6px;border-radius:3px;margin-left:0.4rem}
        .orders-empty{color:#475569;font-size:0.75rem;font-style:italic}
    </style>
</head>
<body>
<div class="container">
    <div style="display:flex;justify-content:space-between;align-items:baseline">
        <div><h1>IBKR Portfolio Dashboard</h1><p class="subtitle">AI-Powered Portfolio Intelligence</p></div>
        <div class="status-bar" style="margin:0">
            <span id="conn-status" class="status loading">Connecting...</span>
            <span class="refresh-info">Auto-refresh: <span id="last-update">&mdash;</span></span>
        </div>
    </div>

    <!-- AI Briefing -->
    <div class="card card-sm">
        <div class="card-header"><h2>AI Hedge Fund Manager</h2><span class="badge pulse" id="briefing-badge">LOADING</span></div>
        <div id="briefing" class="ai-text loading-text">Analyzing your portfolio...</div>
    </div>

    <!-- Summary + Sector + Orders -->
    <div class="g3">
        <div class="card card-sm">
            <h2>Account Summary</h2>
            <div id="summary" class="summary-grid"><p class="loading-text">Loading...</p></div>
        </div>
        <div class="card card-sm">
            <div class="card-header"><h2>Sector Allocation</h2><span class="badge" id="sector-badge">AI</span></div>
            <canvas id="sectorChart" height="140"></canvas>
            <div id="sector-recs" style="margin-top:0.4rem;font-size:0.7rem;color:#94a3b8"></div>
        </div>
        <div class="card card-sm">
            <h2>Open Orders</h2>
            <div id="orders"><p class="orders-empty">Loading...</p></div>
        </div>
    </div>

    <!-- Positions -->
    <div class="card card-sm">
        <h2>Portfolio Positions <span class="refresh-info">(click symbol for chart)</span></h2>
        <div id="positions"><p class="loading-text">Loading...</p></div>
    </div>

    <!-- Analysis + World Map + Sector Picks -->
    <div class="g3">
        <div class="card card-sm">
            <div class="card-header"><h2>Deep AI Analysis</h2><span class="badge pulse" id="analysis-badge">LOADING</span></div>
            <div id="analysis" class="ai-text loading-text">Running deep analysis...</div>
        </div>
        <div class="card card-sm">
            <h2>Global Investment Map</h2>
            <div id="world-map"></div>
            <p class="map-hint">Click any country for AI recommendations</p>
            <div id="country-result" class="ai-text" style="max-height:200px;overflow-y:auto"></div>
        </div>
        <div class="card card-sm">
            <h2>Top Picks by Sector</h2>
            <div class="sector-grid" id="sector-buttons">
                <button class="sector-btn" onclick="loadSectorPicks('Startups & Growth')">Startups</button>
                <button class="sector-btn" onclick="loadSectorPicks('Defense & Aerospace')">Defense</button>
                <button class="sector-btn" onclick="loadSectorPicks('Healthcare & Biotech')">Healthcare</button>
                <button class="sector-btn" onclick="loadSectorPicks('Finance & Banking')">Finance</button>
                <button class="sector-btn" onclick="loadSectorPicks('Technology & AI')">Tech & AI</button>
                <button class="sector-btn" onclick="loadSectorPicks('Energy & Clean Energy')">Energy</button>
                <button class="sector-btn" onclick="loadSectorPicks('Real Estate & REITs')">Real Estate</button>
                <button class="sector-btn" onclick="loadSectorPicks('Consumer & Retail')">Consumer</button>
                <button class="sector-btn" onclick="loadSectorPicks('Industrials & Infrastructure')">Industrials</button>
                <button class="sector-btn" onclick="loadSectorPicks('Semiconductors & Chips')">Semis</button>
            </div>
            <div id="sector-picks" class="ai-text" style="max-height:280px;overflow-y:auto"></div>
        </div>
    </div>
</div>

<!-- Chart Modal -->
<div class="modal-overlay" id="chart-modal">
    <div class="modal">
        <div class="modal-header">
            <h2 id="chart-title">Stock Chart</h2>
            <button class="modal-close" onclick="closeChartModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="chart-tabs" id="chart-tabs"></div>
            <div id="tradingview-widget" style="height:500px"></div>
        </div>
    </div>
</div>

<script>
var currentSymbol='';var sectorChart=null;

function fmt(n){if(n===null||n===undefined)return'\u2014';return Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}
function renderMd(t){try{return marked.parse(t)}catch(e){return t}}
function updateTime(){document.getElementById('last-update').textContent=new Date().toLocaleTimeString()}

async function checkAuth(){try{var r=await fetch('/api/auth-status');var d=await r.json();var e=document.getElementById('conn-status');if(d.authenticated){e.className='status ok';e.textContent='Connected'}else{e.className='status error';e.textContent='Disconnected'}}catch(x){document.getElementById('conn-status').className='status error';document.getElementById('conn-status').textContent='Error'}}

async function loadSummary(){try{var r=await fetch('/api/summary');var d=await r.json();if(d.error)return;var labels={'NetLiquidation':'Net Liquidation','TotalCashValue':'Cash','GrossPositionValue':'Positions','UnrealizedPnL':'Unrealized P&L','RealizedPnL':'Realized P&L','BuyingPower':'Buying Power','AvailableFunds':'Available','MaintMarginReq':'Margin Req','InitMarginReq':'Init Margin','Cushion':'Cushion %'};var html='';for(var key in labels){if(d[key]!==undefined){var val=Number(d[key]);var cls=key.indexOf('PnL')>=0?(val>=0?'positive':'negative'):'';var display=key==='Cushion'?(val*100).toFixed(1)+'%':'$'+fmt(val);html+='<div class="summary-item"><div class="label">'+labels[key]+'</div><div class="value '+cls+'">'+display+'</div></div>'}}document.getElementById('summary').innerHTML=html}catch(e){}}

async function loadOrders(){try{var r=await fetch('/api/orders');var d=await r.json();var el=document.getElementById('orders');if(d.error||!d.orders||d.orders.length===0){el.innerHTML='<p class="orders-empty">No pending orders</p>';return}var html='<table><tr><th>Symbol</th><th>Action</th><th>Qty</th><th>Type</th><th>Price</th><th>Status</th></tr>';d.orders.forEach(function(o){html+='<tr><td><strong style="color:#38bdf8">'+o.ticker+'</strong></td><td>'+(o.action||'')+'</td><td>'+o.qty+'</td><td>'+o.orderType+'</td><td>'+(o.limitPrice?'$'+fmt(o.limitPrice):(o.stopPrice?'$'+fmt(o.stopPrice):'MKT'))+'</td><td>'+o.status+'</td></tr>'});html+='</table>';el.innerHTML=html}catch(e){}}

async function loadPositions(){try{var r=await fetch('/api/positions');var d=await r.json();if(d.error||!d.positions||d.positions.length===0){document.getElementById('positions').innerHTML='<p class="loading-text">No positions found.</p>';return}var html='<table><tr><th>Symbol</th><th>Type</th><th>Qty</th><th>Avg Cost</th><th>Mkt Price</th><th>Mkt Value</th><th>P&L</th></tr>';d.positions.forEach(function(p){var pnl=p.unrealizedPnl||0;var cls=pnl>=0?'positive':'negative';html+='<tr class="clickable" onclick="openChartModal(\''+p.ticker+'\')"><td><strong style="color:#38bdf8">'+p.ticker+'</strong></td><td>'+(p.secType||'')+'</td><td>'+p.position+'</td><td>$'+fmt(p.avgCost)+'</td><td>$'+fmt(p.marketPrice)+'</td><td>$'+fmt(p.mktValue)+'</td><td class="'+cls+'">$'+fmt(pnl)+'</td></tr>'});html+='</table>';document.getElementById('positions').innerHTML=html}catch(e){}}

async function loadBriefing(){try{var r=await fetch('/api/briefing',{method:'POST'});var d=await r.json();var b=document.getElementById('briefing-badge');if(d.error){document.getElementById('briefing').innerHTML='<p class="negative">'+d.error+'</p>';b.textContent='ERROR';b.classList.remove('pulse');return}document.getElementById('briefing').innerHTML=renderMd(d.briefing);b.textContent='LIVE';b.classList.remove('pulse');b.style.background='#065f46';b.style.color='#6ee7b7'}catch(e){document.getElementById('briefing').innerHTML='<p class="negative">Failed</p>'}}

async function loadAnalysis(){try{var r=await fetch('/api/analyze',{method:'POST'});var d=await r.json();var b=document.getElementById('analysis-badge');if(d.error){document.getElementById('analysis').innerHTML='<p class="negative">'+d.error+'</p>';b.textContent='ERROR';b.classList.remove('pulse');return}document.getElementById('analysis').innerHTML=renderMd(d.analysis);b.textContent='DONE';b.classList.remove('pulse');b.style.background='#065f46';b.style.color='#6ee7b7'}catch(e){document.getElementById('analysis').innerHTML='<p class="negative">Failed</p>'}}

async function loadSectors(){try{var r=await fetch('/api/sectors',{method:'POST'});var d=await r.json();if(d.error||!d.holdings)return;var sm={};d.holdings.forEach(function(h){sm[h.sector]=(sm[h.sector]||0)+h.percentage});var labels=Object.keys(sm);var values=Object.values(sm);var colors=['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4','#84cc16','#f97316','#6366f1','#14b8a6','#e11d48'];var ctx=document.getElementById('sectorChart').getContext('2d');if(sectorChart)sectorChart.destroy();sectorChart=new Chart(ctx,{type:'doughnut',data:{labels:labels,datasets:[{data:values,backgroundColor:colors.slice(0,labels.length),borderColor:'#111827',borderWidth:2}]},options:{responsive:true,plugins:{legend:{position:'right',labels:{color:'#94a3b8',font:{size:10},boxWidth:10,padding:6}}}}});if(d.recommended_sectors&&d.recommended_sectors.length>0){var rh='';d.recommended_sectors.slice(0,2).forEach(function(r){var a=r.recommended>r.current?'\u2191':'\u2193';rh+=a+' '+r.sector+': '+r.current.toFixed(0)+'%\u2192'+r.recommended+'%<br>'});document.getElementById('sector-recs').innerHTML=rh}}catch(e){}}

var worldMap;
function initMap(){worldMap=new jsVectorMap({selector:'#world-map',map:'world',backgroundColor:'transparent',regionStyle:{initial:{fill:'#1e293b',stroke:'#0a0e1a',strokeWidth:0.5},hover:{fill:'#2563eb',cursor:'pointer'},selected:{fill:'#3b82f6'}},onRegionClick:function(ev,code){var name=worldMap.getRegionName(code);loadCountryInvestments(name)}})}

async function loadCountryInvestments(country){var el=document.getElementById('country-result');el.innerHTML='<p class="loading-text pulse">Loading '+country+'...</p>';try{var r=await fetch('/api/country-investments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({country:country})});var d=await r.json();if(d.error){el.innerHTML='<p class="negative">'+d.error+'</p>';return}el.innerHTML=renderMd(d.recommendations)}catch(e){el.innerHTML='<p class="negative">Failed</p>'}}

async function loadSectorPicks(sector){document.querySelectorAll('.sector-btn').forEach(function(b){b.classList.remove('active')});event.target.classList.add('active');var el=document.getElementById('sector-picks');el.innerHTML='<p class="loading-text pulse">Loading '+sector+' picks...</p>';try{var r=await fetch('/api/sector-picks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sector:sector})});var d=await r.json();if(d.error){el.innerHTML='<p class="negative">'+d.error+'</p>';return}el.innerHTML=renderMd(d.picks)}catch(e){el.innerHTML='<p class="negative">Failed</p>'}}

function openChartModal(symbol){currentSymbol=symbol;document.getElementById('chart-title').textContent=symbol+' \u2014 Chart';document.getElementById('chart-modal').classList.add('active');var periods=['1M','3M','6M','1Y','5Y'];var th='';periods.forEach(function(p,i){th+='<button class="chart-tab'+(i===0?' active':'')+'" onclick="switchChart(\''+p+'\',this)">'+p+'</button>'});document.getElementById('chart-tabs').innerHTML=th;showTVChart('1M')}
function closeChartModal(){document.getElementById('chart-modal').classList.remove('active');document.getElementById('tradingview-widget').innerHTML=''}
function switchChart(p,btn){document.querySelectorAll('.chart-tab').forEach(function(t){t.classList.remove('active')});btn.classList.add('active');showTVChart(p)}
function showTVChart(period){var ranges={'1M':'1M','3M':'3M','6M':'6M','1Y':'12M','5Y':'60M'};var el=document.getElementById('tradingview-widget');el.innerHTML='<div id="tv_chart_container"></div>';var s=document.createElement('script');s.src='https://s3.tradingview.com/tv.js';s.onload=function(){new TradingView.widget({container_id:'tv_chart_container',symbol:currentSymbol,interval:period==='5Y'?'M':(period==='1Y'||period==='6M'?'W':'D'),timezone:'Europe/Zurich',theme:'dark',style:'1',locale:'en',toolbar_bg:'#111827',enable_publishing:false,width:'100%',height:480,range:ranges[period]})};document.head.appendChild(s)}
document.getElementById('chart-modal').addEventListener('click',function(e){if(e.target===this)closeChartModal()});

async function init(){checkAuth();loadSummary();loadPositions();loadOrders();updateTime();setTimeout(async function(){await loadBriefing();await loadSectors();await loadAnalysis()},2000);initMap()}
setInterval(function(){checkAuth();loadSummary();loadPositions();loadOrders();updateTime()},30000);
setInterval(function(){loadBriefing()},300000);
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


@app.route("/api/orders")
def api_orders():
    try:
        orders = ibkr_client.open_orders()
        return jsonify({"orders": orders})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/briefing", methods=["POST"])
def api_briefing():
    try:
        print("[BRIEFING] Fetching positions...")
        pos = ibkr_client.portfolio()
        print(f"[BRIEFING] Got {len(pos)} positions. Calling Claude AI...")
        summary = None
        try:
            summary = ibkr_client.account_summary()
        except Exception:
            pass
        briefing = analyzer.hedge_fund_briefing(pos, summary)
        print(f"[BRIEFING] Done! Response length: {len(briefing)}")
        return jsonify({"briefing": briefing})
    except Exception as e:
        print(f"[BRIEFING] ERROR: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/analyze", methods=["POST"])
def api_analyze():
    try:
        print("[ANALYSIS] Fetching positions...")
        pos = ibkr_client.portfolio()
        print(f"[ANALYSIS] Got {len(pos)} positions. Calling Claude AI...")
        summary = None
        try:
            summary = ibkr_client.account_summary()
        except Exception:
            pass
        analysis = analyzer.analyze_portfolio(pos, summary)
        print(f"[ANALYSIS] Done! Response length: {len(analysis)}")
        return jsonify({"analysis": analysis})
    except Exception as e:
        print(f"[ANALYSIS] ERROR: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/sectors", methods=["POST"])
def api_sectors():
    try:
        print("[SECTORS] Fetching positions...")
        pos = ibkr_client.portfolio()
        print(f"[SECTORS] Got {len(pos)} positions. Calling Claude AI...")
        sectors = analyzer.sector_analysis(pos)
        print("[SECTORS] Done!")
        return jsonify(sectors)
    except Exception as e:
        print(f"[SECTORS] ERROR: {e}")
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


@app.route("/api/sector-picks", methods=["POST"])
def api_sector_picks():
    try:
        data = request.get_json()
        sector = data.get("sector", "")
        if not sector:
            return jsonify({"error": "Sector is required"}), 400
        print(f"[SECTOR PICKS] Loading {sector}...")
        pos = None
        try:
            pos = ibkr_client.portfolio()
        except Exception:
            pass
        picks = analyzer.sector_top_picks(sector, pos)
        print(f"[SECTOR PICKS] Done!")
        return jsonify({"picks": picks})
    except Exception as e:
        print(f"[SECTOR PICKS] ERROR: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print(f"Starting IBKR Dashboard on http://localhost:{config.FLASK_PORT}")
    print(f"Connecting to TWS/IB Gateway at {config.IBKR_HOST}:{config.IBKR_PORT}")
    print(f"Account ID: {config.IBKR_ACCOUNT_ID}")
    print(f"API Key: {'***' + config.ANTHROPIC_API_KEY[-8:] if config.ANTHROPIC_API_KEY else 'NOT SET'}")
    app.run(host=config.FLASK_HOST, port=config.FLASK_PORT, debug=config.FLASK_DEBUG, threaded=True)
