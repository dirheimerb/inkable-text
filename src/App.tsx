import { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import {
    $createParagraphNode,
    $createTextNode,
    $getRoot,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import {SettingsProvider, useSettings} from './context/SettingsContext';
import { SharedAutocompleteContext } from './context/SharedAutocompleteContext';
import { SharedHistoryContext } from './context/SharedHistoryContext';
import Editor from './Editor';
import EditorNodes from './nodes/EditorNodes';
import DocsPlugin from './plugins/DocsPlugin';
import PasteLogPlugin from './plugins/PasteLogPlugin';
import { TableContext } from './plugins/TablePlugin';
import TestRecorderPlugin from './plugins/TestRecorderPlugin';
import { SettingsProvider } from './context/SettingsContext';
// import Settings from './Settings';

interface Theme {
    paragraph: string;
    quote: string;
    heading: {
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
    };
    list: {
        nested: {
            listitem: string;
        };
        ol: string;
        ul: string;
        listitem: string;
        listitemChecked: string;
        listitemUnchecked: string;
    };
    hashtag: string;
    image: string;
    link: string;
    text: {
        bold: string;
        code: string;
        italic: string;
        strikethrough: string;
        subscript: string;
        superscript: string;
        underline: string;
        underlineStrikethrough: string;
    };
    code: string;
    ltr: string;
    rtl: string;
    table: string;
    blockquote: string;
    horizontalRule: string;
    codeHighlight: {
        atrule: string;
        attr: string;
        boolean: string;
        builtin: string;
        cdata: string;
        char: string;
        class: string;
        'class-name': string;
        comment: string;
        constant: string;
        deleted: string;
        doctype: string;
        entity: string;
        function: string;
        important: string;
        inserted: string;
        keyword: string;
        namespace: string;
        number: string;
        operator: string;
        prolog: string;
        property: string;
        punctuation: string;
        regex: string;
        selector: string;
        string: string;
        symbol: string;
        tag: string;
        url: string;
        variable: string;
    };
}

const theme: Theme = {
    paragraph: 'editor-paragraph',
    quote: 'editor-quote',
    heading: {
        h1: 'editor-heading-h1',
        h2: 'editor-heading-h2',
        h3: 'editor-heading-h3',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5',
        h6: 'editor-heading-h6',
    },
    list: {
        nested: {
            listitem: 'editor-nested-listitem',
        },
        ol: 'editor-list-ol',
        ul: 'editor-list-ul',
        listitem: 'editor-listItem',
        listitemChecked: 'editor-listItemChecked',
        listitemUnchecked: 'editor-listItemUnchecked',
    },
    hashtag: 'editor-hashtag',
    image: 'editor-image',
    link: 'editor-link',
    text: {
        bold: 'editor-textBold',
        code: 'editor-textCode',
        italic: 'editor-textItalic',
        strikethrough: 'editor-textStrikethrough',
        subscript: 'editor-textSubscript',
        superscript: 'editor-textSuperscript',
        underline: 'editor-textUnderline',
        underlineStrikethrough: 'editor-textUnderlineStrikethrough',
    },
    code: 'editor-code',
    ltr: 'ltr',
    rtl: 'rtl',
    table: 'editor-table',
    blockquote: 'editor-blockquote',
    horizontalRule: 'editor-horizontalRule',

    codeHighlight: {
        atrule: 'editor-tokenAttr',
        attr: 'editor-tokenAttr',
        boolean: 'editor-tokenProperty',
        builtin: 'editor-tokenSelector',
        cdata: 'editor-tokenComment',
        char: 'editor-tokenSelector',
        class: 'editor-tokenFunction',
        'class-name': 'editor-tokenFunction',
        comment: 'editor-tokenComment',
        constant: 'editor-tokenProperty',
        deleted: 'editor-tokenProperty',
        doctype: 'editor-tokenComment',
        entity: 'editor-tokenOperator',
        function: 'editor-tokenFunction',
        important: 'editor-tokenVariable',
        inserted: 'editor-tokenSelector',
        keyword: 'editor-tokenAttr',
        namespace: 'editor-tokenVariable',
        number: 'editor-tokenProperty',
        operator: 'editor-tokenOperator',
        prolog: 'editor-tokenComment',
        property: 'editor-tokenProperty',
        punctuation: 'editor-tokenPunctuation',
        regex: 'editor-tokenVariable',
        selector: 'editor-tokenSelector',
        string: 'editor-tokenSelector',
        symbol: 'editor-tokenProperty',
        tag: 'editor-tokenProperty',
        url: 'editor-tokenOperator',
        variable: 'editor-tokenVariable',
    },
};

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
    console.error(error);
}

function prepopulatedRichText() {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
        const heading = $createHeadingNode('h1');
        heading.append($createTextNode('Welcome to the playground'));
        root.append(heading);
        const quote = $createQuoteNode();
        quote.append(
            $createTextNode(
                `In case you were wondering what the black box at the bottom is - it's the debug view, showing the current state of the editor. ` +
                    `You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.`,
            ),
        );
        root.append(quote);
        const paragraph = $createParagraphNode();

        root.append(paragraph);
    }
}

function App() {
    const isCollab = false;
    const emptyEditor = false;
    // const {
    //   settings: {isCollab, emptyEditor, measureTypingPerf},
    // } = useSettings();
    const initialConfig = {
        editorState: isCollab
            ? null
            : emptyEditor
              ? undefined
              : prepopulatedRichText,
        namespace: 'Editor',
        nodes: [...EditorNodes],
        theme,
        onError,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <SharedHistoryContext>
                <TableContext>
                    <SharedAutocompleteContext>
                        <div className="editor-shell">
                            <Editor />
                        </div>
                        {/* <Settings /> */}
                        {/* {isDevPlayground ? <DocsPlugin /> : null} */}
                        <PasteLogPlugin />
                        <TestRecorderPlugin />
                    </SharedAutocompleteContext>
                </TableContext>
            </SharedHistoryContext>
            <HistoryPlugin />

            <DocsPlugin />
            <TestRecorderPlugin />
            <PasteLogPlugin />

            <MyCustomAutoFocusPlugin />
            {/* <Settings />       */}
        </LexicalComposer>
    );
}

export default function EditorApp() {
    return (
        <SettingsProvider>
            <App />
        </SettingsProvider>
    );
}
