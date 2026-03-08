/**
 * Floating 3D Geometric Shapes background component
 */
export default function FloatingShapes() {
  return (
    <div className="floating-3d-shapes" aria-hidden="true">
      <div className="shape-3d shape-cube">
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </div>
      <div className="shape-3d shape-pyramid">
        <div className="pyramid-face f1"></div>
        <div className="pyramid-face f2"></div>
        <div className="pyramid-face f3"></div>
        <div className="pyramid-face f4"></div>
      </div>
      <div className="shape-3d shape-octahedron">
        <div className="octa-face o1"></div>
        <div className="octa-face o2"></div>
        <div className="octa-face o3"></div>
        <div className="octa-face o4"></div>
      </div>
      <div className="shape-3d shape-ring"></div>
      <div className="shape-3d shape-ring ring-2"></div>
      <div className="shape-3d shape-dot dot-1"></div>
      <div className="shape-3d shape-dot dot-2"></div>
      <div className="shape-3d shape-dot dot-3"></div>
      <div className="shape-3d shape-dot dot-4"></div>
      <div className="shape-3d shape-dot dot-5"></div>
    </div>
  );
}


