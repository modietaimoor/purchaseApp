import { SafeAny, SafeHardAny } from "@core/safe-any-type";

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
    options: SafeHardAny; 
    // {
    //     icon?: string;
    //     text?: string;
    //     elementAttr?: SafeAny;
    //     onClick?: (event?: SafeAny) => void;
    //     mouseenter?: (event?: MouseEvent) => void;
    //     mouseleave?: (event?: MouseEvent) => void;
    // }
}