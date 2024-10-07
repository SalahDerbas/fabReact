//Chart date filters
export interface ChartDateFilter {
    from: string | null
    to: string | null
    key: string
    //Day or between
    day: boolean
    // Status CO2 Chart
    daily: boolean
    weekly: boolean
    monthly: boolean
    yearly: boolean
}

