import UseLinks from "../../Hooks/UseLinks";

function QuickAccessBar() {

  const {filterLinks} = UseLinks();  

  return (
    <div className="border mt-2 d-flex p-2 rounded-3 mx-4">
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
    </div>
  );
}

export default QuickAccessBar;
