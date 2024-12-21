
import './modal.css';
import { useEffect } from 'react';
function Modal( {
    children, modalBoxStyle = {
        opacity: '1',
        borderRadius: '12px',
        position: 'fixed',
        display: 'flex',
        padding: '20px',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        width: '350px',
        height: '180px',
        backgroundColor: 'white',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '100'
      },
      AutoHideDuration,
    headerText,headerDivwidth = '80%', headerTextColor = 'black',
    modalContainerBgcolor = 'rgb(119, 111, 111)' ,modalContainerOpacity = '0.6' ,
    onClose, headerFontSize,
    modalZindex = '50' ,
    iconColor = 'black'} ){

        useEffect(() => {
            if(!AutoHideDuration || AutoHideDuration <= 0 || AutoHideDuration === '' || AutoHideDuration === ' ',
            AutoHideDuration === null || AutoHideDuration === undefined){
                return;
            }
            const timer = setTimeout(() => {
              onClose()
            }, AutoHideDuration);
            return () => clearTimeout(timer);
          }, [AutoHideDuration]);



    return (
        <><div id="modal-container" style={{
            ...({
                zIndex: modalZindex , backgroundColor : modalContainerBgcolor , opacity : modalContainerOpacity
            })
        }}></div>
        
        <div  style={modalBoxStyle}>
                <div id='modal-header-div'
                
                style={{
                    ...({
                        width : headerDivwidth 
                })
                }}
                >
                    <p
                        style={{
                            ...({
                                fontSize: headerFontSize , color : headerTextColor
                            })
                        }}
                    >  {headerText}  </p>
                    <div id="bg-iconbtn-modal" onClick={onClose}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke={iconColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>
                </div>
                {children}
                
            </div></>
        
    )
}

export default Modal