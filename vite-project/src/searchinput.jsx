import { useState } from 'react';
import {mechanics} from "./mechanicsData"
import img1 from './mechanic.png'
const MechanicSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    const filtered = mechanics
      .filter(mechanic =>
        mechanic.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.distance - b.distance);

    setResults(filtered);
    setShowResults(true);
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    searchContainer: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px'
    },
    input: {
      flex: 1,
      padding: '12px',
      border: '2px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px'
    },
    button: {
      padding: '12px 24px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      ':hover': {
        backgroundColor: '#0056b3'
      }
    },
    resultsContainer: {
      border: '1px solid #eee',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    resultItem: {
      padding: '20px',
      borderBottom: '1px solid #eee',
      ':last-child': {
        borderBottom: 'none'
      }
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px'
    },
    name: {
      fontSize: '1.2em',
      fontWeight: 'bold',
      color: '#333'
    },
    rating: {
      color: '#ffc107',
      fontWeight: 'bold'
    },
    distance: {
      color: '#6c757d'
    },
    details: {
      display: 'flex',
      gap: '15px',
      marginTop: '10px'
    },
    phone: {
      color: '#007bff'
    },
    specialty: {
      backgroundColor: '#e9ecef',
      padding: '4px 8px',
      borderRadius: '4px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="search"
          placeholder="Enter location (e.g., vizianagaram , srikakulam )..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
          aria-label="Search mechanics by location"
        />
        <button 
          onClick={handleSearch}
          style={styles.button}
          disabled={!searchTerm.trim()}
        >
          Search
        </button>
      </div>

      {showResults && (
        <div style={styles.resultsContainer}>
          {results.length > 0 ? (
            results.map(mechanic => (
              <div key={mechanic.id} style={styles.resultItem}>
                <div style={styles.header}>
                  <span style={styles.name}>{mechanic.name}</span>
                  <div>
                    <span style={styles.rating}>⭐ {mechanic.rating}</span>
                    <span style={{...styles.distance, marginLeft: '10px'}}>
                      📍 {mechanic.distance} km away
                    </span>
                  </div>
                </div>
                <div style={styles.details}>
                  <div className='container text-start'>
                    <div style={styles.phone}>📞{mechanic.phone}</div>
                    <div ><img style={{height:"20px"}}src={img1}/>  {mechanic.location}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
              No mechanics found in "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MechanicSearch;