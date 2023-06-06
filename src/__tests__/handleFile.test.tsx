import { render, fireEvent } from '@testing-library/react';
import { handleFile } from '../utils/handleFile';

describe('handleFile', () => {
  test('should set the file and clear the error message when a valid file is chosen', () => {
    const setFileMock = jest.fn();
    const setErrorMessageMock = jest.fn();
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    const event = {
      target: {
        files: [file],
      },
    };

    const handleChange = handleFile(setFileMock, setErrorMessageMock);

    const { getByTestId } = render(
      <input type="file" onChange={handleChange} data-testid="fileInput" />
    );
    fireEvent.change(getByTestId('fileInput'), event);

    expect(setFileMock).toHaveBeenCalledWith(file);
    expect(setErrorMessageMock).toHaveBeenCalledWith(null);
  });

  test('should set an error message when an invalid file is chosen', () => {
    const setFileMock = jest.fn();
    const setErrorMessageMock = jest.fn();
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });
    const event = {
      target: {
        files: [file],
      },
    };

    const handleChange = handleFile(setFileMock, setErrorMessageMock);

    const { getByTestId } = render(
      <input type="file" onChange={handleChange} data-testid="fileInput" />
    );
    fireEvent.change(getByTestId('fileInput'), event);

    expect(setFileMock).not.toHaveBeenCalled();
    expect(setErrorMessageMock).toHaveBeenCalledWith(
      'Veuillez choisir un fichier .txt'
    );
  });
});
