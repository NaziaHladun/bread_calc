import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./features/recipeSlice.ts";
import UISlice from "./features/uiSlice.ts";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    UI: UISlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
