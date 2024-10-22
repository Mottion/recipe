export interface RecipeProps {
  id: string;
  tag: string;
  author: string;
  authorId: string;
  name: string;
  description: string;
  ingredients: string[];
  image: string;
  methodOfPreparation: string;
  kcal: number;
  rating: number;
  isFavorite?: boolean
} 