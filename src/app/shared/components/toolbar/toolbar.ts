import { SafeObjectAny } from "@core/safe-any-type";

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
    options: SafeObjectAny; 
    // {
    //     icon?: string;
    //     text?: string;
    //     elementAttr?: SafeAny;
    //     onClick?: (event?: SafeAny) => void;
    //     mouseenter?: (event?: MouseEvent) => void;
    //     mouseleave?: (event?: MouseEvent) => void;
    // }
}