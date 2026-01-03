interface StatusBadgeProps {
  status: "pending" | "in-progress" | "resolved" | "approved" | "rejected";
  size?: "sm" | "md";
}

const statusStyles = {
  pending: "bg-warning/10 text-warning border-warning/20",
  "in-progress": "bg-pending/10 text-pending border-pending/20",
  resolved: "bg-success/10 text-success border-success/20",
  approved: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels = {
  pending: "Pending",
  "in-progress": "In Progress",
  resolved: "Resolved",
  approved: "Approved",
  rejected: "Rejected",
};

const StatusBadge = ({ status, size = "sm" }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center font-medium border rounded-full ${statusStyles[status]} ${
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === "pending" ? "bg-warning" :
        status === "in-progress" ? "bg-pending" :
        status === "resolved" || status === "approved" ? "bg-success" :
        "bg-destructive"
      }`} />
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;
