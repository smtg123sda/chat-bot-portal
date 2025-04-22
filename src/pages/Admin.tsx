
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UsersList from '@/components/admin/UsersList';
import MCQEditor from '@/components/admin/MCQEditor';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  +2 since last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  +1 since yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  No change since last week
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions in your portal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">New user registered</p>
                      <p className="text-sm text-muted-foreground">Jane Smith registered an account</p>
                    </div>
                    <p className="text-sm">2 hours ago</p>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">Quiz completed</p>
                      <p className="text-sm text-muted-foreground">John Doe scored 4/5</p>
                    </div>
                    <p className="text-sm">5 hours ago</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Content updated</p>
                      <p className="text-sm text-muted-foreground">Admin updated MCQ questions</p>
                    </div>
                    <p className="text-sm">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your portal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="p-4 border rounded-lg text-center hover:bg-accent transition-colors"
                    onClick={() => setActiveTab('users')}
                  >
                    <div className="text-xl font-semibold mb-1">Users</div>
                    <p className="text-sm text-muted-foreground">Manage users</p>
                  </button>
                  <button
                    className="p-4 border rounded-lg text-center hover:bg-accent transition-colors"
                    onClick={() => setActiveTab('content')}
                  >
                    <div className="text-xl font-semibold mb-1">Content</div>
                    <p className="text-sm text-muted-foreground">Edit questions</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage your users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>MCQ Question Management</CardTitle>
              <CardDescription>Create and edit your quiz questions</CardDescription>
            </CardHeader>
            <CardContent>
              <MCQEditor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
