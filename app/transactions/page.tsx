"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatPL } from "@/lib/utils";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Settings,
  TrendingUp,
  Shield,
  Save,
  CheckCircle,
  DollarSign,
  Clock,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  date: string;
  note: string;
}

interface Account {
  cashBalance: number;
  transactions: Transaction[];
  riskTolerance: string;
  monthlyTarget: number;
  maxPositionPct: number;
  maxSectorPct: number;
}

export default function TransactionsPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [txnType, setTxnType] = useState<"deposit" | "withdrawal">("deposit");
  const [txnAmount, setTxnAmount] = useState("");
  const [txnNote, setTxnNote] = useState("");
  const [txnDate, setTxnDate] = useState(new Date().toISOString().split("T")[0]);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Local settings state
  const [riskTolerance, setRiskTolerance] = useState("moderate");
  const [monthlyTarget, setMonthlyTarget] = useState("3");
  const [maxPositionPct, setMaxPositionPct] = useState("10");
  const [maxSectorPct, setMaxSectorPct] = useState("30");

  const fetchAccount = useCallback(async () => {
    try {
      const res = await fetch("/api/account");
      const data = await res.json();
      setAccount(data);
      setRiskTolerance(data.riskTolerance || "moderate");
      setMonthlyTarget(String(data.monthlyTarget || 3));
      setMaxPositionPct(String(data.maxPositionPct || 10));
      setMaxSectorPct(String(data.maxSectorPct || 30));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAccount(); }, [fetchAccount]);

  const handleTransaction = async () => {
    if (!txnAmount || parseFloat(txnAmount) <= 0) return;
    try {
      await fetch("/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: txnType,
          amount: txnAmount,
          note: txnNote || (txnType === "deposit" ? "IBKR Deposit" : "Withdrawal"),
          date: txnDate,
        }),
      });
      setDialogOpen(false);
      setTxnAmount("");
      setTxnNote("");
      setLoading(true);
      fetchAccount();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    setSettingsSaved(false);
    try {
      await fetch("/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_settings",
          riskTolerance,
          monthlyTarget,
          maxPositionPct,
          maxSectorPct,
        }),
      });
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) {
      console.error(err);
    }
    setSavingSettings(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 rounded-xl lg:col-span-2" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!account) return null;

  const totalDeposits = account.transactions
    .filter(t => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = account.transactions
    .filter(t => t.type === "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);
  const netFlow = totalDeposits - totalWithdrawals;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground flex items-center gap-2">
            <Wallet className="h-6 w-6 text-accent" />
            Account & Transactions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">IBKR cash management and transaction history</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Transaction
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-accent" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Cash Balance</span>
            </div>
            <p className="font-mono text-xl font-bold text-accent">{formatCurrency(account.cashBalance)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <ArrowUpRight className="h-4 w-4 text-positive" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Deposits</span>
            </div>
            <p className="font-mono text-xl font-bold text-positive">{formatCurrency(totalDeposits)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <ArrowDownRight className="h-4 w-4 text-negative" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Withdrawals</span>
            </div>
            <p className="font-mono text-xl font-bold text-negative">{formatCurrency(totalWithdrawals)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Net Cash Flow</span>
            </div>
            <p className={`font-mono text-xl font-bold ${netFlow >= 0 ? "text-positive" : "text-negative"}`}>
              {formatPL(netFlow)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction History */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-accent" />
              Transaction History
            </CardTitle>
            <CardDescription>{account.transactions.length} transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {account.transactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-card/50 transition-colors border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center h-8 w-8 rounded-lg ${
                      txn.type === "deposit" ? "bg-positive/10" : "bg-negative/10"
                    }`}>
                      {txn.type === "deposit" ? (
                        <ArrowUpRight className="h-4 w-4 text-positive" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-negative" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{txn.note}</p>
                      <p className="text-xs text-muted-foreground font-mono">{txn.date}</p>
                    </div>
                  </div>
                  <span className={`font-mono text-sm font-semibold ${
                    txn.type === "deposit" ? "text-positive" : "text-negative"
                  }`}>
                    {txn.type === "deposit" ? "+" : "-"}{formatCurrency(txn.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-accent" />
              Risk Settings
            </CardTitle>
            <CardDescription>Configure your fund manager&apos;s risk parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Risk Tolerance</Label>
              <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">
                {riskTolerance === "conservative" ? "Smaller positions, more cash reserves" :
                 riskTolerance === "aggressive" ? "Larger positions, fully deployed capital" :
                 "Balanced approach between growth and preservation"}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Monthly Return Target (%)</Label>
              <Input
                type="number"
                value={monthlyTarget}
                onChange={(e) => setMonthlyTarget(e.target.value)}
                className="font-mono"
                min="1"
                max="20"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Max Position Size (%)</Label>
              <Input
                type="number"
                value={maxPositionPct}
                onChange={(e) => setMaxPositionPct(e.target.value)}
                className="font-mono"
                min="1"
                max="25"
              />
              <p className="text-[10px] text-muted-foreground">Maximum % of portfolio in a single stock</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Max Sector Exposure (%)</Label>
              <Input
                type="number"
                value={maxSectorPct}
                onChange={(e) => setMaxSectorPct(e.target.value)}
                className="font-mono"
                min="10"
                max="50"
              />
              <p className="text-[10px] text-muted-foreground">Maximum % of portfolio in a single sector</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button onClick={handleSaveSettings} disabled={savingSettings} className="w-full">
                {savingSettings ? "Saving..." : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
              {settingsSaved && (
                <CheckCircle className="h-5 w-5 text-positive shrink-0" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Transaction</DialogTitle>
            <DialogDescription>Record a deposit to or withdrawal from your IBKR account.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={txnType === "deposit" ? "default" : "outline"}
                onClick={() => setTxnType("deposit")}
                className="w-full"
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Deposit
              </Button>
              <Button
                variant={txnType === "withdrawal" ? "default" : "outline"}
                onClick={() => setTxnType("withdrawal")}
                className="w-full"
              >
                <ArrowDownRight className="h-4 w-4 mr-2" />
                Withdrawal
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Amount ($)</Label>
              <Input
                type="number"
                placeholder="10000"
                value={txnAmount}
                onChange={(e) => setTxnAmount(e.target.value)}
                className="font-mono text-lg"
                min="0"
                step="0.01"
              />
              {txnType === "withdrawal" && account && parseFloat(txnAmount) > account.cashBalance && (
                <p className="text-xs text-negative">Exceeds available cash balance ({formatCurrency(account.cashBalance)})</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={txnDate}
                onChange={(e) => setTxnDate(e.target.value)}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label>Note</Label>
              <Input
                placeholder={txnType === "deposit" ? "Monthly IBKR deposit" : "Living expenses"}
                value={txnNote}
                onChange={(e) => setTxnNote(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={handleTransaction}
                disabled={!txnAmount || parseFloat(txnAmount) <= 0 || (txnType === "withdrawal" && parseFloat(txnAmount) > (account?.cashBalance || 0))}
              >
                {txnType === "deposit" ? "Record Deposit" : "Record Withdrawal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
