import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBanis } from '../../lib/banidb';
import Layout from '../../components/Layout';

export default function BanisPage() {
  const [banis, setBanis] = useState([]);

  useEffect(() => {
    getBanis().then(d => setBanis(Array.isArray(d) ? d : d.rows || [])).catch(console.error);
  }, []);

  return (
    <Layout activeTab="/banis">
      <h1 style={{ fontSize: 22, color: '#1a1a2e', marginTop: 20 }}>Banis</h1>
      {banis.map(b => (
        <Link key={b.ID} href={`/banis/${b.ID}`} style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex', alignItems: 'center', background: '#fff',
            borderRadius: 12, padding: 16, marginBottom: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, color: '#1a1a2e' }}>{b.gurmukhiUni || b.gurmukhi}</div>
              <div style={{ fontSize: 14, color: '#666' }}>{b.transliteration || b.token}</div>
            </div>
            <span style={{ fontSize: 22, color: '#ccc' }}>›</span>
          </div>
        </Link>
      ))}
    </Layout>
  );
}
