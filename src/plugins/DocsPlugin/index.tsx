import * as React from 'react';

export default function DocsPlugin(): JSX.Element {
    return (
        <a target="__blank" href="/docs">
            <button
                id="docs-button"
                className="editor-dev-button"
                title="Docs"
            />
        </a>
    );
}
