
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpenText, Sparkles, Globe, Medal, BookOpen, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Unlock a World of Languages
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-lg">
                Start your language learning journey with Lingua Launchpad Academy. 
                Interactive lessons, quizzes, and practice sessions designed to make learning effective and engaging.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Already a User? Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-lg"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="animate-float delay-100">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                    <Globe className="h-8 w-8 mb-3 text-accent" />
                    <h3 className="font-bold mb-1">Multiple Languages</h3>
                    <p className="text-sm text-white/80">Spanish, French, German, and more</p>
                  </div>
                </div>
                <div className="animate-float delay-200 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                    <Sparkles className="h-8 w-8 mb-3 text-accent" />
                    <h3 className="font-bold mb-1">Interactive Learning</h3>
                    <p className="text-sm text-white/80">Engaging lessons and activities</p>
                  </div>
                </div>
                <div className="animate-float delay-300">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                    <BookOpen className="h-8 w-8 mb-3 text-accent" />
                    <h3 className="font-bold mb-1">Structured Courses</h3>
                    <p className="text-sm text-white/80">Progress from beginner to advanced</p>
                  </div>
                </div>
                <div className="animate-float delay-400 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                    <Medal className="h-8 w-8 mb-3 text-accent" />
                    <h3 className="font-bold mb-1">Track Progress</h3>
                    <p className="text-sm text-white/80">Set goals and celebrate achievements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How You'll Learn</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive approach ensures you develop all aspects of language mastery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <BookOpenText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Interactive Lessons</h3>
              <p className="text-gray-600 mb-4">
                Bite-sized, engaging lessons that make learning new vocabulary and grammar concepts easy and enjoyable.
              </p>
              <ul className="space-y-2">
                {["Multimedia content", "Clear explanations", "Cultural insights"].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Comprehensive Quizzes</h3>
              <p className="text-gray-600 mb-4">
                Test your knowledge with interactive quizzes designed to reinforce your learning and identify areas for improvement.
              </p>
              <ul className="space-y-2">
                {["Immediate feedback", "Varied question types", "Difficulty progression"].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Targeted Practice</h3>
              <p className="text-gray-600 mb-4">
                Strengthen your skills with focused practice exercises for reading, writing, listening, and speaking.
              </p>
              <ul className="space-y-2">
                {["Real-world contexts", "Skill-specific activities", "Regular reinforcement"].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Languages You Can Learn</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start with one of our most popular language courses
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Spanish", icon: "🇪🇸", color: "bg-yellow-100 text-yellow-800" },
              { name: "French", icon: "🇫🇷", color: "bg-blue-100 text-blue-800" },
              { name: "German", icon: "🇩🇪", color: "bg-red-100 text-red-800" },
              { name: "Italian", icon: "🇮🇹", color: "bg-green-100 text-green-800" },
              { name: "Japanese", icon: "🇯🇵", color: "bg-pink-100 text-pink-800" },
              { name: "Chinese", icon: "🇨🇳", color: "bg-red-100 text-red-800" },
            ].map((language, index) => (
              <div 
                key={index} 
                className="language-card bg-white rounded-lg shadow-sm p-6 text-center"
              >
                <div className={`${language.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}>
                  {language.icon}
                </div>
                <h3 className="font-bold">{language.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/register">
              <Button size="lg">Start Learning Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied learners on their language journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Spanish Learner",
                image: "https://randomuser.me/api/portraits/women/11.jpg",
                quote: "Lingua Launchpad made learning Spanish fun and engaging. The bite-sized lessons fit perfectly into my busy schedule.",
              },
              {
                name: "Michael Chen",
                role: "French Learner",
                image: "https://randomuser.me/api/portraits/men/67.jpg",
                quote: "The interactive quizzes and practice sessions helped me gain confidence in speaking French. I'm now able to have basic conversations!",
              },
              {
                name: "Emma Rodriguez",
                role: "German Learner",
                image: "https://randomuser.me/api/portraits/women/46.jpg",
                quote: "I love how the platform tracks my progress and keeps me motivated with daily goals and streaks. Learning German has become a habit now.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Language Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Lingua Launchpad Academy and start speaking a new language with confidence.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start Learning for Free
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
