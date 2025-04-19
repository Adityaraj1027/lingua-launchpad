
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenText, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import LessonCard from "@/components/lessons/LessonCard";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function Lessons() {
  const [searchParams] = useSearchParams();
  const initialLanguage = searchParams.get("language") || "all";
  
  const [activeTab, setActiveTab] = useState(initialLanguage);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: lessons, isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: () => api.getLessons(),
  });
  
  const { data: languages } = useQuery({
    queryKey: ["languages"],
    queryFn: () => api.getLanguages(),
  });
  
  const filteredLessons = lessons?.filter((lesson) => {
    // Filter by language if not "all"
    if (activeTab !== "all" && lesson.language !== activeTab) return false;
    
    // Filter by search term
    if (searchTerm && !lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !lesson.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const getLessonsByLanguage = (language: string) => {
    if (language === "all") return filteredLessons;
    return filteredLessons?.filter(lesson => lesson.language === language);
  };

  return (
    <Layout requireAuth>
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <BookOpenText className="mr-2 h-8 w-8 text-primary" />
              Lessons
            </h1>
            <p className="text-gray-500">Browse and learn with interactive language lessons</p>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search lessons..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          // Loading state
          <div className="space-y-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-md" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <div className="p-6">
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex space-x-2 overflow-x-auto pb-px">
              <TabsTrigger value="all">All Languages</TabsTrigger>
              {languages?.map((language) => (
                <TabsTrigger key={language.id} value={language.id}>
                  {language.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all">
              {filteredLessons?.length === 0 ? (
                <Card className="p-8 text-center">
                  <CardTitle className="mb-2">No lessons found</CardTitle>
                  <CardDescription>Try adjusting your search or filters</CardDescription>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLessons?.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      id={lesson.id}
                      title={lesson.title}
                      description={lesson.description}
                      duration={lesson.duration}
                      completed={lesson.completed}
                      locked={lesson.locked}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            {languages?.map((language) => (
              <TabsContent key={language.id} value={language.id}>
                {getLessonsByLanguage(language.id)?.length === 0 ? (
                  <Card className="p-8 text-center">
                    <CardTitle className="mb-2">No lessons found</CardTitle>
                    <CardDescription>Try adjusting your search or filters</CardDescription>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getLessonsByLanguage(language.id)?.map((lesson) => (
                      <LessonCard
                        key={lesson.id}
                        id={lesson.id}
                        title={lesson.title}
                        description={lesson.description}
                        duration={lesson.duration}
                        completed={lesson.completed}
                        locked={lesson.locked}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
