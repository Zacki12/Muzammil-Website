'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, BookOpen, ShoppingCart, 
  FileText, Star, Settings, LogOut, Search, Bell, 
  Plus, Shield, Eye, Trash2, Edit, Ban, CheckCircle, AlertTriangle
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// --- DUMMY DATA FOR SPECIFIED REQUIREMENT MODULES ---
const salesData = [
  { name: '5', value: 4000 }, { name: '10', value: 7000 },
  { name: '15', value: 12000 }, { name: '20', value: 18000 },
  { name: '25', value: 21000 }, { name: '30', value: 24580 },
];

const ordersData = [
  { name: '5', value: 120 }, { name: '10', value: 240 },
  { name: '15', value: 180 }, { name: '20', value: 410 },
  { name: '25', value: 320 }, { name: '30', value: 568 },
];

const initialUsers = [
  { id: 1, name: 'Muzammil Idrees', email: 'muzfs1@gmail.com', joined: 'May 20, 2026', status: 'Active', purchases: 3 },
  { id: 2, name: 'Alice Smith', email: 'alice@example.com', joined: 'May 19, 2026', status: 'Active', purchases: 1 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joined: 'May 18, 2026', status: 'Active', purchases: 0 },
  { id: 4, name: 'Charlie Brown', email: 'charlie@example.com', joined: 'May 18, 2026', status: 'Inactive', purchases: 2 },
  { id: 5, name: 'David Wilson', email: 'david@example.com', joined: 'May 17, 2026', status: 'Active', purchases: 5 },
];

