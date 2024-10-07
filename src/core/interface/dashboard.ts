import RequestStatus from "src/constants/enums/request-status"

export interface chart {
  datasets: any
  end: string | null
  start: string | null
}

export interface DashboardState {
  ahuChartStatus: RequestStatus
  stillageChartStatus: RequestStatus
  co2ChartStatus: RequestStatus
  chartData: chart
  chartStillageData: chart
  chartCo2Data: chart
}
