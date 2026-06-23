import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getBani } from 'lib/banidb';
import VerseCard from 'components/VerseCard';
import Layout, { useSettings } from 'components/Layout';

export default function BaniDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const { showTranslation, showTransliteration } = useSettings();

  useEffect(() => {
    if (id) getBani(id).then(setData).catch(console.error);
  }, [id]);

  return (
    <Layout activeTab="/banis">
      {data?.baniInfo && (
        <div style={{ textAlign: 'center', padding: '16px 0', marginTop: 8 }}>
          <div style={{ fontSize: 20, color: '#1a1a2e', fontWeight: 600 }}>{data.baniInfo.gurmikhi || data.baniInfo.unicode}</div>
          <div style={{ fontSize: 14, color: '#666' }}>{data.baniInfo.english}</div>
          {data.baniInfo.source?.english && (
            <div style={{ fontSize: 12, color: '#999' }}>{data.baniInfo.source.english}</div>
          )}
        </div>
      )}
      {(data?.verses || []).map((item, i) => (
        <VerseCard key={item.verse?.verseId || i} verse={item.verse || item} showTranslation={showTranslation} showTransliteration={showTransliteration} />
      ))}
    </Layout>
  );
}
