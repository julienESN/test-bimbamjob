import { Mower } from '../App';

export const processFile = (
  file: File | null,
  setMowers: React.Dispatch<React.SetStateAction<Mower[]>>,
  setGrid: React.Dispatch<React.SetStateAction<(Mower | null)[][]>>,
  processContent: (content: string) => [Mower[], (Mower | null)[][]]
) => () => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const [mowers, grid] = processContent(content);
        setMowers(mowers);
        setGrid(grid);
      }
    };
    reader.readAsText(file);
  }
};