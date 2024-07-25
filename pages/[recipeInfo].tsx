import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Descriptions, List } from 'antd/lib';
import api from "../src/shared/api/api";
import Image from "next/image";

interface Recipe {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    image: string;
    cookingTime: number;
}

const RecipeDetailPage: React.FC = () => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { recipeInfo } = router.query;

    useEffect(() => {
        if (recipeInfo) {
            const fetchRecipe = async () => {
                try {
                    const response = await api.get(`/recipes/${recipeInfo}`);
                    setRecipe(response.data);
                    setLoading(false);
                } catch (err) {
                    setError('Error fetching recipe details');
                    setLoading(false);
                }
            };

            fetchRecipe();
        }
    }, [recipeInfo]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    return (
        <Card
            title={recipe.title}
            cover={<img loading="lazy" fetchPriority="low" style={{ padding: "12px 24px", borderRadius: 52, objectFit: "cover",  width: "100%", height: "300px" }} alt={recipe.title} src={recipe.image} />}
            style={{ margin: '20px' }}
        >
            <Descriptions title="Recipe Details" bordered>
                <Descriptions.Item label="Description" span={3}>{recipe.description}</Descriptions.Item>
                <Descriptions.Item label="Cooking Time" span={3}>{recipe.cookingTime} minutes</Descriptions.Item>
            </Descriptions>
            <h3>Ingredients</h3>
            <List
                dataSource={recipe.ingredients}
                renderItem={(ingredient: string) => <List.Item>{ingredient}</List.Item>}
            />
            <h3>Steps</h3>
            <List
                dataSource={recipe.steps}
                renderItem={(step:string, index: number) => <List.Item>{`${index + 1}. ${step}`}</List.Item>}
            />
        </Card>
    );
};

export default RecipeDetailPage;
