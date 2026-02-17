import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import { Link } from "react-router-dom";
import { Plus, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const complaints = [
  {
    id: "PU-HST-2026-0042",
    category: "Room & Maintenance",
    title: "Ceiling fan not working in Room 411",
    status: "pending" as const,
    date: "Jan 2, 2026",
    location: "Azad Bhavan B, Room 411",
    timeline: [
      { status: "Submitted", time: "Jan 2, 10:30 AM", completed: true },
    ],
  },
  {
    id: "PU-HST-2026-0038",
    category: "Cleanliness",
    title: "Washroom cleaning overdue - 4th Floor",
    status: "in-progress" as const,
    date: "Dec 28, 2025",
    location: "Azad Bhavan B, 4th Floor Common",
    timeline: [
      { status: "Submitted", time: "Dec 28, 2:15 PM", completed: true },
      { status: "Reviewed by Warden", time: "Dec 29, 9:00 AM", completed: true },
      { status: "Assigned to Staff", time: "Dec 30, 11:00 AM", completed: true },
    ],
  },
  {
    id: "PU-HST-2025-0031",
    category: "Mess Related",
    title: "Quality issue with dinner dal",
    status: "resolved" as const,
    date: "Dec 20, 2025",
    location: "Azad Bhavan Mess",
    timeline: [
      { status: "Submitted", time: "Dec 20, 8:45 PM", completed: true },
      { status: "Mess In-charge Notified", time: "Dec 21, 10:00 AM", completed: true },
      { status: "Resolved", time: "Dec 22, 3:00 PM", completed: true },
    ],
  },
];

const ComplaintStatus = () => {
  return (
    <Layout title="My Complaints" showBack>
      <Link to="/complaints/new">
        <Button className="w-full mb-6 rounded-xl gradient-primary shadow-glow" size="lg">
          <Plus className="w-5 h-5" />
          File New Complaint
        </Button>
      </Link>

      <div className="space-y-4">
        {complaints.map((complaint, index) => (
          <motion.div 
            key={complaint.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden"
          >
            <div className="p-4 border-b border-border/50">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">{complaint.id}</p>
                  <p className="text-sm font-bold text-foreground mt-1">{complaint.title}</p>
                </div>
                <StatusBadge status={complaint.status} />
              </div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-[11px] px-2.5 py-1 bg-secondary/80 rounded-full text-muted-foreground font-semibold">
                  {complaint.category}
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">{complaint.date}</span>
              </div>
              <p className="text-xs text-primary mt-2 font-medium">📍 {complaint.location}</p>
            </div>

            <div className="p-4 bg-secondary/20">
              <div className="space-y-3">
                {complaint.timeline.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.completed 
                        ? complaint.status === "resolved" && stepIndex === complaint.timeline.length - 1
                          ? "gradient-success"
                          : "gradient-primary"
                        : "bg-muted"
                    }`}>
                      {step.completed ? (
                        stepIndex === complaint.timeline.length - 1 && complaint.status === "resolved" ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-white" />
                        )
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.status}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-medium">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {complaints.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">No Complaints Yet</h3>
          <p className="text-muted-foreground text-sm mb-6">
            You haven't filed any complaints yet
          </p>
          <Link to="/complaints/new">
            <Button className="rounded-xl">File Your First Complaint</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default ComplaintStatus;
