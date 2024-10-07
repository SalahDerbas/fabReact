import RequestStatus from "src/constants/enums/request-status"
import { Req_Time } from "./stillage"

export interface Ahu {
  id: string
  number: string
  date: string
  humidity: Number
  inletTemperature: Number
  controlTemperature: Number
  heaterTemperatureSetpoint: Number
  humiditySetpoint: Number
  controlTemperatureSetpoint: Number
  o2level: Number
  co2level: Number
  pressure: Number
  error?: string
}
export interface fileUploadAhu {
  wattingAhus: Ahu[]
  errorAhus: any[]
  uploadStatus: RequestStatus
  uploadePercentage: number
  countProceessed: number
  unSendedRecords: Ahu[]
  time?: Req_Time
}
export interface AhuState {
  status: RequestStatus
  fileUploadState: fileUploadAhu
  ahus: Ahu[]
}
