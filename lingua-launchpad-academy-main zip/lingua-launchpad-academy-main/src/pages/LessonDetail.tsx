
import Layout from "@/components/layout/Layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckCircle, Clock } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LessonContent from "@/components/lessons/LessonContent";

export default function LessonDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { data: lesson, isLoading, error } = useQuery({
    queryKey: ["lesson", id],
    queryFn: () => id ? api.getLesson(id) : Promise.reject(new Error("Lesson ID is required")),
  });
  
  const completeLessonMutation = useMutation({
    mutationFn: (lessonId: string) => api.completeLesson(lessonId),
    onSuccess: () => {
      toast.success("Lesson completed!");
      queryClient.invalidateQueries({ queryKey: ["lesson"] });
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
    },
    onError: (error) => {
      toast.error("Failed to mark lesson as complete");
      console.error("Error completing lesson:", error);
    },
  });
  
  const handleComplete = () => {
    if (id) {
      completeLessonMutation.mutate(id);
    }
  };

  if (error) {
    return (
      <Layout requireAuth>
        <div className="container mx-auto py-10 px-4 md:px-6">
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load lesson details. Please try again later.
            </AlertDescription>
          </Alert>
          <Button asChild>
            <Link to="/lessons">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Lessons
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      <div className="container max-w-4xl mx-auto py-10 px-4 md:px-6">
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={() => navigate("/lessons")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Button>
          
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-5 w-full mb-4" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </>
          ) : !lesson ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Lesson not found.</AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
                {lesson.completed && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-lg mt-1 mb-4">{lesson.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Level: {lesson.level}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  Duration: {lesson.duration} minutes
                </div>
              </div>
              
              {/* Lesson Content */}
              {lesson.sections && lesson.sections.length > 0 ? (
                <LessonContent 
                  content={{ sections: lesson.sections }}
                  onComplete={handleComplete}
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <h3 className="text-lg font-medium mb-2">Lesson content is being prepared</h3>
                  <p className="text-gray-500 mb-6">Check back soon for the full lesson content!</p>
                  <Button onClick={() => navigate("/lessons")}>
                    Return to Lessons
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
