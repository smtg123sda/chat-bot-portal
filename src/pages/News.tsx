
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

// Mock news data fallback
const MOCK_NEWS = [
  {
    id: '1',
    title: 'New Advancements in AI Technology',
    summary: 'Researchers have made significant breakthroughs in artificial intelligence, enabling more natural language processing capabilities.',
    source: 'Tech News',
    date: '2025-04-21',
    url: 'https://technews.com/ai-advancements'
  },
  {
    id: '2',
    title: 'Climate Change Summit Concludes with New Agreements',
    summary: 'World leaders have agreed to new measures to combat climate change at the latest international summit.',
    source: 'Global News',
    date: '2025-04-20',
    url: 'https://globalnews.com/climate-summit'
  },
  {
    id: '3',
    title: 'Educational Technology Shows Promising Results',
    summary: 'Recent studies show that new educational technology tools are improving student engagement and learning outcomes.',
    source: 'Education Weekly',
    date: '2025-04-19',
    url: 'https://educationweekly.com/edtech-results'
  }
];

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url?: string;
}

async function fetchNewsFromSite(url: string): Promise<NewsItem[]> {
  // Naive scraping using fetch; in reality you would use a backend
  // Proxy is needed to avoid CORS, so this is still only a frontend simulation.
  // Pretend two headlines per site
  if (url.includes("onlinekhabar")) {
    return [
      {
        id: 'ok1',
        title: "प्रधानमन्त्री फेरि सँगै, बजेट संसद्‍मा पेस, सर्वोच्चले माग्यो जवाफ",
        summary: "प्रधानमन्त्री तथा अर्थमन्त्रीले संसदमा बजेट प्रस्तुत गरे। सर्वोच्चले बजेटप्रति उठेका प्रश्नमा सरकारसँग जवाफ मागेको छ।",
        source: "onlinekhabar.com",
        date: new Date().toISOString().slice(0, 10),
        url: "https://www.onlinekhabar.com"
      },
      {
        id: 'ok2',
        title: "नेपालको मौसममा फेरि परिवर्तन, केही स्थानमा वर्षा",
        summary: "नेपालका केही स्थानमा आज आंशिकदेखि सामान्य वर्षा भइरहेको छ।",
        source: "onlinekhabar.com",
        date: new Date().toISOString().slice(0, 10),
        url: "https://www.onlinekhabar.com"
      }
    ];
  } else if (url.includes("setopati")) {
    return [
      {
        id: "seto1",
        title: "संविधान संशोधन प्रस्ताव, राजनीतिक विवाद",
        summary: "सरकारले नयाँ संविधान संशोधन प्रस्ताव प्रस्तुत गरेको छ, जसमा विभिन्न राजनीतिक दलहरूको मतभिन्नता देखिएको छ।",
        source: "setopati.com",
        date: new Date().toISOString().slice(0, 10),
        url: "https://www.setopati.com"
      },
      {
        id: "seto2",
        title: "नेपालमा खानेपानी समस्या समाधानका उपायहरू",
        summary: "सरकारी प्रयासले नेपालका केही शहरमा खानेपानीको समस्या केही हदसम्म कम भएको छ।",
        source: "setopati.com",
        date: new Date().toISOString().slice(0, 10),
        url: "https://www.setopati.com"
      }
    ];
  }
  return [];
}

const FETCH_SITES = [
  "https://www.onlinekhabar.com",
  "https://www.setopati.com"
];

const News = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAllNews = async () => {
    setIsLoading(true);
    setError(null);
    let allNews: NewsItem[] = [];
    try {
      for (let url of FETCH_SITES) {
        const siteNews = await fetchNewsFromSite(url);
        allNews = allNews.concat(siteNews);
      }
      setNews(allNews.length ? allNews : MOCK_NEWS);
    } catch (e) {
      setError("Failed to fetch news.");
      setNews(MOCK_NEWS);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllNews();
    timerRef.current = setInterval(fetchAllNews, 10 * 60 * 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Function to handle the Read More button click
  const handleReadMore = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      {isLoading && <div className="mb-4">Fetching latest legal news...</div>}
      {error && <div className="mb-4 text-red-500">{error}</div>}
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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleReadMore(item.url)}
                className="flex items-center gap-2"
              >
                Read More
                <ExternalLink size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;
