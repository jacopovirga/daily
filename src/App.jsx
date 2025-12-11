import { useState } from 'react';
import Calendar from './components/Calendar';
import TextReader from './components/TextReader';

function App() {
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ 
        textAlign: 'center',
        padding: '2rem 0',
        marginBottom: '2rem'
      }}>
        <h1>📚 Sefaria Widget</h1>
        <p style={{ 
          fontSize: '1.1rem',
          color: '#666',
          marginTop: '0.5rem'
        }}>
          Calendario ebraico e lettore di testi sacri
        </p>
      </header>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #e5e0db'
      }}>
        <button
          onClick={() => setActiveTab('calendar')}
          style={{
            background: activeTab === 'calendar' ? '#8b7355' : 'transparent',
            color: activeTab === 'calendar' ? 'white' : '#8b7355',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '1rem 2rem',
            fontSize: '1.05rem',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s',
            transform: 'none'
          }}
        >
          📅 Calendario
        </button>
        <button
          onClick={() => setActiveTab('reader')}
          style={{
            background: activeTab === 'reader' ? '#8b7355' : 'transparent',
            color: activeTab === 'reader' ? 'white' : '#8b7355',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '1rem 2rem',
            fontSize: '1.05rem',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s',
            transform: 'none'
          }}
        >
          📖 Lettore Testi
        </button>
      </div>

      {/* Content */}
      <main>
        {activeTab === 'calendar' && <Calendar />}
        {activeTab === 'reader' && <TextReader />}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem 0',
        marginTop: '3rem',
        borderTop: '1px solid #e5e0db',
        color: '#666',
        fontSize: '0.9rem'
      }}>
        <p>
          Powered by{' '}
          <a 
            href="https://www.sefaria.org" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#8b7355', textDecoration: 'none' }}
          >
            Sefaria.org
          </a>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Un progetto per esplorare i testi della tradizione ebraica
        </p>
      </footer>
    </div>
  );
}

export default App;
