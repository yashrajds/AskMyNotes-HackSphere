import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

/**
 * Get a response from Gemini Pro model
 * @param question - The question to ask
 * @returns The AI's response text
 */
export async function getGeminiResponse(question: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(question);
    const response = result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    throw new Error("Failed to get response from AI");
  }
}

/**
 * Get a response from Gemini Pro Vision model (for images)
 * @param question - The question about the image
 * @param imageData - The image data (base64 or URL)
 * @returns The AI's response text
 */
export async function getGeminiVisionResponse(
  question: string, 
  imageData: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    const result = await model.generateContent([
      question,
      {
        inlineData: {
          data: imageData,
          mimeType: "image/png"
        }
      }
    ]);
    
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error getting Gemini Vision response:", error);
    throw new Error("Failed to get response from AI vision model");
  }
}

export default getGeminiResponse;
