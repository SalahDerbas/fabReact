import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk } from "../../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"
import history from "src/utils/helpers/history"
import { MixDesign, MixDesignsState } from "src/core/interface"

let initialState: MixDesignsState = {
  status: "no-thing",
  mixDesigns: [],
}

const MixDesignsSlice = createSlice({
  name: "MixDesigns",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    Insert: ({ mixDesigns }, { payload }: PayloadAction<MixDesign>) => {
      mixDesigns.push(payload)
    },
    Update: ({ mixDesigns }, { payload }: PayloadAction<MixDesign>) => {
      let ind = mixDesigns.findIndex((el) => el.id === payload.id)
      if (ind !== -1) mixDesigns[ind] = payload
    },
    Delete: ({ mixDesigns }, { payload }: PayloadAction<string>) => {
      let ind = mixDesigns.findIndex((el) => el.id === payload)
      if (ind !== -1) mixDesigns.splice(ind, 1)
    },
    Show: (state, { payload }: PayloadAction<MixDesign>) => {
      state.mixDesign = payload
    },
    Fetch: (state, { payload }: PayloadAction<MixDesign[]>) => {
      state.mixDesigns = payload
    },
  },
})

const { setStatus, Insert, Update, Delete, Show, Fetch } = MixDesignsSlice.actions

export const FetchMixDesignsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"))
  try {
    const { data }: any = await axios({
      method: "get",
      url: `${apiUrl}/mix`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch(Fetch(data))
    dispatch(setStatus("data"))
  } catch (err) {
    dispatch(setStatus("error"))
    // Notification({ summary: "Error fetching mix's" })
    console.log("Error fetching mix's", err)
  }
}

export const UpdateMixDesignAsync =
  (MixDesign: MixDesign, id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      const { data }: any = await axios({
        method: "put",
        url: `${apiUrl}/mix/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: MixDesign,
      })
      console.log("data UpdateMixDesignAsync ", data)

      dispatch(Update(data))
      dispatch(setStatus("data"))
      Notification({ summary: "Edited successfully", severity: "success" })
      history.replace("/definitions/mix-design")
    } catch (err) {
      dispatch(setStatus("error"))
      Notification({ summary: "Error editing mix" })

      console.log("Error editing mix", err)
    }
  }

export const InsertMixDesignAsync =
  (MixDesign: MixDesign): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      const { data }: any = await axios({
        method: "post",
        url: `${apiUrl}/mix`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: MixDesign,
      })

      dispatch(Insert(data))
      Notification({ summary: "Add successfully", severity: "success" })
      dispatch(setStatus("data"))
    } catch (err) {
      dispatch(setStatus("error"))
      Notification({ summary: "Error inserting new mix" })

      console.log("Error inserting new mix", err)
    }
  }

export const DeleteMixDesignAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      await axios({
        method: "delete",
        url: `${apiUrl}/mix/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      dispatch(Delete(id))
      dispatch(setStatus("data"))
      Notification({ summary: "Delete successfully", severity: "success" })
      history.replace("/definitions/mix-design")
    } catch (err) {
      dispatch(setStatus("error"))
      Notification({ summary: "Error delete mix" })

      console.log("Error delete mix", err)
    }
  }

export const ShowMixDesignAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      const { data }: any = await axios({
        method: "get",
        url: `${apiUrl}/mix/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      console.log("data ShowMixDesignAsync ", data)
      dispatch(Show(data as MixDesign))
      dispatch(setStatus("data"))
    } catch (err) {
      dispatch(setStatus("error"))
      Notification({ summary: "Error showing mix" })

      console.log("Error showing mix", err)
    }
  }

export default MixDesignsSlice.reducer
