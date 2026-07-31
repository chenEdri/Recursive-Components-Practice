export const ButtonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
} as const
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant]

export const ButtonSize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize]
