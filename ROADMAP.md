# Roadmap: Customer Inbox Triage App

## Phase 1: Assessment & Planning (Current)
- [x] Analyze current codebase and identify bottlenecks.
- [x] Document findings and create improvement plan.
- [x] Establish project artifacts (ROADMAP.md, NOTES.md, AGENT.md).

## Phase 2: Core Logic Refactoring
- [x] **Fix Classification Logic**
    - Move from keyword scraping to structured JSON output from LLM.
    - Define a strict schema for categories (e.g., "Technical Support", "Billing", "Feature Request", "General Inquiry", "Feedback").
    - Update `llmHelper.js` to enforce this schema.

- [x] **Fix Urgency Scoring**
    - specialized the LLM to provide an urgency score (0-10) and reasoning.
    - Remove or demote the arbitrary rule-based scorer (`urgencyScorer.js`) to a fallback mechanism (Removed completely).
    - Ensure "Production Down" scenarios trigger High urgency.

- [x] **Fix Recommendation Engine**
    - Replace static `actionTemplates` with context-aware recommendations from the LLM.
    - Map categories to specific, valid playbooks (e.g., Server Down -> Escalate to DevOps; Payment Fail -> Check Stripe Logs).

## Phase 3: Validation & Polish
- [ ] Create a test suite of example messages (including the ones identified as failures).
- [ ] Verify that the new logic correctly processes all test cases.
- [ ] Update frontend to display the richer AI-generated data (e.g., confidence scores, tailored next steps).

## Phase 4: Future Improvements
- [ ] Add "Feedback Loop" to allow users to correct the AI and improve future accuracy.
- [ ] Integrate with real backend/ticketing system.
