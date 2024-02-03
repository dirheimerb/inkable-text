import clsx from 'clsx';
import { DropDownItem } from '../../ui/DropDown';

interface FormatDropDownItemProps {
    isActive: boolean;
    onClick: () => void;
    iconClass: string;
    text: string;
}

export default function FormatDropDownItem({
    isActive,
    onClick,
    iconClass,
    text,
}: FormatDropDownItemProps): JSX.Element {
    return (
        <DropDownItem
            onClick={onClick}
            className={clsx('item', {
                'active dropdown-item-active': isActive,
            })}
        >
            <i className={clsx('icon', iconClass)} />
            <span className="text">{text}</span>
        </DropDownItem>
    );
}
