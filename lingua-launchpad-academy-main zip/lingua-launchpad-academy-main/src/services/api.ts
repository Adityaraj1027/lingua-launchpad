
// Mock API service for development - will replace with real API calls to backend later

// Language data
export interface Language {
  id: string;
  name: string;
  level: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
}

// Lesson data
export interface Lesson {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  duration: number;
  completed: boolean;
  locked: boolean;
  sections: {
    id: string;
    title: string;
    type: "text" | "vocabulary" | "example" | "grammar" | "interactive";
    content: string | string[] | { word: string; translation: string; example?: string }[];
  }[];
}

// Quiz data
export interface Quiz {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  questionCount: number;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  score?: number;
  locked: boolean;
  questions: {
    id: string;
    text: string;
    options: string[];
    correctOption: number;
    explanation?: string;
  }[];
}

// Practice data
export interface Practice {
  id: string;
  title: string;
  description: string;
  language: string;
  type: "vocabulary" | "grammar" | "listening" | "speaking" | "reading" | "writing";
  estimatedTime: number;
  content: {
    instructions: string;
    exercises: string[];
  };
}

// Mock data
const languages: Language[] = [
  {
    id: "spanish",
    name: "Spanish",
    level: "Beginner",
    progress: 35,
    lessonsCompleted: 7,
    totalLessons: 20
  },
  {
    id: "french",
    name: "French",
    level: "Beginner",
    progress: 15,
    lessonsCompleted: 3,
    totalLessons: 20
  },
  {
    id: "german",
    name: "German",
    level: "Beginner",
    progress: 5,
    lessonsCompleted: 1,
    totalLessons: 20
  }
];

const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Introduction to Spanish",
    description: "Learn basic Spanish greetings and introductions",
    language: "spanish",
    level: "Beginner",
    duration: 15,
    completed: true,
    locked: false,
    sections: [
      {
        id: "section-1",
        title: "Basic Greetings",
        type: "text",
        content: "Spanish is one of the most widely spoken languages in the world. In this lesson, we'll learn some basic greetings that you can use in everyday conversations."
      },
      {
        id: "section-2",
        title: "Common Phrases",
        type: "vocabulary",
        content: [
          {
            word: "Hola",
            translation: "Hello",
            example: "¡Hola! ¿Cómo estás?"
          },
          {
            word: "Buenos días",
            translation: "Good morning",
            example: "Buenos días, ¿cómo amaneciste?"
          },
          {
            word: "Buenas tardes",
            translation: "Good afternoon",
            example: "Buenas tardes, profesor."
          },
          {
            word: "Buenas noches",
            translation: "Good evening/night",
            example: "Buenas noches, hasta mañana."
          }
        ]
      },
      {
        id: "section-3",
        title: "Introducing Yourself",
        type: "example",
        content: [
          "Me llamo María. (My name is María.)",
          "Soy de España. (I am from Spain.)",
          "Encantado de conocerte. (Nice to meet you.) - used by men",
          "Encantada de conocerte. (Nice to meet you.) - used by women"
        ]
      },
      {
        id: "section-4",
        title: "Formal vs Informal",
        type: "grammar",
        content: "Spanish has formal and informal ways of addressing people. Use 'tú' for friends, family, and children. Use 'usted' for strangers, elders, and in formal situations."
      },
      {
        id: "section-5",
        title: "Practice",
        type: "interactive",
        content: [
          "How would you say 'Good morning' in Spanish?",
          "Buenas noches",
          "Buenos días",
          "Buenas tardes"
        ]
      }
    ]
  },
  {
    id: "lesson-2",
    title: "Basic Spanish Numbers",
    description: "Learn to count from 1 to 20 in Spanish",
    language: "spanish",
    level: "Beginner",
    duration: 20,
    completed: true,
    locked: false,
    sections: [
      {
        id: "section-1",
        title: "Introduction to Numbers",
        type: "text",
        content: "Numbers are essential for everyday communication. In this lesson, we'll learn the numbers 1-20 in Spanish."
      }
    ]
  },
  {
    id: "lesson-3",
    title: "Spanish Food Vocabulary",
    description: "Essential food and restaurant vocabulary",
    language: "spanish",
    level: "Beginner",
    duration: 25,
    completed: true,
    locked: false,
    sections: []
  },
  {
    id: "lesson-4",
    title: "Spanish Present Tense",
    description: "Learn regular verbs in the present tense",
    language: "spanish",
    level: "Beginner",
    duration: 30,
    completed: true,
    locked: false,
    sections: []
  },
  {
    id: "lesson-5",
    title: "Spanish Family Vocabulary",
    description: "Learn vocabulary for family members",
    language: "spanish",
    level: "Beginner",
    duration: 20,
    completed: true,
    locked: false,
    sections: []
  },
  {
    id: "lesson-6",
    title: "Directions in Spanish",
    description: "Learn how to ask for and give directions",
    language: "spanish",
    level: "Beginner",
    duration: 25,
    completed: true,
    locked: false,
    sections: []
  },
  {
    id: "lesson-7",
    title: "Weather Expressions",
    description: "Talk about the weather in Spanish",
    language: "spanish",
    level: "Beginner",
    duration: 20,
    completed: true,
    locked: false,
    sections: []
  },
  {
    id: "lesson-8",
    title: "Spanish Irregular Verbs",
    description: "Common irregular verbs in the present tense",
    language: "spanish",
    level: "Beginner",
    duration: 30,
    completed: false,
    locked: false,
    sections: []
  },
  {
    id: "lesson-9",
    title: "Spanish Past Tense",
    description: "Introduction to the past tense (preterite)",
    language: "spanish",
    level: "Beginner",
    duration: 35,
    completed: false,
    locked: true,
    sections: []
  },
  {
    id: "lesson-10",
    title: "Spanish Future Tense",
    description: "How to express future actions",
    language: "spanish",
    level: "Beginner",
    duration: 35,
    completed: false,
    locked: true,
    sections: []
  },
  {
    id: "french-1",
    title: "Introduction to French",
    description: "Learn basic French greetings and introductions",
    language: "french",
    level: "Beginner",
    duration: 15,
    completed: true,
    locked: false,
    sections: []
  },
  {
    id: "french-2",
    title: "French Numbers",
    description: "Learn to count in French",
    language: "french",
    level: "Beginner",
    duration: 20,
    completed: true,
    locked: false,
    sections: []
  },
  {
    id: "french-3",
    title: "French Articles",
    description: "Understanding definite and indefinite articles",
    language: "french",
    level: "Beginner",
    duration: 25,
    completed: true,
    locked: false,
    sections: []
  },
  {
    id: "german-1",
    title: "Introduction to German",
    description: "Learn basic German greetings and introductions",
    language: "german",
    level: "Beginner",
    duration: 15,
    completed: true,
    locked: false,
    sections: []
  }
];

const quizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Spanish Greetings Quiz",
    description: "Test your knowledge of Spanish greetings and introductions",
    language: "spanish",
    level: "Beginner",
    questionCount: 5,
    difficulty: "easy",
    completed: true,
    score: 80,
    locked: false,
    questions: [
      {
        id: "q1",
        text: "How do you say 'Hello' in Spanish?",
        options: ["Adiós", "Hola", "Gracias", "Por favor"],
        correctOption: 1,
        explanation: "'Hola' is the Spanish word for 'Hello'."
      },
      {
        id: "q2",
        text: "Which phrase means 'Good afternoon' in Spanish?",
        options: ["Buenos días", "Buenas noches", "Buenas tardes", "Buen provecho"],
        correctOption: 2,
        explanation: "'Buenas tardes' is used as a greeting in the afternoon."
      },
      {
        id: "q3",
        text: "How would you say 'My name is John' in Spanish?",
        options: ["Yo soy John", "El nombre es John", "Me llamo John", "Te llamas John"],
        correctOption: 2,
        explanation: "'Me llamo...' is the common way to introduce yourself in Spanish."
      },
      {
        id: "q4",
        text: "Which is the correct way to say 'How are you?' in Spanish?",
        options: ["¿Dónde estás?", "¿Quién eres?", "¿Qué tal?", "¿Cómo estás?"],
        correctOption: 3,
        explanation: "'¿Cómo estás?' is the direct translation of 'How are you?'"
      },
      {
        id: "q5",
        text: "What does 'Encantado de conocerte' mean in English?",
        options: ["See you later", "Nice to meet you", "I don't understand", "How's your day?"],
        correctOption: 1,
        explanation: "'Encantado de conocerte' means 'Nice to meet you' in English."
      }
    ]
  },
  {
    id: "quiz-2",
    title: "Spanish Numbers Quiz",
    description: "Test your knowledge of Spanish numbers 1-20",
    language: "spanish",
    level: "Beginner",
    questionCount: 5,
    difficulty: "easy",
    completed: false,
    locked: false,
    questions: []
  },
  {
    id: "quiz-3",
    title: "Spanish Food Vocabulary Quiz",
    description: "Test your knowledge of Spanish food vocabulary",
    language: "spanish",
    level: "Beginner",
    questionCount: 10,
    difficulty: "medium",
    completed: false,
    locked: false,
    questions: []
  },
  {
    id: "quiz-4",
    title: "Spanish Present Tense Quiz",
    description: "Test your knowledge of regular verbs in present tense",
    language: "spanish",
    level: "Beginner",
    questionCount: 10,
    difficulty: "medium",
    completed: false,
    locked: true,
    questions: []
  },
  {
    id: "french-quiz-1",
    title: "French Greetings Quiz",
    description: "Test your knowledge of French greetings",
    language: "french",
    level: "Beginner",
    questionCount: 5,
    difficulty: "easy",
    completed: true,
    score: 100,
    locked: false,
    questions: []
  },
  {
    id: "french-quiz-2",
    title: "French Numbers Quiz",
    description: "Test your knowledge of French numbers",
    language: "french",
    level: "Beginner",
    questionCount: 5,
    difficulty: "easy",
    completed: false,
    locked: false,
    questions: []
  },
  {
    id: "german-quiz-1",
    title: "German Greetings Quiz",
    description: "Test your knowledge of German greetings",
    language: "german",
    level: "Beginner",
    questionCount: 5,
    difficulty: "easy",
    completed: false,
    locked: false,
    questions: []
  }
];

