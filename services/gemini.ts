
import { GoogleGenAI } from "@google/genai";

// Always use named parameter for apiKey and obtain it exclusively from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFinancialInsight(type: string, inputs: any, result: any) {
  try {
    const prompt = `
      Act as a world-class senior wealth manager and quantitative analyst. 
      Analyze the following ${type} calculation results for a client:
      - Inputs: ${JSON.stringify(inputs)}
      - Results: Total Projected Value: ${result.totalValue}, Capital Invested: ${result.invested}, Net Growth/Gains: ${result.returns}
      
      Your response should be:
      1. Strategic: Explain if the user is on a healthy financial track based on common benchmarks (e.g., SWR 4%, rule of 72, inflation targets).
      2. Human-Centric: Translate the "Total Projected Value" into lifestyle terms (what does this mean for their standard of living?).
      3. Actionable: Provide ONE high-impact "next step" (e.g., tax-advantaged accounts, diversification, or portfolio rebalancing).
      4. Engaging: Use professional yet encouraging language. Avoid generic filler.
      
      Format: Use Markdown. Use bolding for key figures. Keep it between 150-180 words.
    `;

    // Always use ai.models.generateContent with both model name and prompt
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Directly access the text property as it is a getter, not a method
    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Our intelligence engine is currently refreshing. Please recalculate in a few moments to receive your personalized wealth analysis.";
  }
}
