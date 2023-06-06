import React from 'react';

export const handleFile =
  (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
  ) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.name.split('.').pop() !== 'txt') {
      setErrorMessage('Veuillez choisir un fichier .txt');
      return;
    }
    setFile(file);
    setErrorMessage(null); // Clear error message when valid file is chosen
  };
