import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppThunk } from "../../store"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import axios from "axios"
import { ShowProductionTargetAsync } from "../productionTarget"



export interface Summary {
    id: string
    note: string | null
    quantityOfDamagedBlocks: number
    sensorsCondtion: string
    createdByUser: string
    createdDate: string
    lastModifiedDate: string
    modifiedByUser: string
}


interface SummarysState {
    status: RequestStatus
    Summarys: Summary[]
    Summary?: Summary

}

let initialState: SummarysState = {
    status: "no-thing",
    Summarys: [],
}

const SummarysSlice = createSlice({
    name: "Summarys",
    initialState,
    reducers: {
        setSummarysStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
            state.status = payload
        },
        setSummaryCycle: (state, { payload }: PayloadAction<Summary>) => {
            state.Summary = payload
        },
        InsertSummary: (state, { payload }: PayloadAction<Summary>) => {
            state.Summarys.push(payload)
        },
        FetchsSummary: (state, { payload }: PayloadAction<Summary[]>) => {
            state.Summarys = payload
        },
        ClearSummaryData: (state) => {
            state.Summary = undefined
        },
    },
})
export const {
    setSummarysStatus,
    setSummaryCycle,
    FetchsSummary,
    InsertSummary,
    ClearSummaryData,
} = SummarysSlice.actions



export const InsertSummaryAsync =
    (Summarys: any, id: string): AppThunk =>
        async (dispatch) => {
            dispatch(setSummarysStatus("loading"))
            try {
                const { data }: any = await axios({
                    method: "post",
                    url: `${apiUrl}/pdt/${id}/summary`,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    data: Summarys,
                    responseType: "json"

                })
                console.log("Summarys : ", Summarys);
                dispatch(InsertSummary(data))
                dispatch(setSummarysStatus("data"))
                dispatch(ShowProductionTargetAsync(id))
                Notification({ summary: "Added Summary ", severity: "success" })
            } catch (err: any) {
                dispatch(setSummarysStatus("error"))
                Notification({ summary: "error in Added Summary", err: err?.response?.data })

                console.log("error fetching Summary", err?.response?.data)
            }
        }

export default SummarysSlice.reducer

