import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, CheckCheck, FileText, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) setNotifications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();

    if (!user) return;
    const channel = supabase
      .channel("notifications-page")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    const unreadIds = notifications.filter((n) => !n.is_read).map((n) => n.id);
    if (unreadIds.length === 0) return;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .in("id", unreadIds);

    if (!error) {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      toast.success("All notifications marked as read");
    }
  };

  const markOneRead = async (id: string) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
  };

  const getIcon = (type: string) => {
    if (type === "complaint") return <FileText className="w-5 h-5 text-primary" />;
    if (type === "gate_pass") return <ShieldCheck className="w-5 h-5 text-green-500" />;
    return <Bell className="w-5 h-5 text-muted-foreground" />;
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  if (loading) {
    return (
      <Layout title="Notifications" showBack>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Notifications" showBack>
      {notifications.some((n) => !n.is_read) && (
        <Button variant="outline" size="sm" className="mb-4 rounded-xl" onClick={markAllRead}>
          <CheckCheck className="w-4 h-4 mr-1.5" />
          Mark all as read
        </Button>
      )}

      <div className="space-y-3">
        {notifications.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => !n.is_read && markOneRead(n.id)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
              n.is_read
                ? "bg-card border-border/50"
                : "bg-primary/5 border-primary/20 shadow-sm"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getIcon(n.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-foreground">{n.title}</p>
                  {!n.is_read && (
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-[11px] text-muted-foreground/70 mt-1.5 font-medium">{timeAgo(n.created_at)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <Bell className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">No Notifications</h3>
          <p className="text-muted-foreground text-sm">You'll be notified when your complaint or gate pass status changes</p>
        </div>
      )}
    </Layout>
  );
};

export default Notifications;
