
import { GoogleGenAI } from "@google/genai";

export async function getFinancialInsight(type: string, inputs: any, result: any) {
  try {
    // Initialize inside the function to ensure process.env is defined at runtime
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Our intelligence engine is currently refreshing. Please recalculate in a few moments to receive your personalized wealth analysis.";
  }
}
