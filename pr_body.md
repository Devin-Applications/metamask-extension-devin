## **Description**

This PR replaces the `Typography` component with the `Text` component in `chip.js` as part of the effort to standardize text rendering across the MetaMask extension. The migration was performed according to the guidelines provided, ensuring that the `Text` component's API is properly utilized in place of the `Typography` component's API. Manual testing has been performed to confirm that there are no visual regressions in the `Chip` component's rendering. Before and after screenshots have been attached for review.

## **Related issues**

Fixes: https://github.com/MetaMask/metamask-extension/issues/17670

## **Manual testing steps**

1. Go to the latest build of storybook in this PR
2. Verify the `Chip` component rendering

## **Screenshots/Recordings**

### **Before**

![Before Changes](https://api.devin.ai/attachments/before_changes_chip.js.png)

### **After**

![After Changes](https://api.devin.ai/attachments/after_changes_chip.js.png)

## **Pre-merge author checklist**

- [X] I’ve followed [MetaMask Coding Standards](https://github.com/MetaMask/metamask-extension/blob/develop/.github/guidelines/CODING_GUIDELINES.md).
- [X] I've completed the PR template to the best of my ability
- [X] I’ve included tests if applicable
- [X] I’ve documented my code using [JSDoc](https://jsdoc.app/) format if applicable
- [X] I’ve applied the right labels on the PR (see [labeling guidelines](https://github.com/MetaMask/metamask-extension/blob/develop/.github/guidelines/LABELING_GUIDELINES.md)). Not required for external contributors.

## **Pre-merge reviewer checklist**

- [ ] I've manually tested the PR (e.g. pull and build branch, run the app, test code being changed).
- [ ] I confirm that this PR addresses all acceptance criteria described in the ticket it closes and includes the necessary testing evidence such as recordings and or screenshots.
