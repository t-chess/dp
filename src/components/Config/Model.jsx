/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 mai.glb --transform -j 
Files: mai.glb [1.09MB] > C:\Users\Tatiana\Desktop\UNI\DP\dp\mai-transformed.glb [172.8KB] (84%)
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Euler, LoopOnce, Matrix4, MeshPhysicalMaterial, MeshStandardMaterial, Quaternion, RepeatWrapping, TextureLoader, Vector3 } from 'three'
import { useConfigurator } from '../../hooks/useConfigurator';
import { useLoader } from '@react-three/fiber';

const rubberMaterial = new MeshStandardMaterial({ color: 0x222222, roughness: 0.9, metalness:0.7 });
const glassMaterial = new MeshPhysicalMaterial({color: 0x222222,metalness: .9,roughness: .1,envMapIntensity: 0.9,clearcoat: 1,transparent: true,opacity: .6,reflectivity: 0.25,ior: 0.9,})
const consoleMaterial = new MeshStandardMaterial({color: 0x4a4a4a,  roughness: 0.5,  metalness: 0.3});
const blackishMetalMaterial = new MeshStandardMaterial({color: 0x484848, roughness: 0.2, metalness: 0.8});
const glossyLogoMaterial = new MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.02, metalness: 1.0, clearcoat: 1, clearcoatRoughness: 0 });
const glowRedMaterial = new MeshStandardMaterial({color:0xff4c4c,emissive: 0xff4c4c,emissiveIntensity: 0.3,roughness: 0.5,metalness: 0.3,toneMapped:false});


