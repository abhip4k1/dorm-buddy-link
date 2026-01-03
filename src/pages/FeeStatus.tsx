import Layout from "@/components/Layout";
import { CheckCircle2, Clock, CreditCard, Calendar, Download } from "lucide-react";

const feeRecords = [
  {
    id: 1,
    semester: "Spring 2024",
    amount: 45000,
    dueDate: "Jan 15, 2024",
    status: "pending",
    breakdown: [
      { item: "Hostel Fee", amount: 30000 },
      { item: "Mess Fee", amount: 12000 },
      { item: "Maintenance", amount: 3000 },
    ],
  },
  {
    id: 2,
    semester: "Fall 2023",
    amount: 45000,
    paidDate: "Aug 10, 2023",
    status: "paid",
    transactionId: "TXN-2023-0847",
    breakdown: [
      { item: "Hostel Fee", amount: 30000 },
      { item: "Mess Fee", amount: 12000 },
      { item: "Maintenance", amount: 3000 },
    ],
  },
  {
    id: 3,
    semester: "Spring 2023",
    amount: 42000,
    paidDate: "Jan 12, 2023",
    status: "paid",
    transactionId: "TXN-2023-0124",
    breakdown: [
      { item: "Hostel Fee", amount: 28000 },
      { item: "Mess Fee", amount: 11000 },
      { item: "Maintenance", amount: 3000 },
    ],
  },
];

const FeeStatus = () => {
  const pendingFees = feeRecords.filter(f => f.status === "pending");
  const totalPending = pendingFees.reduce((sum, f) => sum + f.amount, 0);

  return (
    <Layout title="Fee Status" showBack>
      {/* Summary Card */}
      {pendingFees.length > 0 && (
        <div className="gradient-warning rounded-xl p-5 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-warning-foreground/80 text-sm mb-1">Total Pending</p>
              <p className="text-3xl font-bold text-warning-foreground">
                ₹{totalPending.toLocaleString()}
              </p>
            </div>
            <div className="w-14 h-14 rounded-full bg-warning-foreground/20 flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-warning-foreground" />
            </div>
          </div>
          <p className="text-warning-foreground/70 text-xs mt-3">
            Due by Jan 15, 2024 • Contact accounts for payment
          </p>
        </div>
      )}

      {/* Fee Records */}
      <div className="space-y-4">
        {feeRecords.map((record, index) => (
          <div 
            key={record.id}
            className="bg-card rounded-xl shadow-card overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{record.semester}</h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  record.status === "paid" 
                    ? "bg-success/10 text-success" 
                    : "bg-warning/10 text-warning"
                }`}>
                  {record.status === "paid" ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                  {record.status === "paid" ? "Paid" : "Pending"}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                ₹{record.amount.toLocaleString()}
              </p>
            </div>

            {/* Details */}
            <div className="p-4 bg-secondary/30">
              <div className="space-y-2 mb-4">
                {record.breakdown.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.item}</span>
                    <span className="font-medium text-foreground">₹{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {record.status === "paid" ? (
                    <span>Paid on {record.paidDate}</span>
                  ) : (
                    <span>Due by {record.dueDate}</span>
                  )}
                </div>
                {record.transactionId && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      Transaction: {record.transactionId}
                    </span>
                    <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      Receipt
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Notice */}
      <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p className="text-sm text-foreground font-medium mb-1">Payment Information</p>
        <p className="text-xs text-muted-foreground">
          For payment queries or issues, please contact the hostel accounts office during working hours (9 AM - 5 PM).
        </p>
      </div>
    </Layout>
  );
};

export default FeeStatus;
