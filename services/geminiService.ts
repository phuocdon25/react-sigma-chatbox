
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client with the API key from environment variables.
// Always use the named parameter for the API key as per the guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Generates a streaming response from the Gemini model based on user input and chat history.
   * @param userInput - The current message sent by the user.
   * @param history - The history of the current conversation session.
   * @returns An AsyncGenerator yielding chunks of generated text.
   */
  getChatResponseStream: async function* (userInput: string, history: { role: string; text: string }[]) {
    // Construct the contents array for the multi-turn conversation context.
    const contents = history.map(entry => ({
      role: entry.role === 'user' ? 'user' : 'model',
      parts: [{ text: entry.text }]
    }));

    // Add the current user query to the contents.
    contents.push({
      role: 'user',
      parts: [{ text: userInput }]
    });

    try {
      // Use gemini-3-flash-preview for general-purpose chat tasks with low latency.
      const response = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          // Provide a system instruction to define the persona and language of the bot.
          systemInstruction: 'Bạn là Sigma Expert AI, trợ lý hỗ trợ khách hàng của FPT Shop. Hãy tư vấn sản phẩm công nghệ một cách lịch sự, chuyên nghiệp và hữu ích bằng tiếng Việt.',
        },
      });

      // Iterate through the stream chunks.
      for await (const chunk of response) {
        // Access the .text property directly (do not call it as a method).
        const text = chunk.text;
        if (text) {
          yield text;
        }
      }
    } catch (error) {
      console.error("Gemini API stream error:", error);
      // Re-throw the error to ensure the UI can handle and display an error state.
      throw error;
    }
  }
};
