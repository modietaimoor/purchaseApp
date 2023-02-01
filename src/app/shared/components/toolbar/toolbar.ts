import { SafeAny } from "@core/safe-any-type";

export class ToolbarItem {
    widget?:  'dxAutocomplete' | 
    'dxButton' 
    | 'dxCheckBox' 
    | 'dxDateBox' 
    | 'dxMenu' 
    | 'dxSelectBox' 
    | 'dxTabs' 
    | 'dxTextBox' 
    | 'dxButtonGroup' 
    | 'dxDropDownButton' = 'dxButton';
    location: 'after' | 'before' | 'center' = 'before';
    options: {
        icon?: string;
        onClick?: (event?: SafeAny) => void;
    }
}