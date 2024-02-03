import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { COMMAND_PRIORITY_EDITOR } from 'lexical';
import { useEffect } from 'react';

import { $createFigmaNode, FigmaNode } from '../../nodes/FigmaNode';
import { INSERT_FIGMA_COMMAND } from './Command';

export default function FigmaPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([FigmaNode])) {
            throw new Error('FigmaPlugin: FigmaNode not registered on editor');
        }

        return editor.registerCommand<string>(
            INSERT_FIGMA_COMMAND,
            (payload) => {
                const figmaNode = $createFigmaNode(payload);
                $insertNodeToNearestRoot(figmaNode);
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    return null;
}

export { INSERT_FIGMA_COMMAND } from './Command';
