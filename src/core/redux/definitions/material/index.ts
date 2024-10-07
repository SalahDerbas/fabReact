import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk } from "../../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"
import { Material, MaterialsState, Unit } from "src/core/interface"

let initialState: MaterialsState = {
  status: "no-thing",
  unitsStatus: "no-thing",
  materials: [],
  units: [],
}

const MaterialsSlice = createSlice({
  name: "Materials",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    setUnitsStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.unitsStatus = payload
    },
    setMaterial: (state, { payload }: PayloadAction<Material>) => {
      state.material = payload
    },
    Insert: ({ materials }, { payload }: PayloadAction<Material>) => {
      materials.push(payload)
    },
    Update: ({ materials }, { payload }: PayloadAction<Material>) => {
      let ind = materials.findIndex((el) => el.id === payload.id)
      if (ind !== -1) materials[ind] = payload
    },
    Delete: ({ materials }, { payload }: PayloadAction<string>) => {
      let ind = materials.findIndex((el) => el.id === payload)
      if (ind !== -1) materials.splice(ind, 1)
    },
    Fetch: (state, { payload }: PayloadAction<Material[]>) => {
      state.materials = payload
    },
    FetchUnits: (state, { payload }: PayloadAction<Unit[]>) => {
      state.units = payload
    },
    Clear: (state) => {
      state.material = undefined
    },
    Show: (state, { payload }: PayloadAction<Material>) => {
      state.material = payload
    },
  },
})

const { setStatus, setUnitsStatus, Fetch, FetchUnits, Update, Insert, Delete, Show, Clear } = MaterialsSlice.actions

export const FetchMaterialsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"))
  try {
    const { data }: any = await axios({
      method: "get",
      url: `${apiUrl}/materials`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch(Fetch(data))
    dispatch(setStatus("data"))
  } catch (err: any) {
    dispatch(setStatus("error"))
    Notification({ summary: "error fetching materials", err: err?.response?.data })

    console.log("error fetching materials", err)
  }
}

export const UpdateMaterialAsync =
  (material: Material, id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setStatus("loading"))
      try {
        const { data } = await axios({
          method: "put",
          url: `${apiUrl}/materials/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: material,
        })
        dispatch(Update(data))
        Notification({ summary: "Edit successfully", severity: "success" })
        dispatch(setStatus("data"))
      } catch (err: any) {
        dispatch(setStatus("error"))
        Notification({ summary: "Update material failed", err: err?.response?.data })

        console.log("error fetching materials", err)
      }
    }
export const AddNewMaterial =
  (material: Material): AppThunk =>
    async (dispatch) => {
      dispatch(setStatus("loading"))
      try {
        const { data } = await axios({
          method: "post",
          url: `${apiUrl}/materials`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: material,
        })
        dispatch(Clear())
        dispatch(Insert(data))
        Notification({ summary: "Add successfully", severity: "success" })
        dispatch(setStatus("data"))
      } catch (err: any) {
        dispatch(setStatus("error"))
        Notification({ summary: "Insert material failed", err: err?.response?.data })

        console.log("error fetching materials", err)
      }
    }
export const DeleteMaterial =
  (id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setStatus("loading"))
      try {
        await axios({
          method: "delete",
          url: `${apiUrl}/materials/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        dispatch(Clear())
        Notification({ summary: "Delete Successfully", severity: "success" })
        dispatch(Delete(id))

        dispatch(setStatus("data"))
      } catch (err: any) {
        dispatch(setStatus("error"))
        Notification({ summary: "Delete materials failed", err: err?.response?.data })

        console.log("error fetching material", err)
      }
    }
export const ShowMaterialAsync =
  (id: string): AppThunk =>
    async (dispatch) => {
      dispatch(setStatus("loading"))
      try {
        const { data }: any = await axios({
          method: "get",
          url: `${apiUrl}/materials/${id}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        dispatch(Show(data))
        dispatch(setStatus("data"))
      } catch (err: any) {
        dispatch(setStatus("error"))
        Notification({ summary: "Get materials failed", err: err?.response?.data })

        console.log("error fetching materials", err)
      }
    }

export const FetchUnitsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setUnitsStatus("loading"))
  try {
    const { data }: any = await axios({
      method: "get",
      url: `${apiUrl}/units`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch(FetchUnits(data))
    dispatch(setUnitsStatus("data"))
  } catch (err: any) {
    dispatch(setUnitsStatus("error"))
    Notification({ summary: "Get Units failed", err: err?.response?.data })

    console.log("error fetching Units", err)
  }
}

export default MaterialsSlice.reducer
