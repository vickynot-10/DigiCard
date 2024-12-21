import "./selectbox.css";

import { useState, useRef, useEffect , Children,cloneElement,useCallback } from "react";


export function MenuItem({ value , children , onSelect,isSelected }){
   return (
    <button type="button" value={value} onClick={()=>onSelect(value)} className={
      isSelected ? 'active-dd-btn' : ''
    } > {children} </button>
   )
}


export function SelectBox({ selectBoxWidth = "200px", placeHolder = 'Place' , 
    bgColor = 'transparent',
    fontColor = 'rgba(0, 0, 0, 0.87)', maxHeightDropdown = '300px' ,
    selectBoxHeight = "50px" , children ,onChange , selectBoxFontSize = 'clamp(0.785rem,0.875rem,1rem)' }) {
  const selectRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [selectedValue,setSelectedValue] = useState("")



  const HandleChange = useCallback((value) => {
    onChange(value);
    setSelectedValue(value);   
    setOpen(false);
}, [onChange]);



  function openDropDown(e) {
    e.preventDefault();
    setOpen(!isOpen);
  }

  useEffect(() => {
    const handleClickAway = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, []);

  return (
    <div
    onChange={onChange}
      id="select-box-container"
      ref={selectRef}
      style={{
        ...{
            
          width: selectBoxWidth,
          height: selectBoxHeight,
        },
      }}
    >
      <button id="select-box" onClick={openDropDown} 
      style={{
        ...({
            backgroundColor : bgColor,
        })
      }}
      > 
        <span
        style={{
            ...({
                fontSize : selectBoxFontSize , color : fontColor
            })
        }}
        >  { (selectedValue === undefined || selectedValue === '' ) ?  placeHolder  : typeof(selectedValue) === 'string' ?
          selectedValue.split('|').splice(0,1).toString().replace(/_/g,' ').replace(/([A-Z])/g,' $1') : selectedValue
        }  </span>
       
        {isOpen ? (
          <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="3,10 6,5 10,10"
              style={{ fill: "rgba(0, 0, 0, 0.54)"  }}
            />
          </svg>
        ) : (
          <svg height="20" width="10" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="3,10 6,15 10,10"
              style={{ fill: "rgba(0, 0, 0, 0.54)"  }}
            />
          </svg>
        )}

      </button>
      {isOpen && (
        <div id="dropdown" style={{
            ...({
                maxHeight : maxHeightDropdown
            })
        }} >
        
            {
                Children.map(children,(child)=>{
                    if(child === undefined || child === null){
                        return
                    }
                 return cloneElement(child , {
                    onSelect : HandleChange ,
                    isSelected: child.props.value === selectedValue
                 } )
                })
            }
        </div>
      )}
    </div>
  );
}

