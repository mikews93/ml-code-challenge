import { Color } from "@material-ui/lab";

export interface Toaster {
    visible: boolean;
    message: string;
    severity: Color;
}

export interface GlobalContext {
    showToaster: (data: Partial<Toaster>) => void;
    setIsFetchingData: React.Dispatch<React.SetStateAction<boolean>>
}