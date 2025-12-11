import { useState, useEffect } from 'react';

export default function Calendar() {
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCalendar();
  }, []);

  const fetchCalendar = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://www.sefaria.org/api/calendars');
      
      if (!response.ok) {
        throw new Error('Errore nel caricamento del calendario');
      }
      
      const data = await response.json();
      setCalendarData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Errore:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Caricamento calendario...</div>;
  }

  if (error) {
    return (
      <div className="card" style={{ backgroundColor: '#fff3cd', borderColor: '#ffc107' }}>
        <p>⚠️ {error}</p>
        <button onClick={fetchCalendar} style={{ marginTop: '1rem' }}>
          Riprova
        </button>
      </div>
    );
  }

  if (!calendarData) {
    return null;
  }

  const parasha = calendarData.calendar_items?.find(item => 
    item.title.en === 'Parashat Hashavua'
  );
  
  const haftarah = calendarData.calendar_items?.find(item => 
    item.title.en === 'Haftarah'
  );

  const dafYomi = calendarData.calendar_items?.find(item => 
    item.title.en === 'Daf Yomi'
  );

  return (
    <div>
      {/* Hebrew Date Header */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #8b7355 0%, #b89976 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'white', margin: 0 }}>{calendarData['Hebrew Date']}</h2>
        <p style={{ opacity: 0.9, fontSize: '1.1rem', marginTop: '0.5rem' }}>
          {new Date(calendarData.date).toLocaleDateString('it-IT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Parasha della Settimana */}
      {parasha && (
        <div className="card">
          <h3>📖 {parasha.title.en} - {parasha.title.he}</h3>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#8b7355' }}>
              {parasha.displayValue.en}
            </p>
            <p className="hebrew" style={{ fontSize: '1.3rem', marginTop: '0.5rem' }}>
              {parasha.displayValue.he}
            </p>
            
            {parasha.description && (
              <p style={{ 
                marginTop: '1rem', 
                color: '#666',
                lineHeight: '1.7'
              }}>
                {parasha.description.en}
              </p>
            )}
            
            <div style={{ marginTop: '1rem' }}>
              <a 
                href={`https://www.sefaria.org/${parasha.url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#8b7355',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Leggi su Sefaria →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Haftarah */}
      {haftarah && (
        <div className="card">
          <h3>📜 {haftarah.title.en} - {haftarah.title.he}</h3>
          <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>
            {haftarah.displayValue.en}
          </p>
          <p className="hebrew" style={{ fontSize: '1.1rem' }}>
            {haftarah.displayValue.he}
          </p>
          <div style={{ marginTop: '1rem' }}>
            <a 
              href={`https://www.sefaria.org/${haftarah.url}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#8b7355',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Leggi su Sefaria →
            </a>
          </div>
        </div>
      )}

      {/* Daf Yomi */}
      {dafYomi && (
        <div className="card">
          <h3>📚 {dafYomi.title.en} - {dafYomi.title.he}</h3>
          <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>
            {dafYomi.displayValue.en}
          </p>
          <p className="hebrew" style={{ fontSize: '1.1rem' }}>
            {dafYomi.displayValue.he}
          </p>
          <div style={{ marginTop: '1rem' }}>
            <a 
              href={`https://www.sefaria.org/${dafYomi.url}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#8b7355',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Leggi su Sefaria →
            </a>
          </div>
        </div>
      )}

      {/* Altri studi giornalieri */}
      <div className="card">
        <h3>📅 Altri studi del giorno</h3>
        <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
          {calendarData.calendar_items
            ?.filter(item => 
              !['Parashat Hashavua', 'Haftarah', 'Daf Yomi'].includes(item.title.en)
            )
            .slice(0, 6)
            .map((item, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '0.75rem',
                  background: '#f8f6f4',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontWeight: '500' }}>{item.title.en}:</span>
                <a 
                  href={`https://www.sefaria.org/${item.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#8b7355',
                    textDecoration: 'none'
                  }}
                >
                  {item.displayValue.en}
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
