import RequestStatus from "src/constants/enums/request-status"
import { BlockType } from "./blocktype"
import { Link } from "./link" 
interface Recipe {
  id?: string
  block: BlockType
  board_capacity?: number
  empty_weight?: number
  full_weight?: number
}

export interface Board {
  id: string
  deleted: boolean
  links: Link[]
  recipe: Recipe[]
}
export interface BoardsState {
  status: RequestStatus
  boards: Board[]
  board?: Board
}
