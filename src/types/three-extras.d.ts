declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera } from 'three';
    import { EventDispatcher } from 'three';
    import { MOUSE, TOUCH } from 'three';
  
    export class OrbitControls extends EventDispatcher {
      constructor(object: Camera, domElement?: HTMLElement);
      object: Camera;
      domElement: HTMLElement | undefined;
  
      enabled: boolean;
      target: THREE.Vector3;
      minDistance: number;
      maxDistance: number;
  
      minZoom: number;
      maxZoom: number;
  
      minPolarAngle: number;
      maxPolarAngle: number;
      minAzimuthAngle: number;
      maxAzimuthAngle: number;
  
      enableDamping: boolean;
      dampingFactor: number;
  
      enableZoom: boolean;
      zoomSpeed: number;
  
      enableRotate: boolean;
      rotateSpeed: number;
  
      enablePan: boolean;
      panSpeed: number;
  
      screenSpacePanning: boolean;
  
      keyPanSpeed: number;
      autoRotate: boolean;
      autoRotateSpeed: number;
  
      mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };
      touches: { ONE: TOUCH; TWO: TOUCH };
      
      addEventListener(type: string, listener: () => void): void;
      update(): boolean;
      reset(): void;
      dispose(): void;
    }
  }
  