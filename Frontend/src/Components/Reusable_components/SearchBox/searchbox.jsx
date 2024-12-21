import "./searchbox.css";
import { useState } from "react";

function SearchHeader({
  filterBoxMenuHeader = 'Title',
  filterBoxChildBtns = ['val1','val2'],
  onChange,
  reverseFn,
  debounceTime = 300,
  onClickFn,
  disabledDel = true,
  deleteFn,
  deleteIcon = true,
  ReverseIcon = true,
  FilterIcon = true,
}) {
  const [debounceTimer, setDebouncerTimer] = useState(null);
  const [isReverse, setReverse] = useState(false);
  const [showFilterBox, setFilterBox] = useState(false);


  function SelectBtnvalue(val){
    onClickFn(val)
  }

  function searchDetails(e) {
    const value = e.target.value;
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const newTimer = setTimeout(() => {
      onChange(value);
    }, debounceTime);

    setDebouncerTimer(newTimer);
  }

  return (
    <>
      <div id="input-div-contact">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
        >
          <path
            fill="#637381"
            d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
          />
        </svg>

        <input type="text" placeholder="Search" onChange={searchDetails} />
      </div>

      <div id="filter-delete-div">
        {deleteIcon && (
          <button id="del-btn-search" disabled={disabledDel} onClick={deleteFn}>
            <svg fill="#FF5630" width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877"></path>
              <path
                fillRule="evenodd"
                d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5s-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886m-1.35-9.811c-.04-.434-.408-.75-.82-.707c-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707c.413-.043.713-.43.672-.864zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707c-.413-.043-.713-.43-.672-.864l.5-5.263c.04-.434.409-.75.82-.707"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        )}

        {ReverseIcon && (
          <button
            id="rev-btn-search"
            onClick={() => {
              setReverse(!isReverse);
              if (reverseFn) {
                reverseFn();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="24"
              height="24"
            >
              {isReverse ? (
                <g transform="rotate(180 32 32)">
                  <path
                    d="M32 48V16"
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M24 24l8-8 8 8"
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              ) : (
                <>
                  <path
                    d="M32 48V16"
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M24 24l8-8 8 8"
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}
            </svg>
          </button>
        )}

        {FilterIcon && (
          <div id="filtericon-div">
          {
            showFilterBox && (
              <div className="filter-display-box">
                <p> {filterBoxMenuHeader} </p>
                {
                  filterBoxChildBtns.length > 0 && (
                    filterBoxChildBtns.map((item,ind)=>{
                      return <button key={ind} onClick={()=>SelectBtnvalue(item)} > {item.replace(/_/g,' ')} </button>
                    })
                  )
                }
              </div>
            )
          }          
          
          <button className="svg-filter-btn" onClick={()=>{
            setFilterBox(!showFilterBox) }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M11 18h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1m4 6h10c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1"
              ></path>
            </svg>
          </button>

          </div>

        )}
      </div>
    </>
  );
}

export default SearchHeader;
