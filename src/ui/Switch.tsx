import * as React from 'react';
import { useMemo } from 'react';
import { generateId } from '../lib/id';

export default function Switch({
    checked,
    onClick,
    text,
    id,
}: Readonly<{
    checked: boolean;
    id?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    text: string;
}>): JSX.Element {
    const buttonId = useMemo(() => 'id_' + generateId(), []);
    return (
        <div className="switch" id={id}>
            <label htmlFor={buttonId}>{text}</label>
            <button
                role="switch"
                aria-checked={checked}
                id={buttonId}
                onClick={onClick}
            >
                <span />
            </button>
        </div>
    );
}
