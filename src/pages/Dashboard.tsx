import Layout from "@/components/Layout";
import QuickAccessCard from "@/components/QuickAccessCard";
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
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const quickActions = [
    { to: "/complaints/new", icon: FileWarning, label: "File Complaint", description: "Report issues", variant: "default" as const },
    { to: "/gate-pass", icon: DoorOpen, label: "Gate Pass", description: "Request exit pass", variant: "default" as const },
    { to: "/health", icon: Stethoscope, label: "Health", description: "Book appointment", variant: "default" as const },
    { to: "/mess-menu", icon: UtensilsCrossed, label: "Mess Menu", description: "Weekly menu", variant: "default" as const },
    { to: "/lost-found", icon: Search, label: "Lost & Found", description: "Report or find items", variant: "default" as const },
    { to: "/announcements", icon: Bell, label: "Announcements", description: "Hostel notices", badge: "3", variant: "default" as const },
  ];

  const recentAnnouncements = [
    { id: 1, title: "Water supply maintenance in Block B tomorrow", time: "2h ago", important: true },
    { id: 2, title: "Mess timing revised for exam week", time: "5h ago", important: false },
  ];

  const facilities = [
    { icon: Droplets, label: "Water Timing", value: "6AM-8AM, 5PM-7PM" },
    { icon: Clock, label: "Laundry", value: "7AM - 8PM Daily" },
  ];

  return (
    <Layout>
      {/* Floating SOS Button */}
      <Link 
        to="/emergency"
        className="fixed bottom-28 right-5 z-40 w-14 h-14 rounded-full gradient-danger shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        aria-label="Emergency SOS"
      >
        <AlertTriangle className="w-6 h-6 text-destructive-foreground" />
      </Link>

      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-7"
      >
        <div className="relative gradient-hero rounded-3xl p-5 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-8 -mt-8" />
          <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5 -ml-4 -mb-4" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-13 h-13 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <span className="text-lg font-extrabold text-white">AB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Hello, Abhi! 👋</h1>
                <p className="text-sm text-white/60 font-medium">Azad Bhavan B • Room 411</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
              <p className="text-xs text-white/70 font-medium">
                <span className="text-white/90 font-semibold">B.Tech CSE</span> • 3rd Year • Parul University
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Access Grid */}
      <section className="mb-7">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, idx) => (
            <QuickAccessCard key={action.to} {...action} index={idx} />
          ))}
        </div>
      </section>

      {/* Recent Announcements */}
      <section className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Recent Updates
          </h2>
          <Link to="/announcements" className="text-xs text-primary font-semibold hover:text-primary/80 transition-colors">
            View All
          </Link>
        </div>
        <div className="space-y-2.5">
          {recentAnnouncements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-card p-4 rounded-2xl shadow-card border border-border/50 flex items-start gap-3 hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                announcement.important ? "bg-accent shadow-glow-accent" : "bg-muted-foreground/30"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-snug">{announcement.title}</p>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium">{announcement.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="mb-7">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Facilities Today
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-card p-4 rounded-2xl shadow-card border border-border/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                  <facility.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{facility.label}</p>
              </div>
              <p className="text-sm font-bold text-foreground">{facility.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* More Options */}
      <section>
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
          More Options
        </h2>
        <div className="bg-card rounded-2xl shadow-card border border-border/50 divide-y divide-border/50 overflow-hidden">
          {[
            { to: "/feedback", icon: MessageSquare, label: "Feedback & Suggestions", desc: "Your voice matters" },
            { to: "/faqs", icon: HelpCircle, label: "FAQs", desc: "Common hostel questions" },
            { to: "/fee-status", icon: CreditCard, label: "Fee Status", desc: "Track payments" },
          ].map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.05 }}
            >
              <Link to={item.to} className="flex items-center gap-3.5 p-4 hover:bg-secondary/50 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
