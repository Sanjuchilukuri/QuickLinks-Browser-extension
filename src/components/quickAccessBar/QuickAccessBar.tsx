// import { IoSearch } from "react-icons/io5";

function QuickAccessBar() {
  return (
    <div className="border mt-5 d-flex p-2 rounded-3 mx-4">
      {/* <span className="text-secondary fs-4 position-absolute"><IoSearch/></span> */}
      <input
        type="search"
        className="bg-transparent border-0 text-secondary outline-0 flex-grow-1 me-2"
        name="search"
        placeholder="Search links"
      />
      <button type="button" className="btn bg-secondary text-white fw-bold p-2" data-bs-toggle="modal" data-bs-target="#AddLinkModal">
        Add Link
      </button>
    </div>
  );
}

export default QuickAccessBar;
