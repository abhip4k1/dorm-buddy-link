import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Clock, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"my" | "incoming">("my");

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      // My booking requests
      const { data: myBookings } = await supabase
        .from("booking_requests")
        .select("*, room_listings(title, price, location)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setBookings(myBookings || []);

      // Incoming requests for my listings
      const { data: myListings } = await supabase
        .from("room_listings")
        .select("id")
        .eq("owner_id", user.id);

      if (myListings && myListings.length > 0) {
        const listingIds = myListings.map((l) => l.id);
        const { data: incoming } = await supabase
          .from("booking_requests")
          .select("*, room_listings(title)")
          .in("listing_id", listingIds)
          .order("created_at", { ascending: false });
        setIncomingRequests(incoming || []);
      }

      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleUpdateStatus = async (requestId: string, newStatus: string) => {
    const { error } = await supabase
      .from("booking_requests")
      .update({ status: newStatus })
      .eq("id", requestId);

    if (error) {
      toast.error("Failed to update: " + error.message);
    } else {
      toast.success(`Request ${newStatus}`);
      setIncomingRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
      );
    }
  };

  const statusConfig: Record<string, { icon: any; color: string }> = {
    pending: { icon: Clock, color: "text-amber-500 bg-amber-500/10" },
    approved: { icon: CheckCircle2, color: "text-[hsl(var(--success))] bg-[hsl(var(--success))]/10" },
    rejected: { icon: XCircle, color: "text-destructive bg-destructive/10" },
  };

  if (loading) {
    return (
      <Layout title="My Bookings" showBack>
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </Layout>
    );
  }

  return (
    <Layout title="My Bookings" showBack>
      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {(["my", "incoming"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab ? "gradient-primary text-white shadow-glow" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "my" ? `My Requests (${bookings.length})` : `Incoming (${incomingRequests.length})`}
          </button>
        ))}
      </div>

      {activeTab === "my" && (
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-2">📋</p>
              <p className="font-bold text-foreground">No booking requests yet</p>
              <p className="text-sm text-muted-foreground mt-1">Browse listings to request a room</p>
            </div>
          ) : (
            bookings.map((b, idx) => {
              const sc = statusConfig[b.status] || statusConfig.pending;
              const Icon = sc.icon;
              return (
                <motion.div key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                  className="bg-card rounded-2xl border border-border/60 shadow-card p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-base font-bold text-foreground">{b.room_listings?.title || "Listing"}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">₹{b.room_listings?.price}/mo • {b.room_listings?.location || "N/A"}</p>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${sc.color}`}>
                      <Icon className="w-3.5 h-3.5" /> {b.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(b.created_at).toLocaleDateString()}</p>
                </motion.div>
              );
            })
          )}
        </div>
      )}

      {activeTab === "incoming" && (
        <div className="space-y-3">
          {incomingRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-2">📥</p>
              <p className="font-bold text-foreground">No incoming requests</p>
              <p className="text-sm text-muted-foreground mt-1">Requests for your listings will appear here</p>
            </div>
          ) : (
            incomingRequests.map((r, idx) => {
              const sc = statusConfig[r.status] || statusConfig.pending;
              const Icon = sc.icon;
              return (
                <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                  className="bg-card rounded-2xl border border-border/60 shadow-card p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-base font-bold text-foreground">{r.room_listings?.title || "Listing"}</p>
                      {r.message && <p className="text-sm text-muted-foreground mt-0.5">{r.message}</p>}
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${sc.color}`}>
                      <Icon className="w-3.5 h-3.5" /> {r.status}
                    </span>
                  </div>
                  {r.status === "pending" && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1 rounded-xl gradient-success font-semibold text-white" onClick={() => handleUpdateStatus(r.id, "approved")}>
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" className="flex-1 rounded-xl font-semibold" onClick={() => handleUpdateStatus(r.id, "rejected")}>
                        Reject
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      )}
    </Layout>
  );
};

export default MyBookings;
