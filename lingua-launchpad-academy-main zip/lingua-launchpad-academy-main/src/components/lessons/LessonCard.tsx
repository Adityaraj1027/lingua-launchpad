
import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, LockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  duration: number;
  completed?: boolean;
  locked?: boolean;
  className?: string;
}

export default function LessonCard({
  id,
  title,
  description,
  duration,
  completed = false,
  locked = false,
  className,
}: LessonCardProps) {
  const navigate = useNavigate();
  
  const handleStartLesson = () => {
    if (!locked) {
      navigate(`/lessons/${id}`);
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
            {completed && (
              <CheckCircle className="h-5 w-5 text-secondary" />
            )}
          </div>
          <CardDescription className="mt-2 line-clamp-2">{description}</CardDescription>
        </div>
        
        <CardContent className="p-0 mt-auto">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration} minutes</span>
          </div>
          
          <Button 
            variant={completed ? "outline" : "default"}
            className="w-full"
            disabled={locked}
            onClick={handleStartLesson}
          >
            {completed ? "Review Lesson" : locked ? "Locked" : "Start Lesson"}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
