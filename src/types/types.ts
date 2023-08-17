export interface SizeProps {
   $width: number;
   $height: number;
}

export interface PagePosition extends SizeProps {
   $pagePos: number;
}

export interface GLProps {
   $degree?: string;
   $xPos?: string;
   $yPos?: number;
   $trans?: string;
}

export interface PMPagePosition extends SizeProps {
   $pagePos: number;
   $pageEvent: number;
}

export interface PMAnimation {
   $width: number;
   $move: boolean;
}

export interface PMCookiePosition extends SizeProps {
   $yPos: number;
   $svg?: string;
   $trans: string;
}

export interface PMFieldProps extends WidthProps {
   $trans: string;
}

export interface WidthProps {
   $width: number;
}

export interface HeightProps {
   $height: number;
}

export interface NoiseProps {
   $display: boolean;
   $yPos: number;
   $height: number;
}
