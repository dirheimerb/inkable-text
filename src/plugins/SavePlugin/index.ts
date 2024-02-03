import {
    LexicalEditor,
    SerializedEditorState,
    SerializedLexicalNode,
} from 'lexical';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useCallback } from 'react';
// import { useMemo } from "react";

const _supabase = createClient(
    'https://kesjtpesrpqzggzndisj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlc2p0cGVzcnBxemdnem5kaXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2NjIwMzAsImV4cCI6MTk5OTIzODAzMH0.-KJoIZ0AHAv72wx60HcMbkbikouArD2LccFwyFBahz4',
);

export interface SaveState {
    isSaving: boolean;
    content: SerializedEditorState<SerializedLexicalNode>;
    error: any;
}

export function useSave(editor: LexicalEditor) {
    const [state, setState] = useState<SaveState>({
        isSaving: false,
        content: editor.getEditorState().toJSON(),
        error: null,
    });

    const handleSaveToServer = useCallback(async () => {
        const stateValue = editor.getEditorState().toJSON();
        const text = JSON.stringify(stateValue);
        try {
            console.log('Saving content to the server');
            const { data, error } = await _supabase
                .from('test_document')
                .insert([
                    {
                        content: text,
                        // owner_id: '6d4ac1a6-b53e-4824-a97c-4d392b1b6d8d'
                    },
                ]);
            if (error) {
                throw error;
            }
            console.log('Saved content to the server', data);
        } catch (error) {
            console.error('Error saving content to the server', error);
        } finally {
            setState((prev) => ({ ...prev, isSaving: false }));
        }
    }, [state.content]);

    // useMemo(() => {
    //     const content = editor.getEditorState().toJSON();
    //     if (content !== state.content) {
    //         setState((prev) => ({ ...prev, content }));
    //     }
    // }, [editor, state.content]);

    return { ...state, handleSaveToServer };
}
