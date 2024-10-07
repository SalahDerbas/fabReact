import { Material } from "./material"
import { MixItem } from "./mixItem"
import { MixRun } from "./mixRun"

export interface Batch {
    id?: string
    note: string
    createdDate?: Date
    createdByUser?: Date
    approved?: boolean
    mixes: MixRun[]
    mixItems: MixItem[]
}