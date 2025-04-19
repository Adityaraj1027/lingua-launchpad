
import { Book, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LanguageCardProps {
  id: string;
  language: string;
  level: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  className?: string;
}

export default function LanguageCard({
  id,
  language,
  level,
  progress,
  lessonsCompleted,
  totalLessons,
  className,
}: LanguageCardProps) {
  const navigate = useNavigate();

  const getGradientByLanguage = (language: string) => {
    const gradients: Record<string, string> = {
      spanish: "from-yellow-400 to-orange-500",
      french: "from-blue-400 to-indigo-500",
      german: "from-yellow-400 to-red-500",
      italian: "from-green-400 to-emerald-600",
      japanese: "from-red-400 to-pink-500",
      chinese: "from-red-500 to-yellow-500",
      korean: "from-blue-400 to-purple-500",
      russian: "from-blue-500 to-red-400",
      portuguese: "from-green-500 to-yellow-400",
      arabic: "from-emerald-400 to-teal-600",
    };
    
    return gradients[language.toLowerCase()] || "from-primary to-blue-600";
  };

  return (
    <div className={cn("language-card bg-white rounded-xl shadow-sm overflow-hidden h-full", className)}>
      <div className={`h-3 bg-gradient-to-r ${getGradientByLanguage(language)}`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{language}</h3>
            <p className="text-gray-500">{level}</p>
          </div>
          <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
            {progress}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
          <div 
            className="h-full rounded-full bg-primary"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Book className="h-4 w-4 mr-1" />
            <span>{lessonsCompleted}/{totalLessons} lessons</span>
          </div>
          {lessonsCompleted === totalLessons && (
            <div className="flex items-center text-sm text-secondary">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Completed</span>
            </div>
          )}
        </div>
        
        <Button 
          className="w-full"
          onClick={() => navigate(`/lessons?language=${language.toLowerCase()}`)}
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
}
