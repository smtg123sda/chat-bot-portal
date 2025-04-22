
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';

const THEME_STORAGE_KEY = "theme";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Initialize darkModeEnabled based on stored theme
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    setDarkModeEnabled(stored === "dark");
  }, []);
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };
  
  const handlePasswordSave = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkModeEnabled(checked);
    const newTheme = checked ? "dark" : "light";
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    document.documentElement.classList.toggle('dark', checked);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile}>Save Profile</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handlePasswordSave}>Change Password</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive email notifications about new content and updates</p>
              </div>
              <Switch 
                checked={notificationEnabled}
                onCheckedChange={setNotificationEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
              </div>
              <Switch 
                checked={darkModeEnabled}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
