import { Calendar } from "primereact/calendar"
import { ChartProps } from "primereact/chart"
import { RadioButton } from "primereact/radiobutton"
import React from "react"
import { FCol, FGrid, FSpace, FText } from "src/components"
import { ChartDateFilter } from "src/core/interface"
import { useHighcharts } from "src/utils/hooks/use-highcharts"

export interface FChartProps extends ChartProps {
  isLoading: boolean
  initialKey: string
  status: string
  datasets: any[]
  onClearData: () => void
  onFetchData: (attributes: ChartDateFilter) => void
  onFetchNewLegend: (attributes: ChartDateFilter) => void
  withFilter?: boolean
  start?: string | null
  end?: string | null
  withFilterCO2?: boolean
}

interface props {}
export const CO2Chart: React.FC<FChartProps> = (props) => {
  const { isLoading } = props
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  const {
    onChangeFromInput,
    onChangeToInput,
    dayCO2InputActive,
    weekCO2InputActive,
    mounthCO2InputActive,
    yearCO2InputActive,
    toggledayCO2Inputs,
    toggleweekCO2Inputs,
    togglemounthCO2Inputs,
    toggleyearCO2Inputs,
    fromCO2Value,
    toCO2Value,
    onHideToCalander,
    chart,
    onShowToCalander,
  }: any = useHighcharts(props)

  return (
    <>
      <FGrid justify="between" align="start">
        <FCol lg={6} sm={12}>
          <FGrid align="center">
            <FCol fixed>
              <FSpace align="center">
                <RadioButton
                  disabled={isLoading}
                  value={dayCO2InputActive}
                  name="Daily"
                  onChange={toggledayCO2Inputs}
                  checked={dayCO2InputActive}
                />
                <FText fs={4} fw="bold">
                  Daily
                </FText>
              </FSpace>
            </FCol>
            <FCol fixed>
              <FSpace align="center">
                <RadioButton
                  disabled={isLoading}
                  value={weekCO2InputActive}
                  name="Weekly"
                  onChange={toggleweekCO2Inputs}
                  checked={weekCO2InputActive}
                />
                <FText fs={4} fw="bold">
                  Weekly
                </FText>
              </FSpace>
            </FCol>
            <FCol fixed>
              <FSpace align="center">
                <RadioButton
                  disabled={isLoading}
                  value={mounthCO2InputActive}
                  name="Mounthly"
                  onChange={togglemounthCO2Inputs}
                  checked={mounthCO2InputActive}
                />
                <FText fs={4} fw="bold">
                  Mounthly
                </FText>
              </FSpace>
            </FCol>
            <FCol fixed>
              <FSpace align="center">
                <RadioButton
                  disabled={isLoading}
                  value={yearCO2InputActive}
                  name="Yearly"
                  onChange={toggleyearCO2Inputs}
                  checked={yearCO2InputActive}
                />
                <FText fs={4} fw="bold">
                  Yearly
                </FText>
              </FSpace>
            </FCol>
          </FGrid>
        </FCol>

        <FCol lg={6} sm={12}>
          <FGrid align="start">
            <FCol fixed>
              <FSpace align="center">
                <FText fs={3} fw="bold">
                  <i className="pi pi-calendar-times" style={{ fontSize: "1rem", marginRight: "10px" }}></i>
                  Between{" "}
                </FText>
              </FSpace>
            </FCol>

            <FCol sm={12} md={10}>
              <FGrid gap={2}>
                <FCol fixed className="p-0">
                  <FSpace align="center">
                    <FText fs={4}>From</FText>

                    <Calendar
                      className="calendar"
                      monthNavigator
                      yearNavigator
                      // showTime
                      // disabled={!betweenInputActive || isLoading}
                      yearRange="2010:2022"
                      value={new Date(fromCO2Value)}
                      onChange={(e) => onChangeFromInput(e.value)}
                    />
                  </FSpace>
                </FCol>
                <FCol className="p-0">
                  <FSpace align="center" gap={25}>
                    <FText fs={4}>To</FText>

                    <Calendar
                      className="calendar"
                      monthNavigator
                      yearNavigator
                      // disabled={!betweenInputActive || isLoading}
                      yearRange="2010:2022"
                      value={new Date(toCO2Value)}
                      onChange={(e) => onChangeToInput(e.value)}
                      onShow={onShowToCalander}
                      // showTime
                      onHide={onHideToCalander}
                    />
                  </FSpace>
                </FCol>
              </FGrid>
            </FCol>
          </FGrid>
        </FCol>
      </FGrid>

      {chart}
    </>
  )
}
