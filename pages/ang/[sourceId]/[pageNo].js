import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAng } from 'lib/banidb';
import VerseCard from 'components/VerseCard';
import Layout, { useSettings } from 'components/Layout';

export default function AngPage() {
  const router = useRouter();
  const { sourceId, pageNo } = router.query;
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { showTranslation, showTransliteration } = useSettings();

  useEffect(() => {
    if (pageNo) setCurrentPage(Number(pageNo));
  }, [pageNo]);

  useEffect(() => {
    if (sourceId && currentPage) {
      getAng(sourceId, currentPage).then(setData).catch(console.error);
    }
  }, [sourceId, currentPage]);

  if (!sourceId || !currentPage) return null;

  const nav = data?.navigation || {};
  const verses = data?.page || [];

  return (
    <Layout activeTab="/">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', marginTop: 8 }}>
        <Link
          href={nav.previous ? `/ang/${sourceId}/${nav.previous}` : '#'}
          style={{
            padding: '6px 14px', borderRadius: 6, background: nav.previous ? '#1a1a2e' : '#ccc',
            color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600,
            opacity: nav.previous ? 1 : 0.4, pointerEvents: nav.previous ? 'auto' : 'none',
          }}
        >
          ◀ Prev
        </Link>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>Ang {currentPage}</span>
        <Link
          href={nav.next ? `/ang/${sourceId}/${nav.next}` : '#'}
          style={{
            padding: '6px 14px', borderRadius: 6, background: nav.next ? '#1a1a2e' : '#ccc',
            color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600,
            opacity: nav.next ? 1 : 0.4, pointerEvents: nav.next ? 'auto' : 'none',
          }}
        >
          Next ▶
        </Link>
      </div>

      {verses.map(v => (
        <VerseCard key={v.verseId} verse={v} showTranslation={showTranslation} showTransliteration={showTransliteration} />
      ))}
    </Layout>
  );
}