const practices: Practice[] = [
  {
    id: "practice-1",
    title: "Spanish Greeting Practice",
    description: "Practice using Spanish greetings in different situations",
    language: "spanish",
    type: "speaking",
    estimatedTime: 10,
    content: {
      instructions: "Practice saying these common Spanish greetings out loud. Focus on pronunciation.",
      exercises: [
        "Hola, ¿cómo estás? (Hello, how are you?)",
        "Buenos días, ¿qué tal? (Good morning, how's it going?)",
        "Buenas tardes, encantado de conocerte. (Good afternoon, nice to meet you.)",
        "Buenas noches, hasta mañana. (Good night, see you tomorrow.)"
      ]
    }
  },
  {
    id: "practice-2",
    title: "Spanish Numbers Drill",
    description: "Practice counting from 1-20 in Spanish",
    language: "spanish",
    type: "vocabulary",
    estimatedTime: 5,
    content: {
      instructions: "Practice saying these numbers in Spanish. Try to memorize them.",
      exercises: ["uno (1)", "dos (2)", "tres (3)", "cuatro (4)", "cinco (5)"]
    }
  },
  {
    id: "practice-3",
    title: "Spanish Conversation Practice",
    description: "Practice a basic Spanish conversation with common phrases",
    language: "spanish",
    type: "speaking",
    estimatedTime: 15,
    content: {
      instructions: "Practice this conversation, alternating between both roles.",
      exercises: []
    }
  },
  {
    id: "practice-4",
    title: "Spanish Listening Exercise",
    description: "Listen to native speakers and improve your comprehension",
    language: "spanish",
    type: "listening",
    estimatedTime: 10,
    content: {
      instructions: "Listen to the audio clips and answer the questions.",
      exercises: []
    }
  },
  {
    id: "practice-5",
    title: "Spanish Reading Practice",
    description: "Read short paragraphs and answer questions",
    language: "spanish",
    type: "reading",
    estimatedTime: 15,
    content: {
      instructions: "Read the following paragraphs and answer the questions.",
      exercises: []
    }
  },
  {
    id: "practice-6",
    title: "Spanish Writing Exercise",
    description: "Practice writing basic Spanish sentences",
    language: "spanish",
    type: "writing",
    estimatedTime: 20,
    content: {
      instructions: "Write responses to the following prompts in Spanish.",
      exercises: []
    }
  },
  {
    id: "practice-7",
    title: "Spanish Grammar Drill",
    description: "Practice using articles and gender agreement",
    language: "spanish",
    type: "grammar",
    estimatedTime: 15,
    content: {
      instructions: "Fill in the blanks with the correct article (el, la, los, las).",
      exercises: []
    }
  },
  {
    id: "french-practice-1",
    title: "French Pronunciation Practice",
    description: "Practice French vowel sounds",
    language: "french",
    type: "speaking",
    estimatedTime: 10,
    content: {
      instructions: "Practice saying these French words with proper pronunciation.",
      exercises: []
    }
  },
  {
    id: "german-practice-1",
    title: "German Article Practice",
    description: "Practice using German articles (der, die, das)",
    language: "german",
    type: "grammar",
    estimatedTime: 15,
    content: {
      instructions: "Match the correct article with each noun.",
      exercises: []
    }
  }
];