export function Model(props) {
  const group = React.useRef()
  const { nodes, animations } = useGLTF('/public/config/maimai-transformed.glb')
  const { actions } = useAnimations(animations, group)

  // glowing
  const glowMaterial = useRef(new MeshStandardMaterial({color:0xFFD17D,emissive: 0xFFD17D,emissiveIntensity: 1,roughness: 0.5,metalness: 0.3,toneMapped:false}));
  
  // metallic materials
  const color  = useLoader(TextureLoader, ['/config/color_color.jpg', '/config/color_roughness.jpg'])
  color.forEach(m=>{m.wrapS=m.wrapT=RepeatWrapping;m.repeat.set(5,5)})
  const metalMaterial = new MeshPhysicalMaterial({ color: 0x888888, map:color[0],roughnessMap:color[1], metalness: 1,clearcoat: 1, reflectivity: 0.9 });
  const carPaintMaterial = useRef(new MeshPhysicalMaterial({ map:color[0],roughnessMap:color[1], metalness: 0.9,clearcoat: 1 }));
  const stripesMaterial = useRef(new MeshPhysicalMaterial({ map:color[0],roughnessMap:color[1], metalness: 0.9,clearcoat: 1 }));

  // solar panels material
  const solar  = useLoader(TextureLoader, '/config/solar_color.jpg')
  solar.wrapS = solar.wrapT = RepeatWrapping;
  solar.repeat.set(16, 16);
  const solarMaterial = new MeshStandardMaterial({ color: 0x4e575e,map:solar, roughness: 0.5, metalness: 0.9 });

  // insides materials
  const leather  = useLoader(TextureLoader, '/config/leather_roughness.jpg')
  leather.wrapS=leather.wrapT=RepeatWrapping;leather.repeat.set(8,8);
  const fabric  = useLoader(TextureLoader, ['/config/fabric_color.jpg','/config/fabric_roughness.jpg','/config/fabric_displacement.jpg'])
  fabric.forEach(f=>{f.wrapS=f.wrapT=RepeatWrapping;f.repeat.set(10,10);})
  const textileMaterial = useRef(new MeshPhysicalMaterial({ color:0x222222,roughnessMap:leather,roughness: 0.9 }));
  
  const { mainColor,stripesColor, seat, mode } = useConfigurator();

  useEffect(() => {
    if (mainColor?.color) {
      carPaintMaterial.current.color.setHex(mainColor.color);
    }
  }, [mainColor]);

  useEffect(() => {
    if (stripesColor?.color) {
      stripesMaterial.current.color.setHex(stripesColor.color);
    }
  }, [stripesColor]);

  useEffect(() => {
    if (seat==='leather') {
      textileMaterial.current.map = null;
      textileMaterial.current.color.setHex(0x222222);
      textileMaterial.current.roughnessMap = leather;
    } else {
      textileMaterial.current.map = fabric[0];
      textileMaterial.current.roughnessMap = fabric[1];
      textileMaterial.current.color.setHex(0x333333);
    }
  }, [seat]);
  

  const handleDoor = (mode) => {
    if (actions) {
      Object.keys(actions).forEach(actionName=>{
        const action = actions[actionName];
        action.reset();
        action.setLoop(LoopOnce);
        action.clampWhenFinished = true;
        if (mode==='inside') {
          action.timeScale = 1;
          action.play();
        } else if (mode==='main') {
          action.time = action.getClip().duration;
          action.timeScale = -1;
          action.play();
        }
      })
    }
  }
  useEffect(() => {
    handleDoor(mode)
  }, [mode]);

  // WHEELS START
  const wheelRubberRef = useRef();
  const wheelMetalRef = useRef();
  const wheels = [
    {position:[1, 0.35, 1.4], rotation: [0,0,0]},
    {position:[-1, 0.35, 1.4], rotation: [0,Math.PI,0]},
    {position:[1, 0.35, -0.75], rotation: [0,0,0]},
    {position:[-1, 0.35, -0.75], rotation: [0,Math.PI,0]}
  ];
  useEffect(() => {
    wheels.forEach((wheel, i) => {
      const matrix = new Matrix4();
      const position = new Vector3(...wheel.position);
      const rotation = new Euler(...wheel.rotation);
      matrix.compose(position, new Quaternion().setFromEuler(rotation), new Vector3(1, 1, 1));
      wheelRubberRef.current?.setMatrixAt(i, matrix);
      wheelMetalRef.current?.setMatrixAt(i, matrix);
    });
    if (wheelRubberRef.current) { wheelRubberRef.current.instanceMatrix.needsUpdate = true; }
    if (wheelMetalRef.current) wheelMetalRef.current.instanceMatrix.needsUpdate = true;
  }, [wheels]);
  // WHEELS END



  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">

      {/* DOOR ANIMATION */}
        <group name="Top_door_bone001" position={[-0.935, 1.938, 1.131]}>
          <group name="Top_door_bone" rotation={[-1.603, 0, 0]}>
            <mesh name="door_heigh002" geometry={nodes.door_heigh002.geometry} material={blackishMetalMaterial} position={[0.935, 1.192, -1.901]} rotation={[1.603, 0, 0]}>
              <group name="Armature001" position={[-1.078, 1.401, 0.897]}>
                <group name="Lower_door_bone" position={[0.001, 0.04, 0.367]} rotation={[-1.678, 0, 0.003]}>
                  <mesh name="door_middle_glass" geometry={nodes.door_middle_glass.geometry} material={glassMaterial} position={[1.081, 1.407, -1.297]} rotation={[1.678, -0.003, 0]} />
                  <mesh name="door_middle001" geometry={nodes.door_middle001.geometry} material={carPaintMaterial.current} position={[1.081, 1.407, -1.297]} rotation={[1.678, -0.003, 0]}>
                    <mesh name="door_heigh003" geometry={nodes.door_heigh003.geometry} material={carPaintMaterial.current} position={[-1.172, 1.069, 1.252]} />
                  </mesh>
                </group>
              </group>
            </mesh>
            <mesh name="door_heigh_glass" geometry={nodes.door_heigh_glass.geometry} material={glassMaterial} position={[0.935, 1.192, -1.901]} rotation={[1.603, 0, 0]} />
          </group>
        </group>

        
        {/* SOLAR PANELS */}
        <mesh name="solar_panel_wide_fill" geometry={nodes.solar_panel_wide_fill.geometry} material={solarMaterial} />
        <mesh name="solar_panel_square_fill" geometry={nodes.solar_panel_square_fill.geometry} material={solarMaterial} />
        

        {/* STRIPES */}
        <mesh name="body_stripes" geometry={nodes.body_stripes.geometry} material={stripesMaterial.current} position={[0,0.003,-0.003]} />
        <mesh name="ev_side_plug_square" geometry={nodes.ev_side_plug_square.geometry} material={stripesMaterial.current} position={[0.113, 0.006, -0.011]} />
        <mesh name="ev_side_plug_o" geometry={nodes.ev_side_plug_o.geometry} material={stripesMaterial.current} position={[0.113, 0.006, -0.011]} />
        
        
        {/* WHEELS */}
        <instancedMesh ref={wheelMetalRef} args={[nodes.Wheel_metal.geometry, metalMaterial, 4]} />
        <instancedMesh ref={wheelRubberRef} args={[nodes.Wheel_tire.geometry, rubberMaterial, 4]} />

        {/* SEATS */}
        <mesh name='seats_cusion' geometry={nodes.seats_cusion.geometry} material={textileMaterial.current} />
        <mesh name='seats_metal' geometry={nodes.seats_metal.geometry} material={metalMaterial} />
        <mesh name='seats_cusion' geometry={nodes.seats_cusion.geometry} material={textileMaterial.current} position={[1.05,0,0]} />
        <mesh name='seats_metal' geometry={nodes.seats_metal.geometry} material={metalMaterial} position={[1.05,0,0]} />
        <mesh name="steering_wheel" geometry={nodes.steering_wheel.geometry} material={textileMaterial.current} position={[-0.523, 1.4, 0.209]} rotation={[1.389, 0, 0]} />

        {/* MAIN COLOR */}
        <mesh name="engine_floor" geometry={nodes.engine_floor.geometry} material={carPaintMaterial.current} />
        <mesh name="engine_lid" geometry={nodes.engine_lid.geometry} material={carPaintMaterial.current} position={[0, 0.872, 1.908]} />
        <mesh name="body_color" geometry={nodes.body_color.geometry} material={carPaintMaterial.current} />
        <mesh name="door_middle002" geometry={nodes.door_middle002.geometry} material={carPaintMaterial.current} position={[-0.009, 0, 0]} rotation={[-Math.PI, 0, 0]} scale={[-1.006, -1, -1]}>
          <mesh name="door_heigh004" geometry={nodes.door_heigh004.geometry} material={carPaintMaterial.current} position={[-1.172, 1.069, 1.252]} />
        </mesh>
        <mesh name="license_plate_holder002" geometry={nodes.license_plate_holder002.geometry} material={carPaintMaterial.current} position={[0.479, 0.874, -1.419]} />
        <mesh name="license_plate_holder003" geometry={nodes.license_plate_holder003.geometry} material={carPaintMaterial.current} position={[0.708, 0.874, -1.419]} />
        <mesh name="engine_hinge" geometry={nodes.engine_hinge.geometry} material={carPaintMaterial.current} />
        <mesh name="engine_hinge" geometry={nodes.engine_hinge.geometry} material={carPaintMaterial.current} position={[1.35,0,0]} />

        {/* METALLIC PARTS */}
        <mesh name="Wheel" geometry={nodes.Wheel.geometry} material={metalMaterial} />
        <mesh name="bull_bar_front" geometry={nodes.bull_bar_front.geometry} material={metalMaterial} />
        <mesh name="bull_bar_front" geometry={nodes.bull_bar_front.geometry} material={metalMaterial} scale={[-1, 1, 1]} />
        <mesh name="bull_bar_rear" geometry={nodes.bull_bar_rear.geometry} material={metalMaterial} position={[0, 0.332, 1.84]} rotation={[0, 0, -Math.PI]} scale={-1} />
        <mesh name="bull_bar_rear" geometry={nodes.bull_bar_rear.geometry} material={metalMaterial} position={[0, 0.332, 1.84]} rotation={[0, 0, -Math.PI]} scale={[1, -1, -1]} />
        <mesh name="bull_bar_sides" geometry={nodes.bull_bar_sides.geometry} material={metalMaterial} />
        <mesh name="bull_bar_sides" geometry={nodes.bull_bar_sides.geometry} material={metalMaterial} scale={[-1, 1, 1]} />
        <mesh name="headlight_grill" geometry={nodes.headlight_grill.geometry} material={metalMaterial} position={[0, 0.017, -0.001]} />
        <mesh name="exhaust_housing" geometry={nodes.exhaust_housing.geometry} material={metalMaterial} />
        <mesh name="exhaust_tips" geometry={nodes.exhaust_tips.geometry} material={metalMaterial} />
        <mesh name="exhaust_housing" geometry={nodes.exhaust_housing.geometry} material={metalMaterial} scale={[-1, 1, 1]}  />
        <mesh name="exhaust_tips" geometry={nodes.exhaust_tips.geometry} material={metalMaterial} scale={[-1, 1, 1]}  />
        <mesh name="ev_side_plug" geometry={nodes.ev_side_plug.geometry} material={metalMaterial} position={[0.113, 0.006, -0.011]} />
        <mesh name="seatbelt_attach" geometry={nodes.seatbelt_attach.geometry} material={metalMaterial} />
        <mesh name="seatbelt_attach" geometry={nodes.seatbelt_attach.geometry} material={metalMaterial} scale={[-1, 1, 1]} />
        <mesh name="solar_panel_wide" geometry={nodes.solar_panel_wide.geometry} material={metalMaterial} />
        <mesh name="solar_panel_square" geometry={nodes.solar_panel_square.geometry} material={metalMaterial} />
        <mesh name="rear_light_unit" geometry={nodes.rear_light_unit.geometry} material={metalMaterial} position={[0.784, 1.275, 1.848]} rotation={[0.011, 0, 0]} />
        <mesh name="roof_unit" geometry={nodes.roof_unit.geometry} material={metalMaterial} position={[0.426, 2.024, 0.349]} rotation={[-0.204, 0, 0]} />
        <mesh name="pedals" geometry={nodes.pedals.geometry} material={metalMaterial} />
        

        
        {/* blackishMetalMaterial */}
        <mesh name="body_black" geometry={nodes.body_black.geometry} material={blackishMetalMaterial} />
        <mesh name="mirror" geometry={nodes.mirror.geometry} material={blackishMetalMaterial} position={[-0.029, 0.325, 0.033]} rotation={[-0.11, 0, 0]} scale={[1, 0.742, 0.997]} />
        <mesh name="mirror" geometry={nodes.mirror.geometry} material={blackishMetalMaterial} position={[0.02, 0.325, 0.033]} rotation={[-0.11, 0, 0]} scale={[-1, 0.742, 0.997]} />
        <mesh name="door_low002" geometry={nodes.door_low002.geometry} material={blackishMetalMaterial} position={[1.103, 0.368, 0.368]} rotation={[-Math.PI, 0, 0]} scale={[-1.006, -1, -1]} />
        <mesh name="door_low001" geometry={nodes.door_low001.geometry} material={blackishMetalMaterial} position={[-1.107, 0.368, 0.368]} />
        <mesh name="hood_x_console" geometry={nodes.hood_x_console.geometry} material={blackishMetalMaterial} position={[0.599, 1.055, 0.088]} />
        <mesh name="side_markers" geometry={nodes.side_markers.geometry} material={blackishMetalMaterial} />
        <mesh name="bumper_plug" geometry={nodes.bumper_plug.geometry} material={blackishMetalMaterial} position={[1.034, 0.554, -1.322]} rotation={[-2.747, -0.213, -0.142]} />
        <mesh name="door_heigh001" geometry={nodes.door_heigh001.geometry} material={blackishMetalMaterial} position={[-0.009, 0, 0]} rotation={[-Math.PI, 0, 0]} scale={[-1.006, -1, -1]} />
        <mesh name="ev_console" geometry={nodes.ev_console.geometry} material={blackishMetalMaterial} position={[0, 1.128, -1.142]} rotation={[-0.493, 0, 0]} />
        <mesh name="ev_console001" geometry={nodes.ev_console001.geometry} material={blackishMetalMaterial} position={[-1.12, 1.095, -1.051]} rotation={[-0.523, -0.009, 0.063]} />
        <mesh name="ev_console002" geometry={nodes.ev_console002.geometry} material={blackishMetalMaterial} position={[-1.13, 1.061, -1.116]} rotation={[-0.523, -0.009, 0.063]} />
        
        

        {/* CABLES */}
        <mesh name="wiper_cable001" geometry={nodes.wiper_cable001.geometry} material={rubberMaterial} />
        <mesh name="roof_cable001" geometry={nodes.roof_cable001.geometry} material={rubberMaterial} position={[-0.159, 2.066, 1.044]} />
        <mesh name="roof_clip" geometry={nodes.roof_clip.geometry} material={rubberMaterial} position={[-0.524, 2.062, 1.163]} rotation={[1.603, 1.491, -1.607]} />
        <mesh name="roof_clip001" geometry={nodes.roof_clip001.geometry} material={rubberMaterial} position={[0, -0.022, 0]} />
        <mesh name="roof_clip002" geometry={nodes.roof_clip002.geometry} material={rubberMaterial} position={[-0.945, 1.314, -0.981]} rotation={[-0.414, 0, 0]} />
        <mesh name="roof_clip003" geometry={nodes.roof_clip003.geometry} material={rubberMaterial} position={[0.991, 0.854, -1.379]} rotation={[-0.899, -0.008, 0.006]} />
        <mesh name="ev_cable" geometry={nodes.ev_cable.geometry} material={rubberMaterial} position={[-1.813, 1.13, -0.547]} />
        <mesh name="hood_cable" geometry={nodes.hood_cable.geometry} material={rubberMaterial} position={[0.001, 0.936, -1.37]} />
        
        
        {/* BELTS */}
        <mesh name="seatbelt" geometry={nodes.seatbelt.geometry} material={rubberMaterial} />
        <mesh name="seatbelt" geometry={nodes.seatbelt.geometry} material={rubberMaterial} scale={[-1, 1, 1]} />
        <mesh name="ev_side_plug_belt" geometry={nodes.ev_side_plug_belt.geometry} material={rubberMaterial} position={[0.113, 0.006, -0.011]} />
        

        {/* GLASS */}
        <mesh name="body_glass" geometry={nodes.body_glass.geometry} material={glassMaterial} />
        <mesh name="door_heigh_glass001" geometry={nodes.door_heigh_glass001.geometry} material={glassMaterial} position={[-0.009, 0, 0]} rotation={[-Math.PI, 0, 0]} scale={[-1.006, -1, -1]} />
        <mesh name="door_middle_glass001" geometry={nodes.door_middle_glass001.geometry} material={glassMaterial} position={[-0.009, 0, 0]} rotation={[-Math.PI, 0, 0]} scale={[-1.006, -1, -1]} />
        
        {/* MIRRORS */}
        <mesh name="mirror_reflective" geometry={nodes.mirror_reflective.geometry} material={metalMaterial} position={[-0.029, 0.573, 0.003]} rotation={[-0.11, 0, 0]} scale={[1, 0.55, 0.995]} />
        <mesh name="mirror_reflective001" geometry={nodes.mirror_reflective001.geometry} material={metalMaterial} position={[2.473, 0.573, 0.003]} rotation={[-0.11, 0, 0]} scale={[1, 0.55, 0.995]} />

        {/* INSIDE SURFACES */}
        <mesh name="body__silver" geometry={nodes.body__silver.geometry} material={consoleMaterial} />
        <mesh name="center_console_dashboard" geometry={nodes.center_console_dashboard.geometry} material={consoleMaterial} position={[0, 0.946, 0.141]} />
        <mesh name="dashboard_cluster" geometry={nodes.dashboard_cluster.geometry} material={consoleMaterial} position={[-0.567, 1.424, -0.223]} rotation={[-0.166, 0, 0]} />
        <mesh name="steering_rack" geometry={nodes.steering_rack.geometry} material={consoleMaterial} position={[-0.524, 1.325, -0.118]} rotation={[-0.166, 0, 0]} />
        <mesh name="dashboard_cluster_screen" geometry={nodes.dashboard_cluster_screen.geometry} material={blackishMetalMaterial} position={[-0.567, 1.424, -0.198]} rotation={[-0.166, 0, 0]} />
        

        {/* LOGOS */}
        <mesh name="Makigai_logo004" geometry={nodes.Makigai_logo004.geometry} material={glossyLogoMaterial} position={[0.003, 1.013, -1.335]} rotation={[1.569, 0, Math.PI]} />
        <mesh name="Makigai_text_logo" geometry={nodes.Makigai_text_logo.geometry} material={glossyLogoMaterial} position={[0, 0.803, 1.953]} rotation={[0.945, 0, 0]} />
        <mesh name="Makigai_logo" geometry={nodes.Makigai_logo.geometry} material={glossyLogoMaterial} position={[0.001, 1.032, 1.872]} rotation={[1.524, 0, 0]} />
        <mesh name="Makigai_logo001" geometry={nodes.Makigai_logo001.geometry} material={glossyLogoMaterial} position={[-0.526, 1.274, 0.256]} rotation={[1.383, 0, 0]} />
        

        {/* GLOWING THINGS */}
        <mesh name="body_headlight_part001" geometry={nodes.body_headlight_part001.geometry} material={glowMaterial.current} position={[0, 0.017, -0.001]} />
        <mesh name="roof_unit_lights" geometry={nodes.roof_unit_lights.geometry} material={glowMaterial.current} position={[0.426, 2.024, 0.349]} rotation={[-0.204, 0, 0]} />
        <mesh name="rear_light_glowing" geometry={nodes.rear_light_glowing.geometry} material={glowMaterial.current} position={[0.784, 1.275, 1.848]} rotation={[0.011, 0, 0]} />
        <mesh name="rear_light_white" geometry={nodes.rear_light_white.geometry} material={glowRedMaterial} position={[0.784, 1.275, 1.848]} rotation={[0.011, 0, 0]} />  

      </group>
    </group>
  )
}

useGLTF.preload('/public/config/maimai-transformed.glb')
