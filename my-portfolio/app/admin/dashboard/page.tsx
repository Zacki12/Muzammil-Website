'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, BookOpen, ShoppingCart, 
  FileText, Star, Settings, LogOut, Search, Bell, Plus, Edit, Trash2
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('Admin');
  const [courses, setCourses] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [certs, setCerts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalSales: 0,
    totalOrders: 0
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    youtubeVideoId: '',
    thumbnailUrl: ''
  });
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', excerpt: '', imageUrl: '', isPublished: false });
  const [newCert, setNewCert] = useState({ name: '', issuer: '', issueDate: '', certUrl: '', imageUrl: '' });
  const [newProject, setNewProject] = useState({ title: '', description: '', repoUrl: '', liveUrl: '', imageUrl: '', tags: '', isPublished: true });

  // Check authentication and fetch data
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        router.push('/admin');
        return;
      }

      setIsAuthenticated(true);

      // Fetch courses from backend
      try {
        const coursesRes = await fetch('http://localhost:5000/api/admin/courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData);
          setStats(prev => ({
            ...prev,
            totalCourses: coursesData.length
          }));
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }

      // Fetch blogs
      try {
        const blogsRes = await fetch('http://localhost:5000/api/admin/blogs', { headers: { 'Authorization': `Bearer ${token}` } });
        if (blogsRes.ok) {
          const blogsData = await blogsRes.json();
          setBlogs(blogsData);
        }
      } catch (err) { console.error('Failed to fetch blogs:', err); }

      // Fetch certifications
      try {
        const certRes = await fetch('http://localhost:5000/api/admin/certifications', { headers: { 'Authorization': `Bearer ${token}` } });
        if (certRes.ok) {
          const certData = await certRes.json();
          setCerts(certData);
        }
      } catch (err) { console.error('Failed to fetch certifications:', err); }

      // Fetch projects
      try {
        const projRes = await fetch('http://localhost:5000/api/admin/projects', { headers: { 'Authorization': `Bearer ${token}` } });
        if (projRes.ok) {
          const projData = await projRes.json();
          setProjects(projData);
        }
      } catch (err) { console.error('Failed to fetch projects:', err); }

      setLoading(false);
    };

    checkAuthAndFetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch('http://localhost:5000/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCourse)
      });

      if (res.ok) {
        const addedCourse = await res.json();
        setCourses([...courses, addedCourse]);
        setNewCourse({
          title: '',
          description: '',
          price: '',
          youtubeVideoId: '',
          thumbnailUrl: ''
        });
        setShowCourseForm(false);
        alert('Course added successfully!');
      } else {
        alert('Failed to add course');
      }
    } catch (err) {
      console.error('Error adding course:', err);
      alert('Error adding course');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    const token = localStorage.getItem('adminToken');

    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setCourses(courses.filter(c => c._id !== courseId));
        alert('Course deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('Error deleting course');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f172a]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-300 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] flex flex-col hidden md:flex border-r border-slate-700">
        <div className="p-6 text-2xl font-bold text-white tracking-wider">
          <span className="text-cyan-400">&lt;/&gt;</span> Admin
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem 
            icon={<BookOpen size={20} />} 
            label="Courses" 
            active={activeTab === 'courses'}
            onClick={() => setActiveTab('courses')}
          />
          <NavItem 
            icon={<FileText size={20} />}
            label="Blogs"
            active={activeTab === 'blogs'}
            onClick={() => setActiveTab('blogs')}
          />
          <NavItem 
            icon={<Star size={20} />}
            label="Certifications"
            active={activeTab === 'certifications'}
            onClick={() => setActiveTab('certifications')}
          />
          <NavItem 
            icon={<ShoppingCart size={20} />}
            label="Projects"
            active={activeTab === 'projects'}
            onClick={() => setActiveTab('projects')}
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </nav>

        <div className="p-4 mb-4">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 text-slate-400 hover:text-red-400 transition-colors w-full px-4 py-2 hover:bg-red-500/10 rounded-lg"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className="flex justify-between items-center p-6 bg-[#1e293b] md:bg-transparent border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'courses' && 'Manage Courses'}
            {activeTab === 'settings' && 'Settings'}
          </h1>
          <div className="flex items-center space-x-6">
            <Bell size={20} className="text-slate-400 hover:text-white cursor-pointer" />
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-sm">
                <p className="text-white font-medium">{adminName}</p>
                <p className="text-slate-500 text-xs">muzfs1@gmail.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          
          {activeTab === 'dashboard' && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats.totalUsers.toString()} trend="+0%" />
                <StatCard title="Total Courses" value={stats.totalCourses.toString()} trend={`+${courses.length > 0 ? '100' : '0'}%`} />
                <StatCard title="Total Sales" value="$0" trend="+0%" />
                <StatCard title="Total Orders" value="0" trend="+0%" />
              </div>

              {/* Recent Courses */}
              <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700">
                <h3 className="text-white font-medium mb-4">Recent Courses</h3>
                {courses.length === 0 ? (
                  <p className="text-slate-500">No courses yet. Create one in the Courses tab.</p>
                ) : (
                  <div className="space-y-3">
                    {courses.slice(0, 5).map(course => (
                      <div key={course._id} className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{course.title}</p>
                          <p className="text-slate-500 text-sm">${course.price}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${course.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {course.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'courses' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">All Courses ({courses.length})</h2>
                <button
                  onClick={() => setShowCourseForm(!showCourseForm)}
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-lg transition-all"
                >
                  <Plus size={20} />
                  Add Course
                </button>
              </div>

              {showCourseForm && (
                <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700 mb-6">
                  <h3 className="text-white font-medium mb-4">Create New Course</h3>
                  <form onSubmit={handleAddCourse} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Course Title"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                    <textarea
                      placeholder="Course Description"
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="YouTube Video ID (e.g., dQw4w9WgXcQ)"
                      value={newCourse.youtubeVideoId}
                      onChange={(e) => setNewCourse({...newCourse, youtubeVideoId: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Thumbnail URL (optional)"
                      value={newCourse.thumbnailUrl}
                      onChange={(e) => setNewCourse({...newCourse, thumbnailUrl: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-lg transition-all"
                      >
                        Create Course
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCourseForm(false)}
                        className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Courses List */}
              {courses.length === 0 ? (
                <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 text-center">
                  <BookOpen size={40} className="mx-auto text-slate-500 mb-2" />
                  <p className="text-slate-400">No courses yet. Create your first course!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {courses.map(course => (
                    <div key={course._id} className="bg-[#1e293b] p-5 rounded-xl border border-slate-700 flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{course.title}</h4>
                        <p className="text-slate-500 text-sm">{course.description.substring(0, 100)}...</p>
                        <div className="mt-2 flex gap-4 text-sm text-slate-400">
                          <span>Price: ${course.price}</span>
                          <span>Status: {course.isPublished ? '✅ Published' : '⏳ Draft'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course._id)}
                          className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'blogs' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">All Blogs ({blogs.length})</h2>
                <button
                  onClick={() => setShowBlogForm(!showBlogForm)}
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-lg transition-all"
                >
                  <Plus size={20} />
                  Add Blog
                </button>
              </div>

              {showBlogForm && (
                <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700 mb-6">
                  <h3 className="text-white font-medium mb-4">Create New Blog</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const token = localStorage.getItem('adminToken');
                    try {
                      const res = await fetch('http://localhost:5000/api/admin/blogs', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify(newBlog)
                      });
                      if (res.ok) {
                        const added = await res.json();
                        setBlogs([...(blogs || []), added]);
                        setNewBlog({ title: '', content: '', excerpt: '', imageUrl: '', isPublished: false });
                        setShowBlogForm(false);
                        alert('Blog added');
                      } else alert('Failed to add blog');
                    } catch (err) { console.error(err); alert('Error adding blog'); }
                  }} className="space-y-4">
                    <input type="text" placeholder="Title" value={newBlog.title} onChange={(e) => setNewBlog({...newBlog, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" required />
                    <textarea placeholder="Excerpt" value={newBlog.excerpt} onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" />
                    <textarea placeholder="Content" value={newBlog.content} onChange={(e) => setNewBlog({...newBlog, content: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" required />
                    <input type="text" placeholder="Image URL" value={newBlog.imageUrl} onChange={(e) => setNewBlog({...newBlog, imageUrl: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-lg">Create Blog</button>
                      <button type="button" onClick={() => setShowBlogForm(false)} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              {blogs.length === 0 ? (
                <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 text-center">
                  <FileText size={40} className="mx-auto text-slate-500 mb-2" />
                  <p className="text-slate-400">No blogs yet. Create one!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {blogs.map(b => (
                    <div key={b._id} className="bg-[#1e293b] p-5 rounded-xl border border-slate-700 flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{b.title}</h4>
                        <p className="text-slate-500 text-sm">{(b.excerpt || b.content || '').substring(0, 120)}...</p>
                        <div className="mt-2 text-sm text-slate-400">{b.isPublished ? 'Published' : 'Draft'}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all"><Edit size={18} /></button>
                        <button onClick={async () => {
                          if (!confirm('Delete this blog?')) return;
                          const token = localStorage.getItem('adminToken');
                          try {
                            const res = await fetch(`http://localhost:5000/api/admin/blogs/${b._id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
                            if (res.ok) setBlogs(blogs.filter(x => x._id !== b._id));
                          } catch (err) { console.error(err); }
                        }} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'certifications' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Certifications ({certs.length})</h2>
                <button onClick={() => setShowCertForm(!showCertForm)} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-lg transition-all">
                  <Plus size={20} />
                  Add Certification
                </button>
              </div>

              {showCertForm && (
                <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700 mb-6">
                  <h3 className="text-white font-medium mb-4">Create Certification</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const token = localStorage.getItem('adminToken');
                    try {
                      const res = await fetch('http://localhost:5000/api/admin/certifications', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(newCert) });
                      if (res.ok) {
                        const added = await res.json();
                        setCerts([...(certs || []), added]);
                        setNewCert({ name: '', issuer: '', issueDate: '', certUrl: '', imageUrl: '' });
                        setShowCertForm(false);
                        alert('Certification added');
                      } else alert('Failed to add certification');
                    } catch (err) { console.error(err); alert('Error adding certification'); }
                  }} className="space-y-4">
                    <input type="text" placeholder="Name" value={newCert.name} onChange={(e) => setNewCert({...newCert, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" required />
                    <input type="text" placeholder="Issuer" value={newCert.issuer} onChange={(e) => setNewCert({...newCert, issuer: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" required />
                    <input type="date" placeholder="Issue Date" value={newCert.issueDate} onChange={(e) => setNewCert({...newCert, issueDate: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" />
                    <input type="text" placeholder="Certificate URL" value={newCert.certUrl} onChange={(e) => setNewCert({...newCert, certUrl: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-lg">Create</button>
                      <button type="button" onClick={() => setShowCertForm(false)} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              {certs.length === 0 ? (
                <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 text-center">
                  <Star size={40} className="mx-auto text-slate-500 mb-2" />
                  <p className="text-slate-400">No certifications yet. Create one!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {certs.map(c => (
                    <div key={c._id} className="bg-[#1e293b] p-5 rounded-xl border border-slate-700 flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{c.name}</h4>
                        <p className="text-slate-500 text-sm">{c.issuer} • {c.issueDate ? new Date(c.issueDate).toLocaleDateString() : ''}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={async () => {
                          if (!confirm('Delete this certification?')) return;
                          const token = localStorage.getItem('adminToken');
                          try {
                            const res = await fetch(`http://localhost:5000/api/admin/certifications/${c._id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
                            if (res.ok) setCerts(certs.filter(x => x._id !== c._id));
                          } catch (err) { console.error(err); }
                        }} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'projects' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Projects ({projects.length})</h2>
                <button
                  onClick={() => {
                    setShowCourseForm(false);
                    setShowBlogForm(false);
                    setShowCertForm(false);
                  }}
                  className="hidden"
                />
                <button
                  onClick={() => {
                    setShowCourseForm(false);
                    setShowBlogForm(false);
                    setShowCertForm(false);
                  }}
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-lg transition-all"
                >
                  <Plus size={20} />
                  Add Project
                </button>
              </div>

              <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700 mb-6">
                <h3 className="text-white font-medium mb-4">Create New Project</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const token = localStorage.getItem('adminToken');
                  try {
                    const payload = { ...newProject, tags: newProject.tags ? newProject.tags.split(',').map((t:string)=>t.trim()) : [] };
                    const res = await fetch('http://localhost:5000/api/admin/projects', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
                    if (res.ok) {
                      const added = await res.json();
                      setProjects([...(projects || []), added]);
                      setNewProject({ title: '', description: '', repoUrl: '', liveUrl: '', imageUrl: '', tags: '', isPublished: true });
                      alert('Project added');
                    } else alert('Failed to add project');
                  } catch (err) { console.error(err); alert('Error adding project'); }
                }} className="space-y-4">
                  <input type="text" placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" required />
                  <textarea placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" required />
                  <input type="text" placeholder="Repository URL" value={newProject.repoUrl} onChange={(e) => setNewProject({...newProject, repoUrl: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" />
                  <input type="text" placeholder="Live URL" value={newProject.liveUrl} onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" />
                  <input type="text" placeholder="Image URL" value={newProject.imageUrl} onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" />
                  <input type="text" placeholder="Tags (comma separated)" value={newProject.tags} onChange={(e) => setNewProject({...newProject, tags: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white" />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-lg">Create Project</button>
                  </div>
                </form>
              </div>

              {projects.length === 0 ? (
                <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 text-center">
                  <ShoppingCart size={40} className="mx-auto text-slate-500 mb-2" />
                  <p className="text-slate-400">No projects yet. Create one!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {projects.map(p => (
                    <div key={p._id} className="bg-[#1e293b] p-5 rounded-xl border border-slate-700 flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{p.title}</h4>
                        <p className="text-slate-500 text-sm">{(p.description || '').substring(0, 120)}...</p>
                        <div className="mt-2 text-sm text-slate-400">{(p.tags || []).join(', ')}</div>
                      </div>
                      <div className="flex gap-2">
                        <a href={p.liveUrl || '#'} target="_blank" rel="noreferrer" className="p-2 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 rounded-lg">Live</a>
                        <a href={p.repoUrl || '#'} target="_blank" rel="noreferrer" className="p-2 bg-slate-700 text-white rounded-lg">Repo</a>
                        <button onClick={async () => {
                          if (!confirm('Delete this project?')) return;
                          const token = localStorage.getItem('adminToken');
                          try {
                            const res = await fetch(`http://localhost:5000/api/admin/projects/${p._id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
                            if (res.ok) setProjects(projects.filter(x => x._id !== p._id));
                          } catch (err) { console.error(err); }
                        }} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'settings' && (
            <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700">
              <h3 className="text-white font-medium mb-4">Settings</h3>
              <p className="text-slate-400">Settings page coming soon...</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
};

type StatCardProps = {
  title: string;
  value: number | string;
  trend: string;
};

// Reusable Sub-components
const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ title, value, trend }: StatCardProps) => (
  <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700 flex flex-col justify-between">
    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    <div className="mt-4 flex justify-between items-end">
      <span className="text-3xl font-bold text-white">{value}</span>
      <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded">{trend}</span>
    </div>
  </div>
);

export default AdminDashboard;
