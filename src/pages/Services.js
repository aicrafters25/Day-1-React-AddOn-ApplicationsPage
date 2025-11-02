import React, { useState, useEffect } from 'react';

const Services = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const load = async () => {
      try {
        setStatus('loading');
        const res = await fetch('/mock/sitecore-services.json', {
          headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const comp = json?.sitecore?.route?.placeholders?.['jss-main']?.find(
          x => x.componentName === 'ServicesList'
        );
        setData(comp?.fields);
        setStatus('idle');
      } catch (e) {
        console.error(e);
        setStatus('error');
      }
    };
    load();
  }, []);

  if (status === 'loading') return <p>Loading services…</p>;
  if (status === 'error' || !data) return <p>Couldn’t load services.</p>;

  const { heading, categories } = data;

  return (
    <div className="services-container">
      <h3>{ heading.value }</h3>
      { categories.value.map(cat => (
        <div key={cat.id} className="service-category">
          <h4>{ cat.name }</h4>
          <ul className="service-list">
            { cat.services.map(svc => (
              <li key={svc.id} className="service-item">
                <div className="service-info">
                  <div className="service-title">{ svc.title }</div>
                  <div className="service-desc">{ svc.description }</div>
                </div>
                <a className="service-cta" href={ `/apply?service=${svc.id}` }>
                  { svc.link.text }
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Services;
