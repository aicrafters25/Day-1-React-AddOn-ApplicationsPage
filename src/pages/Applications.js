import React, { useMemo, useState } from 'react';

const SAMPLE = [
  { id: 101, applicant: 'Sara Al Thani', service: 'Housing Loan', status: 'SUBMITTED', submittedAt: '2025-10-18' },
  { id: 102, applicant: 'Mohammed Ali', service: 'Pension Eligibility', status: 'APPROVED', submittedAt: '2025-10-17' },
  { id: 103, applicant: 'Aisha Noor', service: 'Family Certificate', status: 'REJECTED', submittedAt: '2025-10-17' },
  { id: 104, applicant: 'Youssef Ben', service: 'Birth Registration', status: 'PENDING', submittedAt: '2025-10-16' }
];

export default function Applications() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('ALL');

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return SAMPLE
      .filter(r => status === 'ALL' ? true : r.status === status)
      .filter(r =>
        !q ||
        String(r.id).includes(q) ||
        r.applicant.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q)
      );
  }, [query, status]);

  return (
    <div>
      <h3>Applications</h3>

      {/* Controls */}
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', margin:'10px 0' }}>
        <input
          placeholder="Search by ID, applicant, or service"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ padding:8, minWidth:260 }}
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="ALL">All statuses</option>
          <option value="SUBMITTED">SUBMITTED</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
          <option value="PENDING">PENDING</option>
        </select>
      </div>

      {/* List */}
      <div style={{ display:'grid', gap:10 }}>
        {results.map(r => (
          <div key={r.id} className="card">
            <div className="card-row">
              <strong>#{r.id}</strong>
              <span className={`badge badge-${r.status.toLowerCase()}`}>{r.status}</span>
            </div>
            <div className="card-row"><strong>Applicant:</strong> {r.applicant}</div>
            <div className="card-row"><strong>Service:</strong> {r.service}</div>
            <div className="card-row"><strong>Submitted:</strong> {r.submittedAt}</div>
          </div>
        ))}
        {results.length === 0 && <div>No results</div>}
      </div>
    </div>
  );
}
