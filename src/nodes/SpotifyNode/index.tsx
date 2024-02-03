// style="border-radius:12px"
// src="https://open.spotify.com/embed/track/7BMO7O7ImjV8HNTH74Tshv?utm_source=generator"
// width="100%"
// height="352"
// frameBorder="0"
// allowfullscreen=""
// allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
// loading="lazy">

import {
    DecoratorBlockNode,
    SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    EditorConfig,
    ElementFormatType,
    LexicalEditor,
    LexicalNode,
    NodeKey,
    Spread,
} from 'lexical';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import { CSSProperties } from 'react';

type SpotifyComponentProps = Readonly<{
    musicId: string;
    width: string;
    height: string;
    frameBorder: string;
    allow: string;
    loading: 'eager' | 'lazy' | undefined;
    className: Readonly<{
        base: string;
        focus: string;
    }>;
    format: ElementFormatType | null;
    nodeKey: NodeKey;
}>;

export type SerializedYouTubeNode = Spread<
    {
        musicId: string;
    },
    SerializedDecoratorBlockNode
>;

function SpotifyComponent({
    musicId,
    width = '100%',
    height = '352',
    frameBorder = '0',
    allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
    loading = 'lazy',
    className,
    format,
    nodeKey,
}: SpotifyComponentProps) {
    return (
        <BlockWithAlignableContents
            className={className}
            format={format}
            nodeKey={nodeKey}
        >
            <iframe
                className={className.base}
                width={width}
                height={height}
                src={`https://open.spotify.com/embed/track/${musicId}`}
                frameBorder={frameBorder}
                allow={allow}
                loading={loading}
                title="Spotify music"
            />
        </BlockWithAlignableContents>
    );
}

function convertSpotifyElement(
    domNode: HTMLElement,
): null | DOMConversionOutput {
    const musicId = domNode.getAttribute('data-lexical-spotify');
    if (musicId) {
        const node = $createSpotifyNode(musicId);
        return { node };
    }
    return null;
}

export class SpotifyNode extends DecoratorBlockNode {
    __id: string;
    width: string;
    height: string;

    static getType(): string {
        return 'spotify';
    }

    static clone(node: SpotifyNode): SpotifyNode {
        return new SpotifyNode(node.__id, node.__format, node.__key);
    }

    static importJSON(serializedNode: SerializedYouTubeNode): SpotifyNode {
        const node = $createSpotifyNode(serializedNode.musicId);
        node.setFormat(serializedNode.format);
        return node;
    }

    exportJSON(): SerializedYouTubeNode {
        return {
            ...super.exportJSON(),
            type: 'spotify',
            version: 1,
            musicId: this.__id,
        };
    }
    // width = '100%', height = '352'
    constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
        super(format, key);
        this.__id = id;

        this.width = '100%';
        this.height = '352';

        this.bindWidth = this.bindWidth.bind(this);
        this.bindHeight = this.bindHeight.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    bindWidth(width: string): void {
        this.width = width;
    }

    bindHeight(height: string): void {
        this.height = height;
    }

    handleResize(width: string, height: string): void {
        this.bindWidth(width);
        this.bindHeight(height);
    }

    //   https://open.spotify.com/track/3yfqSUWxFvZELEM4PmlwIR?si=3a9fbaa480774385
    exportDOM(): DOMExportOutput {
        const element = document.createElement('iframe');
        element.setAttribute('data-lexical-spotify', this.__id);
        element.setAttribute('width', this.width);
        element.setAttribute('height', this.height);
        element.setAttribute(
            'src',
            `https://open.spotify.com/track/${this.__id}`,
        );
        element.setAttribute('frameborder', '0');
        element.setAttribute(
            'allow',
            'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
        );
        element.setAttribute('allowfullscreen', 'true');
        element.setAttribute('title', 'Spotify music');
        element.setAttribute('loading', 'lazy');
        return { element };
    }

    static importDOM(): DOMConversionMap | null {
        return {
            iframe: (domNode: HTMLElement) => {
                if (!domNode.hasAttribute('data-lexical-spotify')) {
                    return null;
                }
                return {
                    conversion: convertSpotifyElement,
                    priority: 1,
                };
            },
        };
    }

    updateDOM(): false {
        return false;
    }

    getId(): string {
        return this.__id;
    }

    getTextContent(
        _includeInert?: boolean | undefined,
        _includeDirectionless?: false | undefined,
    ): string {
        return `https://open.spotify.com/track/${this.__id}`;
    }

    getWidth(): string {
        return this.width;
    }

    getHeight(): string {
        return this.height;
    }

    getResizeHandlers(): {
        bindWidth: (width: string) => void;
        bindHeight: (height: string) => void;
        handleResize: (width: string, height: string) => void;
    } {
        return {
            bindWidth: this.bindWidth,
            bindHeight: this.bindHeight,
            handleResize: this.handleResize,
        };
    }

    decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
        const embedBlockTheme = config.theme.embedBlock || {};
        const className = {
            base: embedBlockTheme.base || '',
            focus: embedBlockTheme.focus || '',
        };
        return (
            <SpotifyComponent
                className={className}
                format={this.__format}
                nodeKey={this.getKey()}
                musicId={this.__id}
                width={'100%'}
                height={'352'}
                frameBorder={'0'}
                allow={
                    'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                }
                loading={'lazy'}
            />
        );
    }
}

export function $createSpotifyNode(musicId: string): SpotifyNode {
    let id = extractSpotifyTrackId(musicId);
    if (!id) {
        id = '3UmaczJpikHgJFyBTAJVoz?si';
    }
    return new SpotifyNode(id);
}

export function $isSpotifyNode(
    node: SpotifyNode | LexicalNode | null | undefined,
): node is SpotifyNode {
    return node instanceof SpotifyNode;
}

export function extractSpotifyTrackId(input: string): string | null {
    if (typeof input !== 'string') {
        return null;
    }
    // Define the regular expression for Spotify track URL
    const urlPattern =
        /https?:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)(?:\?.*)?$/;

    // Test if input is a URL
    const urlMatch = input.match(urlPattern);
    if (urlMatch) {
        // If it's a URL, return the captured group (track ID)
        return urlMatch[1];
    } else {
        // If it's not a URL, validate if it's a valid ID (you can add more validation based on Spotify's ID format)
        const idPattern = /^[a-zA-Z0-9]+$/;
        if (input.match(idPattern)) {
            // If it's a valid ID, return it
            return input;
        } else {
            // If it's neither a valid URL nor a valid ID, return null or throw an error
            return null;
        }
    }
}
