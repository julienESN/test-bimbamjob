// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Grid } from './components/Grid';
import { directions } from './utils/directions';
import { handleFile } from './utils/handleFile';
import { processFile } from './utils/processFile';
// Define type for a Mower
export type Mower = {
  position: [number, number];
  orientation: string;
};
// App Component

const App: React.FC = () => {
  // Declare and initialise state variables
  const [mowers, setMowers] = useState<Mower[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [grid, setGrid] = useState<(Mower | null)[][]>([]);
  const [isGridVisible, setIsGridVisible] = useState(false);
  // Function to handle file change
  const handleFileChange = handleFile(setFile, setErrorMessage);
  // Function to process content
  const processContent = (content: string): [Mower[], (Mower | null)[][]] => {
    const lines = content.trim().split('\n');
    const [width, height] = lines[0].split('').map(Number);
    const mowersData = lines.slice(1);
    const mowers: Mower[] = [];
    // Loop through mowers data
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

      const instructions = mowersData[i + 1]
        .split('')
        .filter((instruction) => instruction.trim() !== '');

      let currentX = x;
      let currentY = y;
      let currentOrientation = orientation;
      // Loop through instructions
      for (const instruction of instructions) {
        const direction = directions[currentOrientation];

        if (!direction) {
          console.error(`Invalid orientation: ${currentOrientation}`);
          return [[], []];
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
            return [[], []];
          }
          currentOrientation = newOrientation;
        } else {
          console.error(`Invalid instruction: ${instruction}`);
          return [[], []];
        }
      }
      // Add processed mower to the array
      mowers.push({
        position: [currentX, currentY],
        orientation: currentOrientation,
      });
    }
    // Function to generate grid
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
    // Generate grid and return processed data
    const grid = generateGrid(width, height, mowers);
    console.log(mowers);
    return [mowers, grid];
  };
  // Function to process file on click
  const processFileOnClick = processFile(
    file,
    setMowers,
    setGrid,
    processContent
  );

  useEffect(() => {
    if (grid.length > 0) {
      setIsGridVisible(true);
    } else {
      setIsGridVisible(false);
    }
  }, [grid]);

  // Render App Component
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
      <h1 style={{ marginBottom: '1rem' }}>Test Technique BimBamJob</h1>
      <input
        type="file"
        data-testid="fileInput"
        onChange={handleFileChange}
        style={{ marginBottom: '1rem' }}
        accept=".txt" // permet de limiter les types de fichiers que l'utilisateur peut sélectionne
      />
      <button onClick={processFileOnClick} style={{ marginBottom: '1rem' }}>
        Process file
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      {isGridVisible && <Grid data-testid="grid" grid={grid} />}
      {/* // Display each mower's data */}
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
