import QuickAction from "../quickAction/QuickAction"
import { PiCopySimpleBold } from "react-icons/pi";
import { MdOpenInNew } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

interface ILinkProps{
    Title:string,
    Url:string,
}

function Link(props:ILinkProps) {
  return (
    <div className="border border-start-0 border-end-0 border-bottom-0  mt-3">
        <div className="mx-3 d-flex justify-content-between p-2 align-items-center ">
            <div>
                <h5 className="h5 text-primary fw-bold">{props.Title}</h5>
                <p className="small text-link">{props.Url}</p>
            </div>
            <div className="d-flex gap-2">
                <QuickAction 
                    Action={() => {}} 
                    tooltip={"Copy"} 
                    image={
                        <PiCopySimpleBold className="text-secondary fs-5"/>
                    }
                />
                <QuickAction 
                    Action={() => {}} 
                    tooltip={"Open"} 
                    image={
                        <MdOpenInNew className="text-secondary fs-5"/>
                    }
                />
                <QuickAction 
                    Action={() => {}} 
                    tooltip={"Delete"} 
                    image={
                        <AiOutlineDelete className="text-secondary fs-5"/>
                    }
                />
            </div>
        </div>
    </div>
  )
}

export default Link