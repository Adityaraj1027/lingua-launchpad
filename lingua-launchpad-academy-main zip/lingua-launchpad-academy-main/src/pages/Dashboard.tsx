
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, BookOpen, BookText, Play } from "lucide-react";
import ProgressCircle from "@/components/dashboard/ProgressCircle";
import StreakCalendar from "@/components/dashboard/StreakCalendar";
import LanguageCard from "@/components/dashboard/LanguageCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { data: userProgress, isLoading, error } = useQuery({
    queryKey: ["userProgress"],
    queryFn: api.getUserProgress,
  });

  if (error) {
    console.error("Error fetching user progress:", error);
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout requireAuth>
      <div className="container mx-auto py-10 px-4 md:px-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : !userProgress ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Failed to load dashboard data</h2>
            <p className="text-gray-500 mb-4">Please try refreshing the page</p>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-gray-500">Track your progress and continue learning</p>
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <span className="text-sm text-gray-500">Current Streak:</span>
                <span className="bg-primary/10 text-primary font-medium rounded-full px-3 py-1 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {userProgress.currentStreak} days
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-4">
                  <div className="flex flex-col items-center">
                    <ProgressCircle percentage={
                      userProgress.languages.length > 0 
                        ? Math.round(userProgress.languages.reduce((acc, lang) => acc + lang.progress, 0) / userProgress.languages.length)
                        : 0
                    } />
                    <div className="mt-4 text-sm text-gray-500 grid grid-cols-2 gap-4 w-full">
                      <div>
                        <p>Lessons</p>
                        <p className="font-medium text-gray-800">{userProgress.totalLessonsCompleted}</p>
                      </div>
                      <div>
                        <p>Quizzes</p>
                        <p className="font-medium text-gray-800">{userProgress.totalQuizzesCompleted}</p>
                      </div>
                      <div>
                        <p>Practice</p>
                        <p className="font-medium text-gray-800">{userProgress.totalPracticeCompleted}</p>
                      </div>
                      <div>
                        <p>Languages</p>
                        <p className="font-medium text-gray-800">{userProgress.languages.length}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <CardDescription>Your learning history</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProgress.recentActivity.length === 0 ? (
                      <p className="text-center text-gray-500 py-4">No recent activity</p>
                    ) : (
                      userProgress.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                            {activity.type === "lesson" && (
                              <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                                <BookOpen className="h-5 w-5" />
                              </div>
                            )}
                            {activity.type === "quiz" && (
                              <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
                                <BookText className="h-5 w-5" />
                              </div>
                            )}
                            {activity.type === "practice" && (
                              <div className="bg-green-100 text-green-700 p-2 rounded-full">
                                <Play className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium truncate">{activity.title}</p>
                                <p className="text-sm text-gray-500 capitalize">{activity.type}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                                {activity.score !== undefined && (
                                  <p className="text-sm font-medium text-primary">{activity.score}%</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="languages">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="languages">Your Languages</TabsTrigger>
                  <TabsTrigger value="streak">Streak Calendar</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="languages" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProgress.languages.map((language) => (
                    <LanguageCard
                      key={language.id}
                      id={language.id}
                      language={language.name}
                      level={language.level}
                      progress={language.progress}
                      lessonsCompleted={language.lessonsCompleted}
                      totalLessons={language.totalLessons}
                    />
                  ))}
                  
                  <Card className="border-dashed border-2 flex flex-col items-center justify-center p-8 h-full">
                    <h3 className="text-xl font-bold mb-2">Add a New Language</h3>
                    <p className="text-gray-500 text-center mb-4">Expand your language knowledge</p>
                    <Button>
                      Explore Languages
                    </Button>
                  </Card>
                </div>

                <div className="flex justify-between mt-8">
                  <h2 className="text-2xl font-bold">Continue Learning</h2>
                  <Link to="/lessons">
                    <Button variant="outline" className="gap-1">
                      View All Lessons
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Here we'd show the most recent or recommended lessons based on user progress */}
                  {userProgress.languages.length > 0 && (
                    <>
                      <Card className="overflow-hidden">
                        <div className="h-3 bg-blue-500"></div>
                        <CardContent className="pt-6">
                          <h3 className="font-bold mb-2">Spanish Irregular Verbs</h3>
                          <p className="text-sm text-gray-500 mb-4">Continue your Spanish journey with irregular verb forms</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">30 minutes</span>
                            <Link to="/lessons/lesson-8">
                              <Button size="sm">Continue</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="h-3 bg-blue-500"></div>
                        <CardContent className="pt-6">
                          <h3 className="font-bold mb-2">Spanish Numbers Quiz</h3>
                          <p className="text-sm text-gray-500 mb-4">Test your knowledge of numbers 1-20 in Spanish</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">5 questions</span>
                            <Link to="/quizzes/quiz-2">
                              <Button size="sm">Start Quiz</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="h-3 bg-blue-500"></div>
                        <CardContent className="pt-6">
                          <h3 className="font-bold mb-2">Spanish Conversation Practice</h3>
                          <p className="text-sm text-gray-500 mb-4">Practice basic conversations in Spanish</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">15 minutes</span>
                            <Link to="/practice?type=speaking&id=practice-3">
                              <Button size="sm">Practice</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="streak">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StreakCalendar
                    currentStreak={userProgress.currentStreak}
                    longestStreak={userProgress.longestStreak}
                    streakDays={userProgress.streakDays}
                  />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Streak Tips</CardTitle>
                      <CardDescription>How to maintain your learning streak</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-full h-min">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Set a daily reminder</h4>
                          <p className="text-sm text-gray-500">Choose a time that works best for your schedule.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-full h-min">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Start with short sessions</h4>
                          <p className="text-sm text-gray-500">Even 5 minutes of daily practice can help maintain your streak.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-full h-min">
                          <Play className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Mix up your activities</h4>
                          <p className="text-sm text-gray-500">Alternate between lessons, quizzes, and practice sessions.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
}
