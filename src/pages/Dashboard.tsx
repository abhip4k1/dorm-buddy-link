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
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const quickActions = [
    { to: "/complaints/new", icon: FileWarning, label: "Complaints", emoji: "📝", bg: "bg-orange-50", iconBg: "bg-orange-100", iconColor: "text-orange-500" },
    { to: "/gate-pass", icon: DoorOpen, label: "Gate Pass", emoji: "🚪", bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-500" },
    { to: "/health", icon: Stethoscope, label: "Health", emoji: "🏥", bg: "bg-emerald-50", iconBg: "bg-emerald-100", iconColor: "text-emerald-500" },
    { to: "/mess-menu", icon: UtensilsCrossed, label: "Mess Menu", emoji: "🍽️", bg: "bg-amber-50", iconBg: "bg-amber-100", iconColor: "text-amber-500" },
    { to: "/lost-found", icon: Search, label: "Lost & Found", emoji: "🔍", bg: "bg-purple-50", iconBg: "bg-purple-100", iconColor: "text-purple-500" },
    { to: "/fee-status", icon: CreditCard, label: "Fee Status", emoji: "💳", bg: "bg-pink-50", iconBg: "bg-pink-100", iconColor: "text-pink-500" },
  ];

  const recentUpdates = [
    { id: 1, title: "Water supply maintenance in Block B tomorrow", time: "2h ago", type: "⚠️" },
    { id: 2, title: "Mess timing revised for exam week", time: "5h ago", type: "🍽️" },
    { id: 3, title: "Hostel Sports Week registration open", time: "1d ago", type: "🏏" },
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
        className="mb-6"
      >
        <div className="relative gradient-hero rounded-2xl p-5 overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/5 -mr-6 -mt-6" />
          <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/5 -ml-4 -mb-4" />
          
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-xl font-extrabold text-white">
              AB
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">Hello, Abhi! 👋</h1>
              <p className="text-xs text-white/60 font-medium">Azad Bhavan B • Room 411</p>
              <p className="text-[11px] text-white/40 font-medium mt-0.5">B.Tech CSE • 3rd Year</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Access Grid */}
      <section className="mb-6">
        <h2 className="text-sm font-bold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, idx) => (
            <motion.div
              key={action.to}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.04, duration: 0.25 }}
            >
              <Link
                to={action.to}
                className={`block p-3.5 rounded-2xl ${action.bg} border border-border/30 hover:shadow-md active:scale-[0.97] transition-all duration-200 text-center`}
              >
                <div className={`w-11 h-11 rounded-xl ${action.iconBg} flex items-center justify-center mx-auto mb-2`}>
                  <action.icon className={`w-5 h-5 ${action.iconColor}`} />
                </div>
                <p className="text-xs font-bold text-foreground leading-tight">{action.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Announcements Banner */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Link to="/announcements" className="block mb-6">
          <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground">3 New Announcements</p>
              <p className="text-xs text-muted-foreground font-medium truncate">Water supply maintenance tomorrow...</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
          </div>
        </Link>
      </motion.div>

      {/* Recent Updates */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">Recent Updates</h2>
          <Link to="/announcements" className="text-xs text-primary font-semibold">
            See All
          </Link>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 divide-y divide-border/40 overflow-hidden">
          {recentUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.06 }}
              className="flex items-center gap-3 p-3.5"
            >
              <span className="text-lg flex-shrink-0">{update.type}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug truncate">{update.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{update.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Facilities Today */}
      <section className="mb-6">
        <h2 className="text-sm font-bold text-foreground mb-3">Today's Schedule</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Droplets, label: "Water", value: "6-8 AM, 5-7 PM", color: "text-blue-500", bg: "bg-blue-50" },
            { icon: Clock, label: "Laundry", value: "7 AM - 8 PM", color: "text-teal-500", bg: "bg-teal-50" },
          ].map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + index * 0.06 }}
              className={`${facility.bg} rounded-2xl p-3.5 border border-border/30`}
            >
              <facility.icon className={`w-5 h-5 ${facility.color} mb-2`} />
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{facility.label}</p>
              <p className="text-sm font-bold text-foreground mt-0.5">{facility.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* More Options */}
      <section className="mb-4">
        <h2 className="text-sm font-bold text-foreground mb-3">More</h2>
        <div className="bg-card rounded-2xl border border-border/60 divide-y divide-border/40 overflow-hidden">
          {[
            { to: "/feedback", icon: MessageSquare, label: "Feedback", desc: "Share your thoughts", emoji: "💬" },
            { to: "/faqs", icon: HelpCircle, label: "FAQs", desc: "Common questions", emoji: "❓" },
          ].map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 + index * 0.05 }}
            >
              <Link to={item.to} className="flex items-center gap-3 p-3.5 hover:bg-secondary/40 transition-colors group">
                <span className="text-lg">{item.emoji}</span>
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