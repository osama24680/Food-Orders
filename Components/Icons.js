const Svg = ({ size = 20, children, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
    >
        {children}
    </svg>
)

export const IconBag = (p) => <Svg {...p}><path d="M5.5 8h13l1 12.5h-15L5.5 8Z" /><path d="M9 10.5V7a3 3 0 0 1 6 0v3.5" /></Svg>
export const IconReceipt = (p) => <Svg {...p}><path d="M6 3.5h12v17l-2.4-1.5-2.3 1.5-1.3-1-1.3 1-2.3-1.5L6 20.5v-17Z" /><path d="M9.5 8.5h5M9.5 12.5h5" /></Svg>
export const IconArrow = (p) => <Svg {...p}><path d="M4.5 12h15M13.5 6l6 6-6 6" /></Svg>
export const IconClose = (p) => <Svg {...p}><path d="m6 6 12 12M18 6 6 18" /></Svg>
export const IconPlus = (p) => <Svg {...p}><path d="M12 5.5v13M5.5 12h13" /></Svg>
export const IconMinus = (p) => <Svg {...p}><path d="M5.5 12h13" /></Svg>
export const IconCheck = (p) => <Svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>
export const IconSpinner = (p) => <Svg className="spin" {...p}><path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" /></Svg>
export const IconCard = (p) => <Svg {...p}><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3 10h18M7 15h3" /></Svg>
export const IconFlame = (p) => <Svg {...p}><path d="M12 3c.6 3.2 4.8 5 4.8 10a4.8 4.8 0 0 1-9.6 0c0-1.9.8-3.2 1.8-4.2.2 1.4.9 2.2 1.6 2.4C10.300 8.700 10.800 5.500 12 3Z" /></Svg>
export const IconScooter = (p) => <Svg {...p}><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.500 18h7M15.500 18 14 6h-2.500M14.500 10H19l1.500 5.500M3.500 14.500c1-2 3-3 5.500-3l1 3" /></Svg>
export const IconBox = (p) => <Svg {...p}><path d="m12 3 8 4.500v9L12 21l-8-4.500v-9L12 3Z" /><path d="m4 7.500 8 4.500 8-4.500M12 12v9" /></Svg>
export const IconLogout = (p) => <Svg {...p}><path d="M10 4H5.500v16H10M15 8l4 4-4 4M19 12H9" /></Svg>
