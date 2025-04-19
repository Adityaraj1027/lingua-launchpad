
import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, HelpCircle, LockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  difficulty: "easy" | "medium" | "hard";
  completed?: boolean;
  score?: number;
  locked?: boolean;
  className?: string;
}

export default function QuizCard({
  id,
  title,
  description,
  questionCount,
  difficulty,
  completed = false,
  score,
  locked = false,
  className,
}: QuizCardProps) {
  const navigate = useNavigate();
  
  const handleStartQuiz = () => {
    if (!locked) {
      navigate(`/quizzes/${id}`);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-amber-600 bg-amber-50";
      case "hard":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Card className={cn("h-full flex flex-col", locked ? "opacity-75" : "", className)}>
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {locked && <LockIcon className="inline-block mr-2 h-4 w-4" />}
              {title}
            </CardTitle>
            {completed && score !== undefined && (
              <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                {score}%
              </span>
            )}
          </div>
          <CardDescription className="mt-2 line-clamp-2">{description}</CardDescription>
        </div>
        
        <CardContent className="p-0 mt-auto">
          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center text-gray-500">
              <HelpCircle className="h-4 w-4 mr-1" />
              <span>{questionCount} questions</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
          
          <Button 
            variant={completed ? "outline" : "default"}
            className="w-full"
            disabled={locked}
            onClick={handleStartQuiz}
          >
            {completed ? "Retake Quiz" : locked ? "Locked" : "Start Quiz"}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
