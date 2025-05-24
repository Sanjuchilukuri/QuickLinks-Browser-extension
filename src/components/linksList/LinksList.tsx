import Link from "../link/Link"
import UseLinks from "../../Hooks/UseLinks";

function LinksList() {
  
  const {allLinks} = UseLinks();

  return (
    <div className="my-2 w-100" style={{overflowY:"scroll"}}>
        {allLinks.map((item) => {
            return <Link Id={item.id!} Title={item.title} Url={item.link}/>
        })}
    </div>
  )
}

export default LinksList