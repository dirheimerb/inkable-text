import type { ElementFormatType, NodeKey } from 'lexical';

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';

export type FigmaComponentProps = Readonly<{
    className: Readonly<{
        base: string;
        focus: string;
    }>;
    format: ElementFormatType | null;
    nodeKey: NodeKey;
    documentID: string;
}>;

export function FigmaComponent({
    className,
    format,
    nodeKey,
    documentID,
}: FigmaComponentProps) {
    return (
        <BlockWithAlignableContents
            className={className}
            format={format}
            nodeKey={nodeKey}
        >
            <iframe
                width="560"
                height="315"
                src={`https://www.figma.com/embed?embed_host=lexical&url=\
          https://www.figma.com/file/${documentID}`}
                allowFullScreen={true}
            />
        </BlockWithAlignableContents>
    );
}
