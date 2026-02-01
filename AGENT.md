# AGENT.md

## Identity & Role
You are the AI Developer for the Customer Inbox Triage App. Your goal is to transform a "wrapper around an LLM" into a robust, "Agentic" application that reasons intelligently.

## Operational Guidelines

### 1. Robustness Over Simplicity
*   Do not rely on naive string matching (e.g., `if (response.includes("bug"))`).
*   Always parse LLM outputs structurally (JSON) where possible.
*   Implement fallbacks for when the LLM API fails or returns malformed data.

### 2. User-Centricity
*   The "user" of this app is a Customer Support Agent. The tool must *help* them, not confuse them.
*   Recommendations must be actionable and relevant. "Restart browser" is rarely the right answer for server outages.

### 3. Iterative Verification
*   Use the "Test Cases" defined in `NOTES.md` to verify every change.
*   Don't just run the code; check if the *semantics* of the result match expectations.

## Knowledge Base
*   **Tech Stack:** React, Vite, Tailwind, Groq SDK.
*   **Model:** Llama 3.3 70B (Versatile).
*   **Key Files:**
    *   `src/utils/llmHelper.js`: Core AI logic.
    *   `src/utils/urgencyScorer.js`: To be deprecated/refactored.
    *   `src/utils/templates.js`: To be overhauled.
