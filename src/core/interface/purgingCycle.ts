import RequestStatus from "src/constants/enums/request-status"
import { Link } from "./link"

export interface purges {
    id?: string
    pressureLowPSI?: number
    pressureHighPSI?: number
    co2ConcentrationPercentage?: number
    temperature?: number
}

export interface PurgingCycle {
    id: string
    note: string | null
    curingPressurePSI: number
    curingTimeHours: number
    purgingPercentage: number
    co2ConcentAfterPurgingPercentage: number
    co2Introd1Kg: number
    co2Introd2Kg: number
    co2InjectedTotal: number
    co2AbsorbedTotal: number
    co2ReleasedTotal: number
    waterCollectedLitre: number
    createdByUser: string
    createdDate: string
    lastModifiedDate: string
    modifiedByUser: string



    co2ConcentrationPercentage: number
    pressureLowPSI: number
    pressureHighPSI: number
    temperature: number
    purges: purges[]
}
export interface PurgingCyclesState {
    status: RequestStatus
    PurgingCycles: PurgingCycle[]
    PurgingCycle?: PurgingCycle
}
