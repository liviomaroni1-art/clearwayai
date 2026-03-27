"""Claude AI portfolio analyzer."""

import json
import anthropic
import config


client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY)

SYSTEM_PROMPT = """You are an expert portfolio analyst. You analyze Interactive Brokers
portfolio data and provide clear, actionable insights. Be concise but thorough.
Include observations on:
- Portfolio composition and diversification
- Concentration risks
- P&L performance (unrealized gains/losses)
- Sector/asset class balance
- Any notable positions (large winners, losers, or outsized allocations)
Format your response with clear headers and bullet points."""


def analyze_portfolio(positions: list[dict], summary: dict | None = None) -> str:
    """Send portfolio data to Claude for analysis."""
    user_content = "Here is my current IBKR portfolio data:\n\n"
    user_content += f"## Positions\n```json\n{json.dumps(positions, indent=2)}\n```\n"

    if summary:
        user_content += f"\n## Account Summary\n```json\n{json.dumps(summary, indent=2)}\n```\n"

    user_content += "\nPlease analyze my portfolio and provide insights."

    message = client.messages.create(
        model=config.ANTHROPIC_MODEL,
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_content}],
    )

    return message.content[0].text
