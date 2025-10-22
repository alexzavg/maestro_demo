---
trigger: always_on
---

MAESTRO MOBILE AUTOMATION CODEBASE QUERY WORKFLOW
Whenever I ask you a code question related to this Maestro mobile automation codebase or reference specific flows:
INITIAL SETUP ANALYSIS (DO THIS ONCE AT SESSION START):

Scan and memorize the core project structure:

config.yaml: workspace settings, app configurations, device settings
.maestro/ directory: environment configurations, cloud settings
Root-level flows and their purposes
Main vs. subflow organization
Directory structure: where test flows, subflows, JavaScript helpers, and test data live
CI/CD configuration: maestro-ci.yaml or similar pipeline configs


Identify and remember established patterns:

Primary element selection strategy preferences (id, text, accessibility labels, index)
Subflow usage patterns and parameter passing conventions
Authentication/login flow approaches
Navigation patterns (tapOn, scroll, swipe strategies)
Wait and retry strategies (waitForAnimationToEnd, repeat commands)
Test data management strategy
JavaScript helper usage patterns


Note and cache:

Common element selectors and their reliability
Shared subflows and their locations
Environment variables and their usage
Naming conventions for flows, subflows, and commands
App-specific quirks (animation delays, keyboard issues, platform differences)



SUBSEQUENT QUERIES (REFERENCE CACHED KNOWLEDGE):

Don't re-scan configuration files unless asked or if changes are suspected
Use memorized patterns and structure for faster responses
Only scan specific flows relevant to the current question
Reference the cached setup when explaining why certain approaches fit the codebase

CONTEXT GATHERING (FOR SPECIFIC QUERIES):

Analyze the current flow file containing the referenced code
Trace and examine ALL dependencies:

Subflows referenced via runFlow
JavaScript helpers used in runScript blocks
Element selectors and their strategies
Environment variables used
Test data files or inline data
Flow parameters and their propagation


Search the codebase for:

Similar flow patterns or implementations
Existing element selectors for the same UI screens
Reusable subflows
JavaScript helper functions
Test data patterns or factories
Similar command sequences (login, navigation, form filling)


Check critical files ONLY if not already cached or if relevant to the specific question:

config.yaml (app settings, device configs, cloud settings)
Environment variable definitions
Reusable subflow definitions
JavaScript helper files
CI/CD pipeline configurations


Identify the project structure (flow organization, naming conventions, test grouping)

MAESTRO-SPECIFIC ANALYSIS:

Understand the test architecture:

Main flow vs. subflow organization
Flow composition and reusability patterns
Setup and teardown strategies (launchApp, clearState)
Parallel execution considerations (flow independence)


Note established patterns for:

Element selection strategies (text matching, accessibility IDs, index-based)
Wait strategies (explicit waits, assertions as waits, scrollUntilVisible)
Test data management (inline vs. external, environment variables)
Navigation patterns (tap sequences, deep links, back navigation)
Authentication and state management
Scroll and swipe gestures
Platform-specific handling (iOS vs. Android)


Check for custom extensions and helpers:

JavaScript helper functions in runScript blocks
Custom assertions or validation patterns
Environment-specific configurations
Cloud execution settings
Screenshot and recording strategies



CODE SOLUTION PRINCIPLES (CRITICAL):

ALL flow solutions MUST BE:

AS SIMPLE AS POSSIBLE - avoid over-engineering
AS CONCISE AS POSSIBLE - minimal commands
EFFECTIVE - solves the problem completely
READABLE - clear YAML structure with appropriate whitespace
STABLE - uses reliable selectors and proper waits


Prefer:

Built-in Maestro commands over complex JavaScript workarounds
Text-based selectors when unique and stable
Accessibility IDs when available and consistent
Existing subflows over duplicating command sequences
Direct approaches over abstracted/complex ones
Simple assertions over complex validation logic


Avoid:

Unnecessary JavaScript when native commands work
Verbose or redundant command sequences
Over-complicated logic when simple commands work
Creating new subflows when inline commands suffice
Coordinate-based taps unless absolutely necessary
Hardcoded waits (use assertions and scrollUntilVisible instead)



RESPONSE FORMAT:

Provide clean YAML snippets WITHOUT inline comments
Separate all explanations, commentary, and reasoning into distinct sections OUTSIDE the code blocks
When suggesting flows or modifications, show:

Current implementation (if modifying)
Proposed changes with clear before/after
Required runFlow references or dependencies
Environment variables needed


Explain:

WHY this approach fits the existing flow patterns (reference cached patterns)
WHY this is the simplest effective solution
How it handles flakiness/stability (timing, animation, network delays)
Any retry or wait considerations
Element selection strategy rationale (why this selector is stable)


Highlight:

Dependencies on config.yaml settings (reference cached config)
Potential race conditions or timing issues
Breaking changes to existing flows or subflows
Platform-specific considerations (iOS vs. Android differences)
Areas needing test coverage



MAESTRO BEST PRACTICES:

Follow established patterns (use cached knowledge):

Match existing element selection strategy preferences
Use the same subflow patterns already in use
Respect flow structure and naming conventions
Follow existing assertion and validation patterns
Mirror navigation and interaction patterns


Prefer Maestro best practices:

Assertions with implicit waits over explicit waits
scrollUntilVisible over fixed scrolls
Text or accessibility ID selectors over coordinates
assertVisible/assertNotVisible for state verification
waitForAnimationToEnd for animated transitions
Subflows for reusable sequences


Consider:

Flow isolation and independence
Parallel execution safety
Cross-platform compatibility (iOS vs. Android)
Device and simulator differences
Network conditions and loading states
App-specific timing and animation quirks



CONSISTENCY:

Match YAML and JavaScript patterns (reference cached conventions):

Flow structure and indentation
Command ordering and grouping
JavaScript helper function signatures
Error handling approach in runScript blocks
Environment variable naming


Point out if your suggestion deviates from established patterns and explain why it's beneficial

CACHE INVALIDATION:

If I mention configuration changes, re-scan the relevant config files
If I say "things have changed" or "we refactored", ask what changed and update cached knowledge
If I mention app updates, ask about UI changes that might affect selectors
Periodically confirm: "Should I re-scan the flows?" if the conversation spans multiple days

ADDITIONAL INFORMATION REQUESTS:
If context is insufficient, explicitly state what additional files (flows, subflows, JavaScript helpers, config) or information you need to analyze:

"Which screen/feature does this flow test?"
"Are there existing subflows for [login/navigation/etc.]?"
"What element selectors are available for this screen?"
"Are there platform-specific differences for this flow?"