import { readdirSync } from 'fs';
import { join, extname } from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dir = join(process.cwd(), 'public/profiles');
  try {
    const files = readdirSync(dir).filter((file) =>
      ['.jpg', '.jpeg', '.png'].includes(extname(file).toLowerCase())
    );

    if (files.length === 0) {
      return res.status(404).json({ error: 'No images found' });
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    res.status(200).json({ filename: randomFile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read image directory' });
  }
}
