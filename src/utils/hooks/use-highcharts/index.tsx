// import { Dispatch, SetStateAction, useState } from "react"

import moment from "moment"
import { useEffect, useMemo, useRef, useState } from "react"
import { chart_options, linesColors, loadingHtml, timeout } from "src/constants"
import { Notification } from "src/utils/ui/toast-message"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts/highstock"
import indicatorsAll from "highcharts/indicators/indicators-all"
import annotationsAdvanced from "highcharts/modules/annotations-advanced"
import priceIndicator from "highcharts/modules/price-indicator"
import fullScreen from "highcharts/modules/full-screen"
import stockTools from "highcharts/modules/stock-tools"
import { ChartDateFilter } from "src/core/interface"
import { useDispatch } from "react-redux"
import { FetchCO2ChartData } from "src/core/redux"
import HC_exporting from "highcharts/modules/exporting"

//import all features.
indicatorsAll(Highcharts)
annotationsAdvanced(Highcharts)
priceIndicator(Highcharts)
fullScreen(Highcharts)
stockTools(Highcharts)
let timeId: any = null

export const useHighcharts = (props: any): any => {
  const { onClearData, onFetchData, onFetchNewLegend, initialKey, datasets, status } = props
  //Fetch data on component start.
  useEffect(() => {
    if (!timeId) fetchData(initialKey, true)
  }, [])

  //chart ref.
  const refContainer: any = useRef(null)
  //Show loading on component start.
  useEffect(() => {
    if (refContainer.current.chart)
      if (status === "data") {
        refContainer.current.chart.hideLoading()
      } else if (status === "loading") {
        refContainer.current.chart.showLoading(loadingHtml)
      }
  }, [status])

  // State Fetch CO2
  const [dayCO2InputActive, setDayCO2InputActive] = useState(true)
  const [weekCO2InputActive, setWeekCO2InputActive] = useState(false)
  const [mounthCO2InputActive, setMounthCO2InputActive] = useState(false)
  const [yearCO2InputActive, setYearCO2InputActive] = useState(false)

  // State From and To CO2
  const [fromCO2Value, setFromCO2Value] = useState<any>(null)
  const [toCO2Value, setToCO2Value] = useState<any>(null)

  //State
  //Day state.
  const [dayValue, setDayValue] = useState(moment().format("yyyy-MM-DD"))
  const [dayInputActive, setDayInputActive] = useState(true)
  const [editInToValue, setEditInToValue] = useState(false)
  //Between state.
  const [betweenInputActive, setBetweenInputActive] = useState(false)
  const [fromValue, setFromValue] = useState(moment().format())
  const [toValue, setToValue] = useState(moment().format())

  //Actions funtions.
  //Disable all series on re-fetch data.
  const clearVisiableChart = () => {
    refContainer.current.chart.series[0].setVisible(true)
    for (let i = 1; i < refContainer.current.chart.series.length; i++) {
      !datasets["co2Exausted"]
        ? refContainer.current.chart.series[i].setVisible(false)
        : refContainer.current.chart.series[i].setVisible(true)
    }
  }

  const dispatch = useDispatch()

  //Clear data and fetch.
  const clearAndFetch = (attributes: ChartDateFilter, initial?: boolean) => {
    //Clear data.
    onClearData()
    //Disable all series.
    clearVisiableChart()
    onFetchData(attributes)
    //Fetch data.
    if (dayCO2InputActive) {
      onFetchData(attributes)
      onFetchData({
        to: toCO2Value,
        from: fromCO2Value,
        key: initialKey,
        daily: true,
        day: false,
        weekly: false,
        monthly: false,
        yearly: false,
      })
    } else if (weekCO2InputActive) {
      onFetchData(attributes)
      // onFetchData({
      //   to: toCO2Value,
      //   from: fromCO2Value,
      //   key: initialKey,
      //   weekly: true,
      //   day: false,
      //   daily: false,
      //   monthly: false,
      //   yearly: false,
      // })
    } else if (yearCO2InputActive) {
      onFetchData(attributes)
      // onFetchData({
      //   to: toCO2Value,
      //   from: fromCO2Value,
      //   key: initialKey,
      //   monthly: false,
      //   day: false,
      //   daily: false,
      //   weekly: false,
      //   yearly: true,
      // })

      console.log(`year`)
    } else {
      onFetchData(attributes)
      // onFetchData({
      //   to: toCO2Value,
      //   from: fromCO2Value,
      //   key: initialKey,
      //   yearly: false,
      //   day: false,
      //   daily: false,
      //   weekly: false,
      //   monthly: true,
      // })

      console.log(`mounth`)
    }
  }
  //Toggle between.
  const toggleInputs = () => {
    setDayInputActive(!dayInputActive)
    setBetweenInputActive(!betweenInputActive)
  }
  const toggledayCO2Inputs = () => {
    setDayCO2InputActive(true)
    setWeekCO2InputActive(false)
    setMounthCO2InputActive(false)
    setYearCO2InputActive(false)

    clearAndFetch({
      from: fromCO2Value,
      to: toCO2Value,
      key: initialKey,
      day: false,
      daily: true,
      monthly: false,
      weekly: false,
      yearly: false,
    })

    // dispatch(
    //   FetchCO2ChartData({
    //     to: toCO2Value,
    //     from: fromCO2Value,
    //     key: initialKey,
    //     day: false,
    //     daily: true,
    //     weekly: false,
    //     monthly: false,
    //     yearly: false,
    //   })
    // )
  }
  // const toggleweekCO2Inputs = () => {
  //   setDayCO2InputActive(false)
  //   setWeekCO2InputActive(!weekCO2InputActive)
  //   setMounthCO2InputActive(false)
  //   setYearCO2InputActive(false)
  // }
  const togglemounthCO2Inputs = () => {
    setDayCO2InputActive(false)
    setWeekCO2InputActive(false)
    setMounthCO2InputActive(true)
    setYearCO2InputActive(false)

    clearAndFetch({
      from: fromCO2Value,
      to: toCO2Value,
      key: initialKey,
      day: false,
      daily: false,
      monthly: true,
      weekly: false,
      yearly: false,
    })
  }
  const toggleyearCO2Inputs = () => {
    setDayCO2InputActive(false)
    setWeekCO2InputActive(false)
    setMounthCO2InputActive(false)
    setYearCO2InputActive(true)

    clearAndFetch({
      from: fromCO2Value,
      to: toCO2Value,
      key: initialKey,
      day: false,
      daily: false,
      monthly: false,
      weekly: false,
      yearly: true,
    })
  }
  const onChangeDayInput = (event: any) => {
    //format value.
    let newDate = moment(event.value).format("yyyy-MM-DD")
    //get different between now and new value.
    let differentDays = moment().diff(newDate)
    //check if different in the bast.
    if (differentDays >= 0) {
      //update day value.
      setDayValue(newDate)
      //Set to value to next day.
      let toDate = moment(newDate).add(1, "days").format("yyyy-MM-DD")
      //Clear old data and fetch.
      clearAndFetch({
        from: newDate,
        to: toDate,
        key: initialKey,
        day: true,
        daily: false,
        monthly: false,
        weekly: false,
        yearly: false,
      })
    } else {
      //Show notification when time in future.
      Notification({ severity: "warn", summary: "Entered date is in future", detail: "" })
    }
  }
  const onChangeFromInput = (event: any) => {
    //format value.
    let newDate = moment(event)
    //get different between now and new value.
    let differentDays = moment().diff(newDate)
    //If there is old timeId
    if (timeId) {
      clearTimeout(timeId)
    }
    //check if different in the bast.
    if (differentDays >= 0) {
      //update  value.
      setFromValue(event)
      setFromCO2Value(event)
      //Set to value to next day.
      let toDate = moment(event).add(1, "days").format("yyyy-MM-DD HH:mm:ss")
      setToValue(toDate)
      setToCO2Value(toDate)
      //Wait 5 seconds and fetch
      timeId = setTimeout(() => {
        onFetchData({
          from: event,
          to: toDate,
          key: initialKey,
          day: false,
          daily: false,
          weekly: false,
          monthly: false,
          yearly: false,
        })

        clearAndFetch({
          from: event,
          to: toDate,
          key: initialKey,
          day: false,
          daily: false,
          weekly: false,
          monthly: false,
          yearly: false,
        })
      }, timeout)
    } else {
      //Show notification when time in future and set value to  current day.
      // let nowDate = moment().format()
      // setFromValue(nowDate)
      // timeId = setTimeout(() => {
      //   clearAndFetch({
      //     from: nowDate,
      //     to: toValue,
      //     key: initialKey,
      //     day: false,
      //   })
      // }, timeout)
      Notification({ severity: "warn", summary: "Entered date is in future", detail: "" })
    }
  }
  const onChangeToInput = (event: any) => {
    //format value.

    let newDate = moment(event)
    //get different between now and new value.
    let differentDays = moment().diff(newDate)
    //get different from and to value.
    let differentDaysFrom = moment(fromValue).diff(newDate)
    //Show notification
    if (differentDaysFrom > 0) {
      setToValue(event)

      Notification({ severity: "warn", summary: "Entered date is less than from date", detail: "" })
      return
    }

    let differentDaysFromCO2 = moment(fromCO2Value).diff(newDate)
    //Show notification CO2
    if (differentDaysFromCO2 > 0) {
      setToCO2Value(event)

      Notification({ severity: "warn", summary: "Entered date is less than from date", detail: "" })
      return
    }

    //clear and refetch
    if (differentDays >= 0) {
      console.log(`in`)
      setToValue(event)
      setToCO2Value(event)

      if (dayCO2InputActive) {
        onClearData()
        dispatch(
          FetchCO2ChartData({
            from: fromCO2Value,
            to: event,
            key: initialKey,
            day: false,
            daily: true,
            weekly: false,
            monthly: false,
            yearly: false,
          })
        )
      } else if (yearCO2InputActive) {
        onClearData()
        dispatch(
          FetchCO2ChartData({
            from: fromCO2Value,
            to: event,
            key: initialKey,
            day: false,
            daily: false,
            weekly: false,
            monthly: false,
            yearly: true,
          })
        )
      } else if (mounthCO2InputActive) {
        onClearData()
        dispatch(
          FetchCO2ChartData({
            from: fromCO2Value,
            to: event,
            key: initialKey,
            day: false,
            daily: false,
            weekly: false,
            monthly: true,
            yearly: false,
          })
        )
      } else {
        onClearData()
        dispatch(
          FetchCO2ChartData({
            from: fromCO2Value,
            to: event,
            key: initialKey,
            day: false,
            daily: false,
            weekly: true,
            monthly: false,
            yearly: false,
          })
        )
      }

      onFetchData({
        from: fromValue,
        to: event,
        key: initialKey,
        day: true,
        daily: false,
        weekly: false,
        monthly: false,
        yearly: false,
      })

      clearAndFetch({
        from: fromCO2Value,
        to: event,
        key: initialKey,
        day: false,
        daily: false,
        weekly: false,
        monthly: false,
        yearly: false,
      })
    } else {
      //set to today
      // let nowDate = moment().format()
      setToValue(event)
      setToCO2Value(event)
      // clearAndFetch({
      //   to: nowDate,
      //   from: fromValue,
      //   key: initialKey,
      //   day: false,
      // })
      //Show notification
      Notification({ severity: "warn", summary: "Entered date is in future", detail: "The Date set at today" })
    }
    //set false when finish edit
    setEditInToValue(true)
  }
  const fetchData = (key: string, newDate: boolean) => {
    //clear and fetch data and check if day or between
    let fromDate, toDate
    //Day or between
    if (dayInputActive) {
      fromDate = dayValue
      toDate = moment(dayValue).add(1, "days").format("yyyy-MM-DD")
      if (newDate) {
        clearAndFetch(
          { from: fromDate, to: toDate, key, day: newDate, daily: false, weekly: false, monthly: false, yearly: false },
          newDate
        )
      } else
        onFetchNewLegend({
          from: fromDate,
          to: toDate,
          key,
          day: true,
          daily: false,
          weekly: false,
          monthly: false,
          yearly: false,
        })
    }

    // else if (dayCO2InputActive) {
    //   fromDate = fromCO2Value
    //   toDate = toCO2Value
    //   if (newDate) {
    //     clearAndFetch({ from: fromDate, to: toDate, key, day: newDate, daily:true ,weekly:false ,monthly: false, yearly: false }, newDate)
    //   } else onFetchNewLegend({ from: fromDate, to: toDate, key, day: false, daily:true, weekly: false, monthly: false, yearly: false })
    // }
    // else if (weekCO2InputActive) {
    //   fromDate = fromCO2Value
    //   toDate = toCO2Value
    //   if (newDate) {
    //     clearAndFetch({ from: fromDate, to: toDate, key, day: newDate, week: false, month: false, year: false }, newDate)
    //   } else onFetchNewLegend({ from: fromDate, to: toDate, key, day: false, week: false, month: false, year: false })
    // }

    // else if (mounthCO2InputActive) {
    //   fromDate = fromCO2Value
    //   toDate = toCO2Value
    //   if (newDate) {
    //     clearAndFetch({ from: fromDate, to: toDate, key, day: newDate,daily:false , weekly: false, monthly: true, yearly: false }, newDate)
    //   } else onFetchNewLegend({ from: fromDate, to: toDate, key, day: false,daily:false , weekly: false, monthly: true, yearly: false })
    // } else if (yearCO2InputActive) {
    //   fromDate = fromCO2Value
    //   toDate = toCO2Value
    //   if (newDate) {
    //     clearAndFetch({ from: fromDate, to: toDate, key, day: newDate,daily:false , weekly: false, monthly: false, yearly: true }, newDate)
    //   } else onFetchNewLegend({ from: fromDate, to: toDate, key, day: false,daily:false , weekly: false, monthly: false, yearly: true })
    // }
    else {
      fromDate = fromValue
      toDate = toValue
      if (newDate) {
        clearAndFetch(
          { from: fromDate, to: toDate, key, day: newDate, daily: false, weekly: false, monthly: false, yearly: false },
          newDate
        )
      } else
        onFetchNewLegend({
          from: fromDate,
          to: toDate,
          key,
          day: false,
          daily: false,
          weekly: false,
          monthly: false,
          yearly: false,
        })
    }
  }

  //Add configration to chart
  const chart = useMemo(() => {
    const h_options = chart_options({
      series: Object.keys(datasets).map((key: any) => ({
        name: datasets["co2Exausted"]
          ? key.charAt(0).toUpperCase() + key.charAt(1).toUpperCase() + key.charAt(2) + " " + key.slice(3)
          : key,
        data: datasets[key],
        color: linesColors[key],
        label: "2323232323",
      })),
      load: function (value: any) {
        let chart: any = this
        chart.showLoading(loadingHtml)
        const series = value.target.series
        series.forEach((serie: any, index: number) => {
          if (index > 0) serie.hide()
        })
      },
      legendChart: !datasets["co2Exausted"]
        ? {
            enabled: true,
          }
        : {
            enabled: true,
            // layout: "vertical",
            // align: "right",
            // verticalAlign: "top",
            // x: -40,
            // y: -4,
            // floating: true,
            // borderWidth: 1,
            // backgroundColor: "#FFFFFF",
            // shadow: true,
          },
      typeChart: !datasets["co2Exausted"] ? "spline" : "column",
      formatChart: !datasets["co2Exausted"] ? "{value:%H:%M:%S}" : "",
      resoiutions: !datasets["co2Exausted"]
        ? [
            {
              type: "all",
              text: "All",
              dataGrouping: {
                enabled: false,
                forced: true,
              },
            },
            {
              type: "all",
              text: "Hours",
              dataGrouping: {
                approximation: "average",
                enabled: true,
                // forced: true,
                units: [["hour", [1]]],
              },
            },
            {
              type: "all",
              text: "Minutes",
              dataGrouping: {
                approximation: "average",
                enabled: true,
                // forced: true,
                units: [["minute", [1]]],
              },
            },
          ]
        : [
            // {
            //   type: "all",
            //   text: "All",
            //   dataGrouping: {
            //     enabled: true,
            //     forced: false,
            //   },
            // },
          ],
      legendItemClick: function (value: any) {
        // if (isLoading) return

        let visible = datasets["co2Exausted"] ? datasets : value.target.visible
        if (!visible) {
          let fieldName = value.target.userOptions.name

          if (datasets[fieldName].length === 0 && refContainer) refContainer.current.chart.showLoading(loadingHtml)
          fetchData(fieldName, false)
        }
        refContainer.current.chart.reflow()
        // return true
      },
    })

    Highcharts.setOptions({
      lang: {
        rangeSelectorZoom: "Resolution",
      },
    })
    return (
      <HighchartsReact
        ref={refContainer}
        constructorType={"stockChart"}
        highcharts={Highcharts}
        options={h_options}
      ></HighchartsReact>
    )
  }, [datasets])

  // ==================================================
  // const chartCO2 = useMemo(() => {
  //   const h_options_CO2 = chart_options_CO2({
  //     series: Object.keys(datasets).map((key: any) => ({
  //       name: key,
  //       data: datasets[key],
  //       color: linesColors[key],
  //     })),
  //     load: function (value: any) {
  //       let chartCO2: any = this
  //       chartCO2.showLoading(loadingHtml)
  //       const series = value.target.series
  //       series.forEach((serie: any, index: number) => {
  //         if (index > 0) serie.hide()
  //       })
  //     },
  //     legendItemClick: function (value: any) {
  //       // if (isLoading) return
  //       let visible = value.target.visible
  //       if (!visible) {
  //         let fieldName = value.target.userOptions.name
  //         if (datasets[fieldName].length === 0 && refContainer) refContainer.current.chartCO2.showLoading(loadingHtml)
  //         fetchData(fieldName, false)
  //       }
  //       refContainer.current.chartCO2.reflow()
  //       // return true
  //     },
  //   })
  //   Highcharts.setOptions({
  //     lang: {
  //       rangeSelectorZoom: "Resolution",
  //     },
  //   })
  //   return <HighchartsReact ref={refContainer} constructorType={"stockChart"} highcharts={Highcharts} options={h_options_CO2} />
  // }, [datasets])
  // ========================================================================
  const onHideToCalander = () => {
    if (!editInToValue) {
      timeId = setTimeout(() => {
        clearAndFetch({
          to: toValue,
          from: fromValue,
          key: initialKey,
          day: false,
          daily: false,
          weekly: false,
          monthly: false,
          yearly: false,
        })
      }, 3000)

      timeId = setTimeout(() => {
        clearAndFetch({
          to: toCO2Value,
          from: fromCO2Value,
          key: initialKey,
          day: false,
          daily: false,
          weekly: false,
          monthly: false,
          yearly: false,
        })
      }, 3000)
    } else {
      setEditInToValue(false)
    }
  }
  const onShowToCalander = () => {
    clearInterval(timeId)
  }

  return {
    onChangeToInput,
    onChangeFromInput,
    onChangeDayInput,
    toggleInputs,
    toggledayCO2Inputs,
    togglemounthCO2Inputs,
    toggleyearCO2Inputs,
    onShowToCalander,
    onHideToCalander,
    chart,
    // chartCO2,
    dayInputActive,
    dayCO2InputActive,
    weekCO2InputActive,
    mounthCO2InputActive,
    yearCO2InputActive,
    dayValue,
    fromValue,
    toValue,
    fromCO2Value,
    toCO2Value,
    editInToValue,
    betweenInputActive,
  }
}
