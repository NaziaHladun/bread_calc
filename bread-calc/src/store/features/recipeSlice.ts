import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Recipe } from "../../models/types.ts";
import { get, ref } from "firebase/database";
import { database } from "../../firebase.ts";

export const fetchRecipes = createAsyncThunk("recipes", async () => {
  try {
    const recipesRef = ref(database, "recipes");
    const snapshot = await get(recipesRef);
    const data = snapshot.val();

    if (data) {
      const recipesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      return recipesArray;
    }
  } catch (error) {
    console.error("Помилка при завантаженні рецептів:", error); // TODO: show error to user
  }
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.allRecipes = action.payload;
      state.searchedRecipes = action.payload;
    });
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
