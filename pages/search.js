import { useState } from 'react';
import Link from 'next/link';
import { searchShabads } from '../lib/banidb';
import VerseCard from '../components/VerseCard';
import Layout, { useSettings } from '../components/Layout';

const SEARCH_TYPES = [
  { id: 0, label: 'First Letter (Start)' },
  { id: 1, label: 'First Letter (Anywhere)' },
  { id: 2, label: 'Full Word (Gurmukhi)' },
  { id: 3, label: 'Full Word (English)' },
  { id: 7, label: 'First Letter (English)' },
  { id: 8, label: 'Auto (omni)' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState(0);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showTranslation, showTransliteration } = useSettings();

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchShabads(query, { searchtype: searchType });
      setResults(data);
    } catch (err) { console.error(err); }
    setLoading(false);
  }

  const verses = results?.verses || [];
  const info = results?.resultsInfo;

  return (
    <Layout activeTab="/search">
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          style={{
            flex: 1, height: 40, border: '1px solid #ddd', borderRadius: 8,
            padding: '0 12px', fontSize: 16,
          }}
        />
        <button type="submit" style={{
          background: '#1a1a2e', color: '#fff', border: 'none',
          borderRadius: 8, padding: '0 20px', fontWeight: 600, cursor: 'pointer',
        }}>
          Go
        </button>
      </form>

      <div style={{ padding: '8px 0' }}>
        <select
          value={searchType}
          onChange={e => setSearchType(Number(e.target.value))}
          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13 }}
        >
          {SEARCH_TYPES.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>Searching...</div>}

      {info && (
        <div style={{ fontSize: 12, color: '#888', padding: '4px 0' }}>
          {info.totalResults} result{info.totalResults !== 1 ? 's' : ''}
          {'  '}(Page {info.pages.page} of {info.pages.totalPages})
        </div>
      )}

      {verses.map(v => (
        <Link key={v.verseId} href={`/shabad/${v.shabadId}`} style={{ textDecoration: 'none' }}>
          <VerseCard verse={v} showTranslation={showTranslation} showTransliteration={showTransliteration} />
        </Link>
      ))}
    </Layout>
  );
}
