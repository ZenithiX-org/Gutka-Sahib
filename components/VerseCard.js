import { useState } from 'react';

const styles = {
  card: {
    background: '#fff',
    borderRadius: 8,
    padding: '14px 16px',
    margin: '6px 0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    cursor: 'pointer',
  },
  gurmukhi: {
    fontSize: 22,
    color: '#1a1a2e',
    lineHeight: '34px',
    fontFamily: 'sans-serif',
    wordBreak: 'break-all',
  },
  transliteration: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 6,
  },
  translation: {
    fontSize: 15,
    color: '#2d5016',
    marginTop: 8,
    lineHeight: '22px',
  },
  altTranslation: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
    lineHeight: '20px',
  },
  meta: {
    fontSize: 11,
    color: '#bbb',
    marginTop: 8,
  },
};

export default function VerseCard({ verse, showTranslation, showTransliteration }) {
  const [expanded, setExpanded] = useState(false);

  const gurmukhi = verse.verse?.unicode || '';
  const transliteration = verse.transliteration?.english || '';
  const translation = verse.translation?.en?.bdb || verse.translation?.en?.ssk || '';
  const altTranslation = verse.translation?.en?.ms;

  return (
    <div style={styles.card} onClick={() => setExpanded(!expanded)}>
      <div style={styles.gurmukhi}>{gurmukhi}</div>
      {showTransliteration && transliteration && (
        <div style={styles.transliteration}>{transliteration}</div>
      )}
      {showTranslation && translation && (
        <div style={styles.translation}>{translation}</div>
      )}
      {expanded && altTranslation && (
        <div style={styles.altTranslation}>{altTranslation}</div>
      )}
      {verse.pageNo && (
        <div style={styles.meta}>
          Ang {verse.pageNo}
          {verse.writer?.english ? `  •  ${verse.writer.english}` : ''}
          {verse.raag?.english ? `  •  ${verse.raag.english}` : ''}
        </div>
      )}
    </div>
  );
}
