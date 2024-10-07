import RequestStatus from "src/constants/enums/request-status"

export interface BlockType {
  id: string
  type: string
  specs: string
  note: string
  createdDate: string
  createdByUser: string
  modifiedByUser: string
  lastModifiedDate: string
}

export interface BlockTypesState {
  status: RequestStatus
  blockTypes: BlockType[]
  blockType?: BlockType
}
