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
    category: "General",
    questions: [
      {
        q: "What are the hostel timings?",
        a: "The hostel entry time is 9:00 PM on weekdays and 10:00 PM on weekends. Special permissions are required for late entries. The main gate closes at 11:00 PM.",
      },
      {
        q: "How do I apply for a room change?",
        a: "Submit a room change request through the hostel office during office hours (9 AM - 5 PM). You'll need to fill out a form stating the reason for the change. Requests are processed within 7 working days.",
      },
      {
        q: "What items are prohibited in the hostel?",
        a: "Prohibited items include electrical appliances like heaters and irons, alcoholic beverages, tobacco products, pets, and any hazardous materials. Please refer to the hostel handbook for a complete list.",
      },
    ],
  },
  {
    category: "Mess & Dining",
    questions: [
      {
        q: "Can I skip meals and get a refund?",
        a: "Meal plans are fixed and non-refundable. However, if you're going home for an extended period (more than 15 days), you can apply for a rebate at the hostel office before leaving.",
      },
      {
        q: "What if I have dietary restrictions?",
        a: "Inform the mess in-charge about your dietary requirements. We provide vegetarian and non-vegetarian options. For medical dietary needs, submit a medical certificate to the hostel office.",
      },
      {
        q: "Can guests eat at the mess?",
        a: "Yes, guests can dine at the mess by purchasing guest meal coupons from the hostel office. The charges are ₹100 per meal for guests.",
      },
    ],
  },
  {
    category: "Fees & Payments",
    questions: [
      {
        q: "What are the payment deadlines?",
        a: "Hostel fees must be paid within the first 15 days of each semester. Late payment attracts a fine of ₹50 per day. Payment can be made online or at the accounts office.",
      },
      {
        q: "Is the security deposit refundable?",
        a: "Yes, the security deposit is fully refundable upon completion of your stay, subject to no pending dues and no damage to hostel property. Refunds are processed within 30 days of checkout.",
      },
    ],
  },
  {
    category: "Facilities",
    questions: [
      {
        q: "What are the laundry timings?",
        a: "The laundry facility is open from 7 AM to 8 PM daily. Washing machines are available on a first-come, first-served basis. Each wash cycle costs ₹20.",
      },
      {
        q: "How do I report maintenance issues?",
        a: "Use the 'File Complaint' feature in HostelSphere app. Select 'Maintenance' category and describe the issue. Urgent issues can also be reported to the hostel office directly.",
      },
      {
        q: "Is WiFi available in rooms?",
        a: "Yes, WiFi is available in all rooms and common areas. Login credentials are provided at check-in. Report connectivity issues through the app or IT helpdesk.",
      },
    ],
  },
  {
    category: "Leave & Gate Pass",
    questions: [
      {
        q: "How many days in advance should I apply for gate pass?",
        a: "Gate pass requests should be submitted at least 24 hours in advance. For emergency leaves, contact the warden directly.",
      },
      {
        q: "Can I extend my gate pass?",
        a: "Yes, you can request an extension through the app or by calling the hostel office. Extensions are subject to warden approval.",
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
          Contact the hostel office for assistance
        </p>
        <a 
          href="mailto:hostel@university.edu" 
          className="text-sm text-primary font-medium hover:underline"
        >
          hostel@university.edu
        </a>
      </div>
    </Layout>
  );
};

export default FAQs;
