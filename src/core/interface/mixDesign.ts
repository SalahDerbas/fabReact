import RequestStatus from "src/constants/enums/request-status"
import { Material } from "./material"
import { Supplier } from "./supplier"
import { Link } from "./link"

export interface mixRecipe {
  id?: string
  material?: Material
  note?: string
  supplier?: Supplier
  value?: number
}

export interface MixDesign {
  id: string
  name: string
  desc: string
  deleted: boolean
  createdDate: string
  createdByUser: string
  lastModifiedDate: string
  modifiedByUser: string
  percentage: boolean
  links: Link[]
  recipe: mixRecipe[]
}

export interface MixDesignsState {
  status: RequestStatus
  mixDesigns: MixDesign[]
  mixDesign?: MixDesign
}
