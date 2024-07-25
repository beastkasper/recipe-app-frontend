import { useState } from 'react';
import api from '../../../shared/api/api';
import { notification } from 'antd/lib';

export const useRecipeForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [steps, setSteps] = useState<string[]>(['']);
    const [image, setImage] = useState('');
    const [cookingTime, setCookingTime] = useState(0);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await api.post('/recipes/create', { title, description, ingredients, steps, image, cookingTime });
            notification.success({
                message: "You have successfully added a new recipe"
            });
        } catch (error) {
            console.log(error);
            notification.error({
                message: error.response?.data?.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const handleIngredientChange = (value: string, index: number) => {
        const newIngredients = ingredients.map((ingredient, i) => i === index ? value : ingredient);
        setIngredients(newIngredients);
    };

    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    const handleRemoveStep = (index: number) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
    };

    const handleStepChange = (value: string, index: number) => {
        const newSteps = steps.map((step, i) => i === index ? value : step);
        setSteps(newSteps);
    };

    return {
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
    };
};
