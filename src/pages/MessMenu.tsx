import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Coffee, Sun, Moon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dayMap: Record<string, string> = { Mon: "monday", Tue: "tuesday", Wed: "wednesday", Thu: "thursday", Fri: "friday", Sat: "saturday", Sun: "sunday" };

// Fallback hardcoded menu
const fallbackMenu: Record<string, { breakfast: string[], lunch: string[], dinner: string[] }> = {
  Mon: { breakfast: ["Idli", "Sambar", "Chutney", "Tea/Coffee"], lunch: ["Rice", "Dal", "Aloo Gobi", "Roti", "Salad", "Curd"], dinner: ["Rice", "Rajma", "Jeera Aloo", "Roti", "Sweet"] },
  Tue: { breakfast: ["Poha", "Jalebi", "Boiled Eggs", "Tea/Coffee"], lunch: ["Rice", "Kadhi Pakora", "Mix Veg", "Roti", "Salad"], dinner: ["Rice", "Chole", "Paneer Butter Masala", "Roti", "Ice Cream"] },
  Wed: { breakfast: ["Paratha", "Curd", "Pickle", "Tea/Coffee"], lunch: ["Rice", "Sambar", "Bhindi Fry", "Roti", "Salad", "Curd"], dinner: ["Pulao", "Dal Makhani", "Aloo Matar", "Roti", "Kheer"] },
  Thu: { breakfast: ["Upma", "Vada", "Coconut Chutney", "Tea/Coffee"], lunch: ["Rice", "Dal Tadka", "Cabbage Sabzi", "Roti", "Salad"], dinner: ["Rice", "Paneer Do Pyaza", "Palak Dal", "Roti", "Gulab Jamun"] },
  Fri: { breakfast: ["Chole Bhature", "Pickle", "Tea/Coffee"], lunch: ["Rice", "Rasam", "Egg Curry/Paneer", "Roti", "Salad", "Curd"], dinner: ["Biryani", "Raita", "Mirchi Ka Salan", "Sweet"] },
  Sat: { breakfast: ["Dosa", "Sambar", "Chutney", "Tea/Coffee"], lunch: ["Rice", "Dal", "Seasonal Sabzi", "Roti", "Salad"], dinner: ["Rice", "Chicken Curry/Soya Chunks", "Veg", "Roti", "Fruit"] },
  Sun: { breakfast: ["Puri", "Aloo Sabzi", "Halwa", "Tea/Coffee"], lunch: ["Pulao", "Dal", "Mix Veg", "Roti", "Salad", "Curd"], dinner: ["Rice", "Dal Fry", "Paneer Tikka", "Naan", "Ice Cream"] },
};

const meals = [
  { key: "breakfast" as const, label: "Breakfast", time: "7:30 - 9:30 AM", icon: Coffee, gradient: "gradient-warning" },
  { key: "lunch" as const, label: "Lunch", time: "12:30 - 2:30 PM", icon: Sun, gradient: "gradient-accent" },
  { key: "dinner" as const, label: "Dinner", time: "7:30 - 9:30 PM", icon: Moon, gradient: "gradient-primary" },
];

const MessMenu = () => {
  const today = new Date().getDay();
  const currentDayIndex = today === 0 ? 6 : today - 1;
  const [selectedDay, setSelectedDay] = useState(weekDays[currentDayIndex]);
  const [dbMenu, setDbMenu] = useState<Record<string, Record<string, string[]>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from("mess_menu").select("*");
      if (!error && data && data.length > 0) {
        const grouped: Record<string, Record<string, string[]>> = {};
        data.forEach((row: any) => {
          if (!grouped[row.day_of_week]) grouped[row.day_of_week] = {};
          grouped[row.day_of_week][row.meal_type] = row.items;
        });
        setDbMenu(grouped);
      }
      setLoading(false);
    };
    fetchMenu();
  }, []);

  const getMenu = (day: string) => {
    const dbDay = dayMap[day];
    if (dbMenu[dbDay]) {
      return {
        breakfast: dbMenu[dbDay].breakfast || fallbackMenu[day].breakfast,
        lunch: dbMenu[dbDay].lunch || fallbackMenu[day].lunch,
        dinner: dbMenu[dbDay].dinner || fallbackMenu[day].dinner,
      };
    }
    return fallbackMenu[day];
  };

  const menu = getMenu(selectedDay);

  return (
    <Layout title="Mess Menu" showBack>
      <div className="mb-6">
        <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {weekDays.map((day, index) => {
            const isSelected = selectedDay === day;
            const isToday = index === currentDayIndex;
            return (
              <button key={day} onClick={() => setSelectedDay(day)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${isSelected ? "gradient-primary text-white shadow-glow" : isToday ? "bg-primary/10 text-primary border-2 border-primary/30" : "bg-card text-foreground hover:bg-secondary border border-border/50"}`}>
                {day}
                {isToday && !isSelected && <span className="block text-[9px] font-bold mt-0.5 uppercase tracking-wider">Today</span>}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground mt-3 text-center font-medium">
          {fullDays[weekDays.indexOf(selectedDay)]}{selectedDay === weekDays[currentDayIndex] && " (Today)"}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <motion.div key={meal.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
              <div className={`${meal.gradient} p-4 flex items-center gap-3`}>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <meal.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{meal.label}</h3>
                  <p className="text-xs text-white/70 font-medium">{meal.time}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {menu[meal.key].map((item, i) => (
                    <span key={i} className="px-3 py-1.5 bg-secondary/70 rounded-full text-sm text-foreground font-medium border border-border/30">{item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/15">
        <p className="text-sm font-bold text-foreground mb-1">Azad Bhavan Mess</p>
        <p className="text-xs text-muted-foreground leading-relaxed">Menu subject to availability. For dietary requirements, contact Mess In-charge.</p>
      </div>
    </Layout>
  );
};

export default MessMenu;
