import RequestStatus from "src/constants/enums/request-status"

export interface AppState {
  status: RequestStatus
  sidebarOpen: boolean
}
