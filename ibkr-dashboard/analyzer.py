"""Claude AI portfolio analyzer — hedge fund manager style."""

import json
import anthropic
import config


client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY)


def hedge_fund_briefing(positions: list[dict], summary: dict | None = None) -> str:
    """AI Hedge Fund Manager morning briefing."""
    system = """You are an elite hedge fund portfolio manager giving your client a
personal morning briefing. You speak with authority and clarity. Be direct, insightful,
and actionable. Use a professional yet approachable tone.

Structure your briefing as:
1. **Portfolio Snapshot** — Quick health check (total value, daily change, overall P&L)
2. **Key Alerts** — Any positions that need immediate attention (big movers, losers, risks)
3. **Market Context** — How current market conditions affect their holdings
4. **Action Items** — Specific recommendations (hold, trim, add, or watch)
5. **Outlook** — What to watch for this week

Keep it concise — max 400 words. Use bold for key numbers and stock symbols."""

    user_content = f"Portfolio positions:\n```json\n{json.dumps(positions, indent=2)}\n```\n"
    if summary:
        user_content += f"\nAccount summary:\n```json\n{json.dumps(summary, indent=2)}\n```\n"
    user_content += "\nGive me my morning briefing."

    message = client.messages.create(
        model=config.ANTHROPIC_MODEL,
        max_tokens=2048,
        system=system,
        messages=[{"role": "user", "content": user_content}],
    )
    return message.content[0].text


def analyze_portfolio(positions: list[dict], summary: dict | None = None) -> str:
    """Deep portfolio analysis."""
    system = """You are an expert portfolio analyst. Provide a thorough analysis with:
- Portfolio composition and diversification score (1-10)
- Concentration risks
- P&L breakdown (winners vs losers)
- Risk assessment
- Sector balance analysis
- Specific recommendations with reasoning
Format with clear headers, bullet points, and bold key numbers."""

    user_content = f"Positions:\n```json\n{json.dumps(positions, indent=2)}\n```\n"
    if summary:
        user_content += f"\nAccount summary:\n```json\n{json.dumps(summary, indent=2)}\n```\n"
    user_content += "\nProvide a deep portfolio analysis."

    message = client.messages.create(
        model=config.ANTHROPIC_MODEL,
        max_tokens=4096,
        system=system,
        messages=[{"role": "user", "content": user_content}],
    )
    return message.content[0].text


def sector_analysis(positions: list[dict]) -> dict:
    """Classify positions into sectors and suggest allocation."""
    system = """You are a financial data analyst. Given portfolio positions, classify each
stock into its GICS sector and provide recommended sector allocations.

Return ONLY valid JSON with this exact structure (no markdown, no explanation):
{
  "holdings": [
    {"ticker": "AAPL", "sector": "Technology", "percentage": 25.5}
  ],
  "recommended_sectors": [
    {"sector": "Technology", "current": 25.5, "recommended": 30, "reason": "Growth potential"}
  ]
}

Use these sectors: Technology, Healthcare, Financials, Consumer Discretionary,
Communication Services, Industrials, Energy, Materials, Real Estate, Utilities,
Consumer Staples, Defense."""

    user_content = f"Classify these positions:\n```json\n{json.dumps(positions, indent=2)}\n```"

    message = client.messages.create(
        model=config.ANTHROPIC_MODEL,
        max_tokens=2048,
        system=system,
        messages=[{"role": "user", "content": user_content}],
    )

    try:
        return json.loads(message.content[0].text)
    except json.JSONDecodeError:
        text = message.content[0].text
        start = text.find("{")
        end = text.rfind("}") + 1
        if start >= 0 and end > start:
            return json.loads(text[start:end])
        return {"holdings": [], "recommended_sectors": []}


def country_investments(country: str, positions: list[dict] | None = None) -> str:
    """Get investment recommendations for a specific country/region."""
    system = """You are a global investment strategist specializing in international markets.
When asked about a country, provide:
1. **Market Overview** — Current economic conditions, GDP growth, key indices
2. **Top 5 Investment Opportunities** — Specific stocks or ETFs with ticker symbols
3. **Sectors to Watch** — Growing industries in that country
4. **Risks** — Political, currency, regulatory risks
5. **How to Access** — ETFs or ADRs available on US exchanges

Be specific with ticker symbols and current market context. Max 400 words."""

    user_content = f"Give me investment recommendations for: **{country}**\n"
    if positions:
        user_content += f"\nMy current portfolio for context:\n```json\n{json.dumps(positions, indent=2)}\n```"

    message = client.messages.create(
        model=config.ANTHROPIC_MODEL,
        max_tokens=2048,
        system=system,
        messages=[{"role": "user", "content": user_content}],
    )
    return message.content[0].text
