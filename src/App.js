import './App.scss';
import {useRef} from 'react'
import {Canvas, useFrame} from 'react-three-fiber'
import {softShadows, MeshWobbleMaterial, OrbitControls} from '@react-three/drei'

softShadows()

//When using useFrame we neet to put it on its own 
//Component to avoid infinit loop
const Mesh = ({position, args, color, speed}) =>
{
  const mesh = useRef(null)
  

  useFrame(()=>(mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
  return (
    <mesh 
        castShadow 
        position={position} 
        ref={mesh}>

    <boxBufferGeometry attach='geometry' args={args} />
    <MeshWobbleMaterial 
        speed={speed} 
        factor={0.6} 
        color={color} 
        attach='material'/>
    
  </mesh>
  )
}

function App() {

  return (
    <>
      <Canvas shadows colorManagement camera={{position:[-5,2,10], fov:60}}>
          <ambientLight intensity={0.3} />
          <directionalLight 
              castShadow
              intensity={1}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}              
              shadow-camera-left={-10}              
              shadow-camera-right={10}              
              shadow-camera-top={10}              
              shadow-camera-bottom={-10}              
              position={[0,10,0]}/>
          <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
         
         <group>
           <mesh 
               receiveShadow 
               rotation={[-Math.PI*0.5, 0,0]}
               position={[0,-3,0]}>
             <planeBufferGeometry attach='geometry' args={[100,100]}/>
             <shadowMaterial attach='material' opacity={0.3} />
           </mesh>
         </group>
         
         <Mesh position={[0,1,0]} args={[3,2,1]} speed={3}/>
         <Mesh position={[-2,1,-5]} color="pink"speed={5}/>
         <Mesh position={[5,1,-2]} color="pink" speed={5}/>
          <OrbitControls/>
      </Canvas>
    </>
  );
}

export default App;
