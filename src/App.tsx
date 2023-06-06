import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
// Définition du type pour une tondeuse
type Mower = {
  position: [number, number];
  orientation: string;
};

const App: React.FC = () => {
  // État des tondeuses
  const [mowers, setMowers] = useState<Mower[]>([]);
  // État du fichier uploadé
  const [file, setFile] = useState<File | null>(null);
  // État de la grille
  const [grid, setGrid] = useState<(Mower | null)[][]>([]);
  // État de chargement
  const [loading, setLoading] = useState(false);
  // Directions pour chaque orientation
  const directions: {
    [key: string]: {
      L: string;
      R: string;
      move: ([x, y]: [number, number]) => [number, number];
    };
  } = {
    N: {
      L: 'W',
      R: 'E',
      move: ([x, y]: [number, number]): [number, number] => [x, y + 1],
    },
    E: {
      L: 'N',
      R: 'S',
      move: ([x, y]: [number, number]): [number, number] => [x + 1, y],
    },
    S: {
      L: 'E',
      R: 'W',
      move: ([x, y]: [number, number]): [number, number] => [x, y - 1],
    },
    W: {
      L: 'S',
      R: 'N',
      move: ([x, y]: [number, number]): [number, number] => [x - 1, y],
    },
  };
  // Gère la sélection du fichier
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };
  // Process le fichier
  const processFile = () => {
    if (file) {
      setLoading(true); // Start loading
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          console.log(`File content: ${content}`); // Log the file content
          const [mowers, grid] = processContent(content); // processContent now returns mowers and grid

          // Delay end of loading by 2 seconds
          setTimeout(() => {
            setLoading(false); // Stop loading
            setMowers(mowers); // Update mowers after spinner has stopped
            setGrid(grid); // Update grid after spinner has stopped
          }, 2000);
        }
      };
      reader.readAsText(file);
    }
  };
  // Process le contenu du fichier
  const processContent = (content: string): [Mower[], (Mower | null)[][]] => {
    const lines = content.trim().split('\n');
    const [width, height] = lines[0].split('').map(Number);
    const mowersData = lines.slice(1);
    const mowers: Mower[] = [];

    for (let i = 0; i < mowersData.length; i += 2) {
      const positionAndOrientation = mowersData[i];
      const orientationIndex = positionAndOrientation.search(/[NSEW]/);
      const positionData = positionAndOrientation.substring(
        0,
        orientationIndex
      );
      const positionSplitIndex =
        positionData.length > 2 ? positionData.length / 2 : 1;
      const x = parseInt(positionData.substring(0, positionSplitIndex));
      const y = parseInt(positionData.substring(positionSplitIndex));
      const orientation = positionAndOrientation.charAt(orientationIndex);

      console.log(
        `Processing mower with position (${x}, ${y}) and orientation ${orientation}`
      );

      const instructions = mowersData[i + 1]
        .split('')
        .filter((instruction) => instruction.trim() !== '');

      console.log(`Processing instructions: ${instructions.join(', ')}`);

      let currentX = x;
      let currentY = y;
      let currentOrientation = orientation;

      for (const instruction of instructions) {
        const direction = directions[currentOrientation];

        if (!direction) {
          console.error(`Invalid orientation: ${currentOrientation}`);
          return [[], []]; // return empty values if there's an error
        }

        if (instruction === 'F') {
          const newPosition = direction.move([currentX, currentY]);
          if (
            newPosition[0] >= 0 &&
            newPosition[1] >= 0 &&
            newPosition[0] <= width &&
            newPosition[1] <= height
          ) {
            currentX = newPosition[0];
            currentY = newPosition[1];
          }
        } else if (instruction === 'L' || instruction === 'R') {
          const newOrientation = direction[instruction];
          if (!newOrientation) {
            console.error(`Invalid instruction: ${instruction}`);
            return [[], []]; // return empty values if there's an error
          }
          currentOrientation = newOrientation;
        } else {
          console.error(`Invalid instruction: ${instruction}`);
          return [[], []]; // return empty values if there's an error
        }
      }

      mowers.push({
        position: [currentX, currentY],
        orientation: currentOrientation,
      });
    }

    const generateGrid = (width: number, height: number, mowers: Mower[]) => {
      const grid = Array(height + 1)
        .fill(null)
        .map(() => Array(width + 1).fill(null));

      for (const mower of mowers) {
        const [x, y] = mower.position;
        grid[y][x] = mower;
      }

      return grid;
    };

    const grid = generateGrid(width, height, mowers);
    return [mowers, grid];
  };
  // Retourne l'interface utilisateur de l'application
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Gestion des tondeuses</h1>
      <input
        type="file"
        onChange={handleFile}
        style={{ marginBottom: '1rem' }}
      />
      <button onClick={processFile} style={{ marginBottom: '1rem' }}>
        Process file
      </button>
      {loading && <Spinner animation="border" />}{' '}
      {/* Afficher le spinner lors du chargement */}
      <div>
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
      {mowers.map((mower, index) => (
        <div key={index}>
          Pour la Tondeuse {index + 1}, Position: {mower.position.join(', ')},
          Orientation: {mower.orientation}
        </div>
      ))}
    </div>
  );
};

export default App;
