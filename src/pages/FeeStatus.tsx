import Layout from "@/components/Layout";
import { CheckCircle2, Clock, CreditCard, Calendar, Download } from "lucide-react";
import { motion } from "framer-motion";

const feeRecords = [
  {
    id: 1, semester: "Spring 2024", amount: 45000, dueDate: "Jan 15, 2024", status: "pending",
    breakdown: [{ item: "Hostel Fee", amount: 30000 }, { item: "Mess Fee", amount: 12000 }, { item: "Maintenance", amount: 3000 }],
  },
  {
    id: 2, semester: "Fall 2023", amount: 45000, paidDate: "Aug 10, 2023", status: "paid", transactionId: "TXN-2023-0847",
    breakdown: [{ item: "Hostel Fee", amount: 30000 }, { item: "Mess Fee", amount: 12000 }, { item: "Maintenance", amount: 3000 }],
  },
  {
    id: 3, semester: "Spring 2023", amount: 42000, paidDate: "Jan 12, 2023", status: "paid", transactionId: "TXN-2023-0124",
    breakdown: [{ item: "Hostel Fee", amount: 28000 }, { item: "Mess Fee", amount: 11000 }, { item: "Maintenance", amount: 3000 }],
  },
];

const FeeStatus = () => {
  const pendingFees = feeRecords.filter(f => f.status === "pending");
  const totalPending = pendingFees.reduce((sum, f) => sum + f.amount, 0);

  return (
    <Layout title="Fee Status" showBack>
      {pendingFees.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="gradient-warning rounded-2xl p-5 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Total Pending</p>
              <p className="text-3xl font-extrabold text-white">₹{totalPending.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
          </div>
          <p className="text-white/60 text-xs mt-3 font-medium">Due by Jan 15, 2024 • Contact accounts for payment</p>
        </motion.div>
      )}

      <div className="space-y-4">
        {feeRecords.map((record, index) => (
          <motion.div 
            key={record.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden"
          >
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-foreground">{record.semester}</h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  record.status === "paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                }`}>
                  {record.status === "paid" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  {record.status === "paid" ? "Paid" : "Pending"}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-foreground">₹{record.amount.toLocaleString()}</p>
            </div>

            <div className="p-4 bg-secondary/20">
              <div className="space-y-2 mb-4">
                {record.breakdown.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">{item.item}</span>
                    <span className="font-bold text-foreground">₹{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <Calendar className="w-4 h-4" />
                  {record.status === "paid" ? <span>Paid on {record.paidDate}</span> : <span>Due by {record.dueDate}</span>}
                </div>
                {record.transactionId && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-muted-foreground font-medium">Transaction: {record.transactionId}</span>
                    <button className="text-[11px] text-primary font-bold hover:underline flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />Receipt
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/15">
        <p className="text-sm text-foreground font-bold mb-1">Payment Information</p>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
          For payment queries, contact hostel accounts office (9 AM - 5 PM).
        </p>
      </div>
    </Layout>
  );
};

export default FeeStatus;
