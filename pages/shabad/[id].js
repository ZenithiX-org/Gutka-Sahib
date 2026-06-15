import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getShabad } from 'lib/banidb';
import VerseCard from 'components/VerseCard';
import Layout, { useSettings } from 'components/Layout';

export default function ShabadPage() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const { showTranslation, showTransliteration } = useSettings();

  useEffect(() => {
    if (id) getShabad(id).then(setData).catch(console.error);
  }, [id]);

  return (
    <Layout activeTab="/search">
      {(data?.verses || []).map(v => (
        <VerseCard key={v.verseId} verse={v} showTranslation={showTranslation} showTransliteration={showTransliteration} />
      ))}
    </Layout>
  );
}
