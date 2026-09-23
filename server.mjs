import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

// Translation is intentionally local/demo-only. No API key or external service is required.
async function translate(request, response) {
  let body = '';
  for await (const chunk of request) body += chunk;

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    sendJson(response, 400, { error: 'Invalid JSON' });
    return;
  }

  const texts = Array.isArray(payload.texts) ? payload.texts : [];
  const languageCodes = { ta: 'ta-IN', hi: 'hi-IN' };
  if (!languageCodes[payload.target] || texts.length > 80 || texts.some(text => typeof text !== 'string' || text.length > 1000)) {
    sendJson(response, 400, { error: 'Invalid translation request' });
    return;
  }

  // The frontend already contains the built-in translations. Return the source text
  // for any untranslated text instead of calling a paid/external translation API.
  sendJson(response, 200, { translations: texts });
}

async function serve(request, response) {
  const requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.slice(1);
  const filePath = path.resolve(root, relativePath);
  if (!filePath.startsWith(root + path.sep)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
    response.end(content);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'POST' && request.url === '/api/translate') {
    await translate(request, response);
    return;
  }
  if (request.method === 'GET') {
    await serve(request, response);
    return;
  }
  response.writeHead(405);
  response.end('Method not allowed');
});

server.listen(port, () => {
  console.log(`SLI server running at http://localhost:${port}`);
});
