import os
from dotenv import load_dotenv

load_dotenv()

# IBKR TWS / IB Gateway connection
# TWS paper: 7497, TWS live: 7496
# IB Gateway paper: 4002, IB Gateway live: 4001
IBKR_HOST = os.getenv("IBKR_HOST", "127.0.0.1")
IBKR_PORT = int(os.getenv("IBKR_PORT", "4001"))
IBKR_CLIENT_ID = int(os.getenv("IBKR_CLIENT_ID", "1"))
IBKR_ACCOUNT_ID = os.getenv("IBKR_ACCOUNT_ID", "U23250336")

# Anthropic API
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-20250514")

# Flask
FLASK_HOST = "0.0.0.0"
FLASK_PORT = 8080
FLASK_DEBUG = False
