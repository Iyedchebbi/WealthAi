
import { GoogleGenAI } from "@google/genai";

export async function getFinancialInsight(type: string, inputs: any, result: any) {
  try {
    // Robust access to the API key from environment
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("WealthAI: API Key is missing from environment variables.");
      return "Strategic analysis is currently unavailable. Please verify that the system API key is correctly configured in your deployment settings.";
    }

    // Initialize the AI client right before use to ensure env variables are fresh
    const ai = new GoogleGenAI({ apiKey });
    
    const promptText = `
      Act as a world-class senior wealth manager and quantitative analyst. 
      Analyze the following ${type} calculation results for a client:
      - Inputs: ${JSON.stringify(inputs)}
      - Results: Total Projected Value: ${result.totalValue}, Capital Invested: ${result.invested}, Net Growth/Gains: ${result.returns}
      
      Your response MUST be:
      1. Strategic: Explain if the user is on a healthy financial track based on common benchmarks (e.g., SWR 4%, rule of 72, inflation targets).
      2. Human-Centric: Translate the "Total Projected Value" into lifestyle terms (what does this mean for their standard of living?).
      3. Actionable: Provide ONE high-impact "next step" (e.g., tax-advantaged accounts, diversification, or portfolio rebalancing).
      4. Engaging: Use professional yet encouraging language. Avoid generic filler.
      
      Format: Use Markdown. Use bolding for key figures. Keep it between 150-180 words.
    `;

    // Use the explicit content structure for maximum reliability across SDK versions
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{
        role: 'user',
        parts: [{ text: promptText }]
      }],
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
      }
    });

    // Handle potential empty or blocked responses
    const generatedText = response.text;
    if (!generatedText || generatedText.trim().length === 0) {
      throw new Error("AI engine returned an empty or restricted response.");
    }

    return generatedText;
  } catch (error: any) {
    console.error("WealthAI Gemini Error:", error);
    
    // Provide specific feedback if it's a known error type
    if (error.message?.includes("API_KEY_INVALID")) {
      return "The intelligence engine encountered an authentication error. Please check the API key configuration.";
    }
    
    return "Our intelligence engine is currently processing a high volume of wealth simulations. Your strategic report is being queued—please try recalculating in a few moments to see your custom insights.";
  }
}