// Mock user progress data
export interface UserProgress {
  languages: Language[];
  currentStreak: number;
  longestStreak: number;
  streakDays: Date[];
  totalLessonsCompleted: number;
  totalQuizzesCompleted: number;
  totalPracticeCompleted: number;
  recentActivity: {
    type: "lesson" | "quiz" | "practice";
    title: string;
    date: Date;
    score?: number;
  }[];
}

const userProgress: UserProgress = {
  languages: languages,
  currentStreak: 5,
  longestStreak: 14,
  streakDays: [
    new Date(2024, 3, 12),
    new Date(2024, 3, 13),
    new Date(2024, 3, 14),
    new Date(2024, 3, 15),
    new Date(2024, 3, 16),
  ],
  totalLessonsCompleted: 11,
  totalQuizzesCompleted: 2,
  totalPracticeCompleted: 8,
  recentActivity: [
    {
      type: "lesson",
      title: "Weather Expressions",
      date: new Date(2024, 3, 16),
    },
    {
      type: "practice",
      title: "Spanish Greeting Practice",
      date: new Date(2024, 3, 15),
    },
    {
      type: "quiz",
      title: "Spanish Numbers Quiz",
      date: new Date(2024, 3, 14),
      score: 90,
    },
    {
      type: "lesson",
      title: "Spanish Family Vocabulary",
      date: new Date(2024, 3, 13),
    },
    {
      type: "practice",
      title: "Spanish Writing Exercise",
      date: new Date(2024, 3, 12),
    },
  ],
};

// API Service
export const api = {
  // User Progress
  getUserProgress: async (): Promise<UserProgress> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return userProgress;
  },
  
  // Languages
  getLanguages: async (): Promise<Language[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return languages;
  },
  
  getLanguage: async (id: string): Promise<Language | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return languages.find(language => language.id === id);
  },
  
  // Lessons
  getLessons: async (language?: string): Promise<Lesson[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (language) {
      return lessons.filter(lesson => lesson.language === language);
    }
    return lessons;
  },
  
  getLesson: async (id: string): Promise<Lesson | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return lessons.find(lesson => lesson.id === id);
  },
  
  completeLesson: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const lesson = lessons.find(lesson => lesson.id === id);
    if (lesson && !lesson.completed) {
      lesson.completed = true;
      
      // Update user progress
      const language = languages.find(lang => lang.id === lesson.language);
      if (language) {
        language.lessonsCompleted += 1;
        language.progress = Math.round((language.lessonsCompleted / language.totalLessons) * 100);
      }
      
      userProgress.totalLessonsCompleted += 1;
      userProgress.recentActivity.unshift({
        type: "lesson",
        title: lesson.title,
        date: new Date(),
      });
      userProgress.recentActivity = userProgress.recentActivity.slice(0, 5);
    }
  },
  
  // Quizzes
  getQuizzes: async (language?: string): Promise<Quiz[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (language) {
      return quizzes.filter(quiz => quiz.language === language);
    }
    return quizzes;
  },
  
  getQuiz: async (id: string): Promise<Quiz | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return quizzes.find(quiz => quiz.id === id);
  },
  
  completeQuiz: async (id: string, score: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const quiz = quizzes.find(quiz => quiz.id === id);
    if (quiz) {
      quiz.completed = true;
      quiz.score = score;
      
      userProgress.totalQuizzesCompleted += 1;
      userProgress.recentActivity.unshift({
        type: "quiz",
        title: quiz.title,
        date: new Date(),
        score,
      });
      userProgress.recentActivity = userProgress.recentActivity.slice(0, 5);
    }
  },
  
  // Practice
  getPractices: async (language?: string, type?: string): Promise<Practice[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let filtered = practices;
    
    if (language) {
      filtered = filtered.filter(practice => practice.language === language);
    }
    
    if (type) {
      filtered = filtered.filter(practice => practice.type === type);
    }
    
    return filtered;
  },
  
  getPractice: async (id: string): Promise<Practice | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return practices.find(practice => practice.id === id);
  },
  
  completePractice: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const practice = practices.find(practice => practice.id === id);
    if (practice) {
      userProgress.totalPracticeCompleted += 1;
      userProgress.recentActivity.unshift({
        type: "practice",
        title: practice.title,
        date: new Date(),
      });
      userProgress.recentActivity = userProgress.recentActivity.slice(0, 5);
    }
  },
};
