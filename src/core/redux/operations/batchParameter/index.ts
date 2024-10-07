import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk } from "../../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"

export interface User {
  id: string
  username: string
  email: string
  password: string | null
  roles: string[]
}

// interface log {
//   date: string
//   message: string
// }
export interface batchParameter {
  id: string
  batchNumber: number
  // waterAmount: number
  startTime: string
  endTime: string | null
  approved: string
  // logs: log[]
  humidity: number
  appearence: string | null
  comment: string | null
  inspector: User
  createdByUser: string
  createdDate: string
  lastModifiedDate: string
  modifiedByUser: string
  // productionTarget: any
  // batchNumber: number
}

interface batchParametersState {
  status: RequestStatus
  usersStatus: RequestStatus
  batchParameters: batchParameter[]
  batchParameter?: batchParameter
  users: User[]
  currentState: number

}

let initialState: batchParametersState = {
  status: "no-thing",
  usersStatus: "no-thing",
  batchParameters: [],
  users: [],
  currentState: 1
}

const BatchParametersSlice = createSlice({
  name: "batchParameters",
  initialState,
  reducers: {
    setBatchParametersStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    setUsersStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.usersStatus = payload
    },
    setBatchParameter: (state, { payload }: PayloadAction<batchParameter>) => {
      state.batchParameter = payload
    },
    InsertBatch: (state, { payload }: PayloadAction<batchParameter>) => {
      state.batchParameters.push(payload)
    },
    FetchsBatch: (state, { payload }: PayloadAction<batchParameter[]>) => {
      state.batchParameters = payload
    },
    setCurrentBatch: (state, { payload }: PayloadAction<number>) => {
      state.currentState = payload
    },
    FetchUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload
    },
    ClearBatchParameterData: (state) => {
      state.batchParameter = undefined
    },
    // InsertLog: (state, { payload }: PayloadAction<log>) => {
    //   state.batchParameters[0].logs.push(payload)
    // },

  },



})

export const {
  setBatchParametersStatus,
  setUsersStatus,
  setCurrentBatch,
  // InsertLog,
  FetchsBatch,
  FetchUsers,
  InsertBatch,
  setBatchParameter,
  ClearBatchParameterData,
} = BatchParametersSlice.actions

// export const FetchBatchParametersAsync = (): AppThunk => async (dispatch) => {
//   dispatch(setBatchParametersStatus("loading"))
//   try {
//     const { data }: any = await axios({
//       method: "get",
//       url: `${apiUrl}/pdt`,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//     })
//     dispatch(FetchsBatch(data))

//     dispatch(setBatchParametersStatus("data"))
//   } catch (err: any) {
//     dispatch(setBatchParametersStatus("error"))
//     Notification({ summary: "error fetching Batch Parameter", err: err?.response?.data })

//     console.log("error fetching Batch Parameter", err?.response?.data)
//   }
// }

 export const UpdateBatchParameterAsync =
   (batchParameter: any, id: string, index: string): AppThunk =>
     async (dispatch) => {
       dispatch(setBatchParametersStatus("loading"))
       try {
        const { data }: any = await axios({
           method: "put",
           url: `${apiUrl}/pdt/${id}/pdtbatch/${index}`,
           headers: {
             "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*",
           },
           data: batchParameter,
         })

         //dispatch(Fetch(data))
         Notification({ summary: "Edit successfully", severity: "success" })

         dispatch(setBatchParametersStatus("data"))
       } catch (err: any) {
         dispatch(setBatchParametersStatus("error"))
         Notification({ summary: "error edit Batch Parameter", err: err?.response?.data })

         console.log("error fetching Batch Parameter", err?.response?.data)
       }
     }
