import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { AlertTriangle, Bell, Calendar, Megaphone, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  is_important: boolean;
  created_at: string;
}

const categoryIcons: Record<string, any> = {
  maintenance: Bell,
  mess: Bell,
  event: Megaphone,
  general: Bell,
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const staticAnnouncements: Announcement[] = [
    { id: "sa1", title: "Water Supply Interruption – Azad Bhawan Floor 3 & 4", content: "Due to plumbing maintenance in Azad Bhawan, water supply on floors 3 and 4 will be interrupted from 10 AM to 2 PM on Wednesday. Please store water in advance. Contact warden office for urgent needs.", category: "maintenance", is_important: true, created_at: new Date().toISOString() },
    { id: "sa2", title: "PU Parivartan 2026 – Cultural Fest Registrations Open!", content: "Registrations for Parul University's annual cultural fest 'Parivartan 2026' are now open. Events include dance, music, drama, art, and literary competitions. Register at Limda Ground stall or via PU app before April 10.", category: "event", is_important: false, created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: "sa3", title: "Azad Bhawan Mess – Gujarati Thali Added on Thursdays", content: "Based on student feedback, the Azad Bhawan mess has introduced a special Gujarati thali every Thursday including undhiyu, thepla, dal dhokli, and shrikhand. Check the Mess Menu section for the full updated menu.", category: "mess", is_important: false, created_at: new Date(Date.now() - 172800000).toISOString() },
    { id: "sa4", title: "PU Campus Wi-Fi Maintenance – Saturday Night", content: "Parul University campus Wi-Fi (SSID: PU-Student) will undergo scheduled maintenance on Saturday from 12 AM to 6 AM. Please plan downloads accordingly. Mobile data backup recommended.", category: "maintenance", is_important: true, created_at: new Date(Date.now() - 259200000).toISOString() },
    { id: "sa5", title: "Hostel Fee Deadline – Semester 6 (Parul University)", content: "Last date to pay hostel fees for Semester 6 at Parul University is April 30, 2026. Pay via PU student portal or at the Accounts Office, Admin Block. Late payments will incur a fine of ₹500/day.", category: "general", is_important: false, created_at: new Date(Date.now() - 345600000).toISOString() },
  ];

  useEffect(() => {
    const fetchAnn = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });
      setAnnouncements(!error && data && data.length > 0 ? data : staticAnnouncements);
      setLoading(false);
    };
    fetchAnn();
  }, []);

  if (loading) {
    return (
      <Layout title="Announcements" showBack>
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </Layout>
    );
  }

  const importantCount = announcements.filter(a => a.is_important).length;

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <Layout title="Announcements" showBack>
      {importantCount > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="gradient-warning rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white text-sm">Important Updates</p>
            <p className="text-white/70 text-xs mt-0.5 font-medium">{importantCount} important notice(s) require your attention</p>
          </div>
        </motion.div>
      )}

      {announcements.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm py-12">No announcements yet</p>
      ) : (
        <div className="space-y-3.5">
          {announcements.map((announcement, index) => {
            const Icon = categoryIcons[announcement.category] || Bell;
            return (
              <motion.div key={announcement.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}
                className={`bg-card rounded-2xl shadow-card border overflow-hidden ${announcement.is_important ? "border-accent/30" : "border-border/50"}`}>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${announcement.is_important ? "gradient-accent" : "bg-primary/8"}`}>
                      {announcement.is_important ? <AlertTriangle className="w-5 h-5 text-white" /> : <Icon className="w-5 h-5 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-foreground text-sm leading-snug">{announcement.title}</h3>
                        {announcement.is_important && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full gradient-accent text-white flex-shrink-0">Important</span>}
                      </div>
                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{announcement.content}</p>
                      <div className="flex items-center gap-2 mt-3 text-[11px] text-muted-foreground font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
                        <span className="text-border">•</span>
                        <span>{timeAgo(announcement.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default Announcements;
