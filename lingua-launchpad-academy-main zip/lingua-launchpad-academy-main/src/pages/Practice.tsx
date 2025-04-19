
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Play, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PracticeCard from "@/components/practice/PracticeCard";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function Practice() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  const practiceId = searchParams.get("id");
  
  const [activeTab, setActiveTab] = useState(initialType);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: practices, isLoading } = useQuery({
    queryKey: ["practices"],
    queryFn: () => api.getPractices(),
  });

  const { data: practice } = useQuery({
    queryKey: ["practice", practiceId],
    queryFn: () => practiceId ? api.getPractice(practiceId) : Promise.resolve(undefined),
    enabled: !!practiceId,
  });
  
  const filteredPractices = practices?.filter((practice) => {
    // Filter by type if not "all"
    if (activeTab !== "all" && practice.type !== activeTab) return false;
    
    // Filter by search term
    if (searchTerm && !practice.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !practice.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const handleCompletePractice = async () => {
    if (practiceId) {
      try {
        await api.completePractice(practiceId);
        navigate("/practice");
      } catch (error) {
        console.error("Error completing practice:", error);
      }
    }
  };

  if (practiceId && practice) {
    return (
      <Layout requireAuth>
        <div className="container max-w-4xl mx-auto py-10 px-4 md:px-6">
          <Button
            variant="outline"
            size="sm"
            className="mb-6"
            onClick={() => navigate("/practice")}
          >
            <Play className="mr-2 h-4 w-4 rotate-180" />
            Back to Practice
          </Button>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{practice.title}</CardTitle>
                  <CardDescription>{practice.description}</CardDescription>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {practice.type.charAt(0).toUpperCase() + practice.type.slice(1)}
                </div>
              </div>
            </CardHeader>
            <div className="p-6 border-t border-gray-100">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2">Instructions</h3>
                <p className="text-gray-600">{practice.content.instructions}</p>
              </div>
              
              {practice.content.exercises.length > 0 ? (
                <div className="space-y-4 mb-6">
                  <h3 className="font-medium">Exercises</h3>
                  {practice.content.exercises.map((exercise, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <p>{exercise}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Exercise content is coming soon!</p>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button onClick={handleCompletePractice}>
                  Complete Practice
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Play className="mr-2 h-8 w-8 text-primary" />
              Practice
            </h1>
            <p className="text-gray-500">Strengthen your skills with targeted practice exercises</p>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search practice activities..." 
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
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-md" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-10 w-10 rounded-full mb-4" />
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
              <TabsTrigger value="all">All Types</TabsTrigger>
              <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
              <TabsTrigger value="grammar">Grammar</TabsTrigger>
              <TabsTrigger value="listening">Listening</TabsTrigger>
              <TabsTrigger value="speaking">Speaking</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="writing">Writing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filteredPractices?.length === 0 ? (
                <Card className="p-8 text-center">
                  <CardTitle className="mb-2">No practice activities found</CardTitle>
                  <CardDescription>Try adjusting your search or filters</CardDescription>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPractices?.map((practice) => (
                    <PracticeCard
                      key={practice.id}
                      id={practice.id}
                      title={practice.title}
                      description={practice.description}
                      type={practice.type}
                      estimatedTime={practice.estimatedTime}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            {["vocabulary", "grammar", "listening", "speaking", "reading", "writing"].map((type) => (
              <TabsContent key={type} value={type}>
                {filteredPractices?.length === 0 ? (
                  <Card className="p-8 text-center">
                    <CardTitle className="mb-2">No {type} practice activities found</CardTitle>
                    <CardDescription>Try adjusting your search or filters</CardDescription>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPractices?.map((practice) => (
                      <PracticeCard
                        key={practice.id}
                        id={practice.id}
                        title={practice.title}
                        description={practice.description}
                        type={practice.type}
                        estimatedTime={practice.estimatedTime}
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
