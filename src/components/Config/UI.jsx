import { useState } from "react";
import { useConfigurator } from "../../hooks/useConfigurator";

const UI = () => {
  const {
    mainColors, mainColor, setMainColor,
    stripesColors, stripesColor, setStripesColor,
    seats,seat,setSeat,
    mode, setMode
  } = useConfigurator();

  const [open, setOpen] = useState(window.innerWidth>1000);

  return (
    <div className={'configurator '+(open?'':'hidden')}>
      {window.innerWidth<1000&&<button className="mobileBtn" onClick={()=>{setOpen(!open)}}>
        {open?"CLOSE":"CONFIGURE"}
      </button>}
      {mode!=='inside'?<>
        <div className='configurator__section'>
          <div className='configurator__section__title'>Color 1</div>
          <div className='configurator__section__values'>
            {mainColors?.map((item, index) => (
              <div
                key={index}
                className={`item ${
                  item.color === mainColor.color ? "item--active" : ""
                }`}
                onClick={() => setMainColor(item)}
              >
                <div
                  className='item__dot'
                  style={{ backgroundColor: item.color }}
                />
                <div className='item__label'>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='configurator__section'>
          <div className='configurator__section__title'>Color 2</div>
          <div className='configurator__section__values'>
            {stripesColors?.map((item, index) => (
              <div
                key={index}
                className={`item ${
                  item.color === stripesColor.color ? "item--active" : ""
                }`}
                onClick={() => setStripesColor(item)}
              >
                <div
                  className='item__dot'
                  style={{ backgroundColor: item.color }}
                />
                <div className='item__label'>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='configurator__section'>
          <a className='configurator__section__title' onClick={()=>setMode('inside')} style={{cursor:"pointer"}} >Interior <strong>&rarr;</strong></a>
        </div>
      </>:<>
        <div className='configurator__section'>
          <a className='configurator__section__title' onClick={()=>setMode('main')} style={{cursor:"pointer"}} ><strong>&larr;</strong> Back</a>
        </div>
        <div className='configurator__section'>
          <div className='configurator__section__title'>Material</div>
          <div className='configurator__section__values'>
          {seats?.map((item, index) => (
              <div
                key={index}
                className={`item ${
                  seat === item.name ? "item--active" : ""
                }`}
                onClick={() => setSeat(item.name)}
              >
                <div
                  className='item__dot'
                  style={{ backgroundColor: item.color }}
                />
                <div className='item__label'>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </>}
    </div>
  )
}

export default UI;
