import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  User, 
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
      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
          <span className="text-3xl font-bold text-primary-foreground">AB</span>
        </div>
        <h1 className="text-xl font-bold text-foreground">{studentInfo.name}</h1>
        <p className="text-sm text-muted-foreground">{studentInfo.program} • {studentInfo.year}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {studentInfo.enrollmentId}@paruluniversity.ac.in
        </p>
      </div>

      {/* Room Info Card */}
      <div className="bg-card rounded-xl shadow-card p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
            <Building2 className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Accommodation</p>
            <p className="text-lg font-bold text-foreground">
              {studentInfo.block}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Room</p>
            <p className="text-sm font-medium text-foreground">{studentInfo.room}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Bed</p>
            <p className="text-sm font-medium text-foreground">{studentInfo.bed}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Floor</p>
            <p className="text-sm font-medium text-foreground">{studentInfo.floor}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">Member Since</p>
          <p className="text-sm font-medium text-foreground">{studentInfo.joinDate}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-card rounded-xl shadow-card divide-y divide-border mb-6">
        <div className="flex items-center gap-4 p-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium text-foreground truncate">{studentInfo.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm font-medium text-foreground">{studentInfo.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Member Since</p>
            <p className="text-sm font-medium text-foreground">{studentInfo.joinDate}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-card rounded-xl shadow-card divide-y divide-border mb-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-4 p-4 w-full hover:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <item.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <Button 
        variant="destructive" 
        size="lg" 
        className="w-full"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </Button>

      {/* App Version */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        HostelSphere v1.0.0
      </p>
    </Layout>
  );
};

export default Profile;
