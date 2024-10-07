import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk } from "../../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"
import history from "src/utils/helpers/history"
import { BlockType, BlockTypesState } from "src/core/interface"

let initialState: BlockTypesState = {
  status: "no-thing",
  blockTypes: [],
}

const BlockTypesSlice = createSlice({
  name: "BlockTypes",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    Insert: ({ blockTypes }, { payload }: PayloadAction<BlockType>) => {
      blockTypes.push(payload)
    },
    Update: ({ blockTypes }, { payload }: PayloadAction<BlockType>) => {
      let ind = blockTypes.findIndex((el) => el.id === payload.id)
      if (ind !== -1) blockTypes[ind] = payload
    },
    Delete: ({ blockTypes }, { payload }: PayloadAction<string>) => {
      let ind = blockTypes.findIndex((el) => el.id === payload)
      if (ind !== -1) blockTypes.splice(ind, 1)
    },
    Show: (state, { payload }: PayloadAction<BlockType>) => {
      state.blockType = payload
    },
    Fetch: (state, { payload }: PayloadAction<BlockType[]>) => {
      state.blockTypes = payload
    },
    Clear: (state) => {
      state.blockType = undefined
    },
  },
})

const { setStatus, Clear, Insert, Update, Delete, Show, Fetch } = BlockTypesSlice.actions

export const FetchBlockTypesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"))
  try {
    const { data }: any = await axios({
      method: "get",
      url: `${apiUrl}/blocktype`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch(Fetch(data))

    dispatch(setStatus("data"))
  } catch (err: any) {
    dispatch(setStatus("error"))
    Notification({ summary: "Get blockTypes failed", err: err?.response?.data })
  }
}

export const UpdateBlockTypeAsync =
  (blockType: BlockType, id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      const { data } = await axios({
        method: "put",
        url: `${apiUrl}/blocktype/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: blockType,
      })

      dispatch(Update(data))
      Notification({ summary: "Edit successfully", severity: "success" })
      dispatch(setStatus("data"))
    } catch (err: any) {
      dispatch(setStatus("error"))
      Notification({ summary: "Update blockType failed", err: err?.response?.data })
    }
  }

export const InsertBlockTypeAsync =
  (blockType: BlockType): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      const { data } = await axios({
        method: "post",
        url: `${apiUrl}/blocktype`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: blockType,
      })
      dispatch(Clear())
      dispatch(Insert(data))
      Notification({ summary: "Added successfully", severity: "success" })
      dispatch(setStatus("data"))
    } catch (err: any) {
      dispatch(setStatus("error"))
      Notification({ summary: "Insert blockType failed", err: err?.response?.data })
    }
  }

export const DeleteBlockTypeAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      await axios({
        method: "delete",
        url: `${apiUrl}/blocktype/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      dispatch(Clear())
      dispatch(Delete(id))
      dispatch(setStatus("data"))
      Notification({ summary: "Deleted successfully", severity: "success" })
      history.push("/definitions/block-type")
    } catch (err: any) {
      dispatch(setStatus("error"))
      Notification({ summary: "Delete blockType failed", err: err?.response?.data })
    }
  }

export const ShowBlockTypeAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      const { data }: any = await axios({
        method: "get",
        url: `${apiUrl}/blocktype/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })

      dispatch(Show(data))
      dispatch(setStatus("data"))
    } catch (err: any) {
      dispatch(setStatus("error"))
      Notification({ summary: "Get blockType failed", err: err?.response?.data })
    }
  }

export default BlockTypesSlice.reducer
