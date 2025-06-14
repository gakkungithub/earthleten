import { Color } from '@prisma/client';

export const colorClassMap: Record<Color, { bg: string; text: string, border: string }> = {
  RED: { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-600' },
  ORANGE: { bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-600' },
  YELLOW: { bg: 'bg-yellow-600', text: 'text-yellow-600', border: 'border-yellow-600' },
  LIME: { bg: 'bg-lime-400', text: 'text-lime-400', border: 'border-lime-400' },
  GREEN: { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-600' },
  SKY: { bg: 'bg-sky-500', text: 'text-sky-500', border: 'border-sky-500' },
  BLUE: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600' },
  PURPLE: { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-600' },
  AMBER: { bg: 'bg-amber-700', text: 'text-amber-700', border: 'border-amber-700' },
  GRAY: { bg: 'bg-gray-600', text: 'text-gray-600', border: 'border-gray-600' },
  BLACK: { bg: 'bg-black', text: 'text-black', border: 'border-black' },
  WHITE: { bg: 'bg-white', text: 'text-white', border: 'border-white' },
}