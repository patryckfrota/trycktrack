import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef } from "react";

interface LiquidGlassBackgroundProps {
  borderRadius?: number;
}

// Fundo de vidro liquido (shader WebGL, sem botao/interacao) pra usar atras
// de uma barra inteira -- ex.: o bottom-nav do trycktrack, que ja tem sua
// propria capsula deslizante e icones por cima (z-index maior).
export function LiquidGlassBackground({ borderRadius = 30 }: LiquidGlassBackgroundProps) {
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<ShaderMount | null>(null);

  useEffect(() => {
    if (!shaderRef.current) return;
    shaderMount.current = new ShaderMount(
      shaderRef.current,
      liquidMetalFragmentShader,
      {
        u_repetition: 4,
        u_softness: 0.5,
        u_distortion: 0,
        u_contour: 0,
        u_angle: 45,
        u_scale: 8,
        u_shape: 1,
        u_offsetX: 0.1,
        u_offsetY: -0.1,
      },
      undefined,
      0.6,
    );
    return () => {
      shaderMount.current?.destroy?.();
      shaderMount.current = null;
    };
  }, []);

  return (
    <div
      ref={shaderRef}
      style={{
        position: "absolute",
        inset: 0,
        borderRadius,
        overflow: "hidden",
      }}
    />
  );
}
