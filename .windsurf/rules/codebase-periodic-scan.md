---
trigger: always_on
---

PERIODIC COMPLETE CODEBASE SCAN & KNOWLEDGE BASE REFRESH FOR MAESTRO MOBILE AUTOMATION
INITIAL COMPLETE SCAN (PERFORM IMMEDIATELY UPON FIRST INTERACTION):

Scan EVERY file in the project repository:

All Maestro flow files (*.yaml, *.yml in flows/)
All subflow files (reusable flow components)
All JavaScript helper files (for runScript commands)
All configuration files (config.yaml, .maestro/, env files)
All app binary/build files referenced (APK, IPA, app bundle paths)
All documentation files (README.md, CONTRIBUTING.md, docs/)
All CI/CD configuration (.gitlab-ci.yml, .github/workflows/, maestro-ci.yaml)
All setup scripts (device setup, simulator scripts, cloud upload scripts)
All test data files (JSON, CSV, test credentials, mock data)
All screenshot/recording output directories
All directories and their structure


Build complete dependency graph:

Map every runFlow reference to actual flow files
Identify which flows depend on which subflows
Track circular flow dependencies
Note external script dependencies in JavaScript files
Map environment variable usage across flows
Track app ID references and which flows test which apps


Catalog all code entities:

All flow definitions with their names and purposes
All element selectors (id, text, accessibility labels, coordinates)
All exported constants and variables in JavaScript helpers
All reusable subflows and their parameters
All custom JavaScript functions in runScript blocks
All test suites and flow groupings
All custom assertions and wait conditions
All environment variables used across flows


Analyze code patterns and conventions:

Naming conventions for flows, subflows, and variables
Common flow patterns and idioms used
Testing strategies and structures (smoke, regression, E2E)
Error handling approaches in flows
Retry and wait strategies
Element selection strategies (text vs. id vs. accessibility)
Scroll and navigation patterns


Document project structure:

Directory hierarchy and organization logic
How flows are grouped (by feature, by app, by test type)
Flow organization strategy (login, onboarding, checkout, etc.)
Shared vs. feature-specific flow locations
Test data organization
Output and artifact locations


Index content for fast retrieval:

Create searchable index of all flows and subflows
Map all element selectors to their flows
List all test IDs, accessibility labels, and where they're used
Catalog all API interactions (if using HTTP commands)
Track all environment variables and configuration options
Index all JavaScript helper functions and their purposes



WHAT TO MEMORIZE FROM COMPLETE SCAN:

Core knowledge to retain:

Complete file tree structure
All runFlow dependencies and flow relationships
All available JavaScript helpers (name, location, purpose, signature)
All reusable subflows (name, location, parameters, commands)
All element selectors and their contexts
All environment variables and configuration
All test data locations and structures
All configuration options and their current values
Common patterns: how flows are structured, how elements are selected


Interconnection mapping:

Which flows use which subflows
Which flows use which JavaScript helpers
Which flows depend on specific environment variables
Which flows are "entry points" (main test flows)
Which flows are "utilities" (subflows used by many)
Dependency chains: if I change flow X, which flows are affected
Which flows test which features/screens of the app



INCREMENTAL SCANS (PERFORM AUTOMATICALLY):

Trigger incremental scans when:

New flow files are created (detected via file system changes)
Files are renamed or moved
Significant refactoring is mentioned by me
I explicitly say "rescan the codebase" or "refresh your knowledge"
After major merge/pull from GitLab (if you can detect this)
Every 50-100 messages in a long session
When I reference a flow that's not in your cached knowledge
When I mention adding new screens or features to the app


Incremental scan process:

Identify changed/new/deleted files since last scan
Re-scan only affected flows and their direct dependencies
Update the dependency graph for changed runFlow relationships
Maintain unchanged cached knowledge
Much faster than full scan, but keeps knowledge fresh



SCHEDULED DEEP SCANS:

Perform full re-scan periodically:

Every 24 hours of active usage
At the start of each new day/session if I'm a daily user
When I explicitly request: "do a full codebase refresh"
When error rate increases (might indicate stale knowledge)
After app updates that change UI elements


Deep scan includes:

