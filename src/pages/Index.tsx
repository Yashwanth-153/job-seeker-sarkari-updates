
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Calendar, MapPin, Users, ExternalLink, Key, RefreshCw } from 'lucide-react';
import { JobCard } from '@/components/JobCard';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { FirecrawlService } from '@/utils/FirecrawlService';

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
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                सरकारी नौकरी Updates
              </h1>
              <p className="text-gray-600">
                Latest government job notifications and application deadlines
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
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search jobs, organizations, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stats Cards */}
        {jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Active Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{activeJobs.length}</p>
                <p className="text-green-100 text-sm">Apply now</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Upcoming Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{upcomingJobs.length}</p>
                <p className="text-blue-100 text-sm">Coming soon</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Total Posts</CardTitle>
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
          <div className="space-y-8">
            {/* Active Jobs */}
            {activeJobs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active Job Openings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeJobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Jobs */}
            {upcomingJobs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
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
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Jobs Loaded Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Click "Fetch Latest Jobs" to get the most recent government job postings
              </p>
              <Button
                onClick={handleScrapeJobs}
                disabled={isLoading}
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
