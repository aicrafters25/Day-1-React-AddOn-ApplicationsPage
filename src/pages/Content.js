import React, { useEffect, useMemo, useState } from 'react';

const formatDate = (iso) => {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: undefined
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const Content = () => {
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [heading, setHeading] = useState('Qatar News & Events');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setStatus('loading');
        // IMPORTANT : To switch to a real Headless endpoint (Real SiteCore) replace the URL below with your real endpoint
        const res = await fetch('/mock/sitecore.json', {
          headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const comp = json?.sitecore?.route?.placeholders?.['jss-main']?.find(
          (x) => x?.componentName === 'NewsList'
        );
        setHeading(comp?.fields?.heading?.value ?? 'Qatar News & Events');

        const raw = comp?.fields?.items?.value ?? [];
        // Normalize for rendering
        const normalized = raw.map((n) => ({
          id: n?.id ?? crypto.randomUUID(),
          type: n?.fields?.type?.value ?? 'news',
          title: n?.fields?.title?.value ?? 'Untitled',
          date: n?.fields?.date?.value ?? null,
          summary: n?.fields?.summary?.value ?? '',
          href: n?.fields?.link?.value?.href ?? '#',
          cta: n?.fields?.link?.value?.text ?? 'Open',
          location: n?.fields?.location?.value ?? null
        }));
        setItems(normalized);
        setStatus('idle');
      } catch (e) {
        console.error(e);
        setStatus('error');
      }
    };
    load();
  }, []);

  const [filter, setFilter] = useState('all'); // all | news | event
  const filtered = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((i) => i.type === filter);
  }, [items, filter]);

  if (status === 'loading') return <p>Loading content…</p>;
  if (status === 'error') {
    // Fallback to a static block if the JSON fails
    return (
      <div>
        <h3>Here is the content imported from SiteCore</h3>
        <p>Access public services, submit applications, and track your requests easily.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12 }}>
        <h3 style={{ margin: 0 }}>{heading}</h3>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="news">News</option>
          <option value="event">Events</option>
        </select>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {filtered.map((it) => (
          <li
            key={it.id}
            style={{
              padding: '12px 0',
              borderBottom: '1px solid rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 4 }}>
              {it.type.toUpperCase()} • {it.date ? formatDate(it.date) : '—'}
              {it.location ? ` • ${it.location}` : ''}
            </div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{it.title}</div>
            {it.summary && <p style={{ margin: '4px 0 8px' }}>{it.summary}</p>}
            <a href={it.href} aria-label={it.cta}>
              {it.cta}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
  
  ;
};

export default Content;
