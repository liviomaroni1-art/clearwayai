"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsType } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Key, Clock, DollarSign, Save, CheckCircle, Link2, Unlink, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsType>({
    fredApiKey: "",
    refreshInterval: 60,
    currency: "USD",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [ibkrToken, setIbkrToken] = useState("");
  const [ibkrQueryId, setIbkrQueryId] = useState("");
  const [ibkrConnected, setIbkrConnected] = useState(false);
  const [ibkrSyncing, setIbkrSyncing] = useState(false);
  const [ibkrSyncResult, setIbkrSyncResult] = useState<string | null>(null);
  const [ibkrError, setIbkrError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/ibkr")
      .then(res => res.json())
      .then(data => {
        setIbkrConnected(data.connected);
        if (data.queryId) setIbkrQueryId(data.queryId);
      })
      .catch(() => {});
  }, []);

  const handleIbkrSave = async () => {
    setIbkrError(null);
    try {
      await fetch("/api/ibkr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_credentials", token: ibkrToken, queryId: ibkrQueryId }),
      });
      setIbkrConnected(true);
      setIbkrToken("");
    } catch (err: any) {
      setIbkrError(err.message);
    }
  };

  const handleIbkrSync = async () => {
    setIbkrSyncing(true);
    setIbkrSyncResult(null);
    setIbkrError(null);
    try {
      const res = await fetch("/api/ibkr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync" }),
      });
      const data = await res.json();
      if (data.error) {
        setIbkrError(data.error);
      } else {
        setIbkrSyncResult(`Synced ${data.positions} positions, cash: $${data.cashBalance.toFixed(2)}`);
      }
    } catch (err: any) {
      setIbkrError(err.message);
    }
    setIbkrSyncing(false);
  };

  const handleIbkrDisconnect = async () => {
    await fetch("/api/ibkr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "disconnect" }),
    });
    setIbkrConnected(false);
    setIbkrSyncResult(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save settings", err);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="font-sans text-2xl font-bold text-foreground flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-accent" />
          Settings
        </h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Loading settings...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-sans text-2xl font-bold text-foreground flex items-center gap-2">
        <SettingsIcon className="h-6 w-6 text-accent" />
        Settings
      </h1>

      {/* IBKR Connection */}
      <Card className={ibkrConnected ? "border-positive/30" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="h-4 w-4 text-accent" />
            Interactive Brokers (Read-Only)
          </CardTitle>
          <CardDescription>
            Connect your IBKR account to auto-sync positions and cash balance. Read-only — cannot execute trades.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ibkrConnected ? (
            <>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-positive/10 border border-positive/20">
                <CheckCircle2 className="h-4 w-4 text-positive" />
                <span className="text-sm text-positive font-medium">Connected to IBKR</span>
                <span className="text-xs text-muted-foreground font-mono ml-auto">Query: {ibkrQueryId}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={handleIbkrSync} disabled={ibkrSyncing} className="flex-1">
                  <RefreshCw className={`h-4 w-4 mr-2 ${ibkrSyncing ? "animate-spin" : ""}`} />
                  {ibkrSyncing ? "Syncing..." : "Sync Now"}
                </Button>
                <Button variant="outline" onClick={handleIbkrDisconnect}>
                  <Unlink className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </div>

              {ibkrSyncResult && (
                <div className="flex items-center gap-2 text-sm text-positive">
                  <CheckCircle2 className="h-4 w-4" />
                  {ibkrSyncResult}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-card border border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Setup steps:</strong><br />
                    1. Log into IBKR Account Management<br />
                    2. Go to Performance &amp; Reports → Flex Queries<br />
                    3. Create Activity Flex Query with Open Positions + Cash Report<br />
                    4. Enable Flex Web Service → Create Token<br />
                    5. Paste Token + Query ID below
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ibkrToken">Flex Web Service Token</Label>
                  <Input
                    id="ibkrToken"
                    type="password"
                    placeholder="Enter your IBKR Flex token"
                    value={ibkrToken}
                    onChange={(e) => setIbkrToken(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ibkrQueryId">Flex Query ID</Label>
                  <Input
                    id="ibkrQueryId"
                    placeholder="e.g. 123456"
                    value={ibkrQueryId}
                    onChange={(e) => setIbkrQueryId(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <Button
                  onClick={handleIbkrSave}
                  disabled={!ibkrToken || !ibkrQueryId}
                  className="w-full"
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Connect IBKR Account
                </Button>
              </div>
            </>
          )}

          {ibkrError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-negative/10 border border-negative/20">
              <AlertCircle className="h-4 w-4 text-negative mt-0.5 shrink-0" />
              <span className="text-sm text-negative">{ibkrError}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* FRED API Key */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Key className="h-4 w-4 text-accent" />
            FRED API Key
          </CardTitle>
          <CardDescription>
            Required for macro regime analysis. Get a free API key from{" "}
            <span className="text-accent">fred.stlouisfed.org</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="fredKey">API Key</Label>
            <Input
              id="fredKey"
              type="password"
              placeholder="Enter your FRED API key"
              value={settings.fredApiKey}
              onChange={(e) =>
                setSettings({ ...settings, fredApiKey: e.target.value })
              }
              className="font-mono"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={settings.fredApiKey ? "positive" : "warning"}>
              {settings.fredApiKey ? "Configured" : "Not Set"}
            </Badge>
            {!settings.fredApiKey && (
              <span className="text-xs text-muted-foreground">
                Without a FRED key, macro regime defaults to &quot;Late Cycle&quot;
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Refresh Interval */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-accent" />
            Auto-Refresh Interval
          </CardTitle>
          <CardDescription>
            How often the dashboard refreshes data (in seconds).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="interval">Seconds</Label>
            <Input
              id="interval"
              type="number"
              min={10}
              max={300}
              value={settings.refreshInterval}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  refreshInterval: parseInt(e.target.value) || 60,
                })
              }
              className="font-mono w-32"
            />
          </div>
        </CardContent>
      </Card>

      {/* Currency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="h-4 w-4 text-accent" />
            Currency
          </CardTitle>
          <CardDescription>
            Display currency for all prices and values.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency Code</Label>
            <Input
              id="currency"
              value={settings.currency}
              onChange={(e) =>
                setSettings({ ...settings, currency: e.target.value.toUpperCase() })
              }
              className="font-mono w-32 uppercase"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-positive">
            <CheckCircle className="h-4 w-4" />
            Settings saved!
          </span>
        )}
      </div>
    </div>
  );
}
