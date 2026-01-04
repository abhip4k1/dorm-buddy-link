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
  Building2,
  Droplets,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const quickActions = [
    { to: "/complaints/new", icon: FileWarning, label: "File Complaint", description: "Report issues", variant: "default" as const },
    { to: "/gate-pass", icon: DoorOpen, label: "Gate Pass", description: "Request exit pass", variant: "default" as const },
    { to: "/fee-status", icon: CreditCard, label: "Fee Status", description: "View payments", variant: "default" as const },
    { to: "/mess-menu", icon: UtensilsCrossed, label: "Mess Menu", description: "Weekly menu", variant: "default" as const },
    { to: "/lost-found", icon: Search, label: "Lost & Found", description: "Report or find items", variant: "default" as const },
    { to: "/announcements", icon: Bell, label: "Announcements", description: "Hostel notices", badge: "3", variant: "default" as const },
  ];

  const recentAnnouncements = [
    { id: 1, title: "Water supply maintenance in Block B tomorrow", time: "2h ago", important: true },
    { id: 2, title: "Mess timing revised for exam week", time: "5h ago", important: false },
  ];

  // Facilities info
  const facilities = [
    { icon: Droplets, label: "Water Timing", value: "6AM-8AM, 5PM-7PM" },
    { icon: Clock, label: "Laundry", value: "7AM - 8PM Daily" },
  ];

  return (
    <Layout>
      {/* Floating SOS Button */}
      <Link 
        to="/emergency"
        className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-destructive shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
        aria-label="Emergency SOS"
      >
        <AlertTriangle className="w-6 h-6 text-destructive-foreground" />
      </Link>

      {/* Welcome Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">AB</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Hello, Abhi! 👋</h1>
            <p className="text-sm text-muted-foreground">Azad Bhavan B • Room 411, Bed 8</p>
          </div>
        </div>
        <div className="mt-3 px-3 py-2 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">B.Tech CSE</span> • 3rd Year • Parul University
          </p>
        </div>
      </div>

      {/* Quick Access Grid */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <QuickAccessCard key={action.to} {...action} />
          ))}
        </div>
      </section>

      {/* Recent Announcements */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Recent Updates
          </h2>
          <Link to="/announcements" className="text-xs text-primary font-medium hover:underline">
            View All
          </Link>
        </div>
        <div className="space-y-2">
          {recentAnnouncements.map((announcement) => (
            <div 
              key={announcement.id}
              className="bg-card p-4 rounded-xl shadow-card flex items-start gap-3"
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${announcement.important ? "bg-accent" : "bg-muted-foreground"}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{announcement.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{announcement.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Facilities Info */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Facilities Today
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {facilities.map((facility, index) => (
            <div key={index} className="bg-card p-3 rounded-xl shadow-card">
              <div className="flex items-center gap-2 mb-1">
                <facility.icon className="w-4 h-4 text-primary" />
                <p className="text-xs text-muted-foreground">{facility.label}</p>
              </div>
              <p className="text-sm font-medium text-foreground">{facility.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* More Options */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          More Options
        </h2>
        <div className="bg-card rounded-xl shadow-card divide-y divide-border overflow-hidden">
          <Link to="/feedback" className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Feedback & Suggestions</p>
              <p className="text-xs text-muted-foreground">Your voice matters</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link to="/faqs" className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">FAQs</p>
              <p className="text-xs text-muted-foreground">Common hostel questions</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link to="/about" className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">About HostelSphere</p>
              <p className="text-xs text-muted-foreground">A PU Initiative</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
