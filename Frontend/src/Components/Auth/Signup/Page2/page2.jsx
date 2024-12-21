import { usePage } from "../../../../Contexts/Pagehandling";


export default function Page2(){
    const {pageNum,setPageNum,pageindex,setpageIndex}  = usePage()
    function nextPage(){
        setpageIndex(pageindex + 1);
        setPageNum((prev)=>{
            const newArr = [...prev];
            newArr[2] = true
            return newArr
        })
        console.log(pageNum,pageindex)
    }

    function prevPage(){
        setpageIndex(pageindex - 1);
        console.log(pageNum,pageindex)
    }
    return (
        <div id="page2-container">
            <p>Page 2</p>
            <button onClick={nextPage}>Next</button>
            <button onClick={prevPage}>prev</button>
        </div>
    )
}