import { useRef, useState } from "react";

const Controls = () => {
    const [joystickActive, setJoystickActive] = useState(false);
    const joystickRef = useRef(null);
    const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

    const setKeyState = (key, state) => {
        let event = new KeyboardEvent(state?"keydown":"keyup", {
            bubbles: true,
            cancelable: true,
            charCode: 0,
            keyCode: 0,
            key: key,
            shiftKey: false,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            repeat: false,
            location: KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
        });
        joystickRef.current.dispatchEvent(event);
    };    

    const handleJump = () => {
        setKeyState("Space", true);
        setTimeout(() => setKeyState("Space", false), 200);
    };
    const handleJoystickMove = (e) => {
        if (!joystickRef.current) return;
    
        const rect = joystickRef.current.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
    
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), rect.width / 2);
    
        const normX = Math.cos(angle) * (distance / (rect.width / 2));
        const normY = Math.sin(angle) * (distance / (rect.height / 2));

        setJoystickPosition({
            x: normX * (rect.width / 2),
            y: normY * (rect.height / 2),
        });      
    
        setKeyState("ArrowUp", normY < -0.5);
        setKeyState("ArrowLeft", normX < -0.5);
        setKeyState("ArrowRight", normX > 0.5);
      };
    
      const stopJoystick = () => {
        setJoystickActive(false);
        setJoystickPosition({ x: 0, y: 0 }); 
        setKeyState("ArrowUp", false);
        setKeyState("ArrowLeft", false);
        setKeyState("ArrowRight", false);
      };
    

    return (
        <div className="controls">
            <div className="controls_wasd"
                ref={joystickRef}
                onTouchStart={() => setJoystickActive(true)}
                onTouchMove={(e) => {
                    if (joystickActive) handleJoystickMove(e.touches[0]);
                }}
                onTouchEnd={stopJoystick}
            >
                <div style={{transform: `translate(calc(-50% + ${joystickPosition.x}px), calc(-50% + ${joystickPosition.y}px))`}} className="joystick"></div>
            </div>
            <button className="controls_jump" onTouchStart={handleJump}>Jump</button>
        </div>
    )
}

export default Controls;