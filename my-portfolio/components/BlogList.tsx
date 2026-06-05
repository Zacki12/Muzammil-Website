"use client";
import React, { useEffect, useState } from 'react';

export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/blogs');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      }
    };
    fetchBlogs();
  }, []);

  if (blogs.length === 0) {
    return <p className="text-slate-400">No blog posts yet.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {blogs.map((b) => (
        <a key={b._id} href="#" className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-all group">
          <span className="text-cyan-400 font-mono text-xs mb-2 block">{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : ''}</span>
          <h4 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{b.title}</h4>
          <p className="text-slate-400 text-sm">{b.excerpt || b.content.substring(0, 120) + '...'}</p>
        </a>
      ))}
    </div>
  );
}
