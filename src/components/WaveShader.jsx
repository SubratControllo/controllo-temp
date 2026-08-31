import { useEffect, useRef, useState } from "react";

const vertexSource = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const fragmentSource = `precision mediump float;uniform vec2 r;uniform float t;void main(){vec2 u=gl_FragCoord.xy/r;float w1=.10*sin(u.x*7.0+t*.35);float w2=.07*sin(u.x*11.0-t*.28);float edge=smoothstep(.18,.0,abs(u.y-(.52+w1+w2)));vec3 navy=vec3(.025,.106,.196);vec3 teal=vec3(.03,.50,.55);vec3 mint=vec3(.15,.85,.68);vec3 col=mix(navy,teal,u.y+.08*sin(t*.1));col=mix(col,mint,edge*.72);gl_FragColor=vec4(col,1.);}`;

export default function WaveShader({ motionEnabled }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) {
      setSupported(false);
      return undefined;
    }
    const shader = (type, source) => {
      const item = gl.createShader(type);
      gl.shaderSource(item, source);
      gl.compileShader(item);
      return item;
    };
    const program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, "r");
    const time = gl.getUniformLocation(program, "t");
    const resize = () => {
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth < 760 ? 1 : 1.5
      );
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    const render = (now = 0) => {
      resize();
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, now / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (motionEnabled && !document.hidden)
        frameRef.current = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(frameRef.current);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [motionEnabled]);

  return (
    <div
      className={`wave-shader${supported ? "" : " wave-shader--fallback"}`}
      aria-hidden="true"
    >
      {supported && <canvas ref={canvasRef} />}
    </div>
  );
}
