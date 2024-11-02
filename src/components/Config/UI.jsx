import { useState } from "react";
import { useConfigurator } from "../../hooks/useConfigurator";

const UI = () => {
  const {
    material,
    setMaterial,
    lights,
    setLights,
    chairColors,
    chairColor,
    setChairColor,
    cushionColors,
    cushionColor,
    setCushionColor,
  } = useConfigurator();
  return (
    <div className='configurator'>
      <div className='configurator__section'>
        <div className='configurator__section__title'>Type</div>
        <div className='configurator__section__values'>
          <div
            className={`item ${material === "leather" ? "item--active" : ""}`}
            onClick={() => setMaterial("leather")}
          >
            <div className='item__label'>Type 1</div>
          </div>
          <div
            className={`item ${material === "fabric" ? "item--active" : ""}`}
            onClick={() => setMaterial("fabric")}
          >
            <div className='item__label'>Type 2</div>
          </div>
        </div>
      </div>
      <div className='configurator__section'>
        <div className='configurator__section__title'>Color</div>
        <div className='configurator__section__values'>
          {chairColors?.map((item, index) => (
            <div
              key={index}
              className={`item ${
                item.color === chairColor.color ? "item--active" : ""
              }`}
              onClick={() => setChairColor(item)}
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
      {/* <div className='configurator__section'>
        <div className='configurator__section__title'>Cushion color</div>
        <div className='configurator__section__values'>
          {cushionColors?.map((item, index) => (
            <div
              key={index}
              className={`item ${
                item.color === cushionColor.color ? "item--active" : ""
              }`}
              onClick={() => setCushionColor(item)}
            >
              <div
                className='item__dot'
                style={{ backgroundColor: item.color }}
              />
              <div className='item__label'>{item.name}</div>
            </div>
          ))}
        </div>
      </div> */}
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
    </div>
  );
};

export default UI;
