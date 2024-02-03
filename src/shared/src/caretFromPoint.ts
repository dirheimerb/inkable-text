export default function caretFromPoint(
    x: number,
    y: number,
): null | {
    offset: number;
    node: Node;
} {
    if (typeof document.caretRangeFromPoint !== 'undefined') {
        const range = document.caretRangeFromPoint(x, y);
        if (range === null) {
            return null;
        }
        return {
            node: range.startContainer,
            offset: range.startOffset,
        };
        // @ts-ignore
    } else if (document.caretPositionFromPoint !== 'undefined') {
        // @ts-ignore FF - no types
        const range = document.caretPositionFromPoint(x, y);
        if (range === null) {
            return null;
        }
        return {
            node: range.offsetNode,
            offset: range.offset,
        };
    } else {
        // Gracefully handle IE
        return null;
    }
}

// export default function caretFromPoint(
//   x: number,
//   y: number,
// ): null | {
//   offset: number;
//   node: Node;
// } {
//   if (document.caretPositionFromPoint) {
//     const caretPosition = document.caretPositionFromPoint(x, y);
//     if (caretPosition === null) {
//       return null;
//     }
//     return {
//       node: caretPosition.offsetNode,
//       offset: caretPosition.offset,
//     };
//   } else if (document.caretRangeFromPoint) {
//     const range = document.caretRangeFromPoint(x, y);
//     if (range === null) {
//       return null;
//     }
//     return {
//       node: range.startContainer,
//       offset: range.startOffset,
//     };
//   } else if (document.elementFromPoint) {
//     // Fallback method: less accurate and doesn't provide offset within the text node
//     const element = document.elementFromPoint(x, y);
//     if (element && element.firstChild) {
//       return {
//         node: element.firstChild,
//         offset: 0, // No accurate way to get the offset in this case
//       };
//     }
//   }

//   return null; // If all else fails, return null
// }

// function getCursorWord(
//   event: MouseEvent
// ): { text: string; context: string } | null {
//   const x = event.clientX
//   const y = event.clientY

//   let offsetNode: Node
//   let offset: number
//   let originRange: Range | undefined

//   const sel = window.getSelection()
//   if (!sel) return null
//   if (sel.rangeCount > 0) {
//     originRange = sel.getRangeAt(0)
//     sel.removeAllRanges()
//   }

//   if (document.caretPositionFromPoint) {
//     const pos = document.caretPositionFromPoint(x, y)
//     if (!pos) return null
//     offsetNode = pos.offsetNode
//     offset = pos.offset
//   } else if (document.caretRangeFromPoint) {
//     const pos = document.caretRangeFromPoint(x, y)
//     if (!pos) return null
//     offsetNode = pos.startContainer
//     offset = pos.startOffset
//   } else {
//     return null
//   }

//   if (offsetNode.nodeType === Node.TEXT_NODE) {
//     const textNode = offsetNode as Text
//     const content = textNode.data
//     const head = (content.slice(0, offset).match(/[-_a-z]+$/i) || [''])[0]
//     const tail = (content
//       .slice(offset)
//       .match(/^([-_a-z]+|[\u4e00-\u9fa5])/i) || [''])[0]
//     if (head.length <= 0 && tail.length <= 0) {
//       return null
//     }

//     const range = document.createRange()
//     range.setStart(textNode, offset - head.length)
//     range.setEnd(textNode, offset + tail.length)
//     const rangeRect = range.getBoundingClientRect()

//     // When cursor is pointing at the blank space of
//     // the last line of a paragraph,
//     // caretPositionFromPoint would select the nearest
//     // ending text.
//     // This will make sure the text is truly under cursor.
//     if (
//       rangeRect.left <= x &&
//       rangeRect.right >= x &&
//       rangeRect.top <= y &&
//       rangeRect.bottom >= y
//     ) {
//       sel.removeAllRanges()
//       sel.addRange(range)
//       // select the whole word(CJK)
//       if (sel['modify']) {
//         sel['modify']('move', 'backward', 'word')
//         sel.collapseToStart()
//         sel['modify']('extend', 'forward', 'word')
//       }
//     }

//     const text = getTextFromSelection(sel)
//     const context = getSentenceFromSelection(sel)

//     sel.removeAllRanges()
//     if (originRange) {
//       sel.addRange(originRange)
//     }
//     range.detach()

//     return text ? { text, context } : null
//   }

//   return null
// }
