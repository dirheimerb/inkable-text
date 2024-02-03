import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAG_DROP_PASTE } from '@lexical/rich-text';
import { isMimeType, mediaFileReader } from '@lexical/utils';
import { COMMAND_PRIORITY_LOW } from 'lexical';
import { useEffect } from 'react';

import { INSERT_IMAGE_COMMAND } from '../ImagesPlugin';
import { ACCEPTABLE_IMAGE_TYPES } from '../../lib/constants';



export default function DragDropPaste(): null {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            DRAG_DROP_PASTE,
            (files) => {
                (async () => {
                    const filesResult = await mediaFileReader(
                        files,
                        [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
                    );
                    for (const { file, result } of filesResult) {
                        if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
                            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                                altText: file.name,
                                src: result,
                            });
                        }
                    }
                })();
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);
    return null;
}
/*
 useEffect(() => {
        const handleFiles = async (files: FileList) => {
            try {
                const filesResult = await mediaFileReader(files, ACCEPTABLE_IMAGE_TYPES);
                for (const { file, result } of filesResult) {
                    if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
                        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                            altText: file.name,
                            src: result,
                        });
                    }
                }
            } catch (error) {
                console.error('Error processing files:', error);
            }
        };

        const unregister = editor.registerCommand(
            DRAG_DROP_PASTE,
            (files) => {
                handleFiles(files);
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );

        return unregister;
    }, [editor]);

    return null;
}
*/