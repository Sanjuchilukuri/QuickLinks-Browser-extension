import UseLinks from "../../Hooks/UseLinks";
import { FaCloudDownloadAlt } from "react-icons/fa";

function QuickAccessBar() {

  const {filterLinks} = UseLinks();  

  return (
    <div className="mx-2 mt-2">
      <div className="border mt-2 d-flex p-2 rounded-3 ">
        <input
          type="search"
          className="bg-transparent border-0 text-secondary outline-0 flex-grow-1 me-2"
          name="search"
          placeholder="Search links"
          onChange={(e:any) => {filterLinks(e.target.value)}}
        />
        <button type="button" className="btn bg-secondary text-white fw-bold p-1" data-bs-toggle="modal" data-bs-target="#AddLinkModal">
          Add Link
        </button>
        <button type="button" title="Download All" className="btn ms-2 bg-secondary text-white fw-bold d-flex px-2 align-items-center">
          <FaCloudDownloadAlt className="fs-4"/>
        </button>
      </div>
    </div>
  );
}

export default QuickAccessBar;
