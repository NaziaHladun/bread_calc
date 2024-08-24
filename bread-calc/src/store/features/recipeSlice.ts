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
  },
});

export const {
  setSelectedRecipe,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
} = recipeSlice.actions;
export default recipeSlice.reducer;
