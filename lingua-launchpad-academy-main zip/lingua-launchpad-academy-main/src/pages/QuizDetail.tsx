
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  BookText, 
  CheckCircle, 
  Clock, 
  HelpCircle, 
  XCircle
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import QuizQuestion, { Question } from "@/components/quizzes/QuizQuestion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuizDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const { data: quiz, isLoading, error } = useQuery({
    queryKey: ["quiz", id],
    queryFn: () => id ? api.getQuiz(id) : Promise.reject(new Error("Quiz ID is required")),
  });
  
  const completeQuizMutation = useMutation({
    mutationFn: ({ quizId, score }: { quizId: string; score: number }) => 
      api.completeQuiz(quizId, score),
    onSuccess: () => {
      toast.success("Quiz completed!");
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
    },
    onError: (error) => {
      toast.error("Failed to save quiz results");
      console.error("Error completing quiz:", error);
    },
  });
  
  const handleAnswer = (isCorrect: boolean) => {
    setShowAnswer(true);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = isCorrect;
    setUserAnswers(newUserAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      // Quiz is complete
      finishQuiz();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowAnswer(true); // Show the previous answer
    }
  };
  
  const finishQuiz = () => {
    if (!id || !quiz) return;
    
    const correctAnswers = userAnswers.filter(answer => answer).length;
    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    completeQuizMutation.mutate({ quizId: id, score });
    setQuizCompleted(true);
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowAnswer(false);
    setQuizCompleted(false);
  };
  
  const calculateScore = () => {
    if (!quiz) return 0;
    
    const correctAnswers = userAnswers.filter(answer => answer).length;
    const totalQuestions = quiz.questions.length;
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  if (error) {
    return (
      <Layout requireAuth>
        <div className="container mx-auto py-10 px-4 md:px-6">
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load quiz details. Please try again later.
            </AlertDescription>
          </Alert>
          <Button asChild>
            <Link to="/quizzes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quizzes
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      <div className="container max-w-3xl mx-auto py-10 px-4 md:px-6">
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={() => navigate("/quizzes")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quizzes
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
          ) : !quiz || quiz.questions.length === 0 ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Quiz not found or has no questions.</AlertDescription>
            </Alert>
          ) : quizCompleted ? (
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary-50 border-b">
                <CardTitle className="text-center text-2xl">Quiz Complete!</CardTitle>
                <CardDescription className="text-center">
                  You've completed the {quiz.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative mb-4">
                    <div className="flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-4">
                      <span className="text-3xl font-bold text-primary">{calculateScore()}%</span>
                    </div>
                  </div>
                  
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold mb-2">
                      {calculateScore() >= 70 ? "Great job!" : "Keep practicing!"}
                    </h3>
                    <p className="text-gray-600">
                      You answered {userAnswers.filter(a => a).length} out of {quiz.questions.length} questions correctly.
                    </p>
                  </div>
                  
                  <div className="w-full space-y-4">
                    <Button className="w-full" onClick={restartQuiz}>
                      Try Again
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/quizzes")}>
                      Browse Other Quizzes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{quiz.title}</h1>
              </div>
              <p className="text-gray-500 mt-1 mb-4">{quiz.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <BookText className="mr-2 h-4 w-4" />
                  Level: {quiz.level}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Questions: {quiz.questionCount}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  Difficulty: {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                  <span>
                    {userAnswers.filter(answer => answer).length} correct / {userAnswers.length} answered
                  </span>
                </div>
                <Progress value={(currentQuestionIndex / quiz.questions.length) * 100} className="h-2" />
              </div>
              
              {/* Current Question */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <QuizQuestion 
                  question={quiz.questions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  showAnswer={showAnswer}
                />
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                <Button 
                  onClick={handleNext}
                  disabled={!showAnswer}
                >
                  {currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
