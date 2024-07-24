import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {List, Card, Flex, Typography} from 'antd/lib';
import api from "../../../shared/api/api";

interface Recipe {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    image: string;
    cookingTime: number;
}

const RecipeList: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await api.get('recipes');
                setRecipes(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching recipes');
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <List
            grid={{gutter: 16, column: 1}}
            dataSource={recipes}
            renderItem={(recipe) => (
                <List.Item style={{background: "#fff", borderRadius: 32, width: "100%"}}>
                    <Link href={`/${recipe._id}`}>
                        <Flex gap={12}>
                            <img loading="lazy" alt={recipe.title} width={180} height={180} style={{borderRadius: 28}}
                                 src={recipe.image}/>
                            <Flex style={{ padding: 24 }} vertical={true} >
                                <Typography.Title style={{ fontWeight: "700", fontSize: 18, lineHeight: "24px" }} level={5}>{recipe.title}</Typography.Title>
                                <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ fontWeight: "400", fontSize: 16, lineHeight: "24px", color: "#888888" }}>{recipe.description}</Typography.Paragraph>
                                <Flex>
                                   <Typography.Text style={{ color: "#888888" }} > {recipe.cookingTime} мин </Typography.Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Link>
                </List.Item>
            )}
        />
    );
};

export default RecipeList;
