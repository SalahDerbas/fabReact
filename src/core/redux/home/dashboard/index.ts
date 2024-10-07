import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import axios from "axios"
import moment, { invalid } from "moment"
import { apiUrl } from "src/utils"
import { AppThunk, store } from "../../store"
import { DashboardState } from "src/core/interface/dashboard"
import { ChartDateFilter } from "src/core/interface/chartDateFilter"
export const AuhChartkeys = [
  "co2Level",
  "o2level",
  "humidity",
  "inletTemperature",
  "controlTemperature",
  "heaterTemperatureSetpoint",
  "humiditySetpoint",
  "controlTemperatureSetpoint",
  "pressure",
]
export const StillageChartkeys = ["stillage1", "stillage2", "stillage3", "stillage4", "stillage5", "stillage6", "stillage7"]

export const Co2Chartkeys = ["co2Absorbed", "co2Exausted", "co2Leaked"]
// Initial state
let initialState: DashboardState = {
  ahuChartStatus: "no-thing",
  stillageChartStatus: "no-thing",
  co2ChartStatus: "no-thing",

  chartData: {
    /*Convert to {co2Level:[],o2level:[],... } */
    datasets: AuhChartkeys.reduce(function (acc: any, cur: any, i) {
      acc[cur] = []
      return acc
    }, {}),
    start: null,
    end: null,
  },
  chartStillageData: {
    datasets: StillageChartkeys.reduce(function (acc: any, cur: any, i) {
      acc[cur] = []
      return acc
    }, {}),
    start: null,
    end: null,
  },
  chartCo2Data: {
    datasets: Co2Chartkeys.reduce(function (acc: any, cur: any, i) {
      acc[cur] = []
      return acc
    }, {}),
    start: null,
    end: null,
  },
}

// Create a new slice for Dashboard
const DashboardSlice = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {
    setStatusCO2Chart: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.co2ChartStatus = payload
    },
    FetchCO2Chart: (state, { payload }: PayloadAction<{ data: any[] }>) => {
      //Set data for all keys
      state.chartCo2Data.datasets = Co2Chartkeys.reduce(function (acc: any, cur: any, i) {
        acc[cur] = payload.data.map((row) => {
          return [moment.utc(row.date).valueOf(), row[cur] !== "NaN" ? row[cur] : 0]
        })
        return acc
      }, {})
    },
    clearCO2Data: (state) => {
      state.chartCo2Data.datasets = Co2Chartkeys.reduce(function (acc: any, cur: any, i) {
        acc[cur] = []
        return acc
      }, {})
      state.co2ChartStatus = "no-thing"
    },
    setStatusAhuChart: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.ahuChartStatus = payload
    },
    FetchAhuChart: (state, { payload }: PayloadAction<{ data: any[]; key: string }>) => {
      let key = payload.key;
      //utc for highchart 
      //convert to [ [date,value]... ]
      state.chartData.datasets[key] = payload.data.map((value, index) => [
        moment.utc(value.date).valueOf(),
        value[key] !== "NaN" ? value[key] : 0,
      ])
      if (payload.data.length !== 0) {
        //Get first and last time
        state.chartData.start = payload.data[0].date
        state.chartData.end = payload.data[payload.data.length - 1].date
      }
    },
    clearAhuData: (state) => {
      state.chartData.datasets = AuhChartkeys.reduce(function (acc: any, cur: any, i) {
        acc[cur] = []
        return acc
      }, {})
      state.ahuChartStatus = "no-thing"
    },
    setStatusStillageChart: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.stillageChartStatus = payload
    },
    FetchStillageChart: (state, { payload }: PayloadAction<{ data: any[] }>) => {
      //Set data for all keys
      state.chartStillageData.datasets = StillageChartkeys.reduce(function (acc: any, cur: any, i) {
        acc[cur] = payload.data.map((row) => {
          return [moment.utc(row.date).valueOf(), row[cur] !== "NaN" ? row[cur] : 0]
        })
        return acc
      }, {})
    },
    clearStillageData: (state) => {
      state.chartStillageData.datasets = StillageChartkeys.reduce(function (acc: any, cur: any, i) {
        acc[cur] = []
        return acc
      }, {})
      state.stillageChartStatus = "no-thing"
    },
  },
})
export const { clearAhuData, clearStillageData, clearCO2Data } = DashboardSlice.actions
const { setStatusAhuChart, FetchAhuChart, FetchStillageChart,
  setStatusStillageChart, setStatusCO2Chart, FetchCO2Chart } = DashboardSlice.actions

