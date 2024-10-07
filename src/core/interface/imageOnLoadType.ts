import { ImageStyle } from "./imageStyle"

export interface ImageOnLoadType {
    handleImageOnLoad: () => void;
    css: ImageStyle;
}
