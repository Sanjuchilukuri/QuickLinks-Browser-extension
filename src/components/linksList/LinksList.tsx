import Link from "../link/Link"
import UseLinks from "../../Hooks/UseLinks";

function LinksList() {
  
  const {allLinks} = UseLinks();

  return (
    <div className="mt-4" style={{maxHeight:"400px", overflowY:"scroll"}}>
        {allLinks.map((item) => {
            return <Link Id={item.id!} Title={item.title} Url={item.link}/>
        })}
    </div>
  )
}

export default LinksList