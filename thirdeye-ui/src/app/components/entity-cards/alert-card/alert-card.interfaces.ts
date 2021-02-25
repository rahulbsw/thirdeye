import { UiAlert } from "../../../rest/dto/ui-alert.interfaces";

export interface AlertCardProps {
    uiAlert: UiAlert;
    searchWords?: string[];
    showViewDetails?: boolean;
    onChange?: (uiAlert: UiAlert) => void;
    onDelete?: (uiAlert: UiAlert) => void;
}
