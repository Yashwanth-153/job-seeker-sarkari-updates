
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Download, ExternalLink, Search, CreditCard, AlertCircle, Clock } from 'lucide-react';

interface AdmitCard {
  id: string;
  examTitle: string;
  organization: string;
  releaseDate: string;
  examDate: string;
  status: 'Available' | 'Coming Soon' | 'Delayed';
  downloadLink: string;
  category: string;
  instructions?: string;
}

const mockAdmitCards: AdmitCard[] = [
  {
    id: '1',
    examTitle: 'SSC CGL 2024 Tier-1',
    organization: 'Staff Selection Commission',
    releaseDate: '2024-07-05',
    examDate: '2024-07-20',
    status: 'Available',
    downloadLink: 'https://ssc.nic.in',
    category: 'Central Government',
    instructions: 'Bring photo ID and exam confirmation'
  },
  {
    id: '2',
    examTitle: 'IBPS PO Prelims 2024',
    organization: 'Institute of Banking Personnel Selection',
    releaseDate: '2024-07-10',
    examDate: '2024-07-25',
    status: 'Available',
    downloadLink: 'https://ibps.in',
    category: 'Banking'
  },
  {
    id: '3',
    examTitle: 'Railway Group D CBT 2024',
    organization: 'Railway Recruitment Board',
    releaseDate: '2024-07-18',
    examDate: '2024-08-05',
    status: 'Coming Soon',
    downloadLink: 'https://rrbcdg.gov.in',
    category: 'Railway'
  },
  {
    id: '4',
    examTitle: 'UPSC CSE Prelims 2024',
    organization: 'Union Public Service Commission',
    releaseDate: '2024-07-15',
    examDate: '2024-08-10',
    status: 'Coming Soon',
    downloadLink: 'https://upsc.gov.in',
    category: 'UPSC'
  },
  {
    id: '5',
    examTitle: 'Delhi Police Constable',
    organization: 'Delhi Police',
    releaseDate: '2024-07-12',
    examDate: '2024-07-30',
    status: 'Delayed',
    downloadLink: 'https://delhipolice.nic.in',
    category: 'Police'
  }
];

const AdmitCards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredCards, setFilteredCards] = useState(mockAdmitCards);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Coming Soon':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delayed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available':
        return <Download className="h-4 w-4" />;
      case 'Coming Soon':
        return <Clock className="h-4 w-4" />;
      case 'Delayed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntilExam = (examDate: string) => {
    const exam = new Date(examDate);
    const today = new Date();
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Admit Cards</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download your admit cards for upcoming government exams
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-l-4 border-l-yellow-500 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Important Instructions</h3>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Download admit card at least 2-3 days before exam</li>
                  <li>• Carry a valid photo ID along with the admit card</li>
                  <li>• Check exam center address and reporting time carefully</li>
                  <li>• Take multiple printouts as backup</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="mb-8">
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
                  <SelectItem value="Police">Police</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Filter Cards
              </Button>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Available Now</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {mockAdmitCards.filter(c => c.status === 'Available').length}
              </p>
              <p className="text-green-100 text-sm">Ready to download</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {mockAdmitCards.filter(c => c.status === 'Coming Soon').length}
              </p>
              <p className="text-blue-100 text-sm">Expected this week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Urgent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {mockAdmitCards.filter(c => getDaysUntilExam(c.examDate) <= 7).length}
              </p>
              <p className="text-orange-100 text-sm">Exam within 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Admit Cards List */}
        <div className="space-y-6">
          {filteredCards.map((card) => {
            const daysUntilExam = getDaysUntilExam(card.examDate);
            const isUrgent = daysUntilExam <= 7 && daysUntilExam > 0;
            
            return (
              <Card key={card.id} className={`hover:shadow-lg transition-all duration-300 border-l-4 ${
                isUrgent ? 'border-l-red-500' : 'border-l-blue-500'
              }`}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl font-semibold text-gray-900">
                          {card.examTitle}
                        </CardTitle>
                        {isUrgent && (
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-gray-600 font-medium">
                        {card.organization}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getStatusColor(card.status)}>
                        {getStatusIcon(card.status)}
                        <span className="ml-1">{card.status}</span>
                      </Badge>
                      <Badge variant="outline">{card.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays className="h-4 w-4 text-blue-500" />
                      <span>
                        Release Date: {formatDate(card.releaseDate)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-green-500" />
                      <span className={isUrgent ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                        Exam Date: {formatDate(card.examDate)}
                        {daysUntilExam > 0 && (
                          <span className="ml-1">
                            ({daysUntilExam} days left)
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  {card.instructions && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Instructions:</strong> {card.instructions}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => window.open(card.downloadLink, '_blank')}
                      className={`flex items-center justify-center gap-2 ${
                        card.status === 'Available' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                      } text-white`}
                      disabled={card.status !== 'Available'}
                    >
                      <Download className="h-4 w-4" />
                      {card.status === 'Available' ? 'Download Admit Card' : 'Not Available Yet'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => window.open(card.downloadLink, '_blank')}
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Official Site
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Cards */}
        {filteredCards.length === 0 && (
          <div className="text-center py-16">
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Admit Cards Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmitCards;
