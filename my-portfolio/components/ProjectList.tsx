"use client";
import React, { useEffect, useState } from 'react';

export default function ProjectList() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      }
    };
    fetchProjects();
  }, []);

  if (projects.length === 0) {
    return <p className="text-slate-400">No projects yet.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(p => (
        <div key={p._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="h-44 bg-slate-800">
            {p.imageUrl ? <img src={p.imageUrl} alt={p.title} className="w-full h-44 object-cover" /> : null}
          </div>
          <div className="p-4">
            <h4 className="text-white font-bold mb-1">{p.title}</h4>
            <p className="text-slate-400 text-sm mb-3">{p.description.substring(0, 120)}...</p>
            <div className="flex gap-2">
              {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="px-3 py-2 bg-cyan-500 text-slate-900 rounded font-bold">Live</a>}
              {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer" className="px-3 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded">Repo</a>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
