import { SafeObjectAny } from "@core/safe-any-type";

export interface MenuListItem {
    id: number;
    title: string;
    active: boolean;
    url: string;
    icon?: string;
    html?: string;
}

export interface GroupedListItem {
    key: string;
    items: SafeObjectAny[]
}