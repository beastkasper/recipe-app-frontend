import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Recipe {
    id: string;
    title: string;
    description: string;
    ingredients: string[];
    image: string;
    cookingTime: number;
}

interface RecipeState {
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}

const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
};

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        fetchRecipesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchRecipesSuccess(state, action: PayloadAction<Recipe[]>) {
            state.loading = false;
            state.recipes = action.payload;
        },
        fetchRecipesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchRecipesStart,
    fetchRecipesSuccess,
    fetchRecipesFailure,
} = recipeSlice.actions;

export default recipeSlice.reducer;
