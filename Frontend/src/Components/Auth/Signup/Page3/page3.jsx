import { usePage } from "../../../../Contexts/Pagehandling";


export default function Page3(){
    const {pageNum,setPageNum,pageindex,setpageIndex}  = usePage()
    function nextPage(){
        setpageIndex(pageindex + 1);
        setPageNum((prev)=>{
            const newArr = [...prev];
            newArr[3] = true
            return newArr
        })
        console.log(pageNum,pageindex)
    }

    function prevPage(){
        setpageIndex(pageindex - 1);
        console.log(pageNum,pageindex);
    }

    return (
        <div id="page3-container">
            <p>Page 3</p>
            <button onClick={nextPage}>Next</button>
            <button onClick={prevPage}>Prev</button>
        </div>
    )
}