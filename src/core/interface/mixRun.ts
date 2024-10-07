import { User } from "../redux"
import { Additive } from "./additive"
import { MixAppearance } from "./mixAppearance"

export interface MixRun {
    //id: string
    //createdDate?: Date
    //createdByUser?: Date
    startTime: number
    endTime: number
    humedity: number
    appearence: MixAppearance
    comment: string
    //additive: string
    inspector: User
}