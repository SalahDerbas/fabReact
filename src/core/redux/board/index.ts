import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk } from "../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"
import { Board, BoardsState } from "src/core/interface"

let initialState: BoardsState = {
  status: "no-thing",
  boards: [],
}

const BoardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    Insert: ({ boards }, { payload }: PayloadAction<Board>) => {
      boards.push(payload)
    },
    Update: ({ boards }, { payload }: PayloadAction<Board>) => {
      let ind = boards.findIndex((el) => el.id === payload.id)
      if (ind !== -1) boards[ind] = payload
    },
    Delete: ({ boards }, { payload }: PayloadAction<string>) => {
      let ind = boards.findIndex((el) => el.id === payload)
      if (ind !== -1) boards.splice(ind, 1)
    },
    Show: (state, { payload }: PayloadAction<Board>) => {
      state.board = payload
    },
    Fetch: (state, { payload }: PayloadAction<Board[]>) => {
      state.boards = payload
    },
  },
})

const { setStatus, Insert, Update, Delete, Show, Fetch } = BoardsSlice.actions

export const FetchBoardsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"))
  try {
    const { data }: any = await axios({
      method: "get",
      url: `${apiUrl}/board`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch(Fetch(data))
    dispatch(setStatus("data"))
  } catch (err) {
    dispatch(setStatus("error"))
    // Notification({ summary: "Error fetching board's" })
    console.log("Error fetching Board's", err)
  }
}

export const UpdateBoardAsync =
  (Board: Board, id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      const { data }: any = await axios({
        method: "put",
        url: `${apiUrl}/board/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: Board,
      })
      dispatch(Update(data))
      dispatch(setStatus("data"))
      Notification({ summary: "Edited successfully", severity: "success" })
      //   history.replace("/definitions/board-design")
    } catch (err) {
      dispatch(setStatus("error"))
      Notification({ summary: "Error editing Board" })

      console.log("Error editing Board", err)
    }
  }

export const InsertBoardAsync =
  (Board: Board): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      const { data }: any = await axios({
        method: "post",
        url: `${apiUrl}/board`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: Board,
      })

      dispatch(Insert(data))
      Notification({ summary: "Add successfully", severity: "success" })
      dispatch(setStatus("data"))
    } catch (err) {
      dispatch(setStatus("error"))
      Notification({ summary: "Error inserting new board" })

      console.log("Error inserting new board", err)
    }
  }

export const DeleteBoardnAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      await axios({
        method: "delete",
        url: `${apiUrl}/board/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      dispatch(Delete(id))
      dispatch(setStatus("data"))
      Notification({ summary: "Delete successfully", severity: "success" })
      //   history.replace("/definitions/board-design")
    } catch (err) {
      dispatch(setStatus("error"))
      Notification({ summary: "Error delete Board" })

      console.log("Error delete Board", err)
    }
  }

export const ShowBoardAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"))
    try {
      const { data }: any = await axios({
        method: "get",
        url: `${apiUrl}/board/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      dispatch(Show(data as Board))
      dispatch(setStatus("data"))
    } catch (err) {
      dispatch(setStatus("error"))
      Notification({ summary: "Error showing board" })

      console.log("Error showing board", err)
    }
  }

export default BoardsSlice.reducer
