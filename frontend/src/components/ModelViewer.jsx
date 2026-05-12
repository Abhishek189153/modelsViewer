import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  useGLTF,
  Environment,
  Html,
} from "@react-three/drei";

import { Suspense, useEffect, useRef } from "react";

import API from "../api/axios";



const GLBModel = ({ url }) => {
  const { scene } = useGLTF(url);

  return <primitive object={scene} scale={1} />;
};



const Loader = () => {
  return (
    <Html center>
      <p style={{ color: "white" }}>Loading Model...</p>
    </Html>
  );
};


const ModelViewer = ({ model }) => {
  const controlsRef = useRef();

  
  useEffect(() => {
    if (
      controlsRef.current &&
      model?.cameraState?.position
    ) {
      const controls = controlsRef.current;

     
      controls.object.position.set(
        model.cameraState.position.x,
        model.cameraState.position.y,
        model.cameraState.position.z
      );

      
      controls.target.set(
        model.cameraState.target.x,
        model.cameraState.target.y,
        model.cameraState.target.z
      );

      controls.object.zoom =
        model.cameraState.zoom || 1;

      controls.object.updateProjectionMatrix();

      controls.update();
    }
  }, [model]);



  const saveCameraState = async () => {
    if (!controlsRef.current || !model) return;

    const controls = controlsRef.current;

    const cameraState = {
      position: {
        x: controls.object.position.x,
        y: controls.object.position.y,
        z: controls.object.position.z,
      },

      target: {
        x: controls.target.x,
        y: controls.target.y,
        z: controls.target.z,
      },

      zoom: controls.object.zoom,
    };

    try {
      await API.put(
        `/models/${model._id}/camera`,
        {
          cameraState,
        }
      );

      console.log("Camera state saved");
    } catch (error) {
      console.log(error);
    }
  };


  if (!model) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-800">
        <p className="text-slate-400">
          Select a model to view
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={saveCameraState}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
        >
          Save Camera View
        </button>
      </div>

      {/* 3D VIEWER */}
      <div className="h-[500px] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

        <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>

          {/* LIGHTS */}
          <ambientLight intensity={1} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
          />

          {/* MODEL */}
          <Suspense fallback={<Loader />}>
            <GLBModel url={model.modelUrl} />

            <Environment preset="city" />
          </Suspense>

          {/* CONTROLS */}
          <OrbitControls ref={controlsRef} />

        </Canvas>
      </div>
    </div>
  );
};

export default ModelViewer;