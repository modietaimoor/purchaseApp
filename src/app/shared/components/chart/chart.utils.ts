export function FormatValueAxisColumn(value: number): string {
    if(value >= NumberValue.Quadrillion){
        return (value / NumberValue.Quadrillion) + 'Q';
    }
    if(value >= NumberValue.Trillion){
        return (value / NumberValue.Trillion) + 'T';
    }
    if(value >= NumberValue.Billion){
        return (value / NumberValue.Billion) + 'B';
    }
    if(value >= NumberValue.Million){
        return (value / NumberValue.Million) + 'M';
    }
    if(value >= NumberValue.Thousand){
        return (value / NumberValue.Thousand) + 'K';
    }
    return value.toString();
}

export enum NumberValue {
    Thousand = 1000,
    Million = 1000000,
    Billion = 1000000000,
    Trillion = 1000000000000,
    Quadrillion = 1000000000000000
}