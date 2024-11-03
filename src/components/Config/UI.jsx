import { useState } from "react";
import { useConfigurator } from "../../hooks/useConfigurator";

const UI = () => {
  const {
    wheels, setWheels,
    lights, setLights,
    surfaceColors, surfaceColor, setSurfaceColor,
    insidesColors, insidesColor, setInsidesColor,
    mode, setMode
  } = useConfigurator();
  if (mode==='main'){ return (
    <div className='configurator'>
      <div className='configurator__section'>
        <div className='configurator__section__title'>Color</div>
        <div className='configurator__section__values'>
          {surfaceColors?.map((item, index) => (
            <div
              key={index}
              className={`item ${
                item.color === surfaceColor.color ? "item--active" : ""
              }`}
              onClick={() => setSurfaceColor(item)}
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
        <div className='configurator__section__title'>Wheels</div>
        <div className='configurator__section__values'>
          <div
            className={`item ${wheels === 1 ? "item--active" : ""}`}
            onClick={() => setWheels(1)}
          >
            <div className='item__label'>Type 1</div>
          </div>
          <div
            className={`item ${wheels === 2 ? "item--active" : ""}`}
            onClick={() => setWheels(2)}
          >
            <div className='item__label'>Type 2</div>
          </div>
        </div>
      </div>
      <div className='configurator__section'>
        <div className='configurator__section__title'>Lights</div>
        <div className='configurator__section__values'>
          <div
            className={`item ${lights ? "item--active" : ""}`}
            onClick={() => setLights(true)}
          >
            <div className='item__label'>On</div>
          </div>
          <div
            className={`item ${!lights ? "item--active" : ""}`}
            onClick={() => setLights(false)}
          >
            <div className='item__label'>Off</div>
          </div>
        </div>
      </div>
      <div className='configurator__section'>
        <a className='configurator__section__title' onClick={()=>setMode('inside')} style={{cursor:"pointer"}} >Interior <strong>&rarr;</strong></a>
      </div>
    </div>
  )} else return (
    <div className='configurator'>
      <div className='configurator__section'>
        <a className='configurator__section__title' onClick={()=>setMode('main')} style={{cursor:"pointer"}} ><strong>&larr;</strong> Back</a>
      </div>
      <div className='configurator__section'>
        <div className='configurator__section__title'>Color</div>
        <div className='configurator__section__values'>
        {insidesColors?.map((item, index) => (
            <div
              key={index}
              className={`item ${
                item.color === insidesColor.color ? "item--active" : ""
              }`}
              onClick={() => setInsidesColor(item)}
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
    </div>
  )
};

export default UI;
