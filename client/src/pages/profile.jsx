import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    User,
    Mail,
    Calendar,
    Shield,
    LogOut,
    Settings,
    CreditCard,
    Bell,
    History,
    Star
} from 'lucide-react';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [, setLocation] = useLocation();

    if (!user) {
        setLocation('/auth');
        return null;
    }

    const handleLogout = async () => {
        await logout();
        setLocation('/auth');
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" onClick={() => setLocation('/')}>
                                ← Back to Home
                            </Button>
                        </div>
                        <Button variant="destructive" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center text-center">
                                        <Avatar className="w-24 h-24 mb-4">
                                            <AvatarFallback className="text-2xl bg-primary text-white">
                                                {getInitials(user.username || 'User')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-1">{user.username}</h2>
                                        <p className="text-slate-500 mb-4">{user.email || 'user@proconnect.com'}</p>
                                        <Badge variant={user.role === 'admin' ? 'destructive' : 'default'}>
                                            {user.role === 'professional' ? 'Professional' : user.role === 'admin' ? 'Admin' : 'Client'}
                                        </Badge>
                                    </div>

                                    <Separator className="my-6" />

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-600">{user.email || 'user@proconnect.com'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-600">Joined {new Date().toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Shield className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-600">Account verified</span>
                                        </div>
                                    </div>

                                    <Separator className="my-6" />

                                    <div className="space-y-2">
                                        <Button variant="outline" className="w-full justify-start">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Edit Profile
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start">
                                            <Bell className="w-4 h-4 mr-2" />
                                            Notifications
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start">
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            Payment Methods
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column - Stats and Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Statistics</CardTitle>
                                    <CardDescription>Your activity overview</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center p-6 bg-primary/5 rounded-xl">
                                            <div className="text-4xl font-black text-primary mb-2">12</div>
                                            <div className="text-sm font-semibold text-slate-600">Total Bookings</div>
                                        </div>
                                        <div className="text-center p-6 bg-green-50 rounded-xl">
                                            <div className="text-4xl font-black text-green-600 mb-2">8</div>
                                            <div className="text-sm font-semibold text-slate-600">Completed</div>
                                        </div>
                                        <div className="text-center p-6 bg-amber-50 rounded-xl">
                                            <div className="text-4xl font-black text-amber-600 mb-2">4</div>
                                            <div className="text-sm font-semibold text-slate-600">Upcoming</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Recent Bookings</CardTitle>
                                            <CardDescription>Your latest consultation sessions</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => setLocation('/bookings')}>
                                            <History className="w-4 h-4 mr-2" />
                                            View All
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'Dr. Sarah Chen', type: 'Clinical Psychologist', date: 'Feb 20, 2026', status: 'Upcoming' },
                                            { name: 'Marcus Reynolds', type: 'Creative Director', date: 'Feb 18, 2026', status: 'Completed' },
                                            { name: 'Elena Rodriguez', type: 'Executive Coach', date: 'Feb 15, 2026', status: 'Completed' },
                                        ].map((booking, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <Avatar>
                                                        <AvatarFallback>{getInitials(booking.name)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h4 className="font-semibold text-slate-900">{booking.name}</h4>
                                                        <p className="text-sm text-slate-500">{booking.type}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-slate-900">{booking.date}</p>
                                                    <Badge variant={booking.status === 'Upcoming' ? 'default' : 'secondary'} className="mt-1">
                                                        {booking.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {user.role === 'professional' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Professional Dashboard</CardTitle>
                                        <CardDescription>Manage your professional profile</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-6 bg-slate-50 rounded-xl">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Star className="w-5 h-5 text-amber-500" />
                                                    <span className="text-2xl font-black text-slate-900">4.9</span>
                                                </div>
                                                <p className="text-sm text-slate-600">Average Rating</p>
                                            </div>
                                            <div className="p-6 bg-slate-50 rounded-xl">
                                                <div className="text-2xl font-black text-slate-900 mb-2">156</div>
                                                <p className="text-sm text-slate-600">Total Reviews</p>
                                            </div>
                                        </div>
                                        <Button className="w-full mt-4">
                                            Update Availability
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
