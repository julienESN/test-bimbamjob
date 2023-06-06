import React, { useState, useEffect } from 'react';
import { Mower } from '../App';
import './Grid.css';

export const Grid: React.FC<{ grid: (Mower | null)[][] }> = ({ grid }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500); // Attend 500ms avant de déclencher l'animation
    return () => clearTimeout(timer); // Effacer le timer lors du démontage du composant
  }, []); // L'effet s'exécute seulement au montage du composant

  return (
    <div className={`grid ${isLoaded ? 'loaded' : ''}`}>
      {grid
        .map((row, i) => (
          <div key={i} style={{ display: 'flex' }}>
            {row.map((cell, j) => (
              <div
                key={j}
                title={
                  cell
                    ? `Tondeuse à la position: ${cell.position.join(
                        ', '
                      )} avec orientation: ${cell.orientation}`
                    : ''
                }
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50px',
                  height: '50px',
                  border: '1px solid black',
                  backgroundColor: cell ? '#baf' : '#eee',
                  cursor: cell ? 'pointer' : 'default',
                }}
              >
                {cell && <span>{(cell as Mower).orientation}</span>}
              </div>
            ))}
          </div>
        ))
        .reverse()}
    </div>
  );
};
