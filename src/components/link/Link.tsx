import QuickAction from "../quickAction/QuickAction"
import { PiCopySimpleBold } from "react-icons/pi";
import { MdOpenInNew } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import UseLinks from "../../Hooks/UseLinks";

interface ILinkProps{
    Id:string,
    Title:string,
    Url:string,
}

function Link(props:ILinkProps) {

  const {deleteLink} = UseLinks();
  
  const copyToClipboard = async () => {
      await navigator.clipboard.writeText(props.Url);
  };

  const openInNewTab = () => {
    let url = props.Url;  
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="border border-start-0 border-end-0 border-bottom-0  mt-1" >
        <div className="mx-3 d-flex justify-content-between p-1 align-items-center ">
            <div>
                <h5 className="h6 text-primary fw-bold">{props.Title}</h5>
                <p className="small text-link">{props.Url}</p>
            </div>
            <div className="d-flex gap-2">
                <QuickAction 
                    Action={() => {copyToClipboard()}} 
                    tooltip={"Copy"} 
                    image={
                        <PiCopySimpleBold className="text-secondary fs-6"/>
                    }
                />
                <QuickAction 
                    Action={() => {openInNewTab()}} 
                    tooltip={"Open"} 
                    image={
                        <MdOpenInNew className="text-secondary fs-6"/>
                    }
                />
                <QuickAction 
                    Action={() => {deleteLink(props.Id)}} 
                    tooltip={"Delete"} 
                    image={
                        <AiOutlineDelete className="text-secondary fs-6"/>
                    }
                />
            </div>
        </div>
    </div>
  )
}

export default Link