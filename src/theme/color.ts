export const primary = {
  50: '#DBF4FF',
  100: '#ADDBFF',
  200: '#7CC2FF',
  300: '#4AA9FF',
  400: '#1A91FF',
  500: '#0077E6',
  600: '#005DB4',
  700: '#004282',
  800: '#002851',
  900: '#000E21',
}

export const warning = {
  50: '#FFF7ED',
  100: '#FFEDD5',
  200: '#FED7AA',
  300: '#FDBA74',
  400: '#FB923C',
  500: '#F97316',
  600: '#EA580C',
  700: '#C2410C',
  800: '#9A3412',
  900: '#7C2D12',
}

export const danger = {
  50: '#FEF2F2',
  100: '#FEE2E2',
  200: '#FECACA',
  300: '#FCA5A5',
  400: '#F87171',
  500: '#EF4444',
  600: '#DC2626',
  700: '#B91C1C',
  800: '#991B1B',
  900: '#7F1D1D',
}

export const success = {
  50: '#F0FDF4',
  100: '#DCFCE7',
  200: '#BBF7D0',
  300: '#86EFAC',
  400: '#4ADE80',
  500: '#22C55E',
  600: '#16A34A',
  700: '#15803D',
  800: '#166534',
  900: '#14532D',
}

export const defaultColor = {
  50: '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7Eb',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
}

export const trueGray = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E5E5E5',
  300: '#D4D4D4',
  400: '#A3A3A3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
}

export const dark = {
  50: '#18181B',
  100: '#27272A',
  200: '#3F3F46',
  300: '#52525B',
  400: '#71717A',
  500: '#A1A1AA',
  600: '#D4D4D8',
  700: '#E4E4E7',
  800: '#F4F4F5',
  900: '#FAFAFA',
}

const white = '#ffffff'
const black = '#000000'

export const lightMode = {
  background: white,
  background2: defaultColor[100],
  background3: defaultColor[200],
  blueTransparent: 'rgba(0, 40, 81, 0.9)',
  muted: defaultColor[400],
  primary: primary[800],
  transparent: 'rgba(255,255,255,0)',
  divider: defaultColor[200],
  text: black,
  foreground: primary[900],
}

export const darkMode = {
  background: primary[800],
  background2: primary[700],
  background3: primary[600],
  blueTransparent: 'rgba(0, 40, 81, 0.9)',
  primary: white,
  transparent: 'rgba(0,0,0,0)',
  divider: defaultColor[600],
  foreground: white,
}

export const info = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
}

export const statusColor = {
  primary,
  danger,
  warning,
  success,
  info,
  default: defaultColor,
}
export const placeholder = {
  image: trueGray[50],
}

export const colors = {
  ...lightMode,
  placeholder,
  white,
  black,
  danger: danger[400],
  default: defaultColor[400],
  warning: warning[400],
  success: success[400],
  facebook: '#4267B2'
}
