import { FiSun } from "react-icons/fi";

function Header() {
  return (
    <div className="d-flex flex-column gap-2 mx-4">
        <div className="text-primary d-flex justify-content-between align-items-center">
            <h3 >Quick Links</h3>
            <span className="fs-3 cursor-pointer"><FiSun /></span>
        </div>
        <div>
            <p className="text-secondary">Save and manage your quick links.</p>
        </div>
    </div>
  )
}

export default Header