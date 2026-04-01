import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { CheckCircle2, Clock, CreditCard, Calendar, Download, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface FeeRecord {
  id: string;
  semester: string;
  amount: number;
  due_date: string | null;
  paid_date: string | null;
  status: string;
  transaction_id: string | null;
  breakdown: any;
}

const FeeStatus = () => {
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const staticFees: FeeRecord[] = [
    { id: "sf1", semester: "Semester 6 – Spring 2026", amount: 87500, due_date: "2026-04-30", paid_date: null, status: "pending", transaction_id: null, breakdown: [{ item: "Tuition Fee", amount: 52000 }, { item: "Hostel Fee", amount: 24000 }, { item: "Mess Charges", amount: 8500 }, { item: "Library & Lab", amount: 3000 }] },
    { id: "sf2", semester: "Semester 5 – Fall 2025", amount: 85000, due_date: "2025-10-15", paid_date: "2025-10-12", status: "paid", transaction_id: "TXN-2025-98234", breakdown: [{ item: "Tuition Fee", amount: 50000 }, { item: "Hostel Fee", amount: 24000 }, { item: "Mess Charges", amount: 8000 }, { item: "Library & Lab", amount: 3000 }] },
    { id: "sf3", semester: "Semester 4 – Spring 2025", amount: 82000, due_date: "2025-04-15", paid_date: "2025-04-10", status: "paid", transaction_id: "TXN-2025-45612", breakdown: [{ item: "Tuition Fee", amount: 48000 }, { item: "Hostel Fee", amount: 23000 }, { item: "Mess Charges", amount: 8000 }, { item: "Library & Lab", amount: 3000 }] },
  ];

  useEffect(() => {
    const fetchFees = async () => {
      const { data, error } = await supabase
        .from("fee_records")
        .select("*")
        .order("created_at", { ascending: false });
      setFeeRecords(!error && data && data.length > 0 ? data : staticFees);
      setLoading(false);
    };
    fetchFees();
  }, []);

  const pendingFees = feeRecords.filter(f => f.status === "pending");
  const totalPending = pendingFees.reduce((sum, f) => sum + Number(f.amount), 0);

  if (loading) {
    return (
      <Layout title="Fee Status" showBack>
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </Layout>
    );
  }

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
        </motion.div>
      )}

      {feeRecords.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm py-12">No fee records found</p>
      ) : (
        <div className="space-y-4">
          {feeRecords.map((record, index) => {
            const breakdown = Array.isArray(record.breakdown) ? record.breakdown : [];
            return (
              <motion.div key={record.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
                className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
                <div className="p-4 border-b border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-foreground">{record.semester}</h3>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${record.status === "paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                      {record.status === "paid" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {record.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </div>
                  <p className="text-2xl font-extrabold text-foreground">₹{Number(record.amount).toLocaleString()}</p>
                </div>
                <div className="p-4 bg-secondary/20">
                  {breakdown.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {breakdown.map((item: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground font-medium">{item.item}</span>
                          <span className="font-bold text-foreground">₹{Number(item.amount).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                      <Calendar className="w-4 h-4" />
                      {record.status === "paid" ? <span>Paid on {record.paid_date}</span> : <span>Due by {record.due_date}</span>}
                    </div>
                    {record.transaction_id && (
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] text-muted-foreground font-medium">Transaction: {record.transaction_id}</span>
                        <button className="text-[11px] text-primary font-bold hover:underline flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" />Receipt
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/15">
        <p className="text-sm text-foreground font-bold mb-1">Payment Information</p>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">For payment queries, contact hostel accounts office (9 AM - 5 PM).</p>
      </div>
    </Layout>
  );
};

export default FeeStatus;
