import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk, store } from "../../store"
import axios from "axios"
import { apiUrl } from "src/utils"
import { Notification } from "src/utils/ui/toast-message"
import moment from "moment"
import { Ahu, AhuState } from "src/core/interface/ahu"
import { Req_Time } from "src/core/interface"

let interval: any = null

// Ahu Types

// Initial state
/* **Definition for Ahu state.** */
/**
 * wattingAhus : for data after choose file.
 * errorAhus : when data error on upload or validation.
 * unSendedRecords : when user cancel upload.
 * countProceessed : number of records sucessed.
 */
let initialState: AhuState = {
  status: "no-thing",
  ahus: [],
  fileUploadState: {
    uploadStatus: "no-thing",
    wattingAhus: [],
    errorAhus: [],
    unSendedRecords: [],
    uploadePercentage: 0,
    countProceessed: 0,
  },
}
// Create a new slice for ahus
const AhusSlice = createSlice({
  name: "Ahus",
  initialState,
  reducers: {
    setStatusAhu: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    CreateAhu: ({ ahus }, { payload }: PayloadAction<Ahu>) => {
      ahus.push(payload)
    },
    SetUploadFileStatusAhu: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.fileUploadState.uploadStatus = payload
    },
    FileToWattingListAhu: (state, { payload }: PayloadAction<Ahu[]>) => {
      state.fileUploadState.wattingAhus = payload
    },
    FileToErrorListAhu: (state, { payload }: PayloadAction<any[]>) => {
      //state.fileUploadState.errorAhus = payload
      state.fileUploadState.unSendedRecords = payload
    },
    InsertToWattingListAhu: ({ fileUploadState: { wattingAhus } }, { payload }: PayloadAction<Ahu>) => {
      wattingAhus.push(payload)
    },
    //Not used now.
    DeleteFromErrorListAhu: (state, { payload }: PayloadAction<Ahu>) => {
      state.fileUploadState.errorAhus = state.fileUploadState.errorAhus.filter((stillage: Ahu) => {
        const stillageNumber = stillage.number,
          stillageId = stillage.number
        return !(stillageNumber.toString() === payload.number.toString() && stillageId === payload.number)
      })
    },
    SetUploadPercentageAhu: (state, { payload }: PayloadAction<number>) => {
      state.fileUploadState.uploadePercentage = payload
    },
    SetCountProceessedAhu: (state, { payload }: PayloadAction<number>) => {
      state.fileUploadState.countProceessed = payload
    },
    CleanUploadDataAhu: (state) => {
      state.fileUploadState = {
        uploadStatus: "no-thing",
        wattingAhus: [],
        errorAhus: [],
        unSendedRecords: [],
        uploadePercentage: 0,
        countProceessed: 0,
      }
    },
    SetSummaryAhu: (state) => {
      state.fileUploadState = {
        uploadStatus: "no-thing",
        wattingAhus: [],
        errorAhus: [],
        unSendedRecords: state.fileUploadState.unSendedRecords,
        uploadePercentage: state.fileUploadState.uploadePercentage,
        countProceessed: state.fileUploadState.countProceessed,
      }
    },
    ClearunSendedRecordsAhu: (state) => {
      state.fileUploadState.unSendedRecords = []
    },
    SetFileUploadAhu: (state, { payload }: PayloadAction<any>) => {
      state.fileUploadState = { ...state.fileUploadState, ...payload }
    },
    SetunSendedRecordsAhu: (state, { payload }: PayloadAction<Ahu[]>) => {
      state.fileUploadState.unSendedRecords = state.fileUploadState.unSendedRecords.concat(payload)
    },
    InsertToUnSendedRecordsAhu: ({ fileUploadState: { unSendedRecords } }, { payload }: PayloadAction<Ahu>) => {
      //Check if didn't exists.
      if (
        unSendedRecords.findIndex((stillage) => stillage.number === payload.number && stillage.number === payload.number) === -1
      )
        unSendedRecords.push({ ...payload, error: "NETWORK FAILURE" })
    },
    SetTimeAhu: (state, { payload }: PayloadAction<Req_Time>) => {
      state.fileUploadState.time = payload
    },
  },
})
export const {
  setStatusAhu,
  CreateAhu,
  FileToWattingListAhu,
  FileToErrorListAhu,
  InsertToWattingListAhu: AddToWattingListAhu,
  DeleteFromErrorListAhu,
  SetCountProceessedAhu,
  CleanUploadDataAhu,
  SetUploadFileStatusAhu,
  SetFileUploadAhu,
  SetunSendedRecordsAhu,
  InsertToUnSendedRecordsAhu,
  ClearunSendedRecordsAhu,
  SetSummaryAhu,
  SetTimeAhu,
} = AhusSlice.actions

