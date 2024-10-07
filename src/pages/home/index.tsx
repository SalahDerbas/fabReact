import { FC } from "react"
import { FGrid, FCol } from "src/components"
import { FChart } from "src/components/f-chart"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/core/redux/store"
import {
  clearAhuData,
  clearCO2Data,
  clearStillageData,
  FetchAhuChartData,
  FetchCO2ChartData,
  FetchStillageChartData,
} from "src/core/redux"

const ContentComponent: FC = (props: any) => {
  //...
  const dispatch = useDispatch()
  const {
    chartData: { datasets, start, end },
    ahuChartStatus,
    chartStillageData,
    stillageChartStatus,
    co2ChartStatus,
    chartCo2Data,
  } = useSelector((state: RootState) => state.Dashboard)

  const onClearData = () => {
    dispatch(clearAhuData())
    dispatch(clearStillageData())
  }
  const onFetchData = (attributes: any) => {
    dispatch(FetchAhuChartData(attributes))
    dispatch(FetchStillageChartData(attributes))
  }
  const onFetchNewLegendAhu = (attributes: any) => {
    dispatch(FetchAhuChartData(attributes))
  }
  const onClearStillageData = () => {
    dispatch(clearStillageData())
  }
  const onFetchStillageData = (attributes: any) => {
    dispatch(FetchStillageChartData(attributes))
  }

  const onFetchCo2Data = (attributes: any) => {
    dispatch(FetchCO2ChartData(attributes))
  }
  const onClearCo2Data = () => {
    dispatch(clearCO2Data())
  }

  return (
    <FGrid justify="center">
      <FCol span={12}>
        <FChart
          initialKey={"co2Absorbed"}
          isLoading={co2ChartStatus === "loading"}
          status={co2ChartStatus}
          datasets={chartCo2Data.datasets}
          withFilter={false}
          onClearData={onClearCo2Data}
          onFetchData={onFetchCo2Data}
          onFetchNewLegend={onFetchCo2Data}
          // start={start}
          // end={end}
        />
      </FCol>

      <FCol span={12}>
        <FChart
          isLoading={ahuChartStatus === "loading"}
          initialKey={"co2Level"}
          status={ahuChartStatus}
          datasets={datasets}
          withFilterCO2={false}
          onClearData={onClearData}
          onFetchData={onFetchData}
          onFetchNewLegend={onFetchNewLegendAhu}
          start={start}
          end={end}
        />
      </FCol>

      <FCol span={12}>
        <FChart
          initialKey={"stillage1"}
          isLoading={stillageChartStatus === "loading"}
          status={stillageChartStatus}
          datasets={chartStillageData.datasets}
          withFilter={false}
          withFilterCO2={false}
          onClearData={onClearStillageData}
          onFetchData={onFetchStillageData}
          onFetchNewLegend={onFetchStillageData}
          start={start}
          end={end}
        />
      </FCol>
    </FGrid>
  )
}

interface props {}
export const Home: React.FC<props> = () => {
  return <ContentComponent />
}
