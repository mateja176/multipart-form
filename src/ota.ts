#!/usr/bin/env ts-node

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const formData = new FormData();

const [ipAddress, relativeFilePath] = process.argv.slice(2);

if (!ipAddress) {
  throw new Error(`"ipAddress" was not provided`);
}
if (!relativeFilePath) {
  throw new Error(`"filePath" parameter was not provided`);
}

(async () => {
  let filePath = relativeFilePath;
  try {
    const file = await fs.promises.readFile(relativeFilePath);
  } catch {
    filePath = path.join(process.cwd(), relativeFilePath);
  }

  console.log('Uploading:', filePath);
  formData.append('update', fs.createReadStream(filePath));

  try {
    const response = await axios.post<string>(
      `${ipAddress}/update`,
      formData,
      {},
    );

    console.log('Data:', response.data);
  } catch (error) {
    console.error(error);
  }
})();
