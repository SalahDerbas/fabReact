import React, { useState } from "react"
import { FButton, FCol, FDialog, FGrid, FText } from ".."
import { InputTextarea } from "primereact/inputtextarea"
import { Notification } from "src/utils/ui/toast-message"
import { FNote } from "../f-note"
import { Toolbar } from "primereact/toolbar"
interface props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  items: any[]
  onSaveNote: (note: any) => void
}

export const FInsertList: React.FC<props> = ({ items, onSaveNote, ...rest }) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState("")

  /*------------------------------|| ACTIONS ||------------------------------------------------*/
  const onSave = () => {
    if (value === "") {
      Notification({ summary: "Please Add a note", severity: "warn" })
    } else {
      onSaveNote(value)
      setOpen(false)
    }
  }

  const titleTabView = (
    <>
      <FText fs={4} fw="bold">
        Note
      </FText>
    </>
  )

  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <div className="insert-list" {...rest}>
      <FDialog modal position="right" visible={open} onHide={() => setOpen(false)} header="Add New Note">
        <InputTextarea
          placeholder="Write a new note"
          className="text-area w-full"
          rows={5}
          cols={30}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <FGrid justify="end">
          <FButton bg="primary" onClick={onSave} label="Add" />
        </FGrid>
      </FDialog>

      {/* <FGrid className="h-full"> */}
      <Toolbar left={titleTabView} />
      {/* <FCol span={12}> */}
      <FGrid className="insert-list-container">
        {items.map((item, index) => (
          <FCol key={index} span={12}>
            <FNote note={item.note} date={item.createdDate} userName={item.createdByUser} />
          </FCol>
        ))}
      </FGrid>
      {/* </FCol> */}
      {/* <FCol span={12}> */}
      <FButton onClick={() => setOpen(true)} bg="primary" style={{ width: "255px" }}>
        New Note
      </FButton>
      {/* </FCol> */}
      {/* </FGrid> */}
    </div>
  )
}
