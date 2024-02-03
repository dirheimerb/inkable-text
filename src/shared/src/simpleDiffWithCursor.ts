interface StringDiffParams {
    original: string;
    modified: string;
    cursorPosition: number;
}

interface StringDiffResult {
    startIndex: number;
    textToInsert: string;
    countToRemove: number;
}

export default function simpleDiffWithCursor(
    params: StringDiffParams,
): StringDiffResult {
    const { original, modified, cursorPosition } = params;
    const originalLength = original.length;
    const modifiedLength = modified.length;
    let commonPrefixLength = 0; // Number of same characters from the start
    let commonSuffixLength = 0; // Number of same characters from the end

    // Ensure cursor position is within the bounds of both strings
    const effectiveCursorPosition = Math.min(
        cursorPosition,
        originalLength,
        modifiedLength,
    );

    // Find length of common prefix, respecting the cursor position
    while (
        commonPrefixLength < effectiveCursorPosition &&
        original[commonPrefixLength] === modified[commonPrefixLength]
    ) {
        commonPrefixLength++;
    }

    // Find length of common suffix, ensuring it doesn't overlap with the common prefix
    while (
        commonSuffixLength + commonPrefixLength < originalLength &&
        commonSuffixLength + commonPrefixLength < modifiedLength &&
        original[originalLength - commonSuffixLength - 1] ===
            modified[modifiedLength - commonSuffixLength - 1]
    ) {
        commonSuffixLength++;
    }

    // Calculate the difference without further iteration if no overlap
    return {
        startIndex: commonPrefixLength,
        textToInsert: modified.slice(
            commonPrefixLength,
            modifiedLength - commonSuffixLength,
        ),
        countToRemove: originalLength - commonPrefixLength - commonSuffixLength,
    };
}
//   const aLength = a.length;
//   const bLength = b.length;
//   let left = 0; // number of same characters counting from left
//   let right = 0; // number of same characters counting from right
//   // Iterate left to the right until we find a changed character
//   // First iteration considers the current cursor position
//   while (
//     left < aLength &&
//     left < bLength &&
//     a[left] === b[left] &&
//     left < cursor
//   ) {
//     left++;
//   }
//   // Iterate right to the left until we find a changed character
//   while (
//     right + left < aLength &&
//     right + left < bLength &&
//     a[aLength - right - 1] === b[bLength - right - 1]
//   ) {
//     right++;
//   }
//   // Try to iterate left further to the right without caring about the current cursor position
//   while (
//     right + left < aLength &&
//     right + left < bLength &&
//     a[left] === b[left]
//   ) {
//     left++;
//   }
//   return {
//     index: left,
//     insert: b.slice(left, bLength - right),
//     remove: aLength - left - right,
//   };
// }
