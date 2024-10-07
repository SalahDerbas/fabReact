import { Moment } from "moment"
import RequestStatus from "src/constants/enums/request-status"

export interface Stillage {
  id: string
  number: number
  date: string
  millitm?: BigInt
  weight: Number
  stillageId: string
  error?: string
}

export interface Req_Time {
  duration: Date
  start: Moment
  end: Moment
}

export interface fileUploadStillage {
  wattingStillages: Stillage[]
  errorStillages: any[]
  uploadStatus: RequestStatus
  uploadePercentage: number
  countProceessed: number
  unSendedRecords: Stillage[]
  time?: Req_Time
}
export interface StillageState {
  status: RequestStatus
  stillages: Stillage[]
  fileUploadState: fileUploadStillage
}
