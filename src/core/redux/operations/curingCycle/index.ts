import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk } from "../../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"
import { ShowProductionTargetAsync } from "../productionTarget"


export interface blowDown {
    co2ConcentrationPercentage: number
    temperature: number
    pressureLowPSI: number
    pressureHighPSI: number
}

export interface purges {
    co2ConcentrationPercentage: number
    temperature: number
    pressureLowPSI: number
    pressureHighPSI: number
}

export interface result {
    curingPressurePSI: number
    co2ConcentrationPercentage: number
    curingTimeHours: number
    purgingPercentage: number
    co2ConcentAfterPurgingPercentage: number
    co2Introd1Kg: number
    co2Introd2Kg: number
    co2InjectedTotal: number
    co2AbsorbedTotal: number
    co2ReleasedTotal: number
    waterCollectedLitre: number
}
export interface CuringCycle {
    id: string
    note: string | null

    result: result

    createdByUser: string
    createdDate: string
    lastModifiedDate: string
    modifiedByUser: string
    blowDown: blowDown
    purges: purges[]
}


interface CuringCyclesState {
    status: RequestStatus
    CuringCycles: CuringCycle[]
    CuringCycle?: CuringCycle

}

let initialState: CuringCyclesState = {
    status: "no-thing",
    CuringCycles: [],
}



const CuringCyclesSlice = createSlice({
    name: "CuringCycles",
    initialState,
    reducers: {
        setCuringCyclesStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
            state.status = payload
        },
        setCuringCycle: (state, { payload }: PayloadAction<CuringCycle>) => {
            state.CuringCycle = payload
        },
        InsertCuring: (state, { payload }: PayloadAction<CuringCycle>) => {
            state.CuringCycles.push(payload)
        },
        FetchsCuring: (state, { payload }: PayloadAction<CuringCycle[]>) => {
            state.CuringCycles = payload
        },
        ClearCuringCycleData: (state) => {
            state.CuringCycle = undefined
        },
    },
})



export const {
    setCuringCyclesStatus,
    setCuringCycle,
    FetchsCuring,
    InsertCuring,
    ClearCuringCycleData,
} = CuringCyclesSlice.actions



export const InsertCuringCyclesAsync =
    (CuringCycles: any, id: string): AppThunk =>
        async (dispatch) => {
            dispatch(setCuringCyclesStatus("loading"))
            try {
                const { data }: any = await axios({
                    method: "post",
                    url: `${apiUrl}/pdt/${id}/curing/result`,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    data: CuringCycles,
                    responseType: "json"

                })
                console.log("CuringCycles : ", CuringCycles);
                dispatch(InsertCuring(data))
                dispatch(ShowProductionTargetAsync(id))
                dispatch(setCuringCyclesStatus("data"))
                Notification({ summary: "Added Curing Results Cycles ", severity: "success" })
            } catch (err: any) {
                dispatch(setCuringCyclesStatus("error"))
                Notification({ summary: "error in Added Curing Cycles", err: err?.response?.data })

                console.log("error fetching Curing Cycles", err?.response?.data)
            }
        }



export default CuringCyclesSlice.reducer

