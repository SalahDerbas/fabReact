import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FCol, FFormBoard, FGrid } from "src/components"

import { ColumnType } from "src/components/f-table/types"
import { FetchBlockTypesAsync } from "src/core/redux"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/core/redux/store"
import { InsertBoardAsync, UpdateBoardAsync } from "src/core/redux/board"
// import { Recipe } from "src/core/interface"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"

interface props {}
export const AddBoard: React.FC<props> = () => {
  const dispatch = useDispatch()
  const { board } = useSelector((state: RootState) => state.Boards)
  const { blockTypes } = useSelector((state: RootState) => state.BlocksType)

  const { board_id }: any = useParams()
  // const [recipe, setrecipe] = useState<Recipe[]>(board_id && board?.recipe ? board.recipe : [])
  //const disabledInput = <InputText style={inputDisabledStyle} disabled />
  useEffect(() => {
    dispatch(FetchBlockTypesAsync())
  }, [])
  const onSubmitForm = (formBoard: any) => {
    if (board_id)
      dispatch(
        UpdateBoardAsync(
          {
            ...formBoard,
            // recipe: recipe,
          },
          board_id
        )
      )
    else {
      dispatch(
        InsertBoardAsync({
          ...formBoard,
          // recipe: recipe,
        })
      )
    }
  }
  const disabledInput = <InputText className="p-input-table" disabled />

  const cols: ColumnType[] = [
    {
      field: "blockType",
      header: "Block Type",
      type: "select",
      options: blockTypes,
      optionName: "type",
      body: (rec: any) => {
        return rec?.blockType?.type === "" ? <Dropdown className="p-input-table" disabled /> : rec?.blockType?.type
      },
    },

    {
      field: "board_capacity",
      header: "Board Capacity",
      type: "number",
      body: (rec: any) => (rec?.board_capacity === 0 ? disabledInput : rec?.board_capacity ?? ""),
    },
    {
      field: "empty_weight",
      header: "Empty Weight",
      type: "number",
      body: (rec: any) => (rec?.empty_weight === 0 ? disabledInput : `${rec?.empty_weight}KG` ?? ""),
    },
    {
      field: "full_weight",
      header: "Full Weight",
      type: "number",
      body: (rec: any) => (rec?.full_weight === 0 ? disabledInput : `${rec?.full_weight}KG` ?? ""),
    },
  ]
  /***************************************************************/
  /****************   table **************************************/
  const table = {
    dataKey: "id",
    editMode: "row",
    columns: cols,
    // value: board_id && board?.recipe ? board.recipe : [],
    value: [],
    onUpdateData: (data: any) => {
      // setrecipe(data)
    },
    rows: 3,
    initialRow: {
      blockType: { type: "" },
      board_capacity: 0,
      empty_weight: 0,
      full_weight: 0,
    },
    columnResizeMode: "fit",
  }
  return (
    <FGrid>
      <FCol lg={12} sm={12}>
        <FGrid style={{ height: "647px" }}>
          <FCol span={12} xl={12} lg={12}>
            <FFormBoard
              onSubmit={onSubmitForm}
              submitLable={"Edit"}
              initialInputValues={board_id ? board : null}
              table={table as any}
            />
          </FCol>
        </FGrid>
      </FCol>
    </FGrid>
  )
}
