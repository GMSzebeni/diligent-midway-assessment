import { createApp } from './app';
import { AppError } from './app.error';
import { RecipeType } from './recipe';
import { FileStore } from './stores/file.store';
import { join } from 'node:path';

const fileToStore = join(__dirname, '..', 'data.json');

type RecipeStore = RecipeType[];

const initialRecipes: RecipeType[] = [
  {id: 1, name: 'Scrambled Egg'},
  {id: 2, name: 'Pancake'}
]

const store = new FileStore<RecipeStore>(fileToStore, initialRecipes);
const args = process.argv

async function main() {
  try {
    await createApp(store, args);
  } catch(error) {
    if (error instanceof AppError) {
      console.error(error.message);
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => console.log('Done.'))

