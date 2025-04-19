
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LessonContentProps {
  content: {
    sections: {
      id: string;
      title: string;
      type: "text" | "vocabulary" | "example" | "grammar" | "interactive";
      content: string | string[] | { word: string; translation: string; example?: string }[];
    }[];
  };
  onComplete: () => void;
}

export default function LessonContent({ content, onComplete }: LessonContentProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  
  const currentSection = content.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === content.sections.length - 1;
  
  const handleNext = () => {
    if (isLastSection) {
      onComplete();
      return;
    }
    setCurrentSectionIndex(prev => prev + 1);
    setUserInteracted(false);
    window.scrollTo(0, 0);
  };
  
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      setUserInteracted(false);
      window.scrollTo(0, 0);
    }
  };
  
  const playAudio = (text: string) => {
    // Mock audio playback
    console.log("Playing audio for:", text);
  };
  
  const renderSectionContent = () => {
    switch (currentSection.type) {
      case "text":
        return (
          <div className="prose max-w-none">
            <p>{currentSection.content as string}</p>
          </div>
        );
        
      case "vocabulary":
        return (
          <div className="space-y-4">
            {(currentSection.content as { word: string; translation: string; example?: string }[]).map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-lg font-medium">{item.word}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="ml-2 h-8 w-8 p-0" 
                          onClick={() => playAudio(item.word)}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-gray-500">{item.translation}</p>
                      {item.example && (
                        <p className="text-sm text-gray-600 mt-2 italic">"{item.example}"</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
        
      case "example":
        return (
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <h4 className="font-medium mb-2">Examples:</h4>
            <ul className="list-disc list-inside space-y-2">
              {(currentSection.content as string[]).map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        );
        
      case "grammar":
        return (
          <div className="prose max-w-none">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium mb-2">Grammar Note:</h4>
              <p>{currentSection.content as string}</p>
            </div>
          </div>
        );
        
      case "interactive":
        return (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 className="font-medium mb-4">Practice Exercise</h4>
            <p className="mb-4">{(currentSection.content as string[]).at(0)}</p>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className={cn(
                  "w-full justify-start text-left", 
                  userInteracted && "opacity-50"
                )} 
                onClick={() => setUserInteracted(true)}
              >
                {(currentSection.content as string[]).at(1)}
              </Button>
              <Button 
                variant="outline" 
                className={cn(
                  "w-full justify-start text-left", 
                  userInteracted && "bg-green-50 border-green-200 text-green-800"
                )} 
                onClick={() => setUserInteracted(true)}
              >
                {userInteracted && <CheckCircle className="mr-2 h-4 w-4" />}
                {(currentSection.content as string[]).at(2)}
              </Button>
              <Button 
                variant="outline" 
                className={cn(
                  "w-full justify-start text-left", 
                  userInteracted && "opacity-50"
                )} 
                onClick={() => setUserInteracted(true)}
              >
                {(currentSection.content as string[]).at(3)}
              </Button>
            </div>
          </div>
        );
        
      default:
        return <p>Unknown section type</p>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4">{currentSection.title}</h3>
        {renderSectionContent()}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNext}>
          {isLastSection ? "Complete Lesson" : "Next"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
