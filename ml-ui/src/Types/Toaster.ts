import { Color } from "@material-ui/lab";

export interface Toaster {
    visible: boolean;
    message: string;
    severity: Color;
}