const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Helper function to serve an HTML page
function servePage(res, filePath, statusCode = 200) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Server Error');
      return;
    }
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  // Strip query parameters to handle clean route paths
  const parsedUrl = req.url.split('?')[0];

  switch (parsedUrl) {
    case '/':
    case '/home':
      servePage(res, path.join(__dirname, 'views', 'index.html'));
      break;

    case '/services':
      servePage(res, path.join(__dirname, 'views', 'services.html'));
      break;

    case '/booking':
      servePage(res, path.join(__dirname, 'views', 'booking.html'));
      break;

    default:
      servePage(res, path.join(__dirname, 'views', '404.html'), 404);
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});