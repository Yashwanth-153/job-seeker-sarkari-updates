
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, Key, ExternalLink } from 'lucide-react';
import { FirecrawlService } from '@/utils/FirecrawlService';

interface ApiKeyFormProps {
  onClose: () => void;
  onApiKeySet: () => void;
}

export const ApiKeyForm = ({ onClose, onApiKeySet }: ApiKeyFormProps) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Firecrawl API key",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsValidating(true);
    try {
      const isValid = await FirecrawlService.testApiKey(apiKey.trim());
      
      if (isValid) {
        FirecrawlService.saveApiKey(apiKey.trim());
        toast({
          title: "Success!",
          description: "API key saved successfully",
          duration: 3000,
        });
        onApiKeySet();
      } else {
        toast({
          title: "Invalid API Key",
          description: "Please check your API key and try again",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-blue-600" />
              <CardTitle>Setup Firecrawl API Key</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            You need a Firecrawl API key to scrape job data from websites
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How to get your API key:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Visit <a href="https://firecrawl.dev" target="_blank" rel="noopener noreferrer" className="underline">firecrawl.dev</a></li>
              <li>2. Sign up for a free account</li>
              <li>3. Go to your dashboard and copy your API key</li>
            </ol>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://firecrawl.dev', '_blank')}
              className="mt-2 text-blue-600 border-blue-300"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Get API Key
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">Firecrawl API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="fc-..."
                className="font-mono text-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isValidating}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isValidating ? 'Validating...' : 'Save API Key'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
          
          <p className="text-xs text-gray-500">
            Your API key is stored locally in your browser and never shared with anyone.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
