import React, { useState } from 'react';

export default function Apply() {
  const [qid, setQid] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading'); setResult(null); setError('');

    try {
      const qs = new URLSearchParams({
        qid,
        firstName: first,
        lastName: last
      }).toString();

      // Use proxy path; CRA forwards to http://localhost:8081/hellomulesoft
      const url = `/mule/hellomulesoft?${qs}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store' // avoid cached GETs during dev
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status}${text ? ` - ${text}` : ''}`);
      }

      // Handle JSON or text responses
      const ct = res.headers.get('content-type') || '';
      const data = ct.includes('application/json') ? await res.json() : { message: await res.text() };

      setResult(data);
      setStatus('success');
    } catch (err) {
      setError(err?.message || 'Request failed');
      setStatus('error');
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 24 }}>
      <h2>Apply for Service</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <label>QID
          <input value={qid} onChange={(e)=>setQid(e.target.value)} required style={{ width:'100%', padding:10 }} />
        </label>
        <label>First Name
          <input value={first} onChange={(e)=>setFirst(e.target.value)} required style={{ width:'100%', padding:10 }} />
        </label>
        <label>Last Name
          <input value={last} onChange={(e)=>setLast(e.target.value)} required style={{ width:'100%', padding:10 }} />
        </label>
        <button type="submit" disabled={status==='loading'} style={{ padding:'10px 16px', border:0, borderRadius:6, background:'#0056a4', color:'#fff', fontWeight:600 }}>
          {status==='loading' ? 'Submitting…' : 'Submit'}
        </button>
      </form>

      {status==='success' && result && (
        <div style={{ marginTop:16, padding:12, border:'1px solid #e0e0e0', borderRadius:6, background:'#f7fbff' }}>
          <div style={{ fontWeight:600, marginBottom:6 }}>Response</div>
          <pre style={{ whiteSpace:'pre-wrap', wordBreak:'break-word', margin:0 }}>
{JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {status==='error' && (
        <div style={{ marginTop:16, padding:12, border:'1px solid #ffb2b2', borderRadius:6, background:'#fff5f5', color:'#b00020' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