Re-verify all file locations and structures
Re-analyze all flow dependencies
Update all cached patterns and conventions
Identify new flow patterns that have emerged
Remove knowledge about deleted flows
Update knowledge about refactored element selectors



SCAN OPTIMIZATION:

Make scans efficient:

Cache parsed YAML structures for unchanged files
Use file modification timestamps to skip unchanged files
Parallelize scanning when possible
Prioritize frequently-used flows in incremental scans
Index strategically for fast lookup


Balance thoroughness vs. speed:

Initial scan: thorough, no shortcuts
Incremental scans: fast, targeted
Deep scans: thorough but leverage cached data where valid



KNOWLEDGE BASE STRUCTURE:

Organize scanned knowledge for easy retrieval:

Flow index: path → contents, subflows used, dependencies
Command index: command type → flows that use it
Element index: selector → flows that reference it
Dependency graph: flow → [flows it depends on, flows that depend on it]
Pattern library: recognized patterns → where they're used
Flow inventory: flow description → file, commands, subflows used
Selector catalog: UI element → flow, selector strategy


Cross-reference everything:

From a flow, instantly know which subflows and helpers it uses
From a subflow, instantly know which flows use it
From a JavaScript helper, instantly know its usage across flows
From an element selector, instantly know which flows interact with it
From an env variable, instantly know which flows depend on it



USING SCANNED KNOWLEDGE:

Leverage complete knowledge for better assistance:

Answer "where is X defined?" instantly
Suggest existing subflows before creating new ones
Identify all flows affected by a UI change
Find similar implementations across the codebase
Detect inconsistencies or pattern violations
Provide accurate autocomplete based on actual available flows and commands


Proactive insights from scan data:

"I notice we have 3 similar flows for login, should we consolidate?"
"This element selector exists in 2 places with different strategies"
"This subflow is unused - consider removing?"
"This flow has no dependencies - isolated test case"
"This screen has no test coverage yet"
"These flows all test the same feature - consider organizing into a suite"



SCAN PROGRESS & TRANSPARENCY:

Communicate scan status:

Initial scan: "Performing initial complete codebase scan... this will take a moment"
Show progress for long scans: "Scanned 45/120 flow files..."
Completion: "Scan complete. Indexed X flows, Y subflows, Z element selectors"
Incremental: "Detected 3 new flows, updating knowledge base..."


Allow scan control:

Respect if I say "skip the scan for now"
Let me trigger manual scans: "scan the codebase now"
Let me request specific scans: "rescan just the login flows folder"



GITLAB INTEGRATION AWARENESS:

Consider GitLab workflow:

After I mention pulling/merging branches, offer to rescan
If I mention working on a different branch, note that context may differ
Be aware that other team members may have added/changed flows
Don't assume your cached knowledge is 100% current if significant time has passed



HANDLING LARGE REPOSITORIES:

Scale gracefully:

If repository is very large (500+ flows), prioritize main test flows
For huge repos, focus deep scans on directories I actively work in
Warn if scan will take >2 minutes
Allow backgrounding of scans while still being responsive



KNOWLEDGE VALIDATION:

Verify knowledge accuracy:

If suggesting a flow/command that might not exist, verify first
If unsure whether knowledge is stale, do a quick targeted scan
If I correct you about codebase structure, trigger rescan of that area
Track "knowledge misses" (when cached knowledge was wrong) and trigger scans accordingly



FIRST SCAN CHECKLIST (COMPLETE BEFORE FIRST CODE SUGGESTION):

Ensure initial scan captures:
✓ Every .yaml/.yml flow file in the repository
✓ config.yaml with all Maestro settings
✓ All environment variable definitions
✓ All path configurations and file structures
✓ All subflow definitions and their parameters
✓ All main test flows and their purposes
✓ All JavaScript helper functions
✓ All element selectors and strategies used
✓ CONTRIBUTING.md conventions
✓ README.md project structure
✓ CI/CD configuration (Maestro Cloud, local runs)
✓ App configuration (appId, build paths)
✓ Test data files and locations
✓ Common flow patterns and conventions
✓ Retry and wait strategies used
✓ Navigation and scrolling patterns


The goal: Maintain a comprehensive, fresh, and accurate mental model of the entire Maestro test suite at all times. Know the project as well as (or better than) a senior mobile QA engineer who's worked on it for months.