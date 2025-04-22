
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
}

// Mock news data
const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'New Advancements in AI Technology',
    summary: 'Researchers have made significant breakthroughs in artificial intelligence, enabling more natural language processing capabilities.',
    source: 'Tech News',
    date: '2025-04-21'
  },
  {
    id: '2',
    title: 'Climate Change Summit Concludes with New Agreements',
    summary: 'World leaders have agreed to new measures to combat climate change at the latest international summit.',
    source: 'Global News',
    date: '2025-04-20'
  },
  {
    id: '3',
    title: 'Educational Technology Shows Promising Results',
    summary: 'Recent studies show that new educational technology tools are improving student engagement and learning outcomes.',
    source: 'Education Weekly',
    date: '2025-04-19'
  }
];

const News = () => {
  const [newsUrl, setNewsUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);

  const handleScrapeNews = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would call a backend API to scrape the news from the provided URL
      setIsLoading(false);
      alert('News scraping functionality would be implemented using your provided URL. For now, we\'re showing mock data.');
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Scrape News</CardTitle>
          <CardDescription>Enter a URL to scrape news from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter URL (e.g., https://example.com/news)"
              value={newsUrl}
              onChange={(e) => setNewsUrl(e.target.value)}
              className="flex-grow"
            />
            <Button 
              onClick={handleScrapeNews} 
              disabled={!newsUrl.trim() || isLoading}
            >
              {isLoading ? "Scraping..." : "Scrape"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>
                {item.source} • {new Date(item.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.summary}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;
