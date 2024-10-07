import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import axios from "axios"
import { Notification } from "src/utils/ui/toast-message"
import { apiUrl } from "src/utils"
import { AppThunk, store } from "../../store"




export interface generalSetting {
    id: string
    chamberVolume: number
}

export interface generalSettingsState {
    status: RequestStatus
    generalSettings: generalSetting[]
    generalSetting?: generalSetting
    generalSetting_id: string
    chamberVolumeValue: number
}



let initialState: generalSettingsState = {
    status: "no-thing",
    generalSettings: [],
    generalSetting_id: "",
    chamberVolumeValue: 0
}

const GeneralSettingsSlice = createSlice({
    name: "GeneralSettings",
    initialState,
    reducers: {
        setGeneralSettingsStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
            state.status = payload
        },
        setGeneralSetting: (state, { payload }: PayloadAction<generalSetting>) => {
            state.generalSetting = payload
        },

        InsertGeneral: (state, { payload }: PayloadAction<generalSetting>) => {
            state.generalSettings.push(payload)
        },
        FetchsGeneral: (state, { payload }: PayloadAction<generalSetting[]>) => {
            state.generalSettings = payload
        },
        ClearGeneralSettingData: (state) => {
            state.generalSetting = undefined
        },
        setGeneralSettingID: (state, { payload }: PayloadAction<string>) => {
            state.generalSetting_id = payload
        },
        setChamberVolume: (state, { payload }: PayloadAction<number>) => {
            state.chamberVolumeValue = payload
        },
    },
})

export const { setGeneralSettingsStatus, setGeneralSettingID, setChamberVolume,
    FetchsGeneral, InsertGeneral, setGeneralSetting, ClearGeneralSettingData } =
    GeneralSettingsSlice.actions



export const FetchGeneralSettingsAsync = (): AppThunk => async (dispatch) => {
    dispatch(setGeneralSettingsStatus("loading"))
    try {
        const { data }: any = await axios({
            method: "get",
            url: `${apiUrl}/settings/general`,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
        dispatch(setGeneralSettingsStatus("loading"))
        dispatch(FetchsGeneral(data))
        console.log(`data`, data);
        dispatch(setGeneralSettingID(data[0].id))
        dispatch(setChamberVolume(data[0].chamberVolume))

        dispatch(setGeneralSettingsStatus("data"))


    } catch (err: any) {
        dispatch(setGeneralSettingsStatus("error"))
        Notification({ summary: "Error General Settings", err: err?.response?.data })

        console.log("Error General Settings", err?.response?.data)
    }
}


export const UpdateGeneralSettingsAsync =
    (generalSetting: any, id: string): AppThunk =>
        async (dispatch) => {
            dispatch(setGeneralSettingsStatus("loading"))
            try {
                await axios({
                    method: "put",
                    url: `${apiUrl}/settings/general/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    data: generalSetting,
                })
                dispatch(setGeneralSettingID(generalSetting.id))
                Notification({ summary: "Edit successfully", severity: "success" })

                dispatch(setGeneralSettingsStatus("data"))
            } catch (err: any) {
                dispatch(setGeneralSettingsStatus("error"))
                Notification({ summary: "Error edit General Setting", err: err?.response?.data })

                console.log("Error fetching General Setting", err?.response?.data)
            }
        }

export default GeneralSettingsSlice.reducer
