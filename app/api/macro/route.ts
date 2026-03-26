import { NextRequest, NextResponse } from 'next/server';
import { calculateMacroRegime, getRegimeFavoredSectors } from '@/lib/calculations';
import { MacroData } from '@/lib/types';
import * as fs from 'fs';
import * as path from 'path';

const CACHE_PATH = path.join(process.cwd(), 'data', 'macro-cache.json');
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function getSettings(): { fredApiKey: string } {
  try {
    const settingsPath = path.join(process.cwd(), 'data', 'settings.json');
    if (fs.existsSync(settingsPath)) {
      return JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    }
  } catch {}
  return { fredApiKey: '' };
}

function getCachedData(): MacroData | null {
  try {
    if (fs.existsSync(CACHE_PATH)) {
      const data = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
      const age = Date.now() - new Date(data.timestamp).getTime();
      if (age < CACHE_TTL) return data;
    }
  } catch {}
  return null;
}

async function fetchFredSeries(seriesId: string, apiKey: string): Promise<number | null> {
  try {
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=2`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.observations && data.observations.length > 0) {
      return parseFloat(data.observations[0].value);
    }
  } catch {}
  return null;
}

function scoreFredData(values: {
  gdpGrowth: number | null;
  unemployment: number | null;
  fedFunds: number | null;
  cpiYoY: number | null;
  consumerSentiment: number | null;
}) {
  let gdp = 1;
  if (values.gdpGrowth !== null) {
    if (values.gdpGrowth > 3) gdp = 2;
    else if (values.gdpGrowth > 1.5) gdp = 1.5;
    else if (values.gdpGrowth > 0) gdp = 1;
    else gdp = 0;
  }

  let unemp = 1;
  if (values.unemployment !== null) {
    if (values.unemployment < 4) unemp = 2;
    else if (values.unemployment < 5) unemp = 1.5;
    else if (values.unemployment < 6.5) unemp = 1;
    else unemp = 0;
  }

  let fed = 1;
  if (values.fedFunds !== null) {
    if (values.fedFunds < 2) fed = 2;
    else if (values.fedFunds < 4) fed = 1.5;
    else if (values.fedFunds < 5.5) fed = 1;
    else fed = 0;
  }

  let cpi = 1;
  if (values.cpiYoY !== null) {
    if (values.cpiYoY < 2.5) cpi = 2;
    else if (values.cpiYoY < 4) cpi = 1.5;
    else if (values.cpiYoY < 6) cpi = 1;
    else cpi = 0;
  }

  let sentiment = 1;
  if (values.consumerSentiment !== null) {
    if (values.consumerSentiment > 80) sentiment = 2;
    else if (values.consumerSentiment > 65) sentiment = 1.5;
    else if (values.consumerSentiment > 50) sentiment = 1;
    else sentiment = 0;
  }

  return calculateMacroRegime({ gdp, unemployment: unemp, fedFunds: fed, cpi, sentiment });
}

export async function GET() {
  // Check cache first
  const cached = getCachedData();
  if (cached) {
    return NextResponse.json(cached);
  }

  const { fredApiKey } = getSettings();

  // Default regime if no API key
  if (!fredApiKey) {
    const defaultData: MacroData = {
      gdpGrowth: null,
      unemployment: null,
      fedFunds: null,
      cpiYoY: null,
      consumerSentiment: null,
      compositeScore: 6,
      regime: 'Late Cycle',
      favoriteSectors: getRegimeFavoredSectors('Late Cycle'),
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(defaultData);
  }

  try {
    const [gdpGrowth, unemployment, fedFunds, cpiYoY, consumerSentiment] = await Promise.all([
      fetchFredSeries('A191RL1Q225SBEA', fredApiKey), // Real GDP growth rate
      fetchFredSeries('UNRATE', fredApiKey),
      fetchFredSeries('FEDFUNDS', fredApiKey),
      fetchFredSeries('CPIAUCSL', fredApiKey),
      fetchFredSeries('UMCSENT', fredApiKey),
    ]);

    // CPI is a level - calculate YoY change if we have it
    // For simplicity, use the raw value difference approach
    const values = { gdpGrowth, unemployment, fedFunds, cpiYoY, consumerSentiment };
    const { compositeScore, regime } = scoreFredData(values);

    const result: MacroData = {
      gdpGrowth,
      unemployment,
      fedFunds,
      cpiYoY,
      consumerSentiment,
      compositeScore,
      regime,
      favoriteSectors: getRegimeFavoredSectors(regime),
      timestamp: new Date().toISOString(),
    };

    // Cache the result
    const dir = path.dirname(CACHE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CACHE_PATH, JSON.stringify(result, null, 2));

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch macro data' }, { status: 500 });
  }
}
