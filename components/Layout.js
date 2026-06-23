import Link from 'next/link';
import { useState, createContext, useContext } from 'react';

export const SettingsContext = createContext({
  showTranslation: true,
  setShowTranslation: () => {},
  showTransliteration: true,
  setShowTransliteration: () => {},
});

export function SettingsProvider({ children }) {
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  return (
    <SettingsContext.Provider value={{ showTranslation, setShowTranslation, showTransliteration, setShowTransliteration }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

const navStyles = {
  header: {
    background: '#1a1a2e',
    color: '#fff',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    height: 56,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  title: { fontSize: 20, fontWeight: 700, color: '#f5c842', textDecoration: 'none' },
  nav: {
    display: 'flex',
    gap: 20,
    marginLeft: 32,
  },
  link: { color: '#ccc', textDecoration: 'none', fontSize: 14, fontWeight: 500 },
  linkActive: { color: '#f5c842', textDecoration: 'none', fontSize: 14, fontWeight: 500 },
  main: { maxWidth: 800, margin: '0 auto', padding: '0 12px' },
};

export default function Layout({ children, activeTab }) {
  const tabs = [
    { href: '/', label: 'Granth' },
    { href: '/banis', label: 'Banis' },
    { href: '/search', label: 'Search' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={navStyles.header}>
        <Link href="/" style={navStyles.title}>Sri Granth</Link>
        <nav style={navStyles.nav}>
          {tabs.map(t => (
            <Link
              key={t.href}
              href={t.href}
              style={activeTab === t.href ? navStyles.linkActive : navStyles.link}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </header>
      <main style={navStyles.main}>{children}</main>
    </div>
  );
}
