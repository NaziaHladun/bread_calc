import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Recipe } from "../../models/types.ts";

type RecipeState = {
  selectedRecipe: Recipe | null;
  quantityInKg: number;
  allRecipes: Recipe[] | null | undefined;
  searchedRecipes: Recipe[] | null | undefined;
};

const initialState: RecipeState = {
  selectedRecipe: null,
  quantityInKg: 1,
  allRecipes: [],
  searchedRecipes: [],
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
      state.searchedRecipes = state.allRecipes?.filter((recipe: Recipe) =>
        recipe.name
          .toLocaleLowerCase()
          .includes(action.payload.toLocaleLowerCase())
      );
    },
    setAllRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.allRecipes = action.payload;
      state.searchedRecipes = action.payload;
    },
  },
});

export const {
  setSelectedRecipe,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  setSearchRecipe,
  setAllRecipes,
} = recipeSlice.actions;
export default recipeSlice.reducer;
