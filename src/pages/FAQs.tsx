import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    category: "General",
    questions: [
      { q: "What are the hostel entry timings at Parul University?", a: "Hostel entry time is 9:00 PM on weekdays and 10:30 PM on weekends. Gate closes at 11:00 PM. Late entry requires prior approval from the Azad Bhawan warden via HostelSphere app." },
      { q: "How do I apply for a room/bed change?", a: "Submit a room change request through HostelSphere → File Complaint → Other. Include your current and preferred room details. The warden reviews requests within 7 working days." },
      { q: "What items are prohibited in Parul University hostels?", a: "Prohibited: heaters, irons, hot plates, alcohol, tobacco, pets, weapons, and loud speakers. Violations reported to the PU Discipline Committee." },
    ],
  },
  {
    category: "Mess & Dining",
    questions: [
      { q: "Can I skip meals and get a refund?", a: "Mess fees are fixed per semester at Parul University. For leaves exceeding 15 days, apply for rebate at the Azad Bhawan hostel office before departure with gate pass proof." },
      { q: "What if I have dietary restrictions?", a: "Inform the Azad Bhavan mess in-charge. Both veg and non-veg options available. For medical dietary needs, submit a doctor's certificate." },
      { q: "Can guests eat at the mess?", a: "Yes, guest meal coupons available at hostel office: Breakfast ₹50, Lunch ₹80, Dinner ₹80." },
    ],
  },
  {
    category: "Fees & Payments",
    questions: [
      { q: "What are the PU hostel fee deadlines?", a: "Hostel fees due within 15 days of each semester start. Pay at PU Accounts Office, Admin Block. Late fee: ₹100/day." },
      { q: "Is the security deposit refundable?", a: "Yes, ₹5000 security deposit is fully refundable upon checkout, subject to no dues and room inspection." },
    ],
  },
  {
    category: "Facilities",
    questions: [
      { q: "What are the laundry timings?", a: "Laundry room: 7 AM - 8 PM daily. Washing machines on first-come basis. ₹20 per wash." },
      { q: "How do I report maintenance issues?", a: "Use HostelSphere → File Complaint → Room & Maintenance. Upload photo proof for faster resolution." },
      { q: "What are the water supply timings?", a: "Hot water: 6-8 AM (winter only). Cold water: 24/7. Water tank refill: 6 AM & 5 PM." },
      { q: "Is WiFi available in PU hostel rooms?", a: "Yes, 100 Mbps WiFi (SSID: PU-Student) in all rooms. Login: your enrollment ID (e.g. 2303031240145). Password: DOB (DDMMYYYY). Contact IT Helpdesk at Admin Block for issues." },
    ],
  },
  {
    category: "Leave & Gate Pass",
    questions: [
      { q: "How far in advance should I apply for gate pass?", a: "Apply at least 24 hours before. Emergency leaves require direct warden approval." },
      { q: "Can I extend my gate pass?", a: "Yes, request extension via HostelSphere app or call hostel office. Warden approval required." },
    ],
  },
];

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <Layout title="FAQs" showBack>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4">
          <HelpCircle className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-1">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          Find answers to common hostel-related queries
        </p>
      </motion.div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 h-12 bg-secondary/60 border border-border/80 rounded-xl focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="space-y-5">
        {filteredFaqs.map((category, categoryIndex) => (
          <motion.div 
            key={category.category} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.08 }}
          >
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
              {category.category}
            </h3>
            <Accordion type="single" collapsible className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
              {category.questions.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`${category.category}-${index}`}
                  className="border-b border-border/50 last:border-0"
                >
                  <AccordionTrigger className="px-4 py-4 text-left hover:no-underline hover:bg-secondary/30 transition-colors">
                    <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground font-medium">No FAQs found matching your search</p>
        </div>
      )}

      <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/15 text-center">
        <p className="text-sm text-foreground font-bold mb-1">Still have questions?</p>
        <p className="text-xs text-muted-foreground mb-3 font-medium">Contact Azad Bhavan hostel office</p>
        <a href="mailto:hostel@paruluniversity.ac.in" className="text-sm text-primary font-semibold hover:underline">
          hostel@paruluniversity.ac.in
        </a>
      </div>
    </Layout>
  );
};

export default FAQs;
