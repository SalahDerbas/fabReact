import { FC } from "react"
import { FCol, FGrid, FSpace, FText } from ".."
import { ChartProps } from "primereact/chart"
import { RadioButton } from "primereact/radiobutton"
import moment from "moment"

import { Calendar } from "primereact/calendar"
import { useHighcharts } from "src/utils/hooks/use-highcharts"
import { ChartDateFilter } from "src/core/interface"

/**
 * from : date of begin fetching.
 * to : date of end fetching.
 * key : what label should fetching it. Ex : Co2,O2,....
 * day : If fetching in one day or more than one day.
 */
export interface FChartProps extends ChartProps {
  isLoading: boolean
  initialKey: string | any
  status: string
  datasets: any[]
  onClearData: () => void
  onFetchData: (attributes: ChartDateFilter) => void
  onFetchNewLegend?: (attributes: ChartDateFilter) => void
  withFilter?: boolean
  start?: string | null
  end?: string | null
  withFilterCO2?: boolean
  stateChart?: boolean
}

export const FChart: FC<FChartProps> = (props: any) => {
  const { isLoading, withFilter = true, withFilterCO2 = true, stateChart = true, start, end } = props
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  const {
    onChangeFromInput,
    onChangeToInput,
    onChangeFromCO2Input,
    onChangeToCO2Input,
    dayInputActive,
    dayCO2InputActive,
    weekCO2InputActive,
    mounthCO2InputActive,
    yearCO2InputActive,
    toggleInputs,
    toggledayCO2Inputs,
    toggleweekCO2Inputs,
    togglemounthCO2Inputs,
    toggleyearCO2Inputs,
    dayValue,
    toValue,
    onChangeDayInput,
    betweenInputActive,
    fromValue,
    fromCO2Value,
    toCO2Value,
    onHideToCalander,
    chart,
    onShowToCalander,
  }: any = useHighcharts(props)
  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <div className="chart card py-0">
      {/* AHU and Stillage Filter */}
      {withFilter && (
        <FGrid justify="between" align="start">
          <FCol lg={6} sm={12}>
            <FGrid align="center">
              <FText fs={3} fw="bold" style={{ marginRight: "90px", marginLeft: "10px" }}>
                AHU & Stillage
              </FText>
              <FCol fixed>
                <FSpace align="center">
                  <RadioButton
                    disabled={isLoading}
                    value={dayInputActive}
                    name="Day"
                    onChange={toggleInputs}
                    checked={dayInputActive}
                  />
                  <FText fs={4} fw="bold">
                    Day
                  </FText>
                </FSpace>
              </FCol>
              <FCol>
                <Calendar
                  className="calendar"
                  monthNavigator
                  yearNavigator
                  disabled={!dayInputActive || isLoading}
                  yearRange="2010:2022"
                  value={new Date(dayValue)}
                  onChange={onChangeDayInput}
                />
              </FCol>
            </FGrid>
          </FCol>

          <FCol lg={6} sm={12}>
            <FGrid align="start">
              <FCol fixed>
                <FSpace align="center">
                  <RadioButton
                    disabled={isLoading}
                    value={betweenInputActive}
                    name="Between"
                    onChange={toggleInputs}
                    checked={betweenInputActive}
                  />

                  <FText fs={4} fw="bold">
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
                        disabled={!betweenInputActive || isLoading}
                        yearRange="2010:2022"
                        value={new Date(fromValue)}
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
                        disabled={!betweenInputActive || isLoading}
                        yearRange="2010:2022"
                        value={new Date(toValue)}
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
      )}
      {/* CO2 Filter */}
      {withFilterCO2 && (
        <FGrid justify="between" align="start">
          <FCol lg={6} sm={12}>
            <FGrid align="center">
              <FText fs={3} fw="bold" style={{ marginRight: "90px", marginLeft: "10px" }}>
                CO2
              </FText>

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
              {/* <FCol fixed>
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
              </FCol> */}
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
                        yearRange="2010:2022"
                        value={fromCO2Value == undefined ? undefined : new Date(fromCO2Value)}
                        onChange={(el) => onChangeFromInput(el.value)}
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
                        yearRange="2010:2022"
                        value={toCO2Value == undefined ? undefined : new Date(toCO2Value)}
                        onChange={(el) => onChangeToInput(el.value)}
                        onShow={onShowToCalander}
                        onHide={onHideToCalander}
                      />
                    </FSpace>
                  </FCol>
                </FGrid>
              </FCol>
            </FGrid>
          </FCol>
        </FGrid>
      )}

      {chart}
      {start && end && (
        <FSpace className="start-end-chart">
          <FText fs={4}>{moment(start).format("LL")}</FText>
          <i className="pi pi-arrow-right"></i>

          <FText fs={4}>{moment(end).format("LL")}</FText>
        </FSpace>
      )}
    </div>
  )
}
