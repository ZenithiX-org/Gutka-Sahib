import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSources } from '../lib/banidb';
import Layout from '../components/Layout';

const emojis = { G: '🟡', D: '🔴', B: '🟢', N: '🟣', A: '🔵', S: '🟠', R: '⚪' };

export default function Home() {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    getSources().then(d => setSources(d.rows || [])).catch(console.error);
  }, []);

  return (
    <Layout activeTab="/">
      <h1 style={{ fontSize: 22, color: '#1a1a2e', marginTop: 20 }}>Select Granth</h1>
      {sources.map(s => (
        <Link
          key={s.SourceID}
          href={`/ang/${s.SourceID}/1`}
          style={{ textDecoration: 'none' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', background: '#fff',
            borderRadius: 12, padding: 16, marginBottom: 10,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <span style={{ fontSize: 28, marginRight: 14 }}>{emojis[s.SourceID] || '📖'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, color: '#1a1a2e' }}>{s.SourceUnicode}</div>
              <div style={{ fontSize: 14, color: '#666' }}>{s.SourceEnglish}</div>
            </div>
            <span style={{ fontSize: 22, color: '#ccc' }}>›</span>
          </div>
        </Link>
      ))}
    </Layout>
  );
}
