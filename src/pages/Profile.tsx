import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Phone, 
  Mail, 
  Calendar, 
  LogOut,
  ChevronRight,
  Settings,
  Bell,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();

  const studentInfo = {
    name: "Abhi",
    enrollmentId: "2303031240145",
    email: "2303031240145@paruluniversity.ac.in",
    phone: "+91 98765 43210",
    room: "411",
    bed: "8",
    block: "Azad Bhavan B",
    floor: "4th Floor",
    program: "B.Tech CSE",
    year: "3rd Year",
    joinDate: "August 2023",
  };

  const menuItems = [
    { icon: Bell, label: "Notifications", desc: "Manage alerts", emoji: "🔔" },
    { icon: Shield, label: "Privacy", desc: "Data settings", emoji: "🔒" },
    { icon: Settings, label: "Settings", desc: "App preferences", emoji: "⚙️" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Layout title="Profile" showBack={false}>
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-3 shadow-glow">
          <span className="text-2xl font-extrabold text-white">AB</span>
        </div>
        <h1 className="text-lg font-bold text-foreground">{studentInfo.name}</h1>
        <p className="text-sm text-muted-foreground font-medium">{studentInfo.program} • {studentInfo.year}</p>
      </motion.div>

      {/* Room Info */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-blue-50 rounded-2xl p-4 mb-4 border border-blue-100"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Accommodation</p>
            <p className="text-base font-bold text-foreground">{studentInfo.block}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-blue-200/50">
          {[
            { label: "Room", value: studentInfo.room },
            { label: "Bed", value: studentInfo.bed },
            { label: "Floor", value: studentInfo.floor },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase">{item.label}</p>
              <p className="text-sm font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl border border-border/60 divide-y divide-border/40 mb-4"
      >
        {[
          { icon: Mail, label: "Email", value: studentInfo.email },
          { icon: Phone, label: "Phone", value: studentInfo.phone },
          { icon: Calendar, label: "Since", value: studentInfo.joinDate },
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

      {/* Menu Items */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border/60 divide-y divide-border/40 mb-5"
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-3 p-3.5 w-full hover:bg-secondary/40 transition-colors group"
          >
            <span className="text-base">{item.emoji}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-all" />
          </button>
        ))}
      </motion.div>

      {/* Logout */}
      <Button 
        variant="destructive" 
        size="lg" 
        className="w-full rounded-xl"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </Button>

      <p className="text-center text-[10px] text-muted-foreground mt-5 font-medium">
        HostelSphere v1.0.0
      </p>
    </Layout>
  );
};

export default Profile;