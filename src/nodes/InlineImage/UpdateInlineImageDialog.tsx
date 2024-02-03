import { $getNodeByKey, LexicalEditor, NodeKey } from 'lexical';
import { InlineImageNode, Position } from '../InlineImageNode';
import { useState } from 'react';
import TextInput from '../../ui/TextInput';
import Select from '../../ui/Select';
import { DialogActions } from '../../ui/Dialog';
import Button from '../../ui/Button';

export interface UpdateInlineImageDialogProps {
    activeEditor: LexicalEditor;
    nodeKey: NodeKey;
    onClose: () => void;
}

export function UpdateInlineImageDialog({
    activeEditor,
    nodeKey,
    onClose,
}: UpdateInlineImageDialogProps): JSX.Element {
    const editorState = activeEditor.getEditorState();
    const node = editorState.read(
        () => $getNodeByKey(nodeKey) as InlineImageNode,
    );
    const [altText, setAltText] = useState(node.getAltText());
    const [showCaption, setShowCaption] = useState(node.getShowCaption());
    const [position, setPosition] = useState<Position>(node.getPosition());

    const handleShowCaptionChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setShowCaption(e.target.checked);
    };

    const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosition(e.target.value as Position);
    };

    const handleOnConfirm = () => {
        const payload = { altText, position, showCaption };
        if (node) {
            activeEditor.update(() => {
                node.update(payload);
            });
        }
        onClose();
    };

    return (
        <>
            <div style={{ marginBottom: '1em' }}>
                <TextInput
                    label="Alt Text"
                    placeholder="Descriptive alternative text"
                    onChange={setAltText}
                    value={altText}
                    data-test-id="image-modal-alt-text-input"
                />
            </div>

            <Select
                style={{ marginBottom: '1em', width: '208px' }}
                value={position}
                label="Position"
                name="position"
                id="position-select"
                onChange={handlePositionChange}
            >
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="full">Full Width</option>
            </Select>

            <div className="Input__wrapper">
                <input
                    id="caption"
                    type="checkbox"
                    checked={showCaption}
                    onChange={handleShowCaptionChange}
                />
                <label htmlFor="caption">Show Caption</label>
            </div>

            <DialogActions>
                <Button
                    data-test-id="image-modal-file-upload-btn"
                    onClick={() => handleOnConfirm()}
                >
                    Confirm
                </Button>
            </DialogActions>
        </>
    );
}
