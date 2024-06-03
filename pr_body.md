This PR replaces the `Typography` component with the `Text` component in `chip.js` as part of the effort to standardize text rendering across the MetaMask extension. The migration was performed according to the guidelines provided, ensuring that the `Text` component's API is properly utilized in place of the `Typography` component's API. Manual testing has been performed to confirm that there are no visual regressions in the `Chip` component's rendering. Before and after screenshots have been attached for review.

## Before Changes
![Before Changes](https://api.devin.ai/attachments/before_changes_chip.js.png)

## After Changes
![After Changes](https://api.devin.ai/attachments/after_changes_chip.js.png)

## Related Issue
[MetaMask/metamask-extension#17670](https://github.com/MetaMask/metamask-extension/issues/17670)
