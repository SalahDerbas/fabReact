import React, { useMemo } from "react"
import { Chart } from "primereact/chart"
import { reportChart_options } from "src/constants"
import { FCol, FGrid, FSpace, FText } from "src/components"
import { getRandomColor } from "src/utils/helpers/get-random-color"
interface props {
  icon: string
  name: string
  title: number
  subtitle: number
  dataReport: any[]
  label: string[]
  labeldatasets: string
}

export const Report: React.FC<props> = ({ icon, name, title, subtitle, dataReport, label, labeldatasets }) => {
  const randomColor = useMemo(() => getRandomColor(), [])
  const dataReports = useMemo(() => dataReport, [dataReport])

  return (
    <div className="report">
      <FGrid>
        {/* header */}
        <div className="pl-3 pt-2 w-6rem h-10rem">
          <FSpace direction="vertical">
            <FCol span={12} className="p-d-flex">
              <i className={`pi ${icon} p-mr-2`} />
              <FText fs={3} fw="bold">
                {name}
              </FText>
            </FCol>

            <FCol span={12} className="p-d-flex p-ai-center p-jc-between" style={{ width: "100%" }}>
              <FSpace direction="vertical" gap={1}>
                <FText fs={2}> All : {title}</FText>
                <FText> Sum : {subtitle} </FText>
              </FSpace>
            </FCol>
          </FSpace>
        </div>

        <FCol span={12}>
          <div>
            <Chart
              type="line"
              data={{
                labels: label,
                datasets: [
                  {
                    fill: "start",
                    data: dataReports,
                    label: labeldatasets,
                    borderColor: randomColor,
                    backgroundColor: `${randomColor}40`,
                  },
                ],
              }}
              options={reportChart_options}
            />
          </div>
        </FCol>
      </FGrid>
    </div>
  )
}
