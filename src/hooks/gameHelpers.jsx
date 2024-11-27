export const getRandomPositions = (count, radius, fixedY = false) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2; 
        const distance = Math.random() * radius; 
        const x = Math.cos(angle) * distance; 
        const z = Math.sin(angle) * distance;
        const y = fixedY ? fixedY : Math.random() + 0.5;
        positions.push([x, y, z]);
    }
    return positions;
}
  
export const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] }
];


export const PLAYER_GROUP = 0x1;
export const BUSHES_GROUP = 0x2;
export const DEFAULT_MASK = 0xffff;