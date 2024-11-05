import { useState } from "react";
import { useData } from "../../hooks/useData";

const LayerUI = ({id, name}) => {
    const {changeInfo} = useData();
    const [open, setOpen] = useState(true);
    const [editName, setEditName] = useState(null);

    const changeName = () => {
        changeInfo(id, {name:editName});
        setEditName(null)
    }
    return (
        <div className="layerUI">
            <h3>
                {!editName?<p onClick={()=>setOpen(!open)}>{name||`Layer ${id}`}</p>:
                <input defaultValue={editName} onChange={(e)=>setEditName(e.target.value)} />}
                {!editName?<button onClick={()=>setEditName(name||'Layer')}>edit</button>:
                <><button onClick={()=>setEditName(null)}>back</button><button onClick={changeName}>save</button></>}
            </h3>
            {open&&<div>
                <label>
                    <p>Line color:</p>
                    <input />
                </label>
                <label>
                    <p>Line color:</p>
                    <input />
                </label>
            </div>}
        </div>
    )
}

export default LayerUI;