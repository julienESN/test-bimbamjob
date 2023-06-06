import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock FileReader
(global.FileReader as any) = jest.fn().mockImplementation(function () {
  return {
    readAsText: jest.fn(),
    EMPTY: 0,
    LOADING: 1,
    DONE: 2,
    result: '',
    onload: jest.fn(),
    onerror: jest.fn(),
    onloadend: jest.fn(),
    onloadstart: jest.fn(),
    onprogress: jest.fn(),
    onabort: jest.fn(),
    readyState: 2, // corresponds to DONE
    error: null,
    readAsArrayBuffer: jest.fn(),
    readAsDataURL: jest.fn(),
    readAsBinaryString: jest.fn(),
    abort: jest.fn(),
  };
});

describe('App', () => {
  it('renders the initial UI as expected', () => {
    render(<App />);
    expect(screen.getByText('Test Technique BimBamJob')).toBeInTheDocument();
    expect(screen.getByText('Process file')).toBeInTheDocument();
  });

  it('displays an error when a non-txt file is uploaded', async () => {
    const utils = render(<App />);
    const input = utils.getByTestId('fileInput'); //replace with your aria-label
    Object.defineProperty(input, 'files', {
      value: [
        new File(['dummy content'], 'dummy.pdf', { type: 'application/pdf' }),
      ],
    });
    fireEvent.change(input);
    await waitFor(() =>
      expect(
        utils.getByText('Veuillez choisir un fichier .txt')
      ).toBeInTheDocument()
    );
  });

  
});
