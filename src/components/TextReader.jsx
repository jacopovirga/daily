import { useState } from 'react';

export default function TextReader() {
  const [reference, setReference] = useState('');
  const [textData, setTextData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchText = async () => {
    if (!reference.trim()) {
      setError('Inserisci un riferimento (es: Genesis 1:1, Berakhot 2a)');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://www.sefaria.org/api/texts/${encodeURIComponent(reference)}`
      );
      
      if (!response.ok) {
        throw new Error('Testo non trovato. Verifica il riferimento.');
      }
      
      const data = await response.json();
      setTextData(data);
    } catch (err) {
      setError(err.message);
      setTextData(null);
      console.error('Errore:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchText();
  };

  const handleExampleClick = (ref) => {
    setReference(ref);
    setTimeout(() => fetchText(), 100);
  };

  return (
    <div>
      <h2>Lettore di Testi</h2>
      
      {/* Search Form */}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Cerca un testo:
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Es: Genesis 1:1, Berakhot 2a, Mishnah Berakhot 1:1"
              style={{ marginBottom: '1rem' }}
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Caricamento...' : '🔍 Cerca'}
          </button>
        </form>

        {/* Example links */}
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#666',
            marginBottom: '0.5rem'
          }}>
            Esempi rapidi:
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {[
              'Genesis 1:1',
              'Exodus 20:1-14',
              'Psalms 23',
              'Berakhot 2a',
              'Mishnah Berakhot 1:1'
            ].map((ref) => (
              <button
                key={ref}
                type="button"
                onClick={() => handleExampleClick(ref)}
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.85rem',
                  background: '#f8f6f4',
                  color: '#8b7355'
                }}
              >
                {ref}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="card" style={{ 
          backgroundColor: '#fff3cd', 
          borderColor: '#ffc107' 
        }}>
          <p>⚠️ {error}</p>
        </div>
      )}

      {/* Text Display */}
      {textData && (
        <div className="card">
          <div style={{ borderBottom: '2px solid #e5e0db', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>{textData.indexTitle || textData.book}</h3>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>
              {textData.ref}
            </p>
            {textData.heRef && (
              <p className="hebrew" style={{ marginTop: '0.5rem' }}>
                {textData.heRef}
              </p>
            )}
          </div>

          {/* Hebrew Text */}
          {textData.he && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ 
                color: '#8b7355', 
                marginBottom: '1rem',
                fontSize: '1.1rem'
              }}>
                עברית
              </h4>
              <div className="hebrew" style={{ 
                fontSize: '1.3rem',
                lineHeight: '2'
              }}>
                {Array.isArray(textData.he) 
                  ? textData.he.map((verse, idx) => (
                      <p key={idx} style={{ marginBottom: '1rem' }}>
                        <span style={{ 
                          color: '#8b7355',
                          fontWeight: 'bold',
                          marginLeft: '0.5rem'
                        }}>
                          {idx + 1}
                        </span>
                        {' '}
                        {verse}
                      </p>
                    ))
                  : <p>{textData.he}</p>
                }
              </div>
            </div>
          )}

          {/* English Text */}
          {textData.text && (
            <div>
              <h4 style={{ 
                color: '#8b7355', 
                marginBottom: '1rem',
                fontSize: '1.1rem'
              }}>
                English
              </h4>
              <div style={{ 
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#2c2c2c'
              }}>
                {Array.isArray(textData.text) 
                  ? textData.text.map((verse, idx) => (
                      <p key={idx} style={{ marginBottom: '1rem' }}>
                        <span style={{ 
                          color: '#8b7355',
                          fontWeight: 'bold',
                          marginRight: '0.5rem'
                        }}>
                          {idx + 1}
                        </span>
                        {verse}
                      </p>
                    ))
                  : <p>{textData.text}</p>
                }
              </div>
            </div>
          )}

          {/* Link to Sefaria */}
          <div style={{ 
            marginTop: '2rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e5e0db'
          }}>
            <a 
              href={`https://www.sefaria.org/${textData.ref}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#8b7355',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1.05rem'
              }}
            >
              Apri su Sefaria.org →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
