
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Download, ExternalLink, Search, Clock, Users, Target, FileText } from 'lucide-react';

interface SyllabusItem {
  id: string;
  examName: string;
  organization: string;
  category: string;
  syllabusLink: string;
  examPatternLink?: string;
  previousPapersLink?: string;
  duration: string;
  totalMarks: string;
  subjects: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const mockSyllabusData: SyllabusItem[] = [
  {
    id: '1',
    examName: 'SSC CGL (Combined Graduate Level)',
    organization: 'Staff Selection Commission',
    category: 'Central Government',
    syllabusLink: 'https://ssc.nic.in/syllabus',
    examPatternLink: 'https://ssc.nic.in/pattern',
    previousPapersLink: 'https://ssc.nic.in/papers',
    duration: '4 hours (across 4 tiers)',
    totalMarks: '200 marks (Tier-1)',
    subjects: ['General Intelligence', 'General Awareness', 'Quantitative Aptitude', 'English Language'],
    difficulty: 'Medium'
  },
  {
    id: '2',
    examName: 'IBPS PO (Probationary Officer)',
    organization: 'Institute of Banking Personnel Selection',
    category: 'Banking',
    syllabusLink: 'https://ibps.in/syllabus',
    examPatternLink: 'https://ibps.in/pattern',
    duration: '3 hours (Prelims + Mains)',
    totalMarks: '100 + 200 marks',
    subjects: ['English Language', 'Quantitative Aptitude', 'Reasoning Ability', 'General Awareness', 'Computer Knowledge'],
    difficulty: 'Hard'
  },
  {
    id: '3',
    examName: 'Railway Group D',
    organization: 'Railway Recruitment Board',
    category: 'Railway',
    syllabusLink: 'https://rrbcdg.gov.in/syllabus',
    duration: '90 minutes',
    totalMarks: '100 marks',
    subjects: ['Mathematics', 'General Intelligence', 'General Science', 'General Awareness'],
    difficulty: 'Easy'
  },
  {
    id: '4',
    examName: 'UPSC Civil Services (Prelims)',
    organization: 'Union Public Service Commission',
    category: 'UPSC',
    syllabusLink: 'https://upsc.gov.in/syllabus',
    examPatternLink: 'https://upsc.gov.in/pattern',
    previousPapersLink: 'https://upsc.gov.in/papers',
    duration: '4 hours (2 papers)',
    totalMarks: '400 marks',
    subjects: ['History', 'Geography', 'Polity', 'Economics', 'Environment', 'Science & Technology', 'Current Affairs'],
    difficulty: 'Hard'
  }
];

const preparationTips = [
  {
    title: "Create a Study Schedule",
    description: "Plan your preparation timeline based on exam dates and difficulty level."
  },
  {
    title: "Focus on Weak Areas",
    description: "Identify and spend extra time on subjects you find challenging."
  },
  {
    title: "Practice Previous Papers",
    description: "Solve last 5-10 years' question papers to understand patterns."
  },
  {
    title: "Take Mock Tests",
    description: "Regular mock tests help improve time management and accuracy."
  },
  {
    title: "Stay Updated",
    description: "Keep track of current affairs, especially for competitive exams."
  },
  {
    title: "Revision Strategy",
    description: "Regular revision is key to retaining what you've studied."
  }
];

const Syllabus = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [filteredSyllabus, setFilteredSyllabus] = useState(mockSyllabusData);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Syllabus & Exam Pattern</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete syllabus, exam patterns, and preparation resources for government exams
          </p>
        </div>

        <Tabs defaultValue="syllabus" className="space-y-8">
          <TabsList className="grid w-full lg:w-1/2 mx-auto grid-cols-3">
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="tips">Preparation Tips</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="syllabus" className="space-y-8">
            {/* Filters */}
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search exams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Central Government">Central Government</SelectItem>
                    <SelectItem value="Banking">Banking</SelectItem>
                    <SelectItem value="Railway">Railway</SelectItem>
                    <SelectItem value="UPSC">UPSC</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </Card>

            {/* Syllabus Cards */}
            <div className="space-y-6">
              {filteredSyllabus.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                          {item.examName}
                        </CardTitle>
                        <CardDescription className="text-gray-600 font-medium">
                          {item.organization}
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getDifficultyColor(item.difficulty)}>
                          {item.difficulty}
                        </Badge>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>Duration: {item.duration}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Target className="h-4 w-4 text-green-500" />
                        <span>Total Marks: {item.totalMarks}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Subjects Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => window.open(item.syllabusLink, '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download Syllabus
                      </Button>
                      
                      {item.examPatternLink && (
                        <Button
                          variant="outline"
                          onClick={() => window.open(item.examPatternLink, '_blank')}
                          className="flex items-center justify-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Exam Pattern
                        </Button>
                      )}
                      
                      {item.previousPapersLink && (
                        <Button
                          variant="outline"
                          onClick={() => window.open(item.previousPapersLink, '_blank')}
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Previous Papers
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preparationTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Free Study Materials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 mb-4">Access free study materials and notes for various government exams.</p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Browse Materials
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Online Mock Tests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 mb-4">Practice with timed mock tests to improve your performance.</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Take Mock Test
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    Previous Year Papers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 mb-4">Download and practice previous year question papers.</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Papers
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-600" />
                    Preparation Videos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 mb-4">Watch expert-curated preparation videos and tutorials.</p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Watch Videos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Syllabus;
