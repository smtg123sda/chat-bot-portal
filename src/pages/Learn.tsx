
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Learn = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>
      
      <div className="bg-accent/30 p-6 rounded-lg border border-accent mb-8">
        <h2 className="text-xl font-semibold mb-2">Coming Soon!</h2>
        <p>Our comprehensive learning platform is under development. Check back soon for tutorials, courses, and interactive learning materials.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Programming Basics</CardTitle>
            <CardDescription>Learn the fundamentals of programming</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Topics include variables, data types, control structures, and more.</p>
            <Button variant="outline" disabled>Coming Soon</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Web Development</CardTitle>
            <CardDescription>Master HTML, CSS, and JavaScript</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Build responsive websites from scratch and learn modern development tools.</p>
            <Button variant="outline" disabled>Coming Soon</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Science</CardTitle>
            <CardDescription>Explore data analysis and machine learning</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Learn how to analyze data, create visualizations, and build predictive models.</p>
            <Button variant="outline" disabled>Coming Soon</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Learn;
