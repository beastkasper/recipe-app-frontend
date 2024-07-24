import React, { useEffect, useState } from 'react';
import { List, Card, Button, Modal, Input, Form, Space } from 'antd/lib';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons/lib/icons';
import api from '../src/shared/api/api';

interface Recipe {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    image: string;
    cookingTime: number;
}

const Edit: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [hasAccess, setHasAccess] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    const validPassword = 'admin1';

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await api.get('/recipes');
                setRecipes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handlePasswordSubmit = () => {
        if (password === validPassword) {
            setHasAccess(true);
        } else {
            alert('Incorrect password');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/recipes/${id}`);
            setRecipes(recipes.filter(recipe => recipe._id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleEdit = (recipe: Recipe) => {
        setEditingRecipe(recipe);
        setIsModalVisible(true);
    };

    const handleUpdate = async (values: any) => {
        if (editingRecipe) {
            try {
                const response = await api.put(`/recipes/${editingRecipe._id}`, values);
                setRecipes(recipes.map(recipe => (recipe._id === editingRecipe._id ? response.data : recipe)));
                setIsModalVisible(false);
                setEditingRecipe(null);
            } catch (error) {
                console.error('Error updating recipe:', error);
            }
        }
    };

    if (!hasAccess) {
        return (
            <div style={{ padding: '20px 50px', }}>
                <h1 style={{ marginBottom: 12 }} >Enter Password to Access Edit Page</h1>
                <Input.Password
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '300px', marginBottom: '20px' }}
                />
                <Button style={{ marginLeft: 12 }} type="primary" onClick={handlePasswordSubmit}>
                    Submit
                </Button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px 50px' }}>
            <h1 style={{ marginBottom: 12 }}>All Recipes</h1>
            <List
                loading={loading}
                grid={{ gutter: 16, column: 1 }}
                dataSource={recipes}
                renderItem={recipe => (
                    <List.Item>
                        <Card
                            title={recipe.title}
                            extra={
                                <Space>
                                    <Button icon={<EditOutlined />} onClick={() => handleEdit(recipe)} />
                                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(recipe._id)} />
                                </Space>
                            }
                        >
                            <p>{recipe.description}</p>
                            <p>Cooking Time: {recipe.cookingTime} minutes</p>
                        </Card>
                    </List.Item>
                )}
            />
            {editingRecipe && (
                <Modal
                    title="Edit Recipe"
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <Form
                        initialValues={editingRecipe}
                        onFinish={handleUpdate}
                    >
                        <Form.Item label="Title" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Image URL" name="image">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Cooking Time" name="cookingTime">
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item label="Ingredients" name="ingredients">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Steps" name="steps">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update Recipe
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
};

export default Edit;
