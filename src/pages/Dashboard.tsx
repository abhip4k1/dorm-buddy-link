import Layout from "@/components/Layout";
import { 
  FileWarning, 
  DoorOpen, 
  CreditCard, 
  UtensilsCrossed, 
  Search, 
  AlertTriangle,
  Bell,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Droplets,
  Clock,
  Stethoscope,
  Zap,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const quickActions = [
    { to: "/complaints/new", icon: FileWarning, label: "Complaints", emoji: "📝", gradient: "gradient-accent", ring: "ring-orange-200" },
    { to: "/gate-pass", icon: DoorOpen, label: "Gate Pass", emoji: "🚪", gradient: "gradient-primary", ring: "ring-blue-200" },
    { to: "/health", icon: Stethoscope, label: "Health", emoji: "🏥", gradient: "gradient-success", ring: "ring-emerald-200" },
    { to: "/mess-menu", icon: UtensilsCrossed, label: "Mess Menu", emoji: "🍽️", gradient: "gradient-warning", ring: "ring-amber-200" },
    { to: "/lost-found", icon: Search, label: "Lost & Found", emoji: "🔍", gradient: "gradient-purple", ring: "ring-purple-200" },
    { to: "/fee-status", icon: CreditCard, label: "Fee Status", emoji: "💳", gradient: "gradient-pink", ring: "ring-pink-200" },
  ];

  const recentUpdates = [
    { id: 1, title: "Water supply maintenance in Block B tomorrow", time: "2h ago", type: "⚠️", tag: "Urgent" },
    { id: 2, title: "Mess timing revised for exam week", time: "5h ago", type: "🍽️", tag: "Info" },
    { id: 3, title: "Hostel Sports Week registration open", time: "1d ago", type: "🏏", tag: "Event" },
  ];

  const tagColors: Record<string, string> = {
    Urgent: "bg-destructive/10 text-destructive",
    Info: "bg-primary/10 text-primary",
    Event: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  };

  return (
    <Layout>
      {/* Floating SOS Button */}
      <Link 
        to="/emergency"
        className="fixed bottom-28 right-5 z-40"
        aria-label="Emergency SOS"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full gradient-danger shadow-lg flex items-center justify-center relative"
        >
          <div className="absolute inset-0 rounded-full gradient-danger animate-pulse-ring" />
          <AlertTriangle className="w-6 h-6 text-destructive-foreground relative z-10" />
        </motion.div>
      </Link>

      {/* Welcome Hero - Bento Style */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="relative gradient-hero rounded-3xl p-5 overflow-hidden shadow-lg">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 -ml-6 -mb-6" />
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-8 text-3xl"
          >
            🏠
          </motion.div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-extrabold text-white border border-white/10">
                AB
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-white">Hello, Abhi! 👋</h1>
                <p className="text-xs text-white/60 font-medium">Azad Bhavan B • Room 411</p>
              </div>
            </div>
            
            {/* Mini stat chips */}
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/5">
                <Calendar className="w-3 h-3 text-white/70" />
                <span className="text-[11px] font-semibold text-white/80">B.Tech CSE • 3rd Year</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-400/20 backdrop-blur-sm border border-emerald-300/10">
                <Zap className="w-3 h-3 text-emerald-300" />
                <span className="text-[11px] font-semibold text-emerald-200">Active</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Access Grid - Cards with gradient icons */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">Quick Actions</h2>
          <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">6 services</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, idx) => (
            <motion.div
              key={action.to}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <Link
                to={action.to}
                className="block p-4 rounded-2xl bg-card border border-border/60 shadow-card hover:shadow-card-hover active:scale-[0.96] transition-all duration-200 text-center group"
              >
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                  className={`w-12 h-12 rounded-2xl ${action.gradient} flex items-center justify-center mx-auto mb-2.5 shadow-sm group-hover:shadow-md transition-shadow`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </motion.div>
                <p className="text-xs font-bold text-foreground leading-tight">{action.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Announcements Banner - More vibrant */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/announcements" className="block mb-6 group">
          <div className="bg-card border border-border/60 rounded-2xl p-4 flex items-center gap-3 shadow-card hover:shadow-card-hover transition-all relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-11 h-11 rounded-2xl gradient-warning flex items-center justify-center flex-shrink-0 shadow-sm relative z-10"
            >
              <Bell className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0 relative z-10">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-foreground">3 New Announcements</p>
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">Water supply maintenance tomorrow...</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 group-hover:translate-x-1 transition-transform relative z-10" />
          </div>
        </Link>
      </motion.div>

      {/* Today's Schedule - Bento cards */}
      <section className="mb-6">
        <h2 className="text-sm font-bold text-foreground mb-3">Today's Schedule</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Droplets, label: "Water Supply", value: "6-8 AM, 5-7 PM", gradient: "gradient-primary", emoji: "💧" },
            { icon: Clock, label: "Laundry", value: "7 AM - 8 PM", gradient: "gradient-teal", emoji: "👕" },
          ].map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.06 }}
              className="bg-card rounded-2xl p-4 border border-border/60 shadow-card relative overflow-hidden group hover:shadow-card-hover transition-all"
            >
              <div className="absolute top-0 right-0 text-3xl opacity-10 -mr-1 -mt-1">{facility.emoji}</div>
              <div className={`w-9 h-9 rounded-xl ${facility.gradient} flex items-center justify-center mb-2.5 shadow-sm`}>
                <facility.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{facility.label}</p>
              <p className="text-sm font-bold text-foreground mt-0.5">{facility.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Updates */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">Recent Updates</h2>
          <Link to="/announcements" className="text-xs text-primary font-semibold hover:underline underline-offset-2">
            See All
          </Link>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 shadow-card overflow-hidden">
          {recentUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.06 }}
              className={`flex items-center gap-3 p-4 ${index < recentUpdates.length - 1 ? "border-b border-border/40" : ""}`}
            >
              <span className="text-xl flex-shrink-0">{update.type}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug line-clamp-1">{update.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColors[update.tag]}`}>
                    {update.tag}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{update.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* More Options */}
      <section className="mb-4">
        <h2 className="text-sm font-bold text-foreground mb-3">More</h2>
        <div className="bg-card rounded-2xl border border-border/60 shadow-card overflow-hidden">
          {[
            { to: "/feedback", icon: MessageSquare, label: "Feedback", desc: "Share your thoughts", emoji: "💬", gradient: "gradient-teal" },
            { to: "/faqs", icon: HelpCircle, label: "FAQs", desc: "Common questions", emoji: "❓", gradient: "gradient-purple" },
          ].map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.05 }}
            >
              <Link to={item.to} className={`flex items-center gap-3 p-4 hover:bg-secondary/40 transition-colors group ${index === 0 ? "border-b border-border/40" : ""}`}>
                <div className={`w-10 h-10 rounded-xl ${item.gradient} flex items-center justify-center shadow-sm`}>
                  <item.icon className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
