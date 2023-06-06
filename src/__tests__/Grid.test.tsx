import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Grid } from '../components/Grid';
import { Mower } from '../App';
describe('Grid', () => {
  it('renders the grid correctly', () => {
    const gridData: (Mower | null)[][] = [
      [null, null, { position: [1, 2], orientation: 'N' }],
      [null, null, null],
      [null, { position: [3, 4], orientation: 'E' }, null],
    ];

    render(<Grid grid={gridData} />);

    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
  });

  it('renders empty cells correctly', () => {
    const gridData = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    render(<Grid grid={gridData} />);

    expect(screen.queryByText('N')).not.toBeInTheDocument();
    expect(screen.queryByText('E')).not.toBeInTheDocument();
  });
});
