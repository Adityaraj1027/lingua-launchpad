
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PracticeCardProps {
  id: string;
  title: string;
  description: string;
  type: "vocabulary" | "grammar" | "listening" | "speaking" | "reading" | "writing";
  estimatedTime: number;
  className?: string;
}

export default function PracticeCard({
  id,
  title,
  description,
  type,
  estimatedTime,
  className,
}: PracticeCardProps) {
  const navigate = useNavigate();
  
  const getTypeIcon = () => {
    const iconSize = "h-10 w-10";
    const iconClasses = cn(
      iconSize,
      "rounded-full p-2 mb-4"
    );

    switch (type) {
      case "vocabulary":
        return <div className={cn(iconClasses, "bg-blue-100 text-blue-600")}>📚</div>;
      case "grammar":
        return <div className={cn(iconClasses, "bg-green-100 text-green-600")}>📝</div>;
      case "listening":
        return <div className={cn(iconClasses, "bg-purple-100 text-purple-600")}>🎧</div>;
      case "speaking":
        return <div className={cn(iconClasses, "bg-red-100 text-red-600")}>🗣️</div>;
      case "reading":
        return <div className={cn(iconClasses, "bg-amber-100 text-amber-600")}>📖</div>;
      case "writing":
        return <div className={cn(iconClasses, "bg-teal-100 text-teal-600")}>✍️</div>;
      default:
        return <div className={cn(iconClasses, "bg-gray-100 text-gray-600")}>❓</div>;
    }
  };

  return (
    <Card className={cn("h-full flex flex-col overflow-hidden", className)}>
      <CardHeader className="pb-2">
        {getTypeIcon()}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{estimatedTime} min</span>
        </div>
        <Button size="sm" onClick={() => navigate(`/practice?type=${type}&id=${id}`)}>
          Practice Now
        </Button>
      </CardFooter>
    </Card>
  );
}
