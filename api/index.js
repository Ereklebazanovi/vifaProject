import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const host = req.headers.host || '';
  const isVifa = host.includes('vifadigital');
  
  const filePath = join(process.cwd(), 'dist', isVifa ? 'index-vifa.html' : 'index.html');
  
  try {
    const html = readFileSync(filePath, 'utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.status(200).send(html);
  } catch (e) {
    res.status(500).send('Error loading page');
  }
}