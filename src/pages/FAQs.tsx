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

const faqs = [
  {
    category: "Parul University Hostel - General",
    questions: [
      {
        q: "What are the hostel entry timings at PU?",
        a: "Hostel entry time is 9:00 PM on weekdays and 10:30 PM on weekends. Gate closes at 11:00 PM. Late entry requires prior approval from the warden via HostelSphere app.",
      },
      {
        q: "How do I apply for a room/bed change?",
        a: "Submit a room change request through HostelSphere → File Complaint → Other. Include your current and preferred room details. The warden reviews requests within 7 working days.",
      },
      {
        q: "What items are prohibited in PU hostels?",
        a: "Prohibited: heaters, irons, hot plates, alcohol, tobacco, pets, weapons, and loud speakers. Refer to the PU Hostel Handbook provided at admission for the complete list.",
      },
    ],
  },
  {
    category: "Mess & Dining",
    questions: [
      {
        q: "Can I skip meals and get a refund?",
        a: "Mess fees are fixed per semester. For leaves exceeding 15 days, apply for rebate at hostel office before departure with gate pass proof. Partial refunds processed within 30 days.",
      },
      {
        q: "What if I have dietary restrictions?",
        a: "Inform the Azad Bhavan mess in-charge. Both veg and non-veg options available. For medical dietary needs, submit a doctor's certificate to the hostel office.",
      },
      {
        q: "Can guests eat at the mess?",
        a: "Yes, guest meal coupons available at hostel office: Breakfast ₹50, Lunch ₹80, Dinner ₹80. Guests must sign the visitor register.",
      },
    ],
  },
  {
    category: "Fees & Payments",
    questions: [
      {
        q: "What are the hostel fee deadlines?",
        a: "Hostel fees due within 15 days of each semester start. Late fee: ₹100/day. Pay online via PU student portal or at the university accounts office.",
      },
      {
        q: "Is the security deposit refundable?",
        a: "Yes, ₹5000 security deposit is fully refundable upon checkout, subject to no dues and room inspection. Refunds processed within 30-45 days to registered bank account.",
      },
    ],
  },
  {
    category: "Facilities at Azad Bhavan",
    questions: [
      {
        q: "What are the laundry timings?",
        a: "Laundry room: 7 AM - 8 PM daily. Washing machines available on first-come basis. ₹20 per wash. Iron available at common room, ₹10 per use.",
      },
      {
        q: "How do I report maintenance issues?",
        a: "Use HostelSphere → File Complaint → Room & Maintenance. Upload photo proof for faster resolution. Urgent issues: call hostel office at +91 265 2395555.",
      },
      {
        q: "What are the water supply timings?",
        a: "Hot water: 6-8 AM (winter only). Cold water: 24/7. Water tank refill: 6 AM & 5 PM. Store water during maintenance announcements.",
      },
      {
        q: "Is WiFi available in rooms?",
        a: "Yes, 100 Mbps WiFi in all rooms. Login: enrollment ID. Password: DOB (DDMMYYYY). Issues? Contact IT helpdesk or report via HostelSphere.",
      },
    ],
  },
  {
    category: "Leave & Gate Pass",
    questions: [
      {
        q: "How far in advance should I apply for gate pass?",
        a: "Apply at least 24 hours before. Emergency leaves require direct warden approval. Parents receive SMS notification upon gate pass approval.",
      },
      {
        q: "Can I extend my gate pass?",
        a: "Yes, request extension via HostelSphere app or call hostel office. Warden approval required. Unapproved overstays attract disciplinary action.",
      },
    ],
  },
];

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <Layout title="FAQs" showBack>
      <div className="mb-6">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4">
          <HelpCircle className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-muted-foreground">
          Find answers to common hostel-related queries
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 bg-secondary border-0 focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {filteredFaqs.map((category, categoryIndex) => (
          <div key={category.category} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {category.category}
            </h3>
            <Accordion type="single" collapsible className="bg-card rounded-xl shadow-card overflow-hidden">
              {category.questions.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`${category.category}-${index}`}
                  className="border-b border-border last:border-0"
                >
                  <AccordionTrigger className="px-4 py-4 text-left hover:no-underline hover:bg-secondary/50 transition-colors">
                    <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No FAQs found matching your search</p>
        </div>
      )}

      {/* Contact Support */}
      <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20 text-center">
        <p className="text-sm text-foreground font-medium mb-1">Still have questions?</p>
        <p className="text-xs text-muted-foreground mb-3">
          Contact Azad Bhavan hostel office
        </p>
        <a 
          href="mailto:hostel@paruluniversity.ac.in" 
          className="text-sm text-primary font-medium hover:underline"
        >
          hostel@paruluniversity.ac.in
        </a>
        <p className="text-xs text-muted-foreground mt-2">
          Office: +91 265 2395555 • Mon-Sat, 9AM-5PM
        </p>
      </div>
    </Layout>
  );
};

export default FAQs;
