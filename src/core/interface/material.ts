import RequestStatus from "src/constants/enums/request-status"
import { Link } from "./link"

export interface Unit {
  id: string
  links: Link[]
  name: string
  symbol: string
  type: string
}

export interface Material {
  id: string
  name: string
  createdDate: string
  createdByUser: string
  modifiedByUser: string
  lastModifiedDate: string
  desc: string
  unit: Unit
}

export interface MaterialsState {
  status: RequestStatus
  unitsStatus: RequestStatus
  materials: Material[]
  material?: Material
  units: Unit[]
}
