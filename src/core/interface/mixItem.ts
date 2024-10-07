import { mixRecipe } from "./mixDesign"

export interface MixItem {
    id: string
    mixItem?: mixRecipe
    batchAmount: number
}