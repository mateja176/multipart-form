#!/usr/bin/env ts-node

import FormData from 'form-data';
import fs from 'fs';
import fetch from 'node-fetch';

const formData = new FormData();

const [filePath] = process.argv.slice(2);

if (!filePath) {
  throw new Error(`"filePath" parameter was not provided`);
}

(async () => {
  formData.append('update', fs.createReadStream(filePath));

  const response = await fetch('http://192.168.0.14/update', {
    headers: {
      // "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      // "accept-language": "en-US,en;q=0.9,en-GB;q=0.8,de;q=0.7,sr;q=0.6,bs;q=0.5",
      // "cache-control": "max-age=0",
      // "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryihktjbJSiSkG5q97",
      // "upgrade-insecure-requests": "1"
    },
    // "referrer": "http://192.168.0.14/update",
    // "referrerPolicy": "strict-origin-when-cross-origin",
    // "mode": "cors"
    // "body": null,
    method: 'POST',
  });

  console.log(await response.text());
})();
