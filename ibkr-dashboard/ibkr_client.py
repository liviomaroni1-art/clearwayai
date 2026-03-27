"""IBKR client using ib_insync (connects to TWS or IB Gateway)."""

import asyncio

# Python 3.14+ removed auto-creation of event loops — create one explicitly
try:
    asyncio.get_event_loop()
except RuntimeError:
    asyncio.set_event_loop(asyncio.new_event_loop())

from ib_insync import IB, util
import config

# Suppress asyncio nested loop warnings
util.patchAsyncio()

ib = IB()


def connect() -> bool:
    """Connect to TWS / IB Gateway. Returns True if successful."""
    if ib.isConnected():
        return True
    try:
        ib.connect(
            config.IBKR_HOST,
            config.IBKR_PORT,
            clientId=config.IBKR_CLIENT_ID,
            readonly=True,
            timeout=10,
        )
        return True
    except Exception:
        return False


def disconnect():
    """Disconnect from TWS / IB Gateway."""
    if ib.isConnected():
        ib.disconnect()


def auth_status() -> dict:
    """Check connection status."""
    connected = ib.isConnected()
    if not connected:
        connected = connect()

    if connected:
        accounts = ib.managedAccounts()
        return {
            "authenticated": True,
            "connected": True,
            "accounts": accounts,
            "message": f"Connected to IBKR. Accounts: {', '.join(accounts)}",
        }
    return {
        "authenticated": False,
        "connected": False,
        "message": "Cannot connect to TWS/IB Gateway. Make sure it is running with API enabled.",
    }


def positions() -> list[dict]:
    """Get all positions."""
    if not ib.isConnected():
        connect()

    raw_positions = ib.positions()
    result = []
    for pos in raw_positions:
        contract = pos.contract
        result.append({
            "account": pos.account,
            "ticker": contract.symbol,
            "contractDesc": f"{contract.symbol} ({contract.secType}) - {contract.exchange or contract.primaryExchange}",
            "conid": contract.conId,
            "secType": contract.secType,
            "exchange": contract.exchange,
            "currency": contract.currency,
            "position": pos.position,
            "avgCost": pos.avgCost,
            "mktValue": None,
            "unrealizedPnl": None,
        })
    return result


def portfolio() -> list[dict]:
    """Get portfolio items with market value and P&L."""
    if not ib.isConnected():
        connect()

    items = ib.portfolio(config.IBKR_ACCOUNT_ID)
    result = []
    for item in items:
        contract = item.contract
        result.append({
            "account": item.account,
            "ticker": contract.symbol,
            "contractDesc": f"{contract.symbol} ({contract.secType}) - {contract.primaryExchange}",
            "conid": contract.conId,
            "secType": contract.secType,
            "currency": contract.currency,
            "position": item.position,
            "mktValue": item.marketValue,
            "avgCost": item.averageCost,
            "unrealizedPnl": item.unrealizedPNL,
            "realizedPnl": item.realizedPNL,
            "marketPrice": item.marketPrice,
        })
    return result


def account_summary() -> dict:
    """Get account summary values."""
    if not ib.isConnected():
        connect()

    tags = (
        "NetLiquidation,TotalCashValue,GrossPositionValue,"
        "UnrealizedPnL,RealizedPnL,BuyingPower,AvailableFunds,"
        "Cushion,Currency"
    )
    summary_items = ib.accountSummary(config.IBKR_ACCOUNT_ID)

    result = {}
    for item in summary_items:
        if item.tag in tags:
            try:
                result[item.tag] = float(item.value)
            except ValueError:
                result[item.tag] = item.value
    return result
