
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Download, ExternalLink, Search, Trophy, AlertCircle } from 'lucide-react';

interface Result {
  id: string;
  examName: string;
  organization: string;
  releaseDate: string;
  resultType: 'Final' | 'Preliminary' | 'Mains' | 'Interview' | 'Merit List';
  status: 'Released' | 'Expected' | 'Delayed';
  resultLink: string;
  cutoffLink?: string;
  category: string;
}

const mockResults: Result[] = [
  {
    id: '1',
    examName: 'SSC CGL 2024 Tier-1 Result',
    organization: 'Staff Selection Commission',
    releaseDate: '2024-07-10',
    resultType: 'Preliminary',
    status: 'Released',
    resultLink: 'https://ssc.nic.in',
    cutoffLink: 'https://ssc.nic.in/cutoff',
    category: 'Central Government'
  },
  {
    id: '2',
    examName: 'IBPS PO Prelims Result 2024',
    organization: 'Institute of Banking Personnel Selection',
    releaseDate: '2024-07-15',
    resultType: 'Preliminary',
    status: 'Released',
    resultLink: 'https://ibps.in',
    category: 'Banking'
  },
  {
    id: '3',
    examName: 'Railway Group D Result 2024',
    organization: 'Railway Recruitment Board',
    releaseDate: '2024-07-20',
    resultType: 'Final',
    status: 'Expected',
    resultLink: 'https://rrbcdg.gov.in',
    category: 'Railway'
  },
  {
    id: '4',
    examName: 'UPSC CSE Mains Result 2024',
    organization: 'Union Public Service Commission',
    releaseDate: '2024-08-01',
    resultType: 'Mains',
    status: 'Expected',
    resultLink: 'https://upsc.gov.in',
    category: 'UPSC'
  },
  {
    id: '5',
    examName: 'Delhi Police Constable Result',
    organization: 'Delhi Police',
    releaseDate: '2024-07-25',
    resultType: 'Final',
    status: 'Delayed',
    resultLink: 'https://delhipolice.nic.in',
    category: 'Police'
  }
];

const Results = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredResults, setFilteredResults] = useState(mockResults);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Released':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Expected':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delayed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getResultTypeColor = (type: string) => {
    switch (type) {
      case 'Final':
        return 'bg-purple-100 text-purple-800';
      case 'Preliminary':
        return 'bg-blue-100 text-blue-800';
      case 'Mains':
        return 'bg-orange-100 text-orange-800';
      case 'Interview':
        return 'bg-green-100 text-green-800';
      case 'Merit List':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const isDatePassed = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date < today;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Exam Results</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest government exam results and merit lists
          </p>
        </div>

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
                  <SelectItem value="Released">Released</SelectItem>
                  <SelectItem value="Expected">Expected</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Filter Results
              </Button>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Results Released</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {mockResults.filter(r => r.status === 'Released').length}
              </p>
              <p className="text-green-100 text-sm">Available now</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Expected Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {mockResults.filter(r => r.status === 'Expected').length}
              </p>
              <p className="text-blue-100 text-sm">Coming this month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Delayed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {mockResults.filter(r => r.status === 'Delayed').length}
              </p>
              <p className="text-orange-100 text-sm">Past expected date</p>
            </CardContent>
          </Card>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {filteredResults.map((result) => (
            <Card key={result.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                      {result.examName}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-medium">
                      {result.organization}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getStatusColor(result.status)}>
                      {result.status}
                    </Badge>
                    <Badge className={getResultTypeColor(result.resultType)}>
                      {result.resultType}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays className="h-4 w-4 text-blue-500" />
                    <span className={isDatePassed(result.releaseDate) && result.status === 'Expected' ? 'text-red-600' : ''}>
                      {result.status === 'Released' ? 'Released on: ' : 'Expected on: '}
                      {formatDate(result.releaseDate)}
                    </span>
                    {isDatePassed(result.releaseDate) && result.status === 'Expected' && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Badge variant="outline">{result.category}</Badge>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => window.open(result.resultLink, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                    disabled={result.status !== 'Released'}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {result.status === 'Released' ? 'Check Result' : 'Not Available Yet'}
                  </Button>
                  
                  {result.cutoffLink && result.status === 'Released' && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(result.cutoffLink, '_blank')}
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Cutoff
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredResults.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Results Found
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

export default Results;
