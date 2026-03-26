"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsType } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Key, Clock, DollarSign, Save, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsType>({
    fredApiKey: "",
    refreshInterval: 60,
    currency: "USD",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
