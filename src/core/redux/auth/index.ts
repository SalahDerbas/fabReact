import { AppThunk } from "../store"
import { Notification } from "src/utils/ui/toast-message"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { SigninInput } from "src/core/models/auth"
import axios from "axios"
import { apiUrl } from "src/utils"
import { Cookies } from "react-cookie"
import { SignInResponse, UsersState } from "src/core/interface"
import { FetchCO2ChartData } from "../home/dashboard"

const cookie = new Cookies()

// interface Role {
//   id: string
//   name: string
// }

let initialState: UsersState = {
  status: "no-thing",
  verifyStatues: "no-thing",
  resendCodeStatues: "no-thing",
  authStatus: "loading",
}

const Authentication = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    setUser: (state, { payload }: PayloadAction<SignInResponse | null>) => {
      state.user = payload
    },
    setUserId: (state, { payload }: PayloadAction<string | null>) => {
      state.userId = payload
    },
    setAuthStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.authStatus = payload
    },
    setVerifyStatues: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.verifyStatues = payload
    },
    setResendCodeStatues: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.resendCodeStatues = payload
    },
  },
})

const { setStatus, setUser, setAuthStatus } = Authentication.actions

export const GetUserAsync = (): AppThunk => async (dispatch) => {
  try {
    let user = cookie.get("user")
    if (user) {
      axios.interceptors.request.use(function (config) {
        const token: string = user.accessToken
        config.headers.Authorization = `FabSightFBO ${token}`

        return config
      })
    }
    await axios({
      method: "GET",
      url: `${apiUrl}/test/user`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch(setUser(user))
    dispatch(setAuthStatus("data"))
  } catch (err) {
    dispatch(setUser(null))
    dispatch(setAuthStatus("error"))
  }
}

export const LoginUserAsync =
  (req: SigninInput): AppThunk =>
    async (dispatch) => {
      dispatch(setStatus("loading"))
      try {
        const result = await axios({
          method: "post",
          url: `${apiUrl}/auth/signin`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: req,
        })

        const data: SignInResponse = result.data
        dispatch(setUser(data))

        //set user in cookie
        cookie.set("user", JSON.stringify(data), { expires: new Date(Date.now() + 4.32e7) }) //set the expires date to 12 hours
        //Axios authroization headers
        axios.interceptors.request.use(function (config) {
          const token: string = data.accessToken
          config.headers.Authorization = `FabSightFBO ${token}`

          return config
        })
        Notification({ summary: "Logged in successfully", severity: "success" })
        dispatch(setStatus("data"))
        dispatch(FetchCO2ChartData({
          to: null,
          from: null,
          key: "co2Processed",
          daily: true,
          day: false,
          weekly: false,
          monthly: false,
          yearly: false,
        }))
      } catch (err: any) {
        dispatch(setStatus("error"))

        Notification({ summary: "Login error", err: err?.response?.data })
      }
    }

export const signOut = (): AppThunk => async (dispatch) => {
  try {
    cookie.remove("user")
    dispatch(setUser(null))
    dispatch(setStatus("no-thing"))
  } catch (error) {
    console.log("error signing out: ", error)
  }
}
export default Authentication.reducer
