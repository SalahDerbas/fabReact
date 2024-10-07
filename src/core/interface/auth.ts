import RequestStatus from "src/constants/enums/request-status"
export interface SignInResponse {
  id: string
  username: string
  email: string
  roles: string[]
  accessToken: string
  tokenType: string
}
export interface UsersState {
  status: RequestStatus
  authStatus: RequestStatus
  verifyStatues: RequestStatus
  resendCodeStatues: RequestStatus
  user?: SignInResponse | null
  userId?: string | null
  // role?: Role
}
