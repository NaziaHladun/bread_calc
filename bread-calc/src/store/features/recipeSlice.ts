import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Recipe } from "../../models/types.ts";

import RECIPES from "../../recipes.ts";

type RecipeState = {
  selectedRecipe: Recipe | null;
  quantityInKg: number;
  searchedRecipes: Recipe[] | null;
};

const initialState: RecipeState = {
  selectedRecipe: null,
  quantityInKg: 1,
  searchedRecipes: RECIPES,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
    incrementQuantity: (state) => {
      state.quantityInKg += 1;
    },
    decrementQuantity: (state) => {
      if (state.quantityInKg < 1) {
        return;
      }

      state.quantityInKg -= 1;
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantityInKg = action.payload;
    },
    setSearchRecipe: (state, action: PayloadAction<string>) => {
      state.searchedRecipes = RECIPES.filter((recipe: Recipe) =>
        recipe.name
          .toLocaleLowerCase()
          .includes(action.payload.toLocaleLowerCase())
      );
    },
  },
});

export const {
  setSelectedRecipe,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  setSearchRecipe,
} = recipeSlice.actions;
export default recipeSlice.reducer;
