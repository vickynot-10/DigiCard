import { useContext,createContext, useState } from "react";

const PageContext = createContext();

export const PageContextProvider = ({children}) =>{
    const [pageNum,setPageNum] = useState([true,false,false,false]);
    const [pageindex,setpageIndex] = useState(0);
    return (
        <PageContext.Provider value={{pageNum , setPageNum, pageindex,setpageIndex }} >
           {children}
        </PageContext.Provider>
    )
}

export const usePage =()=> useContext(PageContext)