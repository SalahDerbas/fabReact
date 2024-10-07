import { FC } from "react"

export interface RouteType {
    path: string
    component: FC
    exact?: boolean
}