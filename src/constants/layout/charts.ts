// import { backgroundColor } from "."

export const chart_options = ({ legendItemClick, legendChart, load, series, typeChart, formatChart, resoiutions }: any) => ({
  chart: {
    type: typeChart,
    zoomType: "xx",

    // zoomBySingleTouch: true,

    height: 370,
    // margin: "25px 0 0 0",
    events: {
      load: load,
    },
    animation: false,
  },
  xAxis: {
    type: "datetime",
    labels: {
      format: formatChart,
    },
    zoomEnabled: true,
  },


  // Resoulations
  rangeSelector: {
    allButtonsEnabled: true,
    buttonTheme: {
      // styles for the buttons
      // fill: "none",
      // stroke: "none",
      // "stroke-width": 2,
      width: 50,
      r: 9,
      style: {
        // color: primaryColor,
        fontWeight: "bold",
      },
      className: "f-text-primary",
      states: {
        hover: {},
        select: {
          fill: "#001F3F",
          style: {
            color: "white",
          },
        },
      },
    },

    buttons: resoiutions,
    // selected: 1,
    enabled: true,

    inputEnabled: false,
  },

  boost: {
    useGPUTranslations: true,
  },
  legend: legendChart,
  plotOptions: {
    spline: {
      lineWidth: 2,
      states: {
        hover: {
          // lineWidth: 2,
          enabled: false,
        },
      },
      // to define point in chart
      marker: {
        enabled: false,
      },
    },
    series: {
      stacking: 'normal',
      animation: false,
      events: {
        legendItemClick: legendItemClick,
      },
      dataGrouping: {
        enabled: false,
      },
    },
  },
  // rangeSelector: {
  //   enabled: false,
  //   inputEnabled: false,
  // },
  global: {
    useUTC: false,
  },

  tooltip: {
    outside: true,
    split: false,
    shared: true,
    useHTML: true,
    pointFormat:
      '<p style="font-size:18px;margin:0px;padding-top:1px;padding-bottom:1px;color:{series.color};">{series.name} <strong>{point.y}</strong></p>',
    valueDecimals: 2,
    borderWidth: 0,
    style: {
      width: "320px",
      padding: "0px",
    },
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  scrollbar: {
    barBackgroundColor: "lightGray",
    barBorderRadius: 2,
    barBorderWidth: 0,
    buttonBackgroundColor: "lightGray",
    buttonBorderWidth: 0,
    buttonBorderRadius: 2,
    trackBackgroundColor: "none",
    trackBorderWidth: 1,
    trackBorderRadius: 8,
    trackBorderColor: "#CCC",
  },

  series: series,
})

export const reportChart_options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 4,
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    zoom: {
      pan: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {


    x: {
      display: false,
    },
    y: {
      display: false,
      suggestedMin: 0,
      suggestedMax: 50,
    },
  },
}
export const loadingHtml: string =
  '<p style="font-size: 40px; font-weight: bold; animation-iteration-count: infinite; animation-name: loading; animation-duration: 1.2s;">Loading...</p>'

export const linesColors: any = {
  co2Level: "#02BC77",
  o2level: "#4791FF",
  pressure: "#C56DC5",
  humidity: "#b86464",
  inletTemperature: "#FFD60A",
  controlTemperature: "#9f9f9f",
  heaterTemperatureSetpoint: "#947b01",
  humiditySetpoint: "#9fc5e8",
  controlTemperatureSetpoint: "#E83221",
  co2Absorbed: "#3cb371",
  co2Exausted: "#b35e45",
  co2Leaked: "#3c3c3c",
}

export const timeout = 5000
