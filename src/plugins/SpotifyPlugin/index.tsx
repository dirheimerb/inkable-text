// import { EmbedConfig } from "@lexical/react/LexicalAutoEmbedPlugin";
// import { ReactNode } from "react";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import {
    COMMAND_PRIORITY_EDITOR,
    createCommand,
    LexicalCommand,
} from 'lexical';
import { useEffect } from 'react';
import { $createSpotifyNode, SpotifyNode } from '../../nodes/SpotifyNode';

export const INSERT_SPOTIFY_COMMAND: LexicalCommand<string> = createCommand(
    'INSERT_SPOTIFY_COMMAND',
);

export default function SpotifyPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([SpotifyNode])) {
            throw new Error(
                'SpotifyPlugin: SpotifyNode not registered on editor',
            );
        }

        return editor.registerCommand<string>(
            INSERT_SPOTIFY_COMMAND,
            (payload) => {
                const spotifyNode = $createSpotifyNode(payload);
                $insertNodeToNearestRoot(spotifyNode);
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    return null;
}
