
import { Calendar } from "lucide-react";

interface StreakCalendarProps {
  currentStreak: number;
  longestStreak: number;
  streakDays: Date[];
}

export default function StreakCalendar({
  currentStreak,
  longestStreak,
  streakDays,
}: StreakCalendarProps) {
  // Get current month days
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  const days = [];
  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  // Check if a day is in the streak
  const isStreakDay = (day: Date) => {
    return streakDays.some(streakDay => 
      streakDay.getDate() === day.getDate() && 
      streakDay.getMonth() === day.getMonth() && 
      streakDay.getFullYear() === day.getFullYear()
    );
  };

  // Generate week day headers
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-primary" />
          Your Learning Streak
        </h3>
      </div>
      
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">Current Streak</p>
          <p className="text-3xl font-bold text-primary">{currentStreak} days</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Longest Streak</p>
          <p className="text-3xl font-bold text-gray-700">{longestStreak} days</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-xs text-center font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {/* Offset for first day of month */}
          {Array.from({ length: firstDay.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square"></div>
          ))}
          
          {days.map((day, index) => (
            <div 
              key={index}
              className={`aspect-square rounded-full flex items-center justify-center text-xs ${
                isStreakDay(day) 
                  ? 'bg-primary text-white' 
                  : day <= today 
                    ? 'bg-gray-100' 
                    : ''
              }`}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        <p>Keep learning daily to build your streak!</p>
      </div>
    </div>
  );
}
