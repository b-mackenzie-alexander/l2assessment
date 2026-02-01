# Project Notes

## Current System State (Post-Refactor - Feb 2026)

The application has been upgraded to a unified AI-agentic architecture. It no longer relies on fragile rule-based scoring or static templates.

### Resolved Issues (Phase 2 Refactor)

#### 1. Unified Structured Output
*   **Old Logic:** Disjointed calls to LLM (for reasoning), then keyword scraping (for category), then rule-based math (for urgency), then static dict (for recommendation).
*   **New Logic:** Single `json_object` call to Groq (Llama 3.3 70B). The LLM processes the message once and returns a validated JSON structure with `category`, `urgency`, `recommendedAction`, and `reasoning`.

#### 2. Semantic Urgency vs. Rule-Based Urgency
*   **Fixed:** Deleted `urgencyScorer.js`. The LLM now assesses urgency based on **meaning**. 
*   **Result:** "Our production server is down" correctly triggers **High** urgency even though it is a short, polite message without exclamation marks.

#### 3. Context-Aware Recommendations
*   **Fixed:** Deleted `templates.js`. The LLM generates recommendations based on the specific issue.
*   **Result:** A feature request now correctly suggests logging a ticket in the backlog, while a server outage suggests escalating to DevOps.

### New Architecture
*   **Model:** Llama 3.3 70B Versatile
*   **Format:** JSON Mode (`response_format: { type: "json_object" }`)
*   **Temperature:** 0.1 (For higher precision and consistency in categorization)

## Verification Status

| Message | Status | Category | Urgency | Action |
| :--- | :--- | :--- | :--- | :--- |
| "Our production server is down" | ✅ PASS | Technical Support | High | Escalate to DevOps |
| "Hi there! I just wanted to say thank you..." | ✅ PASS | Feedback | Low | Send thank you |
| "I tried to update my payment method but..." | ✅ PASS | Billing Issue | Medium/High | Check dashboard |
| "I would love to see a dark mode..." | ✅ PASS | Feature Request | Low | Log in backlog |