export const CancelUploadProcesseAhu = (): AppThunk => async (dispatch) => {
  if (interval) {
    const { countProceessed, wattingAhus } = store.getState().Ahu.fileUploadState
    const unSendedRecords = wattingAhus.slice(countProceessed + 1, wattingAhus.length - 1)
    var result = unSendedRecords.map(function (el: any) {
      var o = Object.assign({}, el)
      o.error = "Skiped"
      return o
    })
    dispatch(SetunSendedRecordsAhu(result))
    clearInterval(interval)
    interval = null
  }
  dispatch(SetSummaryAhu())
}
//To resend error records (Not used)
export const CorrectAhu =
  (req: Ahu): AppThunk =>
    async (dispatch) => {
      dispatch(SetUploadFileStatusAhu("loading"))
      try {
        dispatch(AddToWattingListAhu(req))
        dispatch(DeleteFromErrorListAhu(req))
        dispatch(SetUploadFileStatusAhu("data"))
      } catch (err: any) {
        dispatch(SetUploadFileStatusAhu("error"))
        Notification({ summary: err.message })
        console.log("error correct stillage", err)
      }
    }

export const CreateAhuAsync =
  (req: Ahu): AppThunk =>
    async (dispatch) => {
      dispatch(setStatusAhu("loading"))
      console.log("Loading")
      try {
        var data = {
          id: "10",
          number: req.number,
          date: req.date,
          ahuId: req.number,
          humidity: req.humidity,
          inletTemperature: req.inletTemperature,
          controlTemperature: req.controlTemperature,
          heaterTemperatureSetpoint: req.heaterTemperatureSetpoint,
          humiditySetpoint: req.humiditySetpoint,
          controlTemperatureSetpoint: req.controlTemperatureSetpoint,
          o2level: req.o2level,
          co2level: req.co2level,
          pressure: req.pressure,
        }

        await axios({
          method: "post",
          url: `${apiUrl}/authTrend`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: data,
        })
        dispatch(CreateAhu(req))
        dispatch(setStatusAhu("data"))
        Notification({ severity: "success", summary: "Success Add", detail: "Successfully Add Ahu" })
      } catch (err: any) {
        dispatch(setStatusAhu("error"))
        Notification({ summary: err.message })
        console.log("error creating ahu", err)
      }
    }
export const AhuFileAsync = (): AppThunk => async (dispatch) => {
  dispatch(SetUploadFileStatusAhu("loading"))
  //first we have waiting ahus after choose file.
  const {
    fileUploadState: { wattingAhus },
  } = store.getState().Ahu
  try {
    //count=-1 for fit index=0 after increase
    let count = -1
    let start = moment()
    const totalLenght = wattingAhus.length
    const updatedPercentage = async (count: number, totalLenght: number) => {
      dispatch(
        SetFileUploadAhu({
          //  ...store.getState().Stillage.fileUploadState,
          countProceessed: count,
          uploadePercentage: (count / totalLenght) * 100,
        })
      )
    }
    //Recall function every 50 milesecons
    interval = setInterval(async () => {

      dispatch(SetTimeAhu({ start, end: moment(), duration: new Date() })) // Not used
      try {
        count++
        updatedPercentage(count, totalLenght)
        if (count >= totalLenght) {
          dispatch(SetUploadFileStatusAhu("data"))
          Notification({ severity: "success", summary: "Success Add", detail: "Successfully Add Stillage" })
          clearInterval(interval)
          interval = null
          return
        }
        await axios({
          method: "post",
          url: `${apiUrl}/ahu`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: wattingAhus[count],
        })
      } catch (e) {
        dispatch(InsertToUnSendedRecordsAhu(wattingAhus[count]))
      }
    }, 50)
  } catch (err: any) {
    dispatch(SetUploadFileStatusAhu("error"))
    Notification({ summary: err.message })
    console.log("error creating stillage", err)
  }
}

export default AhusSlice.reducer
