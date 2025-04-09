import { useEffect, useState } from "react";
import { ILinkItem } from "../../interfaces/ILinkItem"
import { getAllLinks } from "../../services/linkServices"
import Link from "../link/Link"

function LinksList() {
  
  const [data, setData] = useState<ILinkItem[]>([]);
  
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const links = await getAllLinks();
        if (isMounted) setData(links);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);
  

//   const data:ILinkItem[] = [
//     {
//         id:"1",
//         title:"wsqsw",
//         link:"lllkk"
//     }
//   ] 

  return (
    <div className="mt-4" style={{maxHeight:"400px", overflowY:"scroll"}}>
        {data.map((item) => {
            return <Link Id={item.id!} Title={item.title} Url={item.link}/>
        })}
    </div>
  )
}

export default LinksList