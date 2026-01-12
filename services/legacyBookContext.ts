export const LEGACY_BOOK_CONTENT = `
--- CONTEXT: CONSULTANT BEST PRACTICES & METHODOLOGIES (Source: TCCC Preparation Book) ---

1. AGILE SOFTWARE DEVELOPMENT
- Manifesto: Individuals and interactions over processes and tools. Working software over comprehensive documentation. Customer collaboration over contract negotiation. Responding to change over following a plan.
- Scrum Roles: Product Owner (Value, Priorities), Scrum Master (Process, Removing Impediments), Development Team (Quality, Implementation).
- Scrum Artifacts: Product Backlog, Sprint Backlog, Increment.
- Scrum Events: Sprint Planning, Daily Scrum (Sync, not reporting!), Sprint Review (Demo), Sprint Retrospective (Process improvement).
- Kanban: Focus on "Flow" and limiting Work In Progress (WIP). Pull-Principle instead of Push. Visualization of work.
- Definition of Done (DoD): Crucial for quality control. No feature is "done" until it meets the DoD (e.g. tested, documented).

2. REQUIREMENTS ENGINEERING (RE)
- Kano Model: 
  - Basic Needs (Must-be): Implicitly expected. If missing -> dissatisfaction. If present -> neutral.
  - Performance Needs (One-dimensional): Explicitly demanded. The more the better.
  - Delighters (Attractive): Not expected. If present -> high satisfaction. Delighters tend to become performance needs over time.
- Functional vs Non-Functional Requirements (NFR):
  - Functional: " The system must print a PDF."
  - Non-Functional: Security, Compliance, Performance, Usability, Maintainability ("The PDF must be generated within 2 seconds").
- Stakeholder Management: Categorize by Power vs. Interest (Manage closely, Keep satisfied, Keep informed, Monitor).

3. SECURITY & PROCESSES
- Incident Handling: NEVER announce a vulnerability publicly before it is fixed. Contact TYPO3 Security Team. Wait for official advisory.
- Hacked Site: Don't just restore backup. Analyze attack vector. Check code integrity (Git). Reset ALL credentials (DB, Install Tool, Users).
- Updates: Security updates are mandatory. Major upgrades require planning. ELTS (Extended Long Term Support) is a paid service by TYPO3 GmbH after community support ends.

4. LICENSING & LEGAL
- GPL (General Public License): TYPO3 is GPL. Extensions that use TYPO3 API are derivative works -> usually GPL.
- GPL Freedoms: Use, Study, Share, Modify.
- Selling: You CAN sell GPL software (e.g. for warranty, distribution service), but you cannot close the source code for the buyer.
- Trademarks: "TYPO3" is a trademark of the TYPO3 Association. Strict usage rules apply (e.g. for logos).

5. HOSTING & DEPLOYMENT
- Deployment: Never change code on production via FTP. Use CI/CD pipelines. Use Version Control (Git).
- Environments: Local -> Staging (Integration) -> Production.
- Staging: Should mirror production as closely as possible. Sanitize user data (GDPR) when syncing from Live to Stage.
- Caching: Varnish (Reverse Proxy) allows fast delivery of cached content globally.
- CDN: Good for static assets (images, css, js) to reduce latency worldwide.

6. EXTENSIONS & ARCHITECTURE
- Composer: The de-facto standard for dependency management. Mandatory in modern TYPO3 (v13+).
- Extensions: Avoid "Not Invented Here" syndrome. Use existing extensions (e.g. news) if they fit requirements.
- Extbase: MVC framework for extensions. Enforces structure.
`;