import { ReactNode } from "react"

interface IQuickActionProps{
    Action:Function,
    tooltip:string,
    image:ReactNode
}

function QuickAction(props:IQuickActionProps) {
  return (
    <div className="border rounded-2 d-flex align-items-center p-1 cursor-pointer" title={props.tooltip} onClick={() => props.Action()}>
        {props.image}
    </div>
  )
}

export default QuickAction