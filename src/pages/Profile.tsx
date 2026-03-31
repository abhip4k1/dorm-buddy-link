import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Building2, Phone, Mail, Calendar, LogOut, ChevronRight, Settings, Bell, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [loading, user, navigate]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const menuItems = [
    { icon: Bell, label: "Notifications", desc: "Manage alerts", emoji: "🔔" },
    { icon: Shield, label: "Privacy", desc: "Data settings", emoji: "🔒" },
    { icon: Settings, label: "Settings", desc: "App preferences", emoji: "⚙️" },
  ];

  if (loading) {
    return (
      <Layout title="Profile" showBack={false}>
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </Layout>
    );
  }

  const name = profile?.full_name || "Student";
  const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
  const email = user?.email || "";

  return (
    <Layout title="Profile" showBack={false}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-3 shadow-glow">
          <span className="text-2xl font-extrabold text-white">{initials}</span>
        </div>
        <h1 className="text-lg font-bold text-foreground">{name}</h1>
        <p className="text-sm text-muted-foreground font-medium">{profile?.enrollment_id || ""}</p>
      </motion.div>

      {(profile?.hostel_block || profile?.room_number) && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-primary/5 rounded-2xl p-4 mb-4 border border-primary/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Accommodation</p>
              <p className="text-base font-bold text-foreground">{profile?.hostel_block || "Not assigned"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-primary/10">
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase">Room</p>
              <p className="text-sm font-bold text-foreground">{profile?.room_number || "N/A"}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase">Block</p>
              <p className="text-sm font-bold text-foreground">{profile?.hostel_block || "N/A"}</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl border border-border/60 divide-y divide-border/40 mb-4">
        {[
          { icon: Mail, label: "Email", value: email },
          { icon: Phone, label: "Phone", value: profile?.phone || "Not set" },
          { icon: Calendar, label: "Since", value: profile ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-3.5">
            <div className="w-9 h-9 rounded-lg bg-secondary/80 flex items-center justify-center">
              <item.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase">{item.label}</p>
              <p className="text-sm font-semibold text-foreground truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border/60 divide-y divide-border/40 mb-5">
        {menuItems.map((item, index) => (
          <button key={index} className="flex items-center gap-3 p-3.5 w-full hover:bg-secondary/40 transition-colors group">
            <span className="text-base">{item.emoji}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-all" />
          </button>
        ))}
      </motion.div>

      <Button variant="destructive" size="lg" className="w-full rounded-xl" onClick={handleLogout}>
        <LogOut className="w-5 h-5 mr-2" />Sign Out
      </Button>

      <p className="text-center text-[10px] text-muted-foreground mt-5 font-medium">HostelSphere v1.0.0</p>
    </Layout>
  );
};

export default Profile;
