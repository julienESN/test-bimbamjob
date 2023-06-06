// utils/fileHandler.ts

import React from 'react';

export const handleFile =
  (setFile: React.Dispatch<React.SetStateAction<File | null>>) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.name.split('.').pop() !== 'txt') {
      alert('Veuillez choisir un fichier .txt');
      return;
    }
    setFile(file);
  };
