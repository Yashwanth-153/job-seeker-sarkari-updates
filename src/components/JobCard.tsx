
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ExternalLink, BookOpen } from 'lucide-react';

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

interface JobCardProps {
  job: JobPosting;
}

export const JobCard = ({ job }: JobCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const formatDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Expired';
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays <= 7) {
      return `${diffDays} days left`;
    } else {
      return deadlineDate.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 leading-tight mb-2">
              {job.title}
            </CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              {job.organization}
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor(job.status)} text-xs font-medium`}>
            {job.status === 'active' ? 'Apply Now' : job.status === 'upcoming' ? 'Coming Soon' : 'Expired'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span>{job.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-green-500" />
            <span>{job.posts} Posts</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen className="h-4 w-4 text-purple-500" />
            <span>{job.qualification}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-red-500" />
            <span className={`font-medium ${isDeadlineNear(job.deadline) ? 'text-red-600' : 'text-gray-600'}`}>
              {formatDeadline(job.deadline)}
            </span>
            {isDeadlineNear(job.deadline) && (
              <Badge variant="outline" className="text-xs bg-red-50 text-red-600 border-red-200">
                Urgent
              </Badge>
            )}
          </div>
        </div>
        
        <div className="pt-2">
          <Button
            onClick={() => window.open(job.link, '_blank')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
