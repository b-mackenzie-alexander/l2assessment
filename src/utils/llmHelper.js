import Groq from 'groq-sdk';

/**
 * LLM Helper for categorizing customer support messages
 * Using Groq API for AI-powered categorization
 */

// Initialize Groq client
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Required for browser-based calls (not recommended for production!)
});

/**
 * Categorize a customer support message using Groq AI
 * 
 * @param {string} message - The customer support message
 * @returns {Promise<{category: string, urgency: string, recommendation: string, reasoning: string}>}
 */
export async function categorizeMessage(message) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert customer support triage agent. 
Analyze the user's message and return a JSON object with the following fields:
- category: One of ["Technical Support", "Billing Issue", "Feature Request", "General Inquiry", "Feedback"]
- urgency: One of ["Low", "Medium", "High"]
- recommendedAction: A specific, actionable next step for the support agent.
- reasoning: A brief explanation of why you chose this category and urgency.

Rules:
1. "Server down" or "Production issue" is always High urgency.
2. "How to" questions or general praise are Low urgency.
3. Be professional and concise.`
        },
        {
          role: "user",
          content: message
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
    });

    const result = JSON.parse(response.choices[0].message.content);

    return {
      category: result.category || "Unknown",
      urgency: result.urgency || "Medium",
      recommendedAction: result.recommendedAction || "Review manually.",
      reasoning: result.reasoning || response.choices[0].message.content
    };
  } catch (error) {
    console.warn('Groq API failed or returned malformed JSON, using mock response:', error.message);
    return getMockCategorization(message);
  }
}

/**
 * Mock categorization for when API is unavailable or fails
 */
function getMockCategorization(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('server') && lowerMessage.includes('down')) {
    return {
      category: "Technical Support",
      urgency: "High",
      recommendedAction: "Escalate to DevOps team immediately.",
      reasoning: "The user reported a production server outage."
    };
  }

  if (lowerMessage.includes('bill') || lowerMessage.includes('payment')) {
    return {
      category: "Billing Issue",
      urgency: "Medium",
      recommendedAction: "Verify transaction status in the billing dashboard.",
      reasoning: "The inquiry is related to financial transactions."
    };
  }

  if (lowerMessage.includes('feature') || lowerMessage.includes('would love')) {
    return {
      category: "Feature Request",
      urgency: "Low",
      recommendedAction: "Log the request in the product backlog.",
      reasoning: "The user is suggesting a product improvement."
    };
  }

  if (lowerMessage.includes('thank') || lowerMessage.includes('happy')) {
    return {
      category: "Feedback",
      urgency: "Low",
      recommendedAction: "Send a polite thank-you response.",
      reasoning: "The customer is expressing satisfaction."
    };
  }

  return {
    category: "General Inquiry",
    urgency: "Low",
    recommendedAction: "Respond with a link to our documentation.",
    reasoning: "General question about the product."
  };
}
