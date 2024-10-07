import RequestStatus from "src/constants/enums/request-status"
import { BlockType } from "./blocktype"
import { dryingCycle } from "src/core/redux/operations/dryingCycle"
import { CuringCycle } from "src/core/redux/operations/curingCycle"
import { Summary } from "src/core/redux/operations/summary"
import { pdNote } from "./pdNote"
import { MixDesign, mixRecipe } from "./mixDesign"
import { Batch } from "./batch"


export interface productionTarget {
  id: string
  block: BlockType
  current: Date
  notes: any[]
  pdNotes: pdNote[]
  items: any[]
  co2Amount: number
  date: string
  mix_design: string
  version: 1
  status: string
  dryingTargetPercent: number
  dryingCyclePeriod: number
  createdByUser: string
  createdDate: string
  lastModifiedDate: string
  modifiedByUser: string
  drying: dryingCycle
  curing: CuringCycle
  summary: Summary
  mix: MixDesign
  batches: Batch[]
}

export interface productionTargetsState {
  status: RequestStatus
  productionTargets: productionTarget[]
  productionTarget?: productionTarget
}
