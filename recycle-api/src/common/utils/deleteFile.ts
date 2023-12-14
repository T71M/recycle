import * as fs from 'fs';
import * as path from 'path';
import { getFilename } from './getFileName';
export const deleteFile = async (fileName: string) => {
  if (!fileName) return;
  const filePath = path.join(
    __dirname,
    '../../../..',
    'files',
    getFilename(fileName),
  );
  if (!fs.existsSync(filePath)) {
    return;
  }

  await fs.unlink(filePath, (err) => {
    if (err) {
      console.log('🚀 ~ file: deleteFile.ts:8 ~ awaitfs.unlink ~ err:', err);
      throw err;
    }
  });
};