export const FetchAhuChartData =
  (filters: ChartDateFilter): AppThunk =>
    async (dispatch) => {
      try {
        const { from, to, key, day, daily = false, monthly = false, weekly = false, yearly = false } = filters
        //To make sure data don't fetching again
        if (store.getState().Dashboard.chartData.datasets[key].length > 0) {
          dispatch(setStatusAhuChart("data"))
          return
        }
        dispatch(setStatusAhuChart("loading"))
        const { data }: any = await axios({
          method: "get",
          //yyyy-MM-DDThh:mm:ss.SSS check here if day or between
          url: `${apiUrl}/ahu/single_within?from=${moment(from).format("yyyy-MM-DD")}T${!day ? moment(from).format("hh:mm:ss.SSS") : "00:00:00.000"
            }&to=${moment(to).format("yyyy-MM-DD")}T${!day ? moment(to).format("hh:mm:ss.SSS") : "00:00:00.000"}&fieldName=${key}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        dispatch(FetchAhuChart({ data: data, key }))

        dispatch(setStatusAhuChart("data"))
        console.log("AHU data", dispatch(FetchAhuChart({ data: data, key })));

      } catch (error) {
        //console.log(error)

        dispatch(setStatusAhuChart("error"))
      }
    }


export const FetchCO2ChartData =
  (filters: ChartDateFilter): AppThunk =>
    async (dispatch) => {
      try {


        const { from, to, day, key, daily, weekly, monthly, yearly } = filters
        //To make sure data don't fetching again
        if (store.getState().Dashboard.chartCo2Data.datasets[key].length !== 0) {
          dispatch(setStatusCO2Chart("data"))
          return
        }
        dispatch(setStatusCO2Chart("loading"))

        const { data }: any = await axios({
          method: "get",
          //yyyy-MM-DDThh:mm:ss.SSS check here if day or between
          url: `${apiUrl}/co2?from=${(from == null) && (to == null) ? "" : moment(from).format("yyyy-MM-DD")}${(from == null) ? "" : "T"}${(!day && from != null) ? moment(from).format("hh:mm:ss.SSS") : ""}&to=${(to != null) ? moment(to).format("yyyy-MM-DD") : ""}${(to == null) ? "" : "T"}${(!day && to != null) ? moment(to).format("hh:mm:ss.SSS") : ""}&interval=${daily ? "day" : ""}${weekly ? "week" : ""}${monthly ? "month" : ""}${yearly ? "year" : ""}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        dispatch(FetchCO2Chart({ data: data }))
        dispatch(setStatusCO2Chart("data"))
        console.log("CO2 data", dispatch(FetchCO2Chart({ data: data })));
      } catch (error) {
        //console.log(error)

        dispatch(setStatusCO2Chart("error"))
      }
    }



export const FetchStillageChartData =
  (filters: ChartDateFilter): AppThunk =>
    async (dispatch) => {
      try {
        const { from, to, day, daily = false, monthly = false, weekly = false, yearly = false } = filters
        //To make sure data don't fetching again
        if (store.getState().Dashboard.chartStillageData.datasets["stillage1"].length !== 0) {
          dispatch(setStatusStillageChart("data"))
          return
        }
        dispatch(setStatusStillageChart("loading"))
        const { data }: any = await axios({
          method: "get",
          //yyyy-MM-DDThh:mm:ss.SSS check here if day or between
          url: `${apiUrl}/stillage/within?from=${moment(from).format("yyyy-MM-DD")}T${!day ? moment(from).format("hh:mm:ss.SSS") : "00:00:00.000"
            }&to=${moment(to).format("yyyy-MM-DD")}T${!day ? moment(to).format("hh:mm:ss.SSS") : "00:00:00.000"}`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        dispatch(FetchStillageChart({ data: data }))

        dispatch(setStatusStillageChart("data"))
      } catch (error) {
        //console.log(error)

        dispatch(setStatusStillageChart("error"))
      }
    }
export default DashboardSlice.reducer
