import { admin } from "src/constants/enums/admin"
import { RouteType } from "./routeType"

export interface AdminRoutes {
    routes: RouteType[]
    adminName: admin
    priority: number //from 1 to n, 1 is the most priority.
}