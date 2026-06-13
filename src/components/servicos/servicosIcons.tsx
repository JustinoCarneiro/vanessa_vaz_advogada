import type React from 'react'

export type IconeSlug =
  | 'relogio'
  | 'escudo'
  | 'coracao'
  | 'pessoa'
  | 'casa'
  | 'setas'
  | 'balanca'
  | 'calendario'
  | 'documento'
  | 'estrela'
  | 'maos'
  | 'familia'
  | 'medico'
  | 'maleta'
  | 'dinheiro'
  | 'cadeado'
  | 'conquista'
  | 'telefone'
  | 'check'
  | 'atencao'

const props = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#3D5C5F',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const ICONES_MAP: Record<IconeSlug, React.ReactNode> = {
  relogio: (
    <svg key="relogio" {...props}>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
    </svg>
  ),
  escudo: (
    <svg key="escudo" {...props}>
      <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z" />
    </svg>
  ),
  coracao: (
    <svg key="coracao" {...props}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
    </svg>
  ),
  pessoa: (
    <svg key="pessoa" {...props}>
      <circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" />
    </svg>
  ),
  casa: (
    <svg key="casa" {...props}>
      <path d="M3 11l9-7 9 7" /><path d="M5 9.5V20h14V9.5" /><path d="M10 20v-6h4v6" />
    </svg>
  ),
  setas: (
    <svg key="setas" {...props}>
      <path d="M20 11a8 8 0 10-2.3 6.3" /><path d="M20 6v5h-5" />
    </svg>
  ),
  balanca: (
    <svg key="balanca" {...props}>
      <path d="M12 3v18" /><path d="M5 6h14" />
      <path d="M5 6l-3 7c0 2.2 1.3 3 3 3s3-.8 3-3L5 6z" />
      <path d="M19 6l-3 7c0 2.2 1.3 3 3 3s3-.8 3-3L19 6z" />
    </svg>
  ),
  calendario: (
    <svg key="calendario" {...props}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  documento: (
    <svg key="documento" {...props}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  estrela: (
    <svg key="estrela" {...props}>
      <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2" />
    </svg>
  ),
  maos: (
    <svg key="maos" {...props}>
      <path d="M18 11V6a2 2 0 00-4 0v5" />
      <path d="M14 10V4a2 2 0 00-4 0v6" />
      <path d="M10 10.5V6a2 2 0 00-4 0v8" />
      <path d="M6 14a4 4 0 004 4h4a4 4 0 004-4v-3H6v3z" />
    </svg>
  ),
  familia: (
    <svg key="familia" {...props}>
      <circle cx="9" cy="7" r="2.5" /><circle cx="16" cy="8" r="2" />
      <path d="M3 19c0-3.3 2.7-6 6-6h1c.6 0 1.2.1 1.8.3" />
      <path d="M13 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    </svg>
  ),
  medico: (
    <svg key="medico" {...props}>
      <path d="M12 2a5 5 0 015 5v3H7V7a5 5 0 015-5z" />
      <path d="M7 10H4a1 1 0 00-1 1v9a1 1 0 001 1h16a1 1 0 001-1v-9a1 1 0 00-1-1h-3" />
      <path d="M12 14v4M10 16h4" />
    </svg>
  ),
  maleta: (
    <svg key="maleta" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v2M2 12h20" />
    </svg>
  ),
  dinheiro: (
    <svg key="dinheiro" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M2 10h20M2 14h20" />
    </svg>
  ),
  cadeado: (
    <svg key="cadeado" {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
      <circle cx="12" cy="16" r="1.2" fill="#3D5C5F" />
    </svg>
  ),
  conquista: (
    <svg key="conquista" {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  telefone: (
    <svg key="telefone" {...props}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  check: (
    <svg key="check" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  ),
  atencao: (
    <svg key="atencao" {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
}

export const ICONES_OPTIONS = [
  { label: 'Relógio — Aposentadoria / Prazo',     value: 'relogio'    },
  { label: 'Escudo — Proteção / Previdência',      value: 'escudo'     },
  { label: 'Coração — Saúde / Cuidado',            value: 'coracao'    },
  { label: 'Pessoa — Segurado / Beneficiário',     value: 'pessoa'     },
  { label: 'Casa — Família / Moradia',             value: 'casa'       },
  { label: 'Setas — Revisão / Atualização',        value: 'setas'      },
  { label: 'Balança — Justiça / Direito',          value: 'balanca'    },
  { label: 'Calendário — Planejamento / Prazo',    value: 'calendario' },
  { label: 'Documento — Protocolo / Petição',      value: 'documento'  },
  { label: 'Estrela — Destaque / Qualidade',       value: 'estrela'    },
  { label: 'Mãos — Atendimento / Suporte',         value: 'maos'       },
  { label: 'Família — Dependentes / Pensão',       value: 'familia'    },
  { label: 'Médico — Incapacidade / Perícia',      value: 'medico'     },
  { label: 'Maleta — Trabalho / Profissional',     value: 'maleta'     },
  { label: 'Dinheiro — Benefício / Valor',         value: 'dinheiro'   },
  { label: 'Cadeado — Segurança / Sigiloso',       value: 'cadeado'    },
  { label: 'Conquista — Resultado / Aprovação',    value: 'conquista'  },
  { label: 'Telefone — Atendimento / Contato',     value: 'telefone'   },
  { label: 'Check — Aprovado / Concluído',         value: 'check'      },
  { label: 'Atenção — Urgência / Alerta',          value: 'atencao'    },
]

export function getIcone(slug: string | null | undefined): React.ReactNode {
  return ICONES_MAP[(slug as IconeSlug) ?? 'escudo'] ?? ICONES_MAP['escudo']
}
