
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const qualificationCategories = [
  { name: "10th Pass", count: 156, icon: "📚", description: "High School qualification jobs" },
  { name: "12th Pass", count: 289, icon: "🎓", description: "Intermediate level positions" },
  { name: "Diploma", count: 134, icon: "📋", description: "Technical diploma holders" },
  { name: "Graduate", count: 567, icon: "🎯", description: "Bachelor's degree required" },
  { name: "Postgraduate", count: 234, icon: "🏆", description: "Master's degree positions" },
];

const sectorCategories = [
  { name: "Banking", count: 89, icon: "🏦", color: "bg-green-100 text-green-800" },
  { name: "Railways", count: 234, icon: "🚂", color: "bg-blue-100 text-blue-800" },
  { name: "Police", count: 156, icon: "👮", color: "bg-red-100 text-red-800" },
  { name: "Teaching", count: 178, icon: "👨‍🏫", color: "bg-purple-100 text-purple-800" },
  { name: "Defense", count: 123, icon: "🛡️", color: "bg-orange-100 text-orange-800" },
  { name: "PSU", count: 167, icon: "🏭", color: "bg-yellow-100 text-yellow-800" },
  { name: "SSC", count: 145, icon: "📄", color: "bg-indigo-100 text-indigo-800" },
  { name: "UPSC", count: 67, icon: "🏛️", color: "bg-pink-100 text-pink-800" },
];

const stateCategories = [
  { name: "Telangana", count: 234, code: "TS" },
  { name: "Andhra Pradesh", count: 189, code: "AP" },
  { name: "Maharashtra", count: 345, code: "MH" },
  { name: "Karnataka", count: 256, code: "KA" },
  { name: "Tamil Nadu", count: 298, code: "TN" },
  { name: "Kerala", count: 167, code: "KL" },
  { name: "Gujarat", count: 201, code: "GJ" },
  { name: "Rajasthan", count: 178, code: "RJ" },
];

const organizationCategories = [
  { name: "UPSC", fullName: "Union Public Service Commission", count: 67, type: "Central" },
  { name: "SSC", fullName: "Staff Selection Commission", count: 145, type: "Central" },
  { name: "IBPS", fullName: "Institute of Banking Personnel Selection", count: 89, type: "Banking" },
  { name: "DRDO", fullName: "Defence Research and Development Organisation", count: 45, type: "Defense" },
  { name: "ISRO", fullName: "Indian Space Research Organisation", count: 34, type: "Space" },
  { name: "RRB", fullName: "Railway Recruitment Board", count: 234, type: "Railway" },
];

const JobCategories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find government jobs based on your qualification, preferred sector, state, or organization
          </p>
        </div>

        {/* By Qualification */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">By Qualification</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {qualificationCategories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center pb-3">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {category.count} Jobs
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* By Sector */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">By Sector</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectorCategories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge className={category.color}>
                    {category.count} Openings
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* By State */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">By State</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {stateCategories.map((state) => (
              <Card key={state.name} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="font-bold text-lg text-blue-600 mb-1">{state.code}</div>
                  <div className="text-sm font-medium group-hover:text-blue-600 transition-colors mb-2">
                    {state.name}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {state.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* By Organization */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">By Organization</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizationCategories.map((org) => (
              <Card key={org.name} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {org.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {org.fullName}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{org.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{org.count}</span>
                    <Button variant="outline" size="sm">
                      View Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h3>
              <p className="text-blue-100 mb-6">
                Use our advanced search to find jobs by specific criteria or browse all available positions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Advanced Search
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                    Browse All Jobs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobCategories;
