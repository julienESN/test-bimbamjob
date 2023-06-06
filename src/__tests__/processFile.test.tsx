import { processFile } from '../utils/processFile';
// import { Mower } from '../App';

// Mock FileReader
(global.FileReader as any) = class {
  readAsText = (_file: File) => {
    this.result = '55\n44S\nLFRRFFLFRFF\n22N\nFFRLLRFRLF';
    setTimeout(() => this.onload({ target: { result: this.result } }));
  };
  onload = jest.fn();
  result = '';
};

describe('processFile', () => {
  it('reads file content and updates state correctly', (done) => {
    const file = new File(
      ['55\n44S\nLFRRFFLFRFF\n22N\nFFRLLRFRLF'],
      'test.txt',
      { type: 'text/plain' }
    );

    const setMowers = jest.fn();
    const setGrid = jest.fn();

    const processContent = jest.fn().mockReturnValue([
      [
        { position: [1, 3], orientation: 'N' },
        { position: [5, 1], orientation: 'E' },
      ],
      Array(6)
        .fill(null)
        .map(() => Array(6).fill(null)),
    ]);

    processFile(file, setMowers, setGrid, processContent)();

    setTimeout(() => {
      expect(processContent).toHaveBeenCalledWith(
        '55\n44S\nLFRRFFLFRFF\n22N\nFFRLLRFRLF'
      );
      expect(setMowers).toHaveBeenCalledWith([
        { position: [1, 3], orientation: 'N' },
        { position: [5, 1], orientation: 'E' },
      ]);
      expect(setGrid).toHaveBeenCalledWith(
        Array(6)
          .fill(null)
          .map(() => Array(6).fill(null))
      );

      done();
    }, 0);
  });
});
