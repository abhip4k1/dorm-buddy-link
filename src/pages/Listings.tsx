import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, MapPin, IndianRupee, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const Listings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("room_listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load listings");
      } else {
        setListings(data || []);
      }
      setLoading(false);
    };
    fetchListings();
  }, []);

  const handleBooking = async (listingId: string) => {
    if (!user) { toast.error("Please log in first"); return; }

    const { error } = await supabase.from("booking_requests").insert({
      user_id: user.id,
      listing_id: listingId,
      message: "I am interested in this room.",
    });

    if (error) {
      toast.error("Failed to send request: " + error.message);
    } else {
      toast.success("Booking request sent!");
    }
  };

  if (loading) {
    return (
      <Layout title="Room Listings" showBack>
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </Layout>
    );
  }

  return (
    <Layout title="Room Listings" showBack>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground font-medium">{listings.length} listing{listings.length !== 1 ? "s" : ""} available</p>
        <Link to="/listings/add">
          <Button size="sm" className="gradient-primary rounded-xl font-semibold shadow-glow">
            <Plus className="w-4 h-4 mr-1.5" /> Add Listing
          </Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <p className="text-4xl mb-3">🏠</p>
          <p className="text-lg font-bold text-foreground">No listings yet</p>
          <p className="text-sm text-muted-foreground mt-1">Be the first to add a room listing!</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing, idx) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card rounded-2xl border border-border/60 shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2 flex-1">{listing.title}</h3>
                  {listing.is_available ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] ml-2 flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> Open
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive ml-2 flex-shrink-0">
                      <XCircle className="w-3 h-3" /> Closed
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{listing.description}</p>

                <div className="flex items-center gap-3 mb-3 text-sm">
                  <span className="flex items-center gap-1 font-bold text-foreground">
                    <IndianRupee className="w-3.5 h-3.5" /> {listing.price}/mo
                  </span>
                  {listing.location && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" /> {listing.location}
                    </span>
                  )}
                </div>

                {listing.amenities && listing.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {listing.amenities.slice(0, 4).map((a: string, i: number) => (
                      <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{a}</span>
                    ))}
                    {listing.amenities.length > 4 && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">+{listing.amenities.length - 4}</span>
                    )}
                  </div>
                )}

                {listing.is_available && listing.owner_id !== user?.id && (
                  <Button
                    size="sm"
                    className="w-full rounded-xl gradient-primary font-semibold"
                    onClick={() => handleBooking(listing.id)}
                  >
                    Request Booking
                  </Button>
                )}
                {listing.owner_id === user?.id && (
                  <p className="text-xs text-center text-muted-foreground font-semibold">Your listing</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Listings;
