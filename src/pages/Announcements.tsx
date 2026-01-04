import Layout from "@/components/Layout";
import { AlertTriangle, Bell, Calendar, Megaphone } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Water Supply Maintenance - Azad Bhavan B",
    content: "Water supply will be interrupted from 10 AM to 2 PM tomorrow for tank cleaning. Please store water accordingly. Contact hostel office for emergencies.",
    date: "Jan 3, 2026",
    time: "2 hours ago",
    important: true,
    category: "maintenance",
  },
  {
    id: 2,
    title: "End-Semester Exam Week Mess Timing",
    content: "During exam week (Jan 6-15), mess timings extended: Breakfast 7:00-10:00 AM, Lunch 12:00-3:00 PM, Dinner 7:00-10:00 PM. Night canteen open till 1 AM.",
    date: "Jan 2, 2026",
    time: "5 hours ago",
    important: false,
    category: "mess",
  },
  {
    id: 3,
    title: "Parul Hostel Sports Week 2026",
    content: "Annual Hostel Sports Week starts January 20th. Register for cricket, football, badminton, and indoor games at the hostel office by Jan 10th. Exciting prizes await!",
    date: "Jan 1, 2026",
    time: "1 day ago",
    important: true,
    category: "event",
  },
  {
    id: 4,
    title: "Campus WiFi Upgrade",
    content: "High-speed WiFi upgrade in all Azad Bhavan blocks. Maintenance scheduled Jan 7th, 2-6 AM. New speeds up to 100 Mbps per room.",
    date: "Dec 30, 2025",
    time: "4 days ago",
    important: false,
    category: "maintenance",
  },
  {
    id: 5,
    title: "Room Inspection - 4th Floor",
    content: "Routine room inspection for Azad Bhavan B, 4th Floor on January 8th. Ensure rooms are clean and no prohibited items are present. Warden will accompany.",
    date: "Dec 28, 2025",
    time: "6 days ago",
    important: false,
    category: "general",
  },
];

const categoryIcons = {
  maintenance: Bell,
  mess: Bell,
  event: Megaphone,
  general: Bell,
};

const Announcements = () => {
  return (
    <Layout title="Announcements" showBack>
      {/* Important Banner */}
      {announcements.some(a => a.important) && (
        <div className="gradient-warning rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-warning-foreground text-sm">Important Updates</p>
            <p className="text-warning-foreground/80 text-xs mt-1">
              {announcements.filter(a => a.important).length} important notice(s) require your attention
            </p>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement, index) => {
          const Icon = categoryIcons[announcement.category as keyof typeof categoryIcons] || Bell;
          
          return (
            <div 
              key={announcement.id}
              className={`bg-card rounded-xl shadow-card overflow-hidden animate-fade-in ${
                announcement.important ? "ring-2 ring-accent/50" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    announcement.important 
                      ? "gradient-accent" 
                      : "bg-primary/10"
                  }`}>
                    {announcement.important ? (
                      <AlertTriangle className="w-5 h-5 text-accent-foreground" />
                    ) : (
                      <Icon className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground text-sm">
                        {announcement.title}
                      </h3>
                      {announcement.important && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full gradient-accent text-accent-foreground flex-shrink-0">
                          Important
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                      {announcement.content}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{announcement.date}</span>
                      <span className="text-border">•</span>
                      <span>{announcement.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Announcements;
