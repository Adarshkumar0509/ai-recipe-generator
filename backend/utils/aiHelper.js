import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateRecipeWithAI = async (ingredients, preferences = {}) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Create a delicious recipe using these ingredients: ${ingredients.join(', ')}.
      
      User preferences:
      - Dietary restrictions: ${preferences.dietary_preferences || 'none'}
      - Allergies: ${preferences.allergies || 'none'}
      - Cuisine preference: ${preferences.cuisines_preference || 'any'}
      
      Please provide the response in this JSON format:
      {
        "title": "Recipe Name",
        "description": "Brief description",
        "ingredients": ["ingredient 1: amount unit", "ingredient 2: amount unit"],
        "instructions": ["step 1", "step 2", "step 3"],
        "prep_time": 15,
        "cook_time": 30,
        "servings": 4,
        "difficulty": "easy|medium|hard",
        "cuisine": "cuisine type"
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse recipe from AI response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('AI Recipe Generation Error:', error);
    throw error;
  }
};

export const generateMealPlanWithAI = async (dietary_preferences, allergies, cuisine_preference, days = 7) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Create a ${days}-day meal plan with these constraints:
      - Dietary preferences: ${dietary_preferences || 'no restrictions'}
      - Allergies: ${allergies || 'none'}
      - Cuisine preference: ${cuisine_preference || 'mixed'}
      
      Provide a meal plan with breakfast, lunch, and dinner for each day.
      Response should be in this JSON format:
      {
        "meal_plan": [
          {
            "day": 1,
            "breakfast": "meal name",
            "lunch": "meal name",
            "dinner": "meal name"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse meal plan from AI response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('AI Meal Plan Generation Error:', error);
    throw error;
  }
};

export const suggestRecipesFromPantry = async (pantryItems, userPreferences = {}) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Based on these pantry items: ${pantryItems.join(', ')}, suggest 3-5 recipes.
      
      User preferences:
      - Dietary restrictions: ${userPreferences.dietary_preferences || 'none'}
      - Allergies: ${userPreferences.allergies || 'none'}
      - Cuisine preference: ${userPreferences.cuisines_preference || 'any'}
      
      Response should be a JSON array:
      [
        {
          "title": "Recipe Name",
          "ingredients": ["ingredient 1", "ingredient 2"],
          "why_suggested": "Reason based on pantry items"
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Could not parse recipe suggestions from AI response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('AI Recipe Suggestion Error:', error);
    throw error;
  }
};
