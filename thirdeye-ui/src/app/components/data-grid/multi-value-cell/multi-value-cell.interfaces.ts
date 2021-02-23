export interface MultiValueCellProps<T> {
    rowId: number;
    values: T[];
    link?: boolean;
    searchWords?: string[];
    valueTextFn?: (value: T) => string;
    onClick?: (value: T, rowId: number) => void;
    onMore?: (rowId: number) => void;
}
