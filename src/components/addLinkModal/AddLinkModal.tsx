import { useRef, useState } from "react"
import { ILinkItem } from "../../interfaces/ILinkItem"
import UseAuth from "../../Hooks/UseAuth";
import UseLinks from "../../Hooks/UseLinks";

type IErrors = {
  [K in keyof ILinkItem]: boolean;
};


function AddLinkModal() {
  
  const {addLink} = UseLinks();
  const formCloseBtnRef = useRef<HTMLButtonElement>(null);
  const {user} = UseAuth();
  const [linkItem, setLinkItem] = useState({userEmail:user.userEmail} as ILinkItem);
  const [errors, setErrors] = useState({} as IErrors);

  const handleTitleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkItem(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleLinkUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkItem(prev => ({
      ...prev,
      link: e.target.value
    }));
  };

  const handleSave = () => {
    if( validateData() )
    {
      // alert(JSON.stringify(linkItem, null, 2));
      addLink(linkItem);
      setLinkItem({} as ILinkItem);
      formCloseBtnRef.current?.click();
    }
  }

  const validateData = (): boolean => {
    let isValid = true;
    const newErrors: IErrors = {
      title: false,
      link: false,
      userEmail:false
    };

    if (!linkItem.title || linkItem.title.trim() === "") {
      newErrors.title = true;
      isValid = false;
    }

    if (!linkItem.link || linkItem.link.trim() === "") {
      newErrors.link = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  return (
    <div className="position-absolute ">
      <div className="modal fade w-100 px-2" id="AddLinkModal" tabIndex={-1} aria-labelledby="AddLinkModalLabel" aria-hidden="true">
        
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <div className="modal-dialog border rounded-2" style={{width:"400px"}}>
          
            <div className="modal-content bg-primary">
          
              <div className="modal-header p-2 d-flex justify-content-between ">
                <h1 className="modal-title fs-5 text-primary" id="exampleModalLabel">Add Link</h1>
                <h1 className="modal-title fs-5 text-primary cursor-pointer " id="exampleModalLabel" data-bs-dismiss="modal" aria-label="Close">X</h1>
              </div>
          
              <div className="modal-body px-2 d-flex flex-column">

                <label htmlFor="title" className="text-primary">
                  Title 
                  <span className="text-danger">*</span>
                  { errors.title &&
                    <span className="small text-danger fw-bold">This field is Required</span>
                  }
                </label>
                <input 
                  type="text" 
                  name="title"
                  id="title" 
                  className="bg-transparent text-primary p-1 border-start-0 border-end-0 border-top-0  outline-0"
                  value={linkItem.title}
                  onChange={handleTitleUpdate}
                />
                
                <label htmlFor="link" className="text-primary">
                  Link 
                  <span className="text-danger">*</span>
                  { errors.link &&
                    <span className="small text-danger fw-bold">This field is Required</span>
                  }
                </label>
                <input 
                  type="text"
                  name="link" 
                  id="link" 
                  className="bg-transparent p-1 text-primary border-start-0 border-end-0 border-top-0  outline-0" 
                  value={linkItem.link}
                  onChange={handleLinkUpdate}
                />

              </div>
          
              <div className="modal-footer py-2 d-flex gap-2 px-2">
                <button type="button" className="btn btn-secondary p-1" ref={formCloseBtnRef} data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary p-1 px-2" onClick={handleSave}>Save</button>
              </div>
          
            </div>
          
          </div>
        </div>
      
      </div>
    
    </div>
  )
}

export default AddLinkModal