import Layout, { useSettings } from '../components/Layout';

export default function SettingsPage() {
  const { showTranslation, setShowTranslation, showTransliteration, setShowTransliteration } = useSettings();

  return (
    <Layout activeTab="/settings">
      <h1 style={{ fontSize: 22, color: '#1a1a2e', marginTop: 20 }}>Settings</h1>

      <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginTop: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontSize: 15, color: '#333' }}>Show English Translation</span>
          <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
            <input type="checkbox" checked={showTranslation} onChange={e => setShowTranslation(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{
              position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
              background: showTranslation ? '#1a1a2e' : '#ddd', borderRadius: 24, transition: '0.3s',
            }}>
              <span style={{
                position: 'absolute', height: 18, width: 18, left: showTranslation ? 22 : 3,
                bottom: 3, background: '#fff', borderRadius: '50%', transition: '0.3s',
              }} />
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <span style={{ fontSize: 15, color: '#333' }}>Show Transliteration</span>
          <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
            <input type="checkbox" checked={showTransliteration} onChange={e => setShowTransliteration(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{
              position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
              background: showTransliteration ? '#1a1a2e' : '#ddd', borderRadius: 24, transition: '0.3s',
            }}>
              <span style={{
                position: 'absolute', height: 18, width: 18, left: showTransliteration ? 22 : 3,
                bottom: 3, background: '#fff', borderRadius: '50%', transition: '0.3s',
              }} />
            </span>
          </label>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginTop: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: 16, color: '#1a1a2e', marginBottom: 10 }}>About</h2>
        <p style={{ fontSize: 13, color: '#666', lineHeight: '20px', margin: 0 }}>
          All Sikh Granths in one place with English translations.<br /><br />
          Data sourced from <a href="https://api.banidb.com" target="_blank" style={{ color: '#1a1a2e' }}>BaniDB</a>.<br /><br />
          Includes Sri Guru Granth Sahib Ji, Dasam Bani,<br />
          Bhai Gurdas Vaaran, Bhai Nand Lal,<br />
          Amrit Keertan, Sarabloh Granth, and Rehatname.
        </p>
      </div>
    </Layout>
  );
}
