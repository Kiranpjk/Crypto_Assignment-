import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav style={{ 
          borderBottom: '1px solid var(--border-color)', 
          padding: '1rem 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(13, 17, 23, 0.8)',
          position: 'sticky',
          top: 0,
          zIndex: 100
      }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
          CryptoTracker
        </Link>
        <div>
          <Link href="/" style={{ marginRight: '1rem' }}>Market</Link>
        </div>
      </nav>
      <main className="container" style={{ minHeight: '80vh', padding: '2rem 1rem' }}>
        {children}
      </main>
      <footer style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          borderTop: '1px solid var(--border-color)',
          color: 'var(--secondary-color)',
          marginTop: '2rem'
      }}>
        <p>© {new Date().getFullYear()} CryptoSEO Tracker. Data provided by CoinGecko.</p>
      </footer>
    </>
  );
}
