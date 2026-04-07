import Layout from "@/components/Layout";
import { 
  FileWarning, DoorOpen, CreditCard, UtensilsCrossed, Search, AlertTriangle,
  Bell, MessageSquare, HelpCircle, ChevronRight, Droplets, Clock, Stethoscope,
  Zap, Calendar, Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminRole } from "@/hooks/useAdminRole";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { profile, loading: authLoading } = useAuth();
  const { isAdmin } = useAdminRole();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [stats, setStats] = useState({ complaints: 0, gatePasses: 0 });

  const name = profile?.full_name || "Student";
  const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
  const hostel = profile?.hostel_block || "Not assigned";
  const room = profile?.room_number || "";

  const staticUpdates = [
    { id: "s1", title: "Water supply interrupted in Azad Bhawan – Floor 3 & 4 (10 AM - 2 PM)", category: "maintenance", is_important: true, created_at: new Date().toISOString() },
    { id: "s2", title: "PU Parivartan 2026 – Cultural fest registrations open at Limda Ground!", category: "event", is_important: false, created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: "s3", title: "Azad Bhawan mess menu updated – Gujarati thali added on Thursdays", category: "general", is_important: false, created_at: new Date(Date.now() - 172800000).toISOString() },
  ];

  useEffect(() => {
    const fetchDashData = async () => {
      const { data: ann } = await supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(3);
      setAnnouncements(ann && ann.length > 0 ? ann : staticUpdates);
      const { count: cCount } = await supabase.from("complaints").select("*", { count: "exact", head: true });
      const { count: gCount } = await supabase.from("gate_passes").select("*", { count: "exact", head: true });
      setStats({ complaints: cCount || 0, gatePasses: gCount || 0 });
    };
    fetchDashData();
  }, []);

  const quickActions = [
    { to: "/complaints/new", icon: FileWarning, label: "Complaints", emoji: "📝", gradient: "gradient-accent", ring: "ring-orange-200" },
    { to: "/gate-pass", icon: DoorOpen, label: "Gate Pass", emoji: "🚪", gradient: "gradient-primary", ring: "ring-blue-200" },
    { to: "/health", icon: Stethoscope, label: "Health", emoji: "🏥", gradient: "gradient-success", ring: "ring-emerald-200" },
    { to: "/mess-menu", icon: UtensilsCrossed, label: "Mess Menu", emoji: "🍽️", gradient: "gradient-warning", ring: "ring-amber-200" },
    { to: "/lost-found", icon: Search, label: "Lost & Found", emoji: "🔍", gradient: "gradient-purple", ring: "ring-purple-200" },
    { to: "/fee-status", icon: CreditCard, label: "Fee Status", emoji: "💳", gradient: "gradient-pink", ring: "ring-pink-200" },
  ];

  const tagColors: Record<string, string> = {
    Urgent: "bg-destructive/10 text-destructive",
    Info: "bg-primary/10 text-primary",
    Event: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    general: "bg-primary/10 text-primary",
    maintenance: "bg-amber-500/10 text-amber-600",
    academic: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  };

  return (
    <Layout>
      {/* Admin Panel Link */}
      {isAdmin && (
        <Link to="/admin" className="fixed bottom-28 left-5 md:bottom-8 md:left-8 z-40" aria-label="Admin Panel">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-4 py-3 rounded-2xl bg-primary shadow-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-foreground" />
            <span className="text-sm font-semibold text-primary-foreground">Admin</span>
          </motion.div>
        </Link>
      )}
      {/* Floating SOS Button */}
      <Link to="/emergency" className="fixed bottom-28 right-5 md:bottom-8 md:right-8 z-40" aria-label="Emergency SOS">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-full gradient-danger shadow-lg flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full gradient-danger animate-pulse-ring" />
          <AlertTriangle className="w-6 h-6 text-destructive-foreground relative z-10" />
        </motion.div>
      </Link>

      <div className="hidden md:block h-4" />

      {/* Welcome Hero */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
        <div className="relative gradient-hero rounded-3xl p-5 md:p-8 lg:p-10 overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 -ml-6 -mb-6" />
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-4 right-8 text-3xl md:text-5xl">🏠</motion.div>
          
          <div className="relative z-10">
            {authLoading ? (
              <div className="flex items-center gap-3.5 mb-4">
                <Skeleton className="w-14 h-14 rounded-2xl bg-white/20" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40 bg-white/20" />
                  <Skeleton className="h-4 w-28 bg-white/20" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3.5 md:gap-5 mb-4">
                  <div className="w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl md:text-2xl lg:text-3xl font-extrabold text-white border border-white/10">
                    {initials}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-white">Hello, {name.split(" ")[0]}! 👋</h1>
                    <p className="text-xs md:text-sm text-white/60 font-medium">{hostel}{room ? ` • Room ${room}` : ""}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 md:gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/5">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 text-white/70" />
                    <span className="text-[11px] md:text-sm font-semibold text-white/80">{profile?.enrollment_id || "Student"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-emerald-400/20 backdrop-blur-sm border border-emerald-300/10">
                    <Zap className="w-3 h-3 md:w-4 md:h-4 text-emerald-300" />
                    <span className="text-[11px] md:text-sm font-semibold text-emerald-200">Active</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Desktop: 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {/* Quick Access Grid */}
          <section>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-sm md:text-base lg:text-lg font-bold text-foreground">Quick Actions</h2>
              <span className="text-[10px] md:text-xs font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{quickActions.length} services</span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {quickActions.map((action, idx) => (
                <motion.div key={action.to} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05, duration: 0.3 }}>
                  <Link to={action.to} className="block p-4 md:p-5 rounded-2xl bg-card border border-border/60 shadow-card hover:shadow-card-hover active:scale-[0.96] transition-all duration-200 text-center group">
                    <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }} className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${action.gradient} flex items-center justify-center mx-auto mb-2.5 shadow-sm group-hover:shadow-md transition-shadow`}>
                      <action.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </motion.div>
                    <p className="text-xs md:text-sm font-bold text-foreground leading-tight">{action.label}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Announcements Banner */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Link to="/announcements" className="block group">
              <div className="bg-card border border-border/60 rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4 shadow-card hover:shadow-card-hover transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="w-11 h-11 md:w-14 md:h-14 rounded-2xl gradient-warning flex items-center justify-center flex-shrink-0 shadow-sm relative z-10">
                  <Bell className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center gap-2">
                    <p className="text-sm md:text-base font-bold text-foreground">{announcements.length} New Announcement{announcements.length !== 1 ? "s" : ""}</p>
                    {announcements.length > 0 && <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium truncate mt-0.5">
                    {announcements[0]?.title || "No announcements yet"}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground/50 flex-shrink-0 group-hover:translate-x-1 transition-transform relative z-10" />
              </div>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          <section>
            <h2 className="text-sm md:text-base lg:text-lg font-bold text-foreground mb-3 md:mb-4">Your Activity</h2>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                { label: "Complaints", value: stats.complaints, emoji: "📝", gradient: "gradient-accent" },
                { label: "Gate Passes", value: stats.gatePasses, emoji: "🚪", gradient: "gradient-primary" },
              ].map((stat, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.06 }}
                  className="bg-card rounded-2xl p-4 md:p-5 border border-border/60 shadow-card relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-3xl md:text-4xl opacity-10 -mr-1 -mt-1">{stat.emoji}</div>
                  <p className="text-2xl md:text-3xl font-extrabold text-foreground">{stat.value}</p>
                  <p className="text-[11px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Today's Schedule */}
          <section>
            <h2 className="text-sm md:text-base lg:text-lg font-bold text-foreground mb-3 md:mb-4">Today's Schedule</h2>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { icon: Droplets, label: "Water Supply", value: "6-8 AM, 5-7 PM", gradient: "gradient-primary", emoji: "💧" },
                { icon: Clock, label: "Laundry", value: "7 AM - 8 PM", gradient: "gradient-teal", emoji: "👕" },
              ].map((facility, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.06 }}
                  className="bg-card rounded-2xl p-4 md:p-5 border border-border/60 shadow-card relative overflow-hidden group hover:shadow-card-hover transition-all">
                  <div className="absolute top-0 right-0 text-3xl md:text-4xl opacity-10 -mr-1 -mt-1">{facility.emoji}</div>
                  <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl ${facility.gradient} flex items-center justify-center mb-2.5 shadow-sm`}>
                    <facility.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <p className="text-[11px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wider">{facility.label}</p>
                  <p className="text-sm md:text-base font-bold text-foreground mt-0.5">{facility.value}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6 md:space-y-8">
          {/* Recent Updates from DB */}
          <section>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-sm md:text-base lg:text-lg font-bold text-foreground">Recent Updates</h2>
              <Link to="/announcements" className="text-xs md:text-sm text-primary font-semibold hover:underline underline-offset-2">See All</Link>
            </div>
            <div className="bg-card rounded-2xl border border-border/60 shadow-card overflow-hidden">
              {announcements.length === 0 ? (
                <div className="p-5 text-center">
                  <p className="text-sm text-muted-foreground">No recent updates</p>
                </div>
              ) : (
                announcements.map((update, index) => (
                  <motion.div key={update.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.06 }}
                    className={`flex items-center gap-3 p-4 md:p-5 ${index < announcements.length - 1 ? "border-b border-border/40" : ""}`}>
                    <span className="text-xl flex-shrink-0">{update.is_important ? "⚠️" : "📢"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base font-medium text-foreground leading-snug line-clamp-2">{update.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full ${tagColors[update.category] || tagColors.general}`}>
                          {update.category}
                        </span>
                        <span className="text-[11px] md:text-xs text-muted-foreground">
                          {new Date(update.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* More Options */}
          <section>
            <h2 className="text-sm md:text-base lg:text-lg font-bold text-foreground mb-3 md:mb-4">More</h2>
            <div className="bg-card rounded-2xl border border-border/60 shadow-card overflow-hidden">
              {[
                { to: "/feedback", icon: MessageSquare, label: "Feedback", desc: "Share your thoughts", emoji: "💬", gradient: "gradient-teal" },
                { to: "/faqs", icon: HelpCircle, label: "FAQs", desc: "Common questions", emoji: "❓", gradient: "gradient-purple" },
              ].map((item, index) => (
                <motion.div key={item.to} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + index * 0.05 }}>
                  <Link to={item.to} className={`flex items-center gap-3 p-4 md:p-5 hover:bg-secondary/40 transition-colors group ${index === 0 ? "border-b border-border/40" : ""}`}>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${item.gradient} flex items-center justify-center shadow-sm`}>
                      <item.icon className="w-4.5 h-4.5 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm md:text-base font-semibold text-foreground">{item.label}</p>
                      <p className="text-[11px] md:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
