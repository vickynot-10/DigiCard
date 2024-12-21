import './loader.css'
function Loader({
    size = 50 , color = '#3498db' , borderSize = null , loaderMargin
})
{
    const loaderSize = Math.round(  size * 0.16)
    const borderSizeVar = borderSize !== null ? borderSize : loaderSize
    return (
        <div id="loader-container">
            <div className="loader"
            style={{
                ...({
                    height : `${size}px` ,
                    width : `${size}px` ,
                    margin : loaderMargin,
                    borderRadius: '50%',
                    borderWidth: `${borderSizeVar}px`  ,
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopColor: color,
                })
            }}
            
            ></div>
        </div>
    )
}

export default Loader