import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk, store } from "../../store"
import { apiUrl } from "src/utils"
import { Notification } from "src/utils/ui/toast-message"
import moment from "moment"
import { Req_Time, Stillage, StillageState } from "src/core/interface"

let interval: any = null
// Stillage Types

// Initial state
let initialState: StillageState = {
  status: "no-thing",
  stillages: [],
  //file status
  fileUploadState: {
    uploadStatus: "no-thing",
    wattingStillages: [],
    errorStillages: [],
    unSendedRecords: [],
    uploadePercentage: 0,
    countProceessed: 0,
  },
}

// Create a new slice for stillages
const StillagesSlice = createSlice({
  name: "Stillages",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    SetUploadFileStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.fileUploadState.uploadStatus = payload
    },
    Create: ({ stillages }, { payload }: PayloadAction<Stillage>) => {
      stillages.push(payload)
    },
    Fetch: (state, { payload }: PayloadAction<Stillage[]>) => {
      state.stillages = payload
    },
    FileToWattingList: (state, { payload }: PayloadAction<Stillage[]>) => {
      state.fileUploadState.wattingStillages = payload
    },
    FileToErrorList: (state, { payload }: PayloadAction<any[]>) => {
      //state.fileUploadState.errorStillages = payload
      state.fileUploadState.unSendedRecords = payload
    },
    AddToWattingList: ({ fileUploadState: { wattingStillages } }, { payload }: PayloadAction<Stillage>) => {
      wattingStillages.push(payload)
    },
    DeleteFromErrorList: (state, { payload }: PayloadAction<Stillage>) => {
      state.fileUploadState.errorStillages = state.fileUploadState.errorStillages.filter((stillage: Stillage) => {
        const stillageNumber = stillage.number,
          stillageId = stillage.stillageId
        return !(stillageNumber.toString() === payload.number.toString() && stillageId === payload.stillageId)
      })
    },
    SetUploadPercentage: (state, { payload }: PayloadAction<number>) => {
      state.fileUploadState.uploadePercentage = payload
    },
    SetCountProceessed: (state, { payload }: PayloadAction<number>) => {
      state.fileUploadState.countProceessed = payload
    },
    CleanUploadData: (state) => {
      state.fileUploadState = {
        uploadStatus: "no-thing",
        wattingStillages: [],
        errorStillages: [],
        unSendedRecords: [],
        uploadePercentage: 0,
        countProceessed: 0,
      }
    },
    SetSummary: (state) => {
      state.fileUploadState = {
        uploadStatus: "no-thing",
        wattingStillages: [],
        errorStillages: [],
        unSendedRecords: state.fileUploadState.unSendedRecords,
        uploadePercentage: state.fileUploadState.uploadePercentage,
        countProceessed: state.fileUploadState.countProceessed,
      }
    },
    ClearunSendedRecords: (state) => {
      state.fileUploadState.unSendedRecords = []
    },
    SetFileUpload: (state, { payload }: PayloadAction<any>) => {
      state.fileUploadState = { ...state.fileUploadState, ...payload }
    },
    SetunSendedRecords: (state, { payload }: PayloadAction<Stillage[]>) => {
      state.fileUploadState.unSendedRecords = state.fileUploadState.unSendedRecords.concat(payload)
    },
    AddTounSendedRecords: ({ fileUploadState: { unSendedRecords } }, { payload }: PayloadAction<Stillage>) => {
      if (
        unSendedRecords.findIndex(
          (stillage) => stillage.number === payload.number && stillage.stillageId === payload.stillageId
        ) === -1
      )
        unSendedRecords.push({ ...payload, error: "NETWORK FAILURE" })
    },
    SetTime: (state, { payload }: PayloadAction<Req_Time>) => {
      state.fileUploadState.time = payload
    },
  },
})
export const {
  setStatus,
  SetUploadPercentage,
  Create,
  FileToWattingList,
  FileToErrorList,
  AddToWattingList,
  DeleteFromErrorList,
  SetCountProceessed,
  CleanUploadData,
  SetUploadFileStatus,
  SetFileUpload,
  SetunSendedRecords,
  AddTounSendedRecords,
  ClearunSendedRecords,
  SetSummary,
  SetTime,
} = StillagesSlice.actions

export const CancelUploadProcesseStillage = (): AppThunk => async (dispatch) => {
  if (interval) {
    const { countProceessed, wattingStillages } = store.getState().Stillage.fileUploadState
    const unSendedRecords = wattingStillages.slice(countProceessed + 1, wattingStillages.length - 1)
    var result = unSendedRecords.map(function (el: any) {
      var o = Object.assign({}, el)
      o.error = "Skiped"
      return o
    })
    dispatch(SetunSendedRecords(result))
    clearInterval(interval)
    interval = null
  }
  dispatch(SetSummary())
}

export const CorrectStillage =
  (req: Stillage): AppThunk =>
  async (dispatch) => {
    dispatch(SetUploadFileStatus("loading"))
    try {
      dispatch(AddToWattingList(req))
      dispatch(DeleteFromErrorList(req))
      dispatch(SetUploadFileStatus("data"))
    } catch (err: any) {
      dispatch(SetUploadFileStatus("error"))
      Notification({ summary: err.message })
      console.log("error correct stillage", err)
    }
  }

export const CreateStillageAsync =
  (req: Stillage): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      var data = {
        id: "1",
        number: req.number,
        date: req.date,
        stillageId: req.number,
        weight: req.weight,
      }

      await axios({
        method: "post",
        url: `${apiUrl}/stillage`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: data,
      })
      dispatch(Create(req))
      dispatch(setStatus("data"))
      Notification({ severity: "success", summary: "Success Add", detail: "Successfully Add Stillage" })
    } catch (err: any) {
      dispatch(setStatus("error"))
      Notification({ summary: err.message })
      console.log("error creating stillage", err)
    }
  }

export const FileStillageFileAsync = (): AppThunk => async (dispatch) => {
  dispatch(SetUploadFileStatus("loading"))
  const {
    fileUploadState: { wattingStillages },
  } = store.getState().Stillage
  try {
    let count = -1
    let start = moment()
    const totalLenght = wattingStillages.length
    const updatedPercentage = async (count: number, totalLenght: number) => {
      dispatch(
        SetFileUpload({
          //  ...store.getState().Stillage.fileUploadState,
          countProceessed: count,
          uploadePercentage: (count / totalLenght) * 100,
        })
      )
    }
    interval = setInterval(async () => {
      dispatch(SetTime({ start, end: moment(), duration: new Date() }))
      try {
        count++
        updatedPercentage(count, totalLenght)
        if (count >= totalLenght) {
          dispatch(SetUploadFileStatus("data"))
          Notification({ severity: "success", summary: "Success Add", detail: "Successfully Add Stillage" })
          clearInterval(interval)
          interval = null
          return
        }
        await axios({
          method: "post",
          url: `${apiUrl}/stillage`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // Authorization:
            //   "FabSightFBO eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmRvIiwiaWF0IjoxNjQxMzY4ODY3LCJleHAiOjE2NDE0NTUyNjd9.zqlXXSYQyvarCNoDsF0JmgyloKJlAq0PQtQx6__y4XZfp2fwkrnUfAVn8XyPljNAcNLOoaZHZs_U5POTDQj58Q",
          },
          data: wattingStillages[count],
        })
      } catch (e) {
        dispatch(AddTounSendedRecords(wattingStillages[count]))
      }
    }, 50)
  } catch (err: any) {
    dispatch(SetUploadFileStatus("error"))
    Notification({ summary: err.message })
    console.log("error creating stillage", err)
  }
}
export default StillagesSlice.reducer
