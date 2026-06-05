"use client";
import React, { useEffect, useState } from 'react';

export default function CertificationList() {
  const [certs, setCerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/certifications');
        if (res.ok) {
          const data = await res.json();
          setCerts(data);
        }
      } catch (err) {
        console.error('Failed to fetch certifications', err);
      }
    };
    fetchCerts();
  }, []);

  if (certs.length === 0) {
    return <p className="text-slate-400">No certifications listed yet.</p>;
  }

  return (
    <div className="space-y-4">
      {certs.map((c) => (
        <div key={c._id} className="bg-slate-900 p-4 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-medium">{c.name}</p>
              <p className="text-slate-400 text-sm">{c.issuer} • {c.issueDate ? new Date(c.issueDate).getFullYear() : ''}</p>
            </div>
            {c.certUrl && (
              <a href={c.certUrl} target="_blank" rel="noreferrer" className="text-cyan-400 text-sm">View</a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
