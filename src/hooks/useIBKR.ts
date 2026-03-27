import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  getAuthStatus,
  tickle,
  reauthenticate,
  logout,
  getAccounts,
  type AuthStatus,
  type Account,
} from "@/lib/ibkr";

const TICKLE_INTERVAL_MS = 55_000; // Keep-alive every 55 seconds

export function useIBKR() {
  const { session } = useAuth();
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tickleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isAuthenticated = authStatus?.authenticated ?? false;

  /** Check gateway auth status */
  const checkAuth = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const status = await getAuthStatus();
      setAuthStatus(status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check IBKR auth status");
    } finally {
      setLoading(false);
    }
  }, [session]);

  /** Start the keep-alive tickle loop */
  const startTickle = useCallback(() => {
    if (tickleRef.current) return;
    tickleRef.current = setInterval(async () => {
      try {
        await tickle();
      } catch {
        // Session may have expired — re-check auth
        checkAuth();
      }
    }, TICKLE_INTERVAL_MS);
  }, [checkAuth]);

  /** Stop the keep-alive loop */
  const stopTickle = useCallback(() => {
    if (tickleRef.current) {
      clearInterval(tickleRef.current);
      tickleRef.current = null;
    }
  }, []);

  /** Fetch brokerage accounts */
  const fetchAccounts = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const accts = await getAccounts();
      setAccounts(accts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  }, [session]);

  /** Trigger reauthentication */
  const handleReauthenticate = useCallback(async () => {
    setError(null);
    try {
      await reauthenticate();
      // After reauth, re-check status
      await checkAuth();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reauthentication failed");
    }
  }, [checkAuth]);

  /** Log out from IBKR gateway */
  const handleLogout = useCallback(async () => {
    setError(null);
    try {
      await logout();
      stopTickle();
      setAuthStatus(null);
      setAccounts([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    }
  }, [stopTickle]);

  // Check auth on mount and start keep-alive when authenticated
  useEffect(() => {
    if (session) {
      checkAuth();
    }
  }, [session, checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      startTickle();
    } else {
      stopTickle();
    }
    return stopTickle;
  }, [isAuthenticated, startTickle, stopTickle]);

  return {
    authStatus,
    isAuthenticated,
    accounts,
    loading,
    error,
    checkAuth,
    fetchAccounts,
    reauthenticate: handleReauthenticate,
    logout: handleLogout,
  };
}
