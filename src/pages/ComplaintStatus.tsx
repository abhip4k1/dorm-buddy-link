import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import { Link } from "react-router-dom";
import { Plus, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Complaint {
  id: string;
  complaint_id: string;
  category: string;
  description: string;
  status: string;
  created_at: string;
}

const ComplaintStatus = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setComplaints(data);
      setLoading(false);
    };
    fetchComplaints();
  }, []);

  const getStatusType = (status: string) => {
    if (status === "resolved") return "resolved" as const;
    if (status === "in-progress") return "in-progress" as const;
    return "pending" as const;
  };

  if (loading) {
    return (
      <Layout title="My Complaints" showBack>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="My Complaints" showBack>
      <Link to="/complaints/new">
        <Button className="w-full mb-6 rounded-xl gradient-primary shadow-glow" size="lg">
          <Plus className="w-5 h-5" />
          File New Complaint
        </Button>
      </Link>

      <div className="space-y-4">
        {complaints.map((complaint, index) => (
          <motion.div 
            key={complaint.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">{complaint.complaint_id}</p>
                  <p className="text-sm font-bold text-foreground mt-1">{complaint.description.substring(0, 60)}...</p>
                </div>
                <StatusBadge status={getStatusType(complaint.status)} />
              </div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-[11px] px-2.5 py-1 bg-secondary/80 rounded-full text-muted-foreground font-semibold">
                  {complaint.category}
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">
                  {new Date(complaint.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {complaints.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">No Complaints Yet</h3>
          <p className="text-muted-foreground text-sm mb-6">You haven't filed any complaints yet</p>
          <Link to="/complaints/new">
            <Button className="rounded-xl">File Your First Complaint</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default ComplaintStatus;
