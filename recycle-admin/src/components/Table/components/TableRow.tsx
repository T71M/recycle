import { FC } from "react";
import styled from "@emotion/styled";

interface TableRowProps {
    children: ChildrenType;
    onClick?: () => void;
    clickable?: boolean;
}

interface StyledProps {
    borderColor?: string;
    borderless?: boolean;
}

const StyledTR = styled.tr<StyledProps>`
    & td {
        border-top: ${({ borderless, borderColor = "#373a40" }) =>
            borderless ? undefined : `1px solid ${borderColor} !important`};
        border-bottom: ${({ borderless, borderColor = "#373a40" }) =>
            borderless ? undefined : `1px solid ${borderColor} !important`};
    }
`;

export const TableRow: FC<TableRowProps> = ({
    children,
    onClick,
    clickable,
}) => {
    return (
        <StyledTR
            onClick={onClick}
            style={clickable ? { cursor: "pointer" } : {}}
        >
            {children}
        </StyledTR>
    );
};
