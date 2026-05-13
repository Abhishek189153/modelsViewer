import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  useGLTF,
  Environment,
  Html,
} from "@react-three/drei";

import {
  Suspense,
  useEffect,
  useRef,
} from "react";

import API from "../api/axios";

const GLBModel = ({ url }) => {
  const { scene } = useGLTF(url);

  return (
    <primitive
      object={scene}
      scale={1}
    />
  );
};

const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">

        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-white text-lg font-medium">
          Loading 3D Model...
        </p>
      </div>
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
    if (!controlsRef.current || !model)
      return;

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

      alert("Camera view saved");
    } catch (error) {
      console.log(error);
    }
  };

  if (!model) {
    return (
      <div
        className="
        flex-1
        min-h-0
        flex
        items-center
        justify-center
        rounded-2xl
        border
        border-white/5
        bg-[#0d0d0d]
      "
      >
        <div className="text-center">

          <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-500/10 flex items-center justify-center mb-5">

            <span className="text-4xl">
              🚀
            </span>
          </div>

          <h2 className="text-2xl font-bold">
            No Model Selected
          </h2>

          <p className="text-zinc-400 mt-2">
            Choose a model from your
            collection
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-5">

      {/* TOP ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold">
            Interactive Viewer
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Rotate, zoom and inspect
            your 3D model in real-time
          </p>
        </div>

        <button
          onClick={saveCameraState}
          className="
            px-6
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-500
            font-semibold
            transition-all
          "
        >
          Save Camera View
        </button>
      </div>

      {/* VIEWER CONTAINER */}
      <div
        className="
        relative
        flex-1
        min-h-0
        overflow-hidden
        rounded-2xl
        border
        border-white/5
        bg-[#0d0d0d]
      "
      >

        {/* Top Right Status */}
        <div className="absolute top-5 right-5 z-20 flex items-center gap-3">

          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/10 px-4 py-2">

            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>

            <span className="text-sm text-emerald-300">
              Rendering
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-xl border border-blue-500/10 bg-blue-500/10 px-4 py-2">

            <span className="text-sm text-blue-300">
              WebGL Active
            </span>
          </div>
        </div>

        {/* 3D CANVAS */}
        <Canvas
          camera={{
            position: [0, 2, 5],
            fov: 50,
          }}
        >

          {/* LIGHTS */}
          <ambientLight intensity={1.5} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
          />

          <pointLight
            position={[-5, 5, 5]}
            intensity={1.2}
            color="#2563eb"
          />

          {/* MODEL */}
          <Suspense fallback={<Loader />}>
            <GLBModel
              url={model.modelUrl}
            />

            <Environment preset="city" />
          </Suspense>

          {/* CONTROLS */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>

        {/* MODEL INFO */}
        <div className="absolute left-5 bottom-5 z-20 rounded-xl border border-white/5 bg-black/40 backdrop-blur-xl px-5 py-4">

          <p className="text-xs tracking-widest text-zinc-500">
            ACTIVE MODEL
          </p>

          <h3 className="text-xl font-semibold mt-1">
            {model.modelName}
          </h3>

          <p className="text-sm text-zinc-400 mt-1">
            Interactive GLB Asset
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;