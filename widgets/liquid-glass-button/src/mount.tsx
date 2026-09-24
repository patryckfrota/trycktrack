import { createRoot } from "react-dom/client";
import { LiquidGlassBackground } from "./LiquidGlassBackground";
import { LiquidGlassButton } from "./LiquidGlassButton";

interface MountOptions {
  label?: string;
  viewMode?: "text" | "icon";
  onClick?: () => void;
}

// Uso no index.html (script classico, sem modulo):
//   <div id="meu-botao"></div>
//   <script src="assets/widgets/liquid-glass-button.js"></script>
//   <script>
//     window.mountLiquidGlassButton(
//       document.getElementById("meu-botao"),
//       { label: "Continuar", onClick: () => console.log("clicou") }
//     );
//   </script>
function mountLiquidGlassButton(container: HTMLElement, options: MountOptions = {}) {
  const root = createRoot(container);
  root.render(<LiquidGlassButton {...options} />);
  return () => root.unmount();
}

// Fundo de vidro liquido sem botao, pra atras de uma barra inteira
// (ex.: bottom-nav) -- o conteudo real (icones, capsula deslizante)
// fica em outra camada, com z-index maior, por cima desse fundo.
function mountLiquidGlassBackground(container: HTMLElement, options: { borderRadius?: number } = {}) {
  const root = createRoot(container);
  root.render(<LiquidGlassBackground {...options} />);
  return () => root.unmount();
}

declare global {
  interface Window {
    mountLiquidGlassButton: typeof mountLiquidGlassButton;
    mountLiquidGlassBackground: typeof mountLiquidGlassBackground;
  }
}

window.mountLiquidGlassButton = mountLiquidGlassButton;
window.mountLiquidGlassBackground = mountLiquidGlassBackground;
