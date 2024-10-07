import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk, store } from "../../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"
import moment from "moment"
import { productionTarget, productionTargetsState } from "src/core/interface/productionTarget"

let initialState: productionTargetsState = {
  status: "no-thing",
  productionTargets: [],
}

const ProductionTargetsSlice = createSlice({
  name: "ProductionTargets",
  initialState,
  reducers: {
    setProductionTargetsStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    setProductionTarget: (state, { payload }: PayloadAction<productionTarget>) => {
      state.productionTarget = payload
    },

    Insert: (state, { payload }: PayloadAction<productionTarget>) => {
      state.productionTargets.push(payload)
    },
    Fetchs: (state, { payload }: PayloadAction<productionTarget[]>) => {
      state.productionTargets = payload
    },
    ClearProductionTargetData: (state) => {
      state.productionTarget = undefined
    },
    InsertNote: (state, { payload }: PayloadAction<{ id: string; note: string; userName: string }>) => {
      let pdt = state.productionTarget
      pdt?.pdNotes.push({
        id: "",
        note: payload.note,
        createdByUser: payload.userName,
        createdDate: moment().format("l"),
      })
      state.productionTarget = pdt
    },
  },
})

export const { setProductionTargetsStatus, Fetchs, InsertNote, Insert, setProductionTarget, ClearProductionTargetData } =
  ProductionTargetsSlice.actions

