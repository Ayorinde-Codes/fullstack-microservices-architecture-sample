import crypto from 'crypto'

export const random = () => crypto.randomBytes(128).toString('base64')

export const generateApiKey = (): string => {
  return `x-api-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 10)}`
}

export const capitalizeEachWord = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
