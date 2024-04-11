export interface CreateRecipeProps {
  tagId: string;
  name: string;
  description: string;
  ingredients: string[];
  image: string;
  methodOfPreparation: string;
  kcal: number;
}