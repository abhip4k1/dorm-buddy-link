import Layout from "@/components/Layout";
import { AlertTriangle, Bell, Calendar, Megaphone } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Water Supply Maintenance Tomorrow",
    content: "Water supply will be interrupted from 10 AM to 2 PM tomorrow for maintenance work. Please store water accordingly.",
    date: "Jan 3, 2024",
    time: "2 hours ago",
    important: true,
    category: "maintenance",
  },
  {
    id: 2,
    title: "Mess Timing Changes for Weekends",
    content: "Starting this weekend, mess timings will be: Breakfast 8:30-10:00 AM, Lunch 12:30-2:30 PM, Dinner 7:30-9:30 PM.",
    date: "Jan 2, 2024",
    time: "5 hours ago",
    important: false,
    category: "mess",
  },
  {
    id: 3,
    title: "Annual Hostel Day Celebration",
    content: "Hostel Day will be celebrated on January 15th. All students are requested to participate in the cultural activities. Registration forms available at the hostel office.",
    date: "Jan 1, 2024",
    time: "1 day ago",
    important: true,
    category: "event",
  },
  {
    id: 4,
    title: "WiFi Maintenance Scheduled",
    content: "WiFi services will undergo maintenance on January 7th from 2 AM to 6 AM. Limited connectivity expected during this period.",
    date: "Dec 30, 2023",
    time: "4 days ago",
    important: false,
    category: "maintenance",
  },
  {
    id: 5,
    title: "Room Inspection Next Week",
    content: "Routine room inspection will be conducted from January 8-10. Please ensure your rooms are clean and well-maintained.",
    date: "Dec 28, 2023",
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
