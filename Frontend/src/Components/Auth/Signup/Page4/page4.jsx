import { usePage } from "../../../../Contexts/Pagehandling";


export default function Page4(){
    const {pageNum,setPageNum,pageindex,setpageIndex}  = usePage()
    function prevPage(){
        setpageIndex(pageindex - 1);
        console.log(pageNum,pageindex)
    }
    return (
        <div id="page4-container">
            <p>Page 4</p>
            <button onClick={prevPage}>prev</button>
            <button>Submit</button>
        </div>
    )
}