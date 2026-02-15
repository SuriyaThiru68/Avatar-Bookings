import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Calendar,
    Clock,
    Search,
    Filter,
    Download,
    Star,
    MessageSquare,
    Video,
    CheckCircle2,
    XCircle,
    Clock3
} from 'lucide-react';

export default function BookingsPage() {
    const { user } = useAuth();
    const [, setLocation] = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    if (!user) {
        setLocation('/auth');
        return null;
    }

    const bookings = [
        {
            id: 1,
            professional: 'Dr. Sarah Chen',
            role: 'Clinical Psychologist',
            date: '2026-02-20',
            time: '2:00 PM',
            duration: '60 min',
            status: 'upcoming',
            rating: null,
            price: '$120',
            thumbnail: 'SC'
        },
        {
            id: 2,
            professional: 'Marcus Reynolds',
            role: 'Creative Director',
            date: '2026-02-18',
            time: '10:00 AM',
            duration: '45 min',
            status: 'completed',
            rating: 5,
            price: '$150',
            thumbnail: 'MR'
        },
        {
            id: 3,
            professional: 'Elena Rodriguez',
            role: 'Executive Coach',
            date: '2026-02-15',
            time: '9:00 AM',
            duration: '60 min',
            status: 'completed',
            rating: 5,
            price: '$180',
            thumbnail: 'ER'
        },
        {
            id: 4,
            professional: 'James Wilson',
            role: 'Financial Advisor',
            date: '2026-02-10',
            time: '3:00 PM',
            duration: '30 min',
            status: 'completed',
            rating: 4,
            price: '$100',
            thumbnail: 'JW'
        },
        {
            id: 5,
            professional: 'Lisa Anderson',
            role: 'Career Counselor',
            date: '2026-02-05',
            time: '11:00 AM',
            duration: '45 min',
            status: 'cancelled',
            rating: null,
            price: '$90',
            thumbnail: 'LA'
        },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="w-4 h-4" />;
            case 'upcoming':
                return <Clock3 className="w-4 h-4" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'upcoming':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'cancelled':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    const filterBookings = (status) => {
        let filtered = bookings;

        if (status === 'upcoming') {
            filtered = bookings.filter(b => b.status === 'upcoming');
        } else if (status === 'completed') {
            filtered = bookings.filter(b => b.status === 'completed');
        } else if (status === 'cancelled') {
            filtered = bookings.filter(b => b.status === 'cancelled');
        }

        if (searchQuery) {
            filtered = filtered.filter(b =>
                b.professional.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.role.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    const BookingCard = ({ booking }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
        >
            <Card className="hover:shadow-lg transition-all border-2 hover:border-primary/20">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-14 h-14">
                                <AvatarFallback className="text-lg bg-primary/10 text-primary font-bold">
                                    {booking.thumbnail}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">
                                    {booking.professional}
                                </h3>
                                <p className="text-sm text-slate-500">{booking.role}</p>
                                {booking.rating && (
                                    <div className="flex items-center gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < booking.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {new Date(booking.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {booking.time} ({booking.duration})
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-lg font-bold text-primary">{booking.price}</span>
                        <div className="flex gap-2">
                            {booking.status === 'upcoming' && (
                                <>
                                    <Button size="sm" variant="outline">
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        Message
                                    </Button>
                                    <Button size="sm">
                                        <Video className="w-4 h-4 mr-2" />
                                        Join Session
                                    </Button>
                                </>
                            )}
                            {booking.status === 'completed' && (
                                <>
                                    <Button size="sm" variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Receipt
                                    </Button>
                                    <Button size="sm" onClick={() => setLocation('/')}>
                                        Rebook
                                    </Button>
                                </>
                            )}
                            {booking.status === 'cancelled' && (
                                <Button size="sm" variant="outline">
                                    View Details
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <Button variant="ghost" onClick={() => setLocation('/')}>
                                ← Back to Home
                            </Button>
                            <h1 className="text-3xl font-black text-slate-900 mt-4">My Bookings</h1>
                            <p className="text-slate-600 mt-1">Manage your consultation sessions</p>
                        </div>
                        <Button onClick={() => setLocation('/')}>
                            <Calendar className="w-4 h-4 mr-2" />
                            New Booking
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search bookings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button variant="outline">
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-8">
                        <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
                        <TabsTrigger value="upcoming">
                            Upcoming ({bookings.filter(b => b.status === 'upcoming').length})
                        </TabsTrigger>
                        <TabsTrigger value="completed">
                            Completed ({bookings.filter(b => b.status === 'completed').length})
                        </TabsTrigger>
                        <TabsTrigger value="cancelled">
                            Cancelled ({bookings.filter(b => b.status === 'cancelled').length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        {filterBookings('all').map(booking => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </TabsContent>

                    <TabsContent value="upcoming" className="space-y-4">
                        {filterBookings('upcoming').map(booking => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </TabsContent>

                    <TabsContent value="completed" className="space-y-4">
                        {filterBookings('completed').map(booking => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </TabsContent>

                    <TabsContent value="cancelled" className="space-y-4">
                        {filterBookings('cancelled').map(booking => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
