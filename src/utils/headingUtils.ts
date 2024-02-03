import { HeadingTagType } from '@lexical/rich-text';
import { MARGIN_ABOVE_EDITOR } from '../lib/constants';

type HeadingSwitch =
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'heading5'
    | 'heading6';

export function indent(tagName: HeadingTagType): HeadingSwitch {
    switch (tagName) {
        case 'h1':
            return 'heading1';
        case 'h2':
            return 'heading2';
        case 'h3':
            return 'heading3';
        case 'h4':
            return 'heading4';
        case 'h5':
            return 'heading5';
        case 'h6':
            return 'heading6';
    }
}

export function isHeadingAboveViewport(element: HTMLElement): boolean {
    const YPosition = element.getBoundingClientRect().top;
    return YPosition < 0;
}
export function isHeadingBelowTheTopOfThePage(element: HTMLElement): boolean {
    const YPosition = element.getBoundingClientRect().top;
    return YPosition > MARGIN_ABOVE_EDITOR;
}