export const FetchProductionTargetsAsync = (): AppThunk => async (dispatch) => {
  dispatch(ClearProductionTargetData())
  dispatch(setProductionTargetsStatus("loading"))
  try {
    const { data }: any = await axios({
      method: "get",
      url: `${apiUrl}/pdt`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch(Fetchs(data))

    dispatch(setProductionTargetsStatus("data"))
  } catch (err: any) {
    dispatch(setProductionTargetsStatus("error"))
    Notification({ summary: "Error fetching11111111 Production Targets", err: err?.response?.data })

    console.log("error fetching Production Targets", err?.response?.data)
  }
}

export const UpdateProductionTargetAsync =
  (productionTarget: any, id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setProductionTargetsStatus("loading"))
      try {
        console.log(" productionTarget ", productionTarget)
        await axios({
          method: "put",
          url: `${apiUrl}/pdt/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: productionTarget,
        })

        console.log(`data`, productionTarget);
        //dispatch(Fetch(data))
        Notification({ summary: "Edit successfully", severity: "success" })

        dispatch(setProductionTargetsStatus("data"))
      } catch (err: any) {
        dispatch(setProductionTargetsStatus("error"))
        Notification({ summary: "Error edit Production Target", err: err?.response?.data })

        console.log("Error fetching Production Target", err?.response?.data)
      }
    }
export const InsertProductionTargetAsync =
  (productionTarget: any): AppThunk =>
    async (dispatch) => {
      dispatch(setProductionTargetsStatus("loading"))
      try {
        const { data, status }: any = await axios({
          method: "post",
          url: `${apiUrl}/pdt`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: productionTarget,
        })
        dispatch(Insert(data))
        dispatch(FetchProductionTargetsAsync())

        if (status === 208) Notification({ summary: "Already Exists ", severity: "warn" })
        else Notification({ summary: "Add successfully", severity: "success" })
        // dispatch(Fetchs(data))

        dispatch(setProductionTargetsStatus("data"))
      } catch (err: any) {
        dispatch(setProductionTargetsStatus("error"))
        // Notification({ summary: "error insert Production Target", err: err?.response?.data })

        // console.log("error fetching Production Target", err?.response?.data)
      }
    }



// export const InsertBatchParameterAsync = 
// (data: any, id: string): AppThunk =>
// async (dispatch) => {
//   dispatch(setProductionTargetsStatus("loading"))
//   try {
//     console.log(" data ", data)
//     await axios({
//       method: "put",
//       url: `${apiUrl}/pdt/${id}/batch`,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       data: data,
//     })

//     //dispatch(Fetch(data))
//     Notification({ summary: "Insert Batch Successfully", severity: "success" })

//     dispatch(setProductionTargetsStatus("data"))
//   } catch (err: any) {
//     dispatch(setProductionTargetsStatus("error"))
//     Notification({ summary: "error insert Batch Para", err: err?.response?.data })

//     console.log("error Fetching Batch Para", err?.response?.data)
//   }
// }






export const PublishProductionTargetAsync =
  (id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setProductionTargetsStatus("loading"))
      try {
        await axios({
          method: "post",
          url: `${apiUrl}/pdt/publish/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        dispatch(ShowProductionTargetAsync(id))
        Notification({ summary: "Published successfully", severity: "success" })
        dispatch(setProductionTargetsStatus("data"))
      } catch (err: any) {
        dispatch(setProductionTargetsStatus("error"))
        Notification({ summary: "Error Publish Production Target", err: err?.response?.data })
      }
    }

export const RejectProductionTargetAsync =
  (id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setProductionTargetsStatus("loading"))
      try {
        await axios({
          method: "post",
          url: `${apiUrl}/pdt/reject/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        dispatch(ShowProductionTargetAsync(id))
        Notification({ summary: "Published reject successfully", severity: "success" })
        dispatch(setProductionTargetsStatus("data"))
      } catch (err: any) {
        dispatch(setProductionTargetsStatus("error"))
        Notification({ summary: "Error Publish Production Target", err: err?.response?.data })
      }
    }





export const AcceptProductionTargetAsync =
  (id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setProductionTargetsStatus("loading"))
      try {
        await axios({
          method: "post",
          url: `${apiUrl}/pdt/accept/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        dispatch(ShowProductionTargetAsync(id))
        Notification({ summary: "Published accept successfully", severity: "success" })
        dispatch(setProductionTargetsStatus("data"))
      } catch (err: any) {
        dispatch(setProductionTargetsStatus("error"))
        Notification({ summary: "Error Publish Production Target", err: err?.response?.data })
      }
    }




export const AddNoteProductionTargetAsync =
  (id: string, note: string): AppThunk =>
    async (dispatch) => {
      dispatch(setProductionTargetsStatus("loading"))
      const globalState = store.getState()

      try {
        await axios({
          method: "post",
          url: `${apiUrl}/pdt/addNote/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: note,
        })
        Notification({ summary: "Add note successfully", severity: "success" })
        dispatch(InsertNote({ id, note, userName: globalState.Authentication.user?.username ?? "abd" }))
        dispatch(setProductionTargetsStatus("data"))
      } catch (err: any) {
        dispatch(setProductionTargetsStatus("error"))
        Notification({ summary: "Error add note ", err: err?.response?.data })
      }
    }
export const DeleteProductionTargetAsync =
  (id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setProductionTargetsStatus("loading"))
      try {
        await axios({
          method: "delete",
          url: `${apiUrl}/pdt/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        //dispatch(Fetch(data))
        Notification({ summary: "Delete successfully", severity: "success" })

        //dispatch(setStatus("data"))
      } catch (err: any) {
        dispatch(setProductionTargetsStatus("error"))
        Notification({ summary: "error edit Production Target", err: err?.response?.data })

        console.log("error fetching Production Targets", err?.response?.data)
      }
    }
export const ShowProductionTargetAsync =
  (id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setProductionTargetsStatus("loading"))
      try {
        const { data }: any = await axios({
          method: "get",
          url: `${apiUrl}/pdt/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        //dispatch(Fetch(data))
        // console.log(`productionTarget by id `, data);
        dispatch(setProductionTargetsStatus("loading"))
        dispatch(setProductionTarget(data))

        // Notification({ summary: "Edit successfully", severity: "success" })
        dispatch(setProductionTargetsStatus("data"))

        // dispatch(setStatus("data"))
      } catch (err: any) {
        dispatch(setProductionTargetsStatus("error"))
        Notification({ summary: "error edit Production Target", err: err?.response?.data })

        console.log("error fetching Production Targets", err?.response?.data)
      }
    }
export default ProductionTargetsSlice.reducer
