import { readFile, writeFile } from 'fs/promises';

const PATH =
  '../curriculum/locales/english/learn-near-smart-contracts-by-building-a-word-guessing-game.md';

/**
 * Ensures all lessons are incremented by 1
 */
async function rejig() {
  const file = await readFile(PATH, 'utf-8');
  let lessonNumber = 0;
  const newFile = file.replace(/## \d+/g, () => {
    lessonNumber++;
    return `## ${lessonNumber}`;
  });
  await writeFile(PATH, newFile, 'utf-8');
}

rejig();
