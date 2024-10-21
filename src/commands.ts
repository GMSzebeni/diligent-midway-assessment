import { AppError } from "./app.error";
import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  if(args.length > 0) {
    throw new AppError('The list command should not have any argument.')
  }
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}

export async function details(store: Store<RecipeType[]>, id: string[]) {
  if (!id || id.length !== 1) {
    throw new AppError('Please provide a valid id!');
  }
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const recipeToShow = recipes.find(recipe => recipe.id === Number(id));
  if (!recipeToShow) {
    throw new AppError(`There is no recipe with the id: ${id}`);
  }
  console.log(`ID: ${recipeToShow.id}\nName: ${recipeToShow.name}`);
}