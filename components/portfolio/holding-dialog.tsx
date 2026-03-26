"use client";

import { useState, useEffect } from "react";
import { Holding } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  holding: Holding | null;
  onSave: (holding: Omit<Holding, "id">, id?: string) => void;
}

export function HoldingDialog({ open, onOpenChange, holding, onSave }: Props) {
  const [ticker, setTicker] = useState("");
  const [shares, setShares] = useState("");
  const [avgPrice, setAvgPrice] = useState("");
  const [dateBought, setDateBought] = useState("");

  useEffect(() => {
    if (holding) {
      setTicker(holding.ticker);
      setShares(String(holding.shares));
      setAvgPrice(String(holding.avgPrice));
      setDateBought(holding.dateBought);
    } else {
      setTicker("");
      setShares("");
      setAvgPrice("");
      setDateBought(new Date().toISOString().split("T")[0]);
    }
  }, [holding, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      {
        ticker: ticker.toUpperCase(),
        shares: parseFloat(shares) || 0,
        avgPrice: parseFloat(avgPrice) || 0,
        dateBought,
      },
      holding?.id
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{holding ? "Edit Holding" : "Add Holding"}</DialogTitle>
          <DialogDescription>
            {holding ? "Update the details of your holding." : "Add a new stock to your portfolio."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticker">Ticker Symbol</Label>
            <Input
              id="ticker"
              placeholder="AAPL"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              required
              className="font-mono uppercase"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shares">Shares</Label>
              <Input
                id="shares"
                type="number"
                step="any"
                placeholder="100"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                required
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avgPrice">Avg Buy Price ($)</Label>
              <Input
                id="avgPrice"
                type="number"
                step="0.01"
                placeholder="150.00"
                value={avgPrice}
                onChange={(e) => setAvgPrice(e.target.value)}
                required
                className="font-mono"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateBought">Date Bought</Label>
            <Input
              id="dateBought"
              type="date"
              value={dateBought}
              onChange={(e) => setDateBought(e.target.value)}
              required
              className="font-mono"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{holding ? "Update" : "Add"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
