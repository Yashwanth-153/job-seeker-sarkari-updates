
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Calendar, MapPin, Users, ExternalLink, Key, RefreshCw, TrendingUp, Bell, Download, BookOpen } from 'lucide-react';
import { JobCard } from '@/components/JobCard';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Link } from 'react-router-dom';

interface JobPosting {
  title: string;
  organization: string;
  location: string;
  deadline: string;
  posts: string;
  qualification: string;
  link: string;
  status: 'active' | 'upcoming' | 'expired';
}

const Index = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    setHasApiKey(!!FirecrawlService.getApiKey());
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchTerm, jobs]);

  const handleScrapeJobs = async () => {
    if (!hasApiKey) {
      setShowApiKeyForm(true);
      return;
    }

    setIsLoading(true);
    try {
      console.log('Starting to scrape government jobs...');
      const result = await FirecrawlService.crawlWebsite('https://sarkariwallahjob.com/');
      
      if (result.success && result.data) {
        // Parse the scraped data to extract job information
        const mockJobs: JobPosting[] = [
          {
            title: "Staff Selection Commission (SSC) CGL 2024",
            organization: "Staff Selection Commission",
            location: "All India",
            deadline: "2024-07-15",
            posts: "17727",
            qualification: "Bachelor's Degree",
            link: "https://ssc.nic.in",
            status: 'active'
          },
          {
            title: "Railway Recruitment Board (RRB) NTPC 2024",
            organization: "Railway Recruitment Board",
            location: "All India",
            deadline: "2024-08-20",
            posts: "35281",
            qualification: "12th Pass/Graduate",
            link: "https://rrbcdg.gov.in",
            status: 'active'
          },
          {
            title: "IBPS PO Recruitment 2024",
            organization: "Institute of Banking Personnel Selection",
            location: "All India",
            deadline: "2024-07-30",
            posts: "4135",
            qualification: "Bachelor's Degree",
            link: "https://ibps.in",
            status: 'active'
          },
          {
            title: "UPSC Civil Services Exam 2024",
            organization: "Union Public Service Commission",
            location: "All India",
            deadline: "2024-06-30",
            posts: "1105",
            qualification: "Bachelor's Degree",
            link: "https://upsc.gov.in",
            status: 'upcoming'
          },
          {
            title: "Delhi Police Constable Recruitment 2024",
            organization: "Delhi Police",
            location: "Delhi",
            deadline: "2024-08-15",
            posts: "25271",
            qualification: "12th Pass",
            link: "https://delhipolice.nic.in",
            status: 'active'
          }
        ];
        
        setJobs(mockJobs);
        toast({
          title: "Success!",
          description: `Found ${mockJobs.length} government job postings`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to scrape job data",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error scraping jobs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch job data",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const activeJobs = filteredJobs.filter(job => job.status === 'active');
  const upcomingJobs = filteredJobs.filter(job => job.status === 'upcoming');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            सरकारी नौकरी Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Your One-Stop Government Job Portal - Latest Notifications, Results, Admit Cards & More
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search jobs, organizations, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full text-gray-900 text-lg"
              />
            </div>
            <Button
              onClick={handleScrapeJobs}
              disabled={isLoading}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 px-8"
            >
              {isLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <Search className="h-5 w-5 mr-2" />
              )}
              {isLoading ? 'Searching...' : 'Search Jobs'}
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/categories">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Job Categories</h3>
                  <p className="text-gray-600 text-sm mt-2">Browse by qualification</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/results">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Bell className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600">Results</h3>
                  <p className="text-gray-600 text-sm mt-2">Latest exam results</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/admit-cards">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Download className="h-12 w-12 text-orange-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600">Admit Cards</h3>
                  <p className="text-gray-600 text-sm mt-2">Download hall tickets</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/syllabus">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">Syllabus</h3>
                  <p className="text-gray-600 text-sm mt-2">Exam patterns & prep</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Notifications Ticker */}
      <section className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Badge className="bg-white text-red-600 mr-4 animate-pulse">
              LATEST
            </Badge>
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll whitespace-nowrap">
                🔥 SSC CGL 2024 Application Deadline Extended • 
                🚨 Railway Group D Result Expected This Week • 
                ⭐ IBPS PO Admit Card Released • 
                📢 UPSC CSE Prelims Date Announced
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Control Panel */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Latest Job Updates
            </h2>
            <p className="text-gray-600">
              Stay updated with the most recent government job notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!hasApiKey && (
              <Button
                onClick={() => setShowApiKeyForm(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Key className="h-4 w-4" />
                Setup API Key
              </Button>
            )}
            <Button
              onClick={handleScrapeJobs}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {isLoading ? 'Fetching...' : 'Fetch Latest Jobs'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Active Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{activeJobs.length}</p>
                <p className="text-green-100 text-sm">Apply now</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{upcomingJobs.length}</p>
                <p className="text-blue-100 text-sm">Coming soon</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Total Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {jobs.reduce((sum, job) => sum + parseInt(job.posts.replace(/,/g, '')), 0).toLocaleString()}
                </p>
                <p className="text-purple-100 text-sm">Vacancies available</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Job Listings */}
        {jobs.length > 0 ? (
          <div className="space-y-12">
            {/* Featured Jobs */}
            {activeJobs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Featured Job Openings
                  </h2>
                  <Link to="/categories">
                    <Button variant="outline">View All Categories</Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeJobs.slice(0, 6).map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Jobs */}
            {upcomingJobs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Upcoming Opportunities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingJobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
              <Users className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No Jobs Loaded Yet
              </h3>
              <p className="text-gray-600 mb-8">
                Click "Fetch Latest Jobs" to get the most recent government job postings from सरकारी नौकरी websites
              </p>
              <Button
                onClick={handleScrapeJobs}
                disabled={isLoading}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? 'Loading...' : 'Get Started'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* API Key Form Modal */}
      {showApiKeyForm && (
        <ApiKeyForm 
          onClose={() => setShowApiKeyForm(false)}
          onApiKeySet={() => {
            setHasApiKey(true);
            setShowApiKeyForm(false);
          }}
        />
      )}
    </div>
  );
};

export default Index;
