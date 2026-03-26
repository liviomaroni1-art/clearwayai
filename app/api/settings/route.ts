import { NextRequest, NextResponse } from 'next/server';
import { Settings } from '@/lib/types';
import * as fs from 'fs';
import * as path from 'path';

const SETTINGS_PATH = path.join(process.cwd(), 'data', 'settings.json');

function readSettings(): Settings {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8'));
    }
  } catch {}
  return { fredApiKey: '', refreshInterval: 60, currency: 'USD' };
}

function writeSettings(settings: Settings) {
  const dir = path.dirname(SETTINGS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2));
}

export async function GET() {
  return NextResponse.json(readSettings());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const current = readSettings();
    const updated = { ...current, ...body };
    writeSettings(updated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save settings' }, { status: 500 });
  }
}
