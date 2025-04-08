import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <div className=" position-absolute bottom-0 start-0 w-100 border border-start-0 border-end-0 border-bottom-0">
        <div className="d-flex justify-content-between mx-3">
            <p className="small text-secondary my-auto">Made with <FaHeart className="text-danger my-auto"/> SANJU</p>
            <a href="https://www.google.com" target="_blank">Github</a>
        </div>
    </div>
  )
}

export default Footer