const initialCourses = [
  { id: 1, title: 'Ethical Hacking Complete Course', price: '$49.99', students: 1245, status: 'Published' },
  { id: 2, title: 'Network Security Fundamentals', price: '$39.99', students: 986, status: 'Published' },
  { id: 3, title: 'React.js Complete Guide', price: '$34.99', students: 1102, status: 'Published' },
  { id: 4, title: 'Python for Beginners Complete Course', price: '$29.99', students: 1567, status: 'Published' },
  { id: 5, title: 'Nmap Network Scanning Guide', price: '$24.99', students: 876, status: 'Draft' },
  { id: 6, title: 'Wireshark Packet Analysis', price: '$24.99', students: 765, status: 'Published' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState(initialUsers);
  const [courses, setCourses] = useState(initialCourses);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check authentication and fetch data
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        router.push('/admin');
        return;
      }

      try {
        // Fetch courses from backend
        const coursesRes = await fetch('http://localhost:5000/api/admin/courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          const formattedCourses = coursesData.map((course: any, index: number) => ({
            id: index + 1,
            title: course.title,
            price: `$${course.price}`,
            students: Math.floor(Math.random() * 2000),
            status: course.isPublished ? 'Published' : 'Draft'
          }));
          setCourses(formattedCourses);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data from backend');
      }

      setLoading(false);
    };

    checkAuthAndFetchData();
  }, [router]);

  // --- REQUISITE ACTIONS MAPPED TO REQUIREMENTS ---
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const handleToggleBlockUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0b0f19]">
        <div className="text-white text-lg font-mono">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-300 font-sans antialiased selection:bg-cyan-500 selection:text-slate-900">
      
      {/* Sidebar Component */}
      <aside className="w-64 bg-[#111827] flex flex-col hidden md:flex border-r border-slate-800">
        <div className="p-6 text-xl font-bold text-white tracking-wider flex items-center gap-2">
          <Shield className="text-cyan-400" size={24} />
          <span>Muzammil <span className="text-cyan-400 text-sm block font-normal font-mono">Admin Panel</span></span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
            <LayoutDashboard size={18} /> <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'users' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
            <Users size={18} /> <span className="text-sm font-medium">Users Management</span>
          </button>
          <button onClick={() => setActiveTab('courses')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'courses' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
            <BookOpen size={18} /> <span className="text-sm font-medium">Courses Management</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors">
            <ShoppingCart size={18} /> <span className="text-sm font-medium">Orders</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors">
            <FileText size={18} /> <span className="text-sm font-medium">Reports</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors">
            <Settings size={18} /> <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800/60">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/5 transition-all w-full px-4 py-2 rounded-lg"
          >
            <LogOut size={18} /> <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Universal Top Bar */}
        <header className="flex justify-between items-center p-6 bg-[#111827]/40 border-b border-slate-800/60 backdrop-blur-md sticky top-0 z-50">
          <h1 className="text-xl font-bold text-white uppercase tracking-wider font-mono">
            {activeTab === 'dashboard' && 'System Analytics'}
            {activeTab === 'users' && 'Access Control / Users'}
            {activeTab === 'courses' && 'LMS Repository / Courses'}
          </h1>
          <div className="flex items-center space-x-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Query system registry..." 
                className="bg-[#111827] text-xs rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 w-64 border border-slate-800 placeholder-slate-600 text-slate-300 transition-all"
              />
            </div>
            <div className="flex items-center space-x-3 border-l border-slate-800 pl-6">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono text-sm">
                MI
              </div>
              <div className="hidden sm:block text-xs">
                <p className="text-white font-medium">Muzammil Idrees</p>
                <p className="text-cyan-500/70 font-mono tracking-tight text-[10px]">Root Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Workspace Router */}
        <main className="p-6">
          
          {/* TAB 1: ANALYTICS OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Engaged Users" value="1,234" trend="+12.5%" theme="cyan" />
                <StatCard title="Active LMS Courses" value="24" trend="+8.2%" theme="purple" />
                <StatCard title="Gross Platform Revenue" value="$24,580" trend="+18.7%" theme="emerald" />
                <StatCard title="System Orders Settled" value="568" trend="+15.3%" theme="amber" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#111827] p-5 rounded-xl border border-slate-800/80 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-white text-sm font-semibold tracking-wide">Revenue Telemetry (This Month)</h3>
                    <p className="text-slate-500 text-xs">Gross transaction logs metrics stream</p>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} />
                        <YAxis stroke="#4b5563" fontSize={11} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px', fontSize: '12px' }} />
                        <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4, stroke: '#0b0f19', strokeWidth: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#111827] p-5 rounded-xl border border-slate-800/80 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-white text-sm font-semibold tracking-wide">Volume Stream (Orders Volume)</h3>
                    <p className="text-slate-500 text-xs">Successfully processed platform checkouts</p>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ordersData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} />
                        <YAxis stroke="#4b5563" fontSize={11} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px', fontSize: '12px' }} />
                        <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="bg-[#111827] rounded-xl border border-slate-800/80 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-white text-sm font-semibold">User Authentication Profiles</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Manage credentials, toggle restriction vectors, and view order logs</p>
                </div>
                <button className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-semibold font-sans tracking-wide transition-all shadow-lg shadow-cyan-500/10">
                  <Plus size={14} /> <span>Provision New User</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1f2937]/30 border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      <th className="py-3 px-6">Identified Name</th>
                      <th className="py-3 px-6">Email Target</th>
                      <th className="py-3 px-6">Access Date</th>
                      <th className="py-3 px-6 text-center">Purchased Assets</th>
                      <th className="py-3 px-6">Security Context</th>
                      <th className="py-3 px-6 text-center">Execution Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="py-3.5 px-6 font-medium text-white">{user.name}</td>
                        <td className="py-3.5 px-6 font-mono text-slate-400">{user.email}</td>
                        <td className="py-3.5 px-6 text-slate-500">{user.joined}</td>
                        <td className="py-3.5 px-6 text-center font-mono font-semibold text-cyan-400">{user.purchases}</td>
                        <td className="py-3.5 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                            <span className={`w-1 h-1 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-6">
                          <div className="flex items-center justify-center space-x-2">
                            <button title="Toggle Restriction" onClick={() => handleToggleBlockUser(user.id)} className={`p-1.5 rounded border transition-colors ${user.status === 'Active' ? 'border-slate-700 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400' : 'border-slate-700 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400'}`}>
                              {user.status === 'Active' ? <Ban size={13} /> : <CheckCircle size={13} />}
                            </button>
                            <button title="Purge Record" onClick={() => handleDeleteUser(user.id)} className="p-1.5 rounded border border-slate-700 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: COURSE MANAGEMENT */}
          {activeTab === 'courses' && (
            <div className="bg-[#111827] rounded-xl border border-slate-800/80 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-white text-sm font-semibold">Course Platform & Catalog</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Control pricing matrices, deploy safe private YouTube structures, and modify details</p>
                </div>
                <button className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-semibold font-sans tracking-wide transition-all shadow-lg shadow-emerald-500/10">
                  <Plus size={14} /> <span>Deploy New LMS Node</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1f2937]/30 border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      <th className="py-3 px-6">Course Framework Title</th>
                      <th className="py-3 px-6">Price Ledger</th>
                      <th className="py-3 px-6 text-center">Enrolled Candidates</th>
                      <th className="py-3 px-6">Deployment Matrix</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {courses.map(course => (
                      <tr key={course.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="py-4 px-6 font-medium text-white flex items-center gap-3">
                          <div className="w-7 h-7 bg-slate-800 border border-slate-700 rounded flex items-center justify-center text-cyan-400 font-mono text-[10px] font-bold">
                            SEC
                          </div>
                          {course.title}
                        </td>
                        <td className="py-4 px-6 font-mono font-medium text-emerald-400">{course.price}</td>
                        <td className="py-4 px-6 text-center font-mono text-slate-400">{course.students.toLocaleString()}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide ${course.status === 'Published' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-slate-700/30 text-slate-500 border border-slate-700/40'}`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center space-x-2">
                            <button title="Edit Target" className="p-1.5 rounded border border-slate-700 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                              <Edit size={13} />
                            </button>
                            <button title="Decommission Node" onClick={() => handleDeleteCourse(course.id)} className="p-1.5 rounded border border-slate-700 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS FOR BULK CODE CLEANLINESS ---
function StatCard({ title, value, trend, theme }: { title: string; value: string; trend: string; theme: 'cyan' | 'purple' | 'emerald' | 'amber' }) {
  const styles = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-cyan-500/5',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/5',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/5'
  };

  return (
    <div className="bg-[#111827] p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between shadow-sm">
      <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider font-mono">{title}</h3>
      <div className="mt-4 flex justify-between items-end">
        <span className="text-2xl font-bold text-white tracking-tight font-sans">{value}</span>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${styles[theme]}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}