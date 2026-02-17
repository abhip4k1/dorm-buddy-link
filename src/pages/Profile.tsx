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
    { icon: Bell, label: "Notifications", desc: "Manage alerts" },
    { icon: Shield, label: "Privacy", desc: "Data settings" },
    { icon: Settings, label: "Settings", desc: "App preferences" },
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
        className="text-center mb-7"
      >
        <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
          <span className="text-3xl font-extrabold text-white">AB</span>
        </div>
        <h1 className="text-xl font-bold text-foreground">{studentInfo.name}</h1>
        <p className="text-sm text-muted-foreground font-medium">{studentInfo.program} • {studentInfo.year}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {studentInfo.enrollmentId}@paruluniversity.ac.in
        </p>
      </motion.div>

      {/* Room Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl shadow-card border border-border/50 p-5 mb-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
            <Building2 className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Current Accommodation</p>
            <p className="text-lg font-bold text-foreground">{studentInfo.block}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          {[
            { label: "Room", value: studentInfo.room },
            { label: "Bed", value: studentInfo.bed },
            { label: "Floor", value: studentInfo.floor },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-bold text-foreground mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Member Since</p>
          <p className="text-sm font-bold text-foreground mt-0.5">{studentInfo.joinDate}</p>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl shadow-card border border-border/50 divide-y divide-border/50 mb-5"
      >
        {[
          { icon: Mail, label: "Email", value: studentInfo.email },
          { icon: Phone, label: "Phone", value: studentInfo.phone },
          { icon: Calendar, label: "Member Since", value: studentInfo.joinDate },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-semibold text-foreground truncate mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Menu Items */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl shadow-card border border-border/50 divide-y divide-border/50 mb-6"
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-4 p-4 w-full hover:bg-secondary/50 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center group-hover:bg-primary/8 transition-colors">
              <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground font-medium">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </motion.div>

      {/* Logout Button */}
      <Button 
        variant="destructive" 
        size="lg" 
        className="w-full rounded-xl"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </Button>

      <p className="text-center text-[10px] text-muted-foreground mt-6 font-medium">
        HostelSphere v1.0.0
      </p>
    </Layout>
  );
};

export default Profile;
