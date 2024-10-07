import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk } from "../../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"
import history from "src/utils/helpers/history"
import { Supplier, SuppliersState } from "src/core/interface/supplier"

let initialState: SuppliersState = {
  status: "no-thing",
  suppliers: [],
}

const SuppliersSlice = createSlice({
  name: "Suppliers",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    Insert: ({ suppliers }, { payload }: PayloadAction<Supplier>) => {
      suppliers.push(payload)
    },
    Update: ({ suppliers }, { payload }: PayloadAction<Supplier>) => {
      let ind = suppliers.findIndex((el) => el.id === payload.id)
      if (ind !== -1) suppliers[ind] = payload
    },
    Delete: ({ suppliers }, { payload }: PayloadAction<string>) => {
      let ind = suppliers.findIndex((el) => el.id === payload)
      if (ind !== -1) suppliers.splice(ind, 1)
    },
    Show: (state, { payload }: PayloadAction<Supplier>) => {
      state.supplier = payload
    },
    Fetch: (state, { payload }: PayloadAction<Supplier[]>) => {
      state.suppliers = payload
    },
    Clear: (state) => {
      state.supplier = undefined
    },
  },
})

const { setStatus, Clear, Insert, Update, Delete, Show, Fetch } = SuppliersSlice.actions

export const FetchSuppliersAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"))
  try {
    const { data }: any = await axios({
      method: "get",
      url: `${apiUrl}/suppliers`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch(Fetch(data))
    dispatch(setStatus("data"))
  } catch (err: any) {
    dispatch(setStatus("error"))
    //Notification({ summary: "Get suppliers failed", err: err?.response?.data })
  }
}

export const UpdateSupplierAsync =
  (supplier: Supplier, id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setStatus("loading"))
      try {
        const { data } = await axios({
          method: "put",
          url: `${apiUrl}/suppliers/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: supplier,
        })

        dispatch(Update(data))
        Notification({ summary: "Edit successfully", severity: "success" })
        dispatch(setStatus("data"))
      } catch (err: any) {
        dispatch(setStatus("error"))
        Notification({ summary: "Update supplier failed", err: err?.response?.data })
      }
    }

export const InsertSupplierAsync =
  (supplier: Supplier): AppThunk =>
    async (dispatch) => {
      dispatch(setStatus("loading"))
      try {
        const { data } = await axios({
          method: "post",
          url: `${apiUrl}/suppliers`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: supplier,
        })
        dispatch(Clear())
        dispatch(Insert(data))
        Notification({ summary: "Added successfully", severity: "success" })
        dispatch(setStatus("data"))
      } catch (err: any) {
        dispatch(setStatus("error"))
        Notification({ summary: "Insert supplier failed", err: err?.response?.data })
      }
    }

export const DeleteSupplierAsync =
  (id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setStatus("loading"))
      try {
        await axios({
          method: "delete",
          url: `${apiUrl}/suppliers/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        dispatch(Clear())
        dispatch(Delete(id))
        dispatch(setStatus("data"))
        Notification({ summary: "Deleted successfully", severity: "success" })
        history.push("/definitions/suppliers")
      } catch (err: any) {
        dispatch(setStatus("error"))
        Notification({ summary: "Delete supplier failed", err: err?.response?.data })
      }
    }

export const ShowSupplierAsync =
  (id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setStatus("loading"))
      try {
        const { data }: any = await axios({
          method: "get",
          url: `${apiUrl}/suppliers/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })

        dispatch(Show(data))
        dispatch(setStatus("data"))
      } catch (err: any) {
        dispatch(setStatus("error"))
        Notification({ summary: "Get supplier failed", err: err?.response?.data })
      }
    }

export default SuppliersSlice.reducer
