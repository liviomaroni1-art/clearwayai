import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Download, LogOut, Loader2, Users, RefreshCw } from "lucide-react";
import logo from "@/assets/clearway-logo.png";
import { format } from "date-fns";

interface Lead {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
}

const LeadsDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const verifyAndLoad = async () => {
      if (authLoading) return;
      
      if (!user) {
        navigate("/admin");
        return;
      }

      // Server-side admin verification for defense-in-depth
      try {
        const { data, error } = await supabase.functions.invoke('verify-admin');
        
        if (error || !data?.isAdmin) {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have admin privileges.",
          });
          navigate("/admin");
          return;
        }
        
        // Only fetch leads after server-side verification passes
        fetchLeads();
      } catch (err) {
        console.error("Admin verification failed:", err);
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: "Unable to verify admin access. Please try again.",
        });
        navigate("/admin");
      }
    };
    
    verifyAndLoad();
  }, [user, authLoading, navigate]);

  const fetchLeads = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch leads error:", error);
      toast({
        variant: "destructive",
        title: "Error fetching leads",
        description: "Unable to load leads. Please refresh or contact support.",
      });
    } else {
      setLeads(data || []);
    }
    setIsLoading(false);
  };

  const exportToCSV = () => {
    if (leads.length === 0) {
      toast({
        variant: "destructive",
        title: "No leads to export",
        description: "There are no leads in the database yet.",
      });
      return;
    }

    const headers = ["Email", "Source", "Captured At"];
    const csvContent = [
      headers.join(","),
      ...leads.map((lead) =>
        [
          lead.email,
          lead.source || "exit_popup",
          format(new Date(lead.created_at), "yyyy-MM-dd HH:mm:ss"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads_export_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();

    toast({
      title: "Export complete",
      description: `${leads.length} leads exported to CSV.`,
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ClearWay AI" width="128" height="32" className="h-8 w-auto" />
            <span className="text-muted-foreground">|</span>
            <span className="font-semibold">Admin Dashboard</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Captured Leads</h1>
            <p className="text-muted-foreground mt-1">
              View and export email leads from the exit-intent popup
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchLeads} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button onClick={exportToCSV} disabled={leads.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {leads.filter((lead) => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(lead.created_at) > weekAgo;
                }).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {leads.filter((lead) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return new Date(lead.created_at) > today;
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
            <CardDescription>
              Email addresses captured from website visitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No leads captured yet.</p>
                <p className="text-sm mt-1">
                  Leads will appear here when visitors submit the exit-intent popup.
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Captured At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.email}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {lead.source || "exit_popup"}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(lead.created_at), "MMM d, yyyy 'at' h:mm a")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LeadsDashboard;
