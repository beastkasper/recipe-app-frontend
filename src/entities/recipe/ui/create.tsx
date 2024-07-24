import React from 'react';
import { Input, Button, Form, List, Space } from 'antd/lib';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons/lib/icons';
import { useRecipeForm } from '../model/useRecipeForm';

export const CreateRecipePage: React.FC = () => {
    const {
        isLoading,
        title,
        setTitle,
        description,
        setDescription,
        ingredients,
        handleAddIngredient,
        handleRemoveIngredient,
        handleIngredientChange,
        steps,
        handleAddStep,
        handleRemoveStep,
        handleStepChange,
        image,
        setImage,
        cookingTime,
        setCookingTime,
        handleSubmit
    } = useRecipeForm();

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item label="Title">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item label="Description">
                <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Item>
            <Form.Item label="Ingredients">
                <List
                    dataSource={ingredients}
                    renderItem={(ingredient, index) => (
                        <List.Item>
                            <Space>
                                <Input
                                    placeholder="Ingredient"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(e.target.value, index)}
                                />
                                {ingredients.length > 1 && (
                                    <MinusCircleOutlined onClick={() => handleRemoveIngredient(index)} />
                                )}
                            </Space>
                        </List.Item>
                    )}
                />
                <Button type="dashed" onClick={handleAddIngredient} block icon={<PlusOutlined />}>
                    Add Ingredient
                </Button>
            </Form.Item>
            <Form.Item label="Steps">
                <List
                    dataSource={steps}
                    renderItem={(step, index) => (
                        <List.Item>
                            <Space>
                                <Input.TextArea
                                    placeholder="Step"
                                    value={step}
                                    onChange={(e) => handleStepChange(e.target.value, index)}
                                />
                                {steps.length > 1 && (
                                    <MinusCircleOutlined onClick={() => handleRemoveStep(index)} />
                                )}
                            </Space>
                        </List.Item>
                    )}
                />
                <Button type="dashed" onClick={handleAddStep} block icon={<PlusOutlined />}>
                    Add Step
                </Button>
            </Form.Item>
            <Form.Item label="Image URL">
                <Input value={image} onChange={(e) => setImage(e.target.value)} />
            </Form.Item>
            <Form.Item label="Cooking Time">
                <Input type="number" value={cookingTime} onChange={(e) => setCookingTime(Number(e.target.value))} />
            </Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
                Create Recipe
            </Button>
        </Form>
    );
};
