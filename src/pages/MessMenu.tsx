import { useState } from "react";
import Layout from "@/components/Layout";
import { UtensilsCrossed, Coffee, Sun, Moon } from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const menuData: Record<string, { breakfast: string[], lunch: string[], dinner: string[] }> = {
  Mon: {
    breakfast: ["Idli", "Sambar", "Chutney", "Tea/Coffee"],
    lunch: ["Rice", "Dal", "Aloo Gobi", "Roti", "Salad", "Curd"],
    dinner: ["Rice", "Rajma", "Jeera Aloo", "Roti", "Sweet"],
  },
  Tue: {
    breakfast: ["Poha", "Jalebi", "Boiled Eggs", "Tea/Coffee"],
    lunch: ["Rice", "Kadhi Pakora", "Mix Veg", "Roti", "Salad"],
    dinner: ["Rice", "Chole", "Paneer Butter Masala", "Roti", "Ice Cream"],
  },
  Wed: {
    breakfast: ["Paratha", "Curd", "Pickle", "Tea/Coffee"],
    lunch: ["Rice", "Sambar", "Bhindi Fry", "Roti", "Salad", "Curd"],
    dinner: ["Pulao", "Dal Makhani", "Aloo Matar", "Roti", "Kheer"],
  },
  Thu: {
    breakfast: ["Upma", "Vada", "Coconut Chutney", "Tea/Coffee"],
    lunch: ["Rice", "Dal Tadka", "Cabbage Sabzi", "Roti", "Salad"],
    dinner: ["Rice", "Paneer Do Pyaza", "Palak Dal", "Roti", "Gulab Jamun"],
  },
  Fri: {
    breakfast: ["Chole Bhature", "Pickle", "Tea/Coffee"],
    lunch: ["Rice", "Rasam", "Egg Curry/Paneer", "Roti", "Salad", "Curd"],
    dinner: ["Biryani", "Raita", "Mirchi Ka Salan", "Sweet"],
  },
  Sat: {
    breakfast: ["Dosa", "Sambar", "Chutney", "Tea/Coffee"],
    lunch: ["Rice", "Dal", "Seasonal Sabzi", "Roti", "Salad"],
    dinner: ["Rice", "Chicken Curry/Soya Chunks", "Veg", "Roti", "Fruit"],
  },
  Sun: {
    breakfast: ["Puri", "Aloo Sabzi", "Halwa", "Tea/Coffee"],
    lunch: ["Pulao", "Dal", "Mix Veg", "Roti", "Salad", "Curd"],
    dinner: ["Rice", "Dal Fry", "Paneer Tikka", "Naan", "Ice Cream"],
  },
};

const MessMenu = () => {
  const today = new Date().getDay();
  const currentDayIndex = today === 0 ? 6 : today - 1; // Adjust for Sunday
  const [selectedDay, setSelectedDay] = useState(weekDays[currentDayIndex]);

  const menu = menuData[selectedDay];

  return (
    <Layout title="Mess Menu" showBack>
      {/* Day Selector */}
      <div className="mb-6">
        <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1">
          {weekDays.map((day, index) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                selectedDay === day
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : index === currentDayIndex
                  ? "bg-primary/10 text-primary border-2 border-primary/30"
                  : "bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {day}
              {index === currentDayIndex && selectedDay !== day && (
                <span className="block text-[10px] font-normal mt-0.5">Today</span>
              )}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3 text-center">
          {fullDays[weekDays.indexOf(selectedDay)]}
          {selectedDay === weekDays[currentDayIndex] && " (Today)"}
        </p>
      </div>

      {/* Menu Cards */}
      <div className="space-y-4">
        {/* Breakfast */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden animate-fade-in">
          <div className="gradient-warning p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning-foreground/20 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-warning-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-warning-foreground">Breakfast</h3>
              <p className="text-xs text-warning-foreground/80">7:30 AM - 9:30 AM</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {menu.breakfast.map((item, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 bg-secondary rounded-full text-sm text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Lunch */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="gradient-accent p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-foreground/20 flex items-center justify-center">
              <Sun className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-accent-foreground">Lunch</h3>
              <p className="text-xs text-accent-foreground/80">12:30 PM - 2:30 PM</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {menu.lunch.map((item, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 bg-secondary rounded-full text-sm text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dinner */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="gradient-primary p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Moon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">Dinner</h3>
              <p className="text-xs text-primary-foreground/80">7:30 PM - 9:30 PM</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {menu.dinner.map((item, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 bg-secondary rounded-full text-sm text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p className="text-xs text-muted-foreground text-center">
          Menu is subject to change based on availability. 
          For special dietary requirements, please contact the mess in-charge.
        </p>
      </div>
    </Layout>
  );
};

export default MessMenu;
