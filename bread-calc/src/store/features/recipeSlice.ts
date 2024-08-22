import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Recipe } from "../../models/types.ts";

type RecipeState = {
  selectedRecipe: Recipe | null;
  quantityInKg: number;
};

const initialState: RecipeState = {
  selectedRecipe: null,
  quantityInKg: 1,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setSelectedRecipe(state, action: PayloadAction<Recipe | null>) {
      state.selectedRecipe = action.payload;
    },
    setQuantityInKg(state, action: PayloadAction<number>) {
      state.quantityInKg = action.payload;
    },
  },
});

export const { setSelectedRecipe, setQuantityInKg } = recipeSlice.actions;
export default recipeSlice.reducer;
