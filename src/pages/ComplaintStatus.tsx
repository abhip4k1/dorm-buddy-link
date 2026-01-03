import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import { Link } from "react-router-dom";
import { Plus, ChevronRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const complaints = [
  {
    id: "CMP-2024-0042",
    category: "Maintenance",
    title: "Broken ceiling fan in room 204",
    status: "pending" as const,
    date: "Jan 2, 2024",
    timeline: [
      { status: "Submitted", time: "Jan 2, 10:30 AM", completed: true },
    ],
  },
  {
    id: "CMP-2024-0038",
    category: "Hygiene",
    title: "Washroom cleaning issue in Block A",
    status: "in-progress" as const,
    date: "Dec 28, 2023",
    timeline: [
      { status: "Submitted", time: "Dec 28, 2:15 PM", completed: true },
      { status: "Reviewed", time: "Dec 29, 9:00 AM", completed: true },
      { status: "In Progress", time: "Dec 30, 11:00 AM", completed: true },
    ],
  },
  {
    id: "CMP-2024-0031",
    category: "Mess",
    title: "Quality concern with dinner items",
    status: "resolved" as const,
    date: "Dec 20, 2023",
    timeline: [
      { status: "Submitted", time: "Dec 20, 8:45 PM", completed: true },
      { status: "Reviewed", time: "Dec 21, 10:00 AM", completed: true },
      { status: "Resolved", time: "Dec 22, 3:00 PM", completed: true },
    ],
  },
];

const ComplaintStatus = () => {
  return (
    <Layout title="My Complaints" showBack>
      {/* New Complaint Button */}
      <Link to="/complaints/new">
        <Button className="w-full mb-6" size="lg">
          <Plus className="w-5 h-5" />
          File New Complaint
        </Button>
      </Link>

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.map((complaint, index) => (
          <div 
            key={complaint.id}
            className="bg-card rounded-xl shadow-card overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs text-muted-foreground">{complaint.id}</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{complaint.title}</p>
                </div>
                <StatusBadge status={complaint.status} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                  {complaint.category}
                </span>
                <span className="text-xs text-muted-foreground">{complaint.date}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-4 bg-secondary/30">
              <div className="space-y-3">
                {complaint.timeline.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.completed 
                        ? complaint.status === "resolved" && stepIndex === complaint.timeline.length - 1
                          ? "bg-success text-success-foreground"
                          : "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {step.completed ? (
                        stepIndex === complaint.timeline.length - 1 && complaint.status === "resolved" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.status}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no complaints) */}
      {complaints.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Complaints Yet</h3>
          <p className="text-muted-foreground text-sm mb-6">
            You haven't filed any complaints yet
          </p>
          <Link to="/complaints/new">
            <Button>File Your First Complaint</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default ComplaintStatus;
