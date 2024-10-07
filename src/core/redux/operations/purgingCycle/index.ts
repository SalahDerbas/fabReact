import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk } from "../../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"
import { PurgingCycle, PurgingCyclesState } from "src/core/interface"
import { ShowProductionTargetAsync } from "../productionTarget"

let initialState: PurgingCyclesState = {
    status: "no-thing",
    PurgingCycles: [],
}

const PurgingCyclesSlice = createSlice({
    name: "PurgingCycles",
    initialState,
    reducers: {
        setPurgingCycleStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
            state.status = payload
        },
        InsertPurgingCycle: ({ PurgingCycles }, { payload }: PayloadAction<PurgingCycle>) => {
            PurgingCycles.push(payload)
        },
        UpdatePurgingCycle: ({ PurgingCycles }, { payload }: PayloadAction<PurgingCycle>) => {
            let ind = PurgingCycles.findIndex((el) => el.id === payload.id)
            if (ind !== -1) PurgingCycles[ind] = payload
        },
        DeletePurgingCycle: ({ PurgingCycles }, { payload }: PayloadAction<string>) => {
            let ind = PurgingCycles.findIndex((el) => el.id === payload)
            if (ind !== -1) PurgingCycles.splice(ind, 1)
        },
        ShowPurgingCycle: (state, { payload }: PayloadAction<PurgingCycle>) => {
            state.PurgingCycle = payload
        },
        FetchPurgingCycle: (state, { payload }: PayloadAction<PurgingCycle[]>) => {
            state.PurgingCycles = payload
        },
    },
})

const { setPurgingCycleStatus, InsertPurgingCycle, FetchPurgingCycle } = PurgingCyclesSlice.actions

export const FetchPurgingCyclesAsync = (): AppThunk => async (dispatch) => {
    dispatch(setPurgingCycleStatus("loading"))
    try {
        const { data }: any = await axios({
            method: "get",
            url: `${apiUrl}/board`,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
        dispatch(FetchPurgingCycle(data))
        dispatch(setPurgingCycleStatus("data"))
    } catch (err) {
        dispatch(setPurgingCycleStatus("error"))
        // Notification({ summary: "Error fetching board's" })
        console.log("Error fetching Board's", err)
    }
}


export const InsertPurgingCycleAsync =
    (PurgingCycle: any, id: string): AppThunk =>
        async (dispatch) => {
            dispatch(setPurgingCycleStatus("loading"))
            try {

                const { data }: any = await axios({
                    method: "post",
                    url: `${apiUrl}/pdt/${id}/curing`,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    data: PurgingCycle,
                })


                dispatch(InsertPurgingCycle(data))
                dispatch(ShowProductionTargetAsync(id))
                Notification({ summary: "Add Curing successfully", severity: "success" })
                dispatch(setPurgingCycleStatus("data"))
            } catch (err) {
                dispatch(setPurgingCycleStatus("error"))
                Notification({ summary: "Error inserting Curing Purging" })

                console.log("Error inserting new Curing Cycle", err)
            }
        }




export default PurgingCyclesSlice.reducer
