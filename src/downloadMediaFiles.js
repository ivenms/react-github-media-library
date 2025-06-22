const axios = require('axios');
const fs = require('fs');
const path = require('path');

const mediaTypes = ['mp4', 'wav'];
const maxFileSize = 3 * 1024 * 1024; // 3 MB in bytes

async function downloadFile(url, destination) {
  try {
    const response = await axios({
      url,
      responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream(destination))
        .on('finish', resolve)
        .on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading file from ${url}:`, error);
    throw error;
  }
}

async function downloadMediaFiles() {
  const mediaUrls = [
    'https://example.com/path/to/your/file1.mp4',
    'https://example.com/path/to/your/file2.wav'
    // Add more URLs here
  ];

  for (const url of mediaUrls) {
    try {
      const response = await axios.head(url);
      if (response.headers['content-length'] && parseInt(response.headers['content-length'], 10) <= maxFileSize) {
        const fileName = path.basename(url);
        const destination = path.join(__dirname, 'demo', 'media', fileName);

        console.log(`Downloading ${fileName}...`);
        await downloadFile(url, destination);
        console.log(`${fileName} downloaded successfully.`);
      } else {
        console.log(`Skipping ${url} due to size limit or invalid file type.`);
      }
    } catch (error) {
      console.error(`Error checking file at ${url}:`, error);
    }
  }
}

downloadMediaFiles().catch(console.error);