export const InsertBatchParameterAsync =
  (batchParameter: any, id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setBatchParametersStatus("loading"))
      // console.log("batchParameter", batchParameter);

      try {
        const { data }: any = await axios({
          method: "post",
          url: `${apiUrl}/pdt/${id}/pdtbatch`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: batchParameter,
          responseType: "json"

        })

        // const response: any = dispatch(InsertBatch(data))

        //console.log("data Redux", data
        dispatch(InsertBatch(data))
        dispatch(setCurrentBatch(data))
        console.log("setCurrentBatch(data)", data);
        // const response = await dispatch(setCurrentBatch(data));
        // console.log("response", response.payload);
        // console.log("dispatch(setCurrentBatch(data))", dispatch(setCurrentBatch(data)));
        dispatch(setBatchParametersStatus("data"))
        Notification({ summary: "Create Batch Parameter ", severity: "success" })

        // return response.payload;
        // return data;
      } catch (err: any) {
        dispatch(setBatchParametersStatus("error"))
        Notification({ summary: "error insert Batch Parameter", err: err?.response?.data })

        console.log("error fetching Batch Parameter", err?.response?.data)
      }
    }


export const InsertMixBatchParameterAsync =
  (batchParameter: any, id: string, bid: number): AppThunk =>
    async (dispatch) => {
      dispatch(setBatchParametersStatus("loading"))
      try {
        const { data }: any = await axios({
          method: "post",
          url: `${apiUrl}/pdt/${id}/batch/${bid}/mix`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: batchParameter,
        })
        dispatch(InsertBatch(data))
        console.log("data Redux new mix", data)
        dispatch(setBatchParametersStatus("data"))
        Notification({ summary: "Add new mix in batch parameter ", severity: "success" })
        return data;
      } catch (err: any) {
        dispatch(setBatchParametersStatus("error"))
        Notification({ summary: "error in add new mix in batch parameter", err: err?.response?.data })

        console.log("error in add new mix in batch parameter", err?.response?.data)
      }
    }


//   export const FetchLogsBatchParametersAsync = (): AppThunk => async (dispatch) => {
//   dispatch(setBatchParametersStatus("loading"))
//   try {
//     const { data }: any = await axios({
//       method: "get",
//       url: `${apiUrl}/pdt/`,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//     })
//     dispatch(FetchsBatch(data))

//     dispatch(setBatchParametersStatus("data"))
//   } catch (err: any) {
//     dispatch(setBatchParametersStatus("error"))
//     Notification({ summary: "error fetching Batch Parameter", err: err?.response?.data })

//     console.log("error fetching Batch Parameter", err?.response?.data)
//   }
// }


export const FetchUsersAsync = (): AppThunk => async (dispatch) => {
  dispatch(setUsersStatus("loading"))
  try {
    const { data }: any = await axios({
      method: "get",
      url: `${apiUrl}/users`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch(FetchUsers(data))
    dispatch(setUsersStatus("data"))
  } catch (err: any) {
    dispatch(setUsersStatus("error"))
    Notification({ summary: "Get Users failed", err: err?.response?.data })

    console.log("error fetching Users", err?.response?.data)
  }
}



// export const DeleteBatchParameterAsync =
//   (id: string): AppThunk =>
//     async (dispatch) => {
//       dispatch(setBatchParametersStatus("loading"))
//       try {
//         await axios({
//           method: "delete",
//           url: `${apiUrl}/pdt/${id}`,
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//         })
//         //dispatch(Fetch(data))
//         Notification({ summary: "Delete successfully", severity: "success" })

//         //dispatch(setStatus("data"))
//       } catch (err: any) {
//         dispatch(setBatchParametersStatus("error"))
//         Notification({ summary: "error edit Batch Parameter", err: err?.response?.data })

//         console.log("error fetching Batch Parameter", err?.response?.data)
//       }
//     }


// export const ShowBatchParameterAsync =
//   (id: string): AppThunk =>
//     async (dispatch) => {
//       dispatch(setBatchParametersStatus("loading"))
//       try {
//         const { data }: any = await axios({
//           method: "get",
//           url: `${apiUrl}/pdt/${id}`,
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//         })
//         //dispatch(Fetch(data))
//         dispatch(setBatchParameter(data))
//         // Notification({ summary: "Edit successfully", severity: "success" })
//         dispatch(setBatchParametersStatus("data"))
//         console.log(" data Batch Parameter ", data)

//         // dispatch(setStatus("data"))
//       } catch (err: any) {
//         dispatch(setBatchParametersStatus("error"))
//         Notification({ summary: "error edit Batch Parameter", err: err?.response?.data })

//         console.log("error fetching Batch Parameter", err?.response?.data)
//       }
//     }


export default BatchParametersSlice.reducer
