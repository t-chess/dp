import { useState } from "react";

const LayerUI = ({id, name}) => {
    const [open, setOpen] = useState(true);
    const [editName, setEditName] = useState(null);

    const changeName = () => {

    }
    return (
        <div className="layerUI">
            <h3>
                {!editName?<p onClick={()=>setOpen(!open)}>{name||`Layer ${id}`}</p>:
                <input defaultValue={editName} />}
                {!editName?<button onClick={()=>setEditName(name||'Layer')}>edit</button>:
                <><button onClick={()=>setEditName(null)}>back</button><button onClick={changeName}>save</button></>}
            </h3>
            {open&&<div>
                <label>Line color:</label>
            </div>}
        </div>
    )
}

export default LayerUI;