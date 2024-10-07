import React, { useEffect } from "react"
import { RootState } from "src/core/redux/store"
import { InsertBlockTypeAsync, DeleteBlockTypeAsync, UpdateBlockTypeAsync, ShowBlockTypeAsync } from "src/core/redux"
import { useDispatch, useSelector } from "react-redux"
import { FFormDefinition, FInputFormProps, FPaper } from "src/components"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { FLoadingData } from "src/components/f-loading-data"
import { BlockType } from "src/core/interface"

interface props {
  action?: Function
  keepOpen?: boolean
  resetFrom?: boolean
}

export const AddBlockType: React.FC<props> = () => {
  //Hooks
  const dispatch = useDispatch()
  let history = useHistory()

  const { blockType, status } = useSelector((state: RootState) => state.BlocksType)
  const { blockType_id }: any = useParams()

  useEffect(() => {
    if (blockType_id) dispatch(ShowBlockTypeAsync(blockType_id))
  }, [])

  //Events
  const onSubmitForm = (formBlockType: BlockType) => {
    if (blockType_id) dispatch(UpdateBlockTypeAsync(formBlockType, blockType_id ?? ""))
    else {
      dispatch(InsertBlockTypeAsync(formBlockType))
    }
    history.push("/definitions/block-type")
  }
  // Actions
  const onBack = () => history.push("/definitions/block-type")
  const onDelete = () => {
    dispatch(DeleteBlockTypeAsync(blockType_id ?? ""))
    history.push("/definitions/block-type")
  }

  //Inputs properties
  const inputs: FInputFormProps[] = [
    {
      type: "text",
      name: "type",
      label: "Type",
      placeholder: "Type",
      validate: { required: true },
    },
    {
      type: "text",
      name: "specs",
      label: "Specs",

      placeholder: "Specs",
      validate: {
        required: true,
      },
    },
    {
      type: "text",
      name: "note",
      label: "Note",
      placeholder: "Note",
      validate: {
        required: true,
      },
    },
  ]

  return (
    <FPaper>
      {/*Loading based on status*/}
      <FLoadingData status={status}>
        {/*Loading based on status*/}
        <FFormDefinition
          inputs={inputs}
          onSubmit={onSubmitForm}
          initialInputValues={blockType_id ? blockType : null}
          deleteButton={blockType_id}
          onDelete={onDelete}
          onBack={onBack}
          fieldsetInformation={blockType_id ? blockType : null}
        />
      </FLoadingData>
    </FPaper>
  )
}
