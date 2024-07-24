import React from 'react';
import RecipeList from "../src/entities/recipe/ui/RecipeList";
import RecipeHeader from "../src/entities/recipe/ui/RecipeHeader";
import RecipeSearch from "../src/entities/recipe/ui/RecipeSearch";


const HomePage: React.FC = () => {
    return (
        <div style={{ width: "600px" }}>
            <RecipeHeader />
            <RecipeSearch/>
            <RecipeList/>
        </div>
    );
};

export default HomePage;
