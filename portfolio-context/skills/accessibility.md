# Accessibility Expertise

## Focus Ring UX/Accessibility Balance (December 2024)

**Skill/Topic**: Web accessibility, WCAG compliance, UX considerations

**Context**: During Phase 2 development of personal website, James noticed that form elements (Input/Textarea components) were showing focus rings when clicked with mouse, which can be visually distracting for mouse users while still being necessary for keyboard navigation accessibility.

**Approach**:
- Identified this as a nuanced accessibility topic requiring research
- Asked specifically to check WCAG best practices before making changes
- Understood the balance between accessibility requirements and user experience

**Technical Details**:
- Problem: Using `focus:ring-2` in Tailwind CSS triggers focus rings for both mouse clicks AND keyboard navigation
- Solution: Implemented `focus-visible:ring-2` instead, which only shows focus rings for keyboard navigation
- Kept `focus:border-color` changes for both interaction types to maintain visual feedback
- Used Tailwind utility classes rather than custom CSS

**WCAG Compliance**:
- Meets WCAG 2.4.7 Focus Visible (AA) requirements
- Maintains accessibility for screen readers and keyboard users
- Improves UX for mouse users without compromising accessibility
- Uses modern `:focus-visible` pseudo-class with good browser support

**Impact**:
- Demonstrates understanding of nuanced accessibility requirements
- Shows ability to balance UX and accessibility concerns
- Indicates knowledge of modern CSS accessibility features
- Reflects thoughtful approach to implementation (research first, then code)

**Keywords**: accessibility, WCAG, focus-visible, keyboard navigation, UX, form accessibility, inclusive design

---

*Add more accessibility examples here as they occur during development*