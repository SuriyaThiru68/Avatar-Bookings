import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Mail, Lock, User, AlertCircle, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AuthPage() {
    const [, setLocation] = useLocation();
    const { login, register } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'client'
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(loginForm.username, loginForm.password);

        if (result.success) {
            setSuccess('Secure Login successful! Redirecting...');
            setTimeout(() => setLocation('/appointment'), 1000);
        } else {
            setError(result.error || 'Login failed. Please check your credentials.');
        }

        setIsLoading(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (registerForm.password !== registerForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (registerForm.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        const result = await register(
            registerForm.username,
            registerForm.password,
            registerForm.email,
            registerForm.role
        );

        if (result.success) {
            setSuccess('Medical Account created! Redirecting...');
            setTimeout(() => setLocation('/appointment'), 1000);
        } else {
            setError(result.error || 'Registration failed. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#FCFDFD] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Decorative Blobs to match landing */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/30 rounded-full blur-[80px] -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                <button 
                  onClick={() => setLocation('/')}
                  className="flex items-center gap-2 text-slate-400 hover:text-teal-800 font-bold text-sm mb-12 transition-colors group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Plaza
                </button>

                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-teal-900 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-900/20">
                            <span className="text-white font-bold text-xl">+</span>
                        </div>
                        <div className="text-left">
                           <h1 className="font-extrabold text-2xl tracking-tight text-slate-900 leading-tight">Central Health Plaza</h1>
                           <span className="block text-[10px] uppercase tracking-widest text-teal-600 font-bold">Secure Patient Portal</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-1 shadow-[0_30px_80px_rgba(15,118,110,0.08)] border border-slate-50">
                   <Tabs defaultValue="login" className="w-full">
                       <TabsList className="grid w-full grid-cols-2 p-2 bg-slate-50 rounded-[2rem] h-16">
                           <TabsTrigger value="login" className="rounded-[1.5rem] data-[state=active]:bg-white data-[state=active]:text-teal-900 data-[state=active]:shadow-sm font-bold text-slate-400">Login</TabsTrigger>
                           <TabsTrigger value="register" className="rounded-[1.5rem] data-[state=active]:bg-white data-[state=active]:text-teal-900 data-[state=active]:shadow-sm font-bold text-slate-400">Sign Up</TabsTrigger>
                       </TabsList>

                       <div className="p-8">
                        {error && (
                            <Alert variant="destructive" className="mb-6 rounded-2xl bg-rose-50 border-rose-100 text-rose-800">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="font-medium">{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="mb-6 rounded-2xl bg-emerald-50 border-emerald-100 text-emerald-800">
                                <CheckCircle2 className="h-4 w-4" />
                                <AlertDescription className="font-bold">{success}</AlertDescription>
                            </Alert>
                        )}

                        <TabsContent value="login" className="mt-0 outline-none">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="login-username" className="text-slate-500 font-bold ml-1">Username</Label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-4 h-5 w-5 text-slate-300" />
                                        <Input
                                            id="login-username"
                                            placeholder="Enter your username"
                                            value={loginForm.username}
                                            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                            className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-teal-500 transition-all font-medium"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="login-password" className="text-slate-500 font-bold ml-1">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-300" />
                                        <Input
                                            id="login-password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={loginForm.password}
                                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                            className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-teal-500 transition-all font-medium"
                                            required
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full h-14 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-lg shadow-lg shadow-teal-900/10 transition-transform active:scale-95" disabled={isLoading}>
                                    {isLoading ? 'Verifying Identity...' : 'Sign In to Portal'}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="register" className="mt-0 outline-none">
                            <form onSubmit={handleRegister} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                   <div className="space-y-2">
                                       <Label htmlFor="register-username" className="text-slate-500 font-bold ml-1">Username</Label>
                                       <Input
                                           id="register-username"
                                           placeholder="user123"
                                           value={registerForm.username}
                                           onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                                           className="h-12 rounded-xl border-slate-100 bg-slate-50 font-medium"
                                           required
                                       />
                                   </div>
                                   <div className="space-y-2">
                                       <Label htmlFor="register-email" className="text-slate-500 font-bold ml-1">Email</Label>
                                       <Input
                                           id="register-email"
                                           type="email"
                                           placeholder="mail@health.com"
                                           value={registerForm.email}
                                           onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                                           className="h-12 rounded-xl border-slate-100 bg-slate-50 font-medium"
                                           required
                                       />
                                   </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-password" className="text-slate-500 font-bold ml-1">Create Password</Label>
                                    <Input
                                        id="register-password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={registerForm.password}
                                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                                        className="h-12 rounded-xl border-slate-100 bg-slate-50 font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-confirm" className="text-slate-500 font-bold ml-1">Confirm Password</Label>
                                    <Input
                                        id="register-confirm"
                                        type="password"
                                        placeholder="••••••••"
                                        value={registerForm.confirmPassword}
                                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                                        className="h-12 rounded-xl border-slate-100 bg-slate-50 font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-slate-500 font-bold ml-1">Account Type</Label>
                                    <div className="grid grid-cols-2 gap-3 p-1 bg-slate-50 rounded-2xl border border-slate-100">
                                        <button
                                            type="button"
                                            onClick={() => setRegisterForm({ ...registerForm, role: 'client' })}
                                            className={`py-3 rounded-xl text-sm font-bold transition-all ${registerForm.role === 'client' ? 'bg-white text-teal-800 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            Patient
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRegisterForm({ ...registerForm, role: 'professional' })}
                                            className={`py-3 rounded-xl text-sm font-bold transition-all ${registerForm.role === 'professional' ? 'bg-white text-teal-800 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            Provider
                                        </button>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full h-14 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-lg shadow-lg shadow-teal-900/10 transition-transform active:scale-95" disabled={isLoading}>
                                    {isLoading ? 'Creating Health ID...' : 'Join Health Plaza'}
                                </Button>
                            </form>
                        </TabsContent>
                       </div>
                   </Tabs>
                </div>

                <div className="flex items-center justify-center gap-6 mt-10">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Secure Cloud Sync</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">HIPAA Compliant</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">256-bit AES</span>
                </div>
            </motion.div>
        </div>
    );
}
