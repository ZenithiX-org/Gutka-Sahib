import { SettingsProvider } from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
}
