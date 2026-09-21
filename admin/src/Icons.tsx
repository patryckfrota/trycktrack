// Ícones de linha simples, mesma convenção visual do app do aluno
// (stroke 2.2-2.4, cantos arredondados, viewBox 24) — sem lib externa
// pra um punhado de ícones fixos.
import type { SVGProps } from "react";

function base(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    width: 18,
    height: 18,
    ...props,
  };
}

export const IconChart = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}><path d="M4 20V10M12 20V4M20 20v-7" /></svg>
);

export const IconBook = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
    <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
  </svg>
);

export const IconUsers = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.8 20c.6-3.4 3-5.3 6.2-5.3s5.6 1.9 6.2 5.3" />
    <path d="M16 6.2c1.6.3 2.8 1.7 2.8 3.3 0 1.6-1.2 3-2.8 3.3" />
    <path d="M21.2 19.8c-.4-2.3-1.7-3.9-3.8-4.6" />
  </svg>
);

export const IconPencil = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M4 20l.9-4L16 4.9a1.9 1.9 0 0 1 2.7 0l.4.4a1.9 1.9 0 0 1 0 2.7L8 19l-4 1Z" />
    <path d="M13.5 6.5l4 4" />
  </svg>
);

export const IconTag = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M3.5 11.2 12.3 3l7.2.5.5 7.2-8.2 8.2a1.7 1.7 0 0 1-2.4 0l-6.1-6.1a1.7 1.7 0 0 1 .2-2.6Z" />
    <circle cx="16" cy="8" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const IconUpload = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M12 16V4M8 8l4-4 4 4" />
    <path d="M4 16.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5" />
  </svg>
);

export const IconFolder = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M3.5 6.5a1.5 1.5 0 0 1 1.5-1.5h4.2l1.8 2h8a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5Z" />
  </svg>
);

export const IconCheckShield = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M12 3.5 19.5 6.2v5.6c0 4.2-3.1 7.7-7.5 9-4.4-1.3-7.5-4.8-7.5-9V6.2Z" />
    <path d="M9 12.2l2.1 2.1L15.3 10" />
  </svg>
);

export const IconAlertTriangle = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M12 4.2 21 19H3Z" />
    <path d="M12 10v4" />
    <circle cx="12" cy="16.8" r=".2" fill="currentColor" stroke="none" />
  </svg>
);

export const IconLogout = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M15 4.5H7A1.5 1.5 0 0 0 5.5 6v12A1.5 1.5 0 0 0 7 19.5h8" />
    <path d="M10.5 12H21M21 12l-3.5-3.5M21 12l-3.5 3.5" />
  </svg>
);
