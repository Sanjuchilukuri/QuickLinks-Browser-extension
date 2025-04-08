import Link from "../link/Link"

function LinksList() {
  
  const data = [
    {
        title:"Google",
        url:"https://www.google.com"
    },
    {
        title:"ChatGPT",
        url:"https://www.chatgpt.com"
    },
    {
        title:"StackOverflow",
        url:"https://www.stackoverflow.com"
    },
    {
        title:"Google",
        url:"https://www.google.com"
    },
  ]

  return (
    <div className="mt-4">
        {data.map((item) => {
            return <Link Title={item.title} Url={item.url}/>
        })}
    </div>
  )
}

export default LinksList