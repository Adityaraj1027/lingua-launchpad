
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation?: string;
}

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  showAnswer: boolean;
}

export default function QuizQuestion({ 
  question, 
  onAnswer, 
  showAnswer 
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const isAnswered = selectedOption !== null;
  
  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered || showAnswer) return;
    
    setSelectedOption(optionIndex);
    onAnswer(optionIndex === question.correctOption);
  };
  
  const getOptionClasses = (optionIndex: number) => {
    if (!showAnswer && selectedOption !== optionIndex) {
      return "border-gray-200 hover:border-gray-300";
    }
    
    if (showAnswer) {
      if (optionIndex === question.correctOption) {
        return "border-green-200 bg-green-50 text-green-800";
      } else if (selectedOption === optionIndex) {
        return "border-red-200 bg-red-50 text-red-800";
      }
      return "border-gray-200 opacity-50";
    }
    
    // Just selected, but not showing answer yet
    return "border-primary bg-primary/5";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={isAnswered && showAnswer}
            className={cn(
              "w-full px-4 py-3 border rounded-md text-left transition-colors flex justify-between items-center",
              getOptionClasses(index)
            )}
          >
            <span>{option}</span>
            {showAnswer && index === question.correctOption && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
            {showAnswer && selectedOption === index && index !== question.correctOption && (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
          </button>
        ))}
      </div>
      
      {showAnswer && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md text-blue-800">
          <p className="font-medium mb-1">Explanation:</p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
