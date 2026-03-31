// Type stubs for three.js
// This file allows proper TypeScript support for three.js
declare module 'three' {
  // Scene
  export class Scene {
    constructor();
    add(object: any): this;
  }

  // Camera
  export class OrthographicCamera {
    constructor(left: number, right: number, top: number, bottom: number, near: number, far: number);
    position: { z: number };
    updateProjectionMatrix(): void;
  }

  // Renderer
  export class WebGLRenderer {
    constructor(options?: any);
    domElement: HTMLCanvasElement;
    setSize(width: number, height: number): void;
    setPixelRatio(ratio: number): void;
    render(scene: Scene, camera: any): void;
    dispose(): void;
  }

  // Geometry
  export class PlaneGeometry {
    constructor(width: number, height: number);
    dispose(): void;
  }

  // Textures
  export class Texture {
    dispose(): void;
  }

  export class CanvasTexture extends Texture {
    constructor(canvas: HTMLCanvasElement);
  }

  export class TextureLoader {
    load(url: string): Texture;
  }

  // Materials
  export class ShaderMaterial {
    constructor(options: any);
    uniforms: Record<string, any>;
    dispose(): void;
  }

  // Mesh
  export class Mesh {
    constructor(geometry: any, material: any);
    geometry: any;
  }

  // Math
  export class Vector2 {
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
  }

  // Matrix
  export const projectionMatrix: any;
  export const modelViewMatrix: any;
}

