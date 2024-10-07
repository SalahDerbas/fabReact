import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk } from "../../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"
import { ShowProductionTargetAsync } from "../productionTarget"


export interface dryingCycle {
    id: string
    note: string | null
    startWeight: number | null
    finalWeight: number | null
    totalFanTime: number | null
    totalHeaterTime: number | null
    heaterTemp: number | null
    airSpeedinChamberPercentage: number | null
    statusOfDoorDuringDrying: string | null
    leaking: string | null
    createdByUser: string
    createdDate: string
    lastModifiedDate: string
    modifiedByUser: string

}

interface dryingCyclesState {
    status: RequestStatus
    dryingCycles: dryingCycle[]
    dryingCycle?: dryingCycle

}

let initialState: dryingCyclesState = {
    status: "no-thing",
    dryingCycles: [],
}



const DryinCyclesSlice = createSlice({
    name: "dryingCycles",
    initialState,
    reducers: {
        setDryinCyclesStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
            state.status = payload
        },
        setDryingParameter: (state, { payload }: PayloadAction<dryingCycle>) => {
            state.dryingCycle = payload
        },
        InsertDrying: (state, { payload }: PayloadAction<dryingCycle>) => {
            state.dryingCycles.push(payload)
        },
        FetchsDrying: (state, { payload }: PayloadAction<dryingCycle[]>) => {
            state.dryingCycles = payload
        },
        ClearDryingCycleData: (state) => {
            state.dryingCycle = undefined
        },
    },
})



export const {
    setDryinCyclesStatus,
    FetchsDrying,
    InsertDrying,
    setDryingParameter,
    ClearDryingCycleData,
} = DryinCyclesSlice.actions



export const InsertDryingCyclesAsync =
    (dryingCycles: any, id: string): AppThunk =>
        async (dispatch) => {
            dispatch(setDryinCyclesStatus("loading"))
            // console.log("dryingCycles", dryingCycles);
            try {
                const { data }: any = await axios({
                    method: "post",
                    url: `${apiUrl}/pdt/${id}/drying`,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    data: dryingCycles,
                    responseType: "json"

                })
                console.log("dryingCycles : ", dryingCycles);


                dispatch(InsertDrying(data))
                console.log("redux data : ", data);
                dispatch(ShowProductionTargetAsync(id))
                dispatch(setDryinCyclesStatus("data"))
                Notification({ summary: "Added Drying Cycles ", severity: "success" })
            } catch (err: any) {
                dispatch(setDryinCyclesStatus("error"))
                Notification({ summary: "error in Added Drying Cycles", err: err?.response?.data })

                console.log("error fetching Drying Cycles", err?.response?.data)
            }
        }



export default DryinCyclesSlice.reducer

