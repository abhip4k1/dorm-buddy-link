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

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setAnnouncements(data);
      setLoading(false);
    };
    fetch();
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
