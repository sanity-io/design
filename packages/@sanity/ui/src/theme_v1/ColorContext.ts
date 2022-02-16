import {createContext} from 'react'

export interface ColorContextValue {
  mode?: string
  palette?: string
  tone?: string
}

export const ColorContext = createContext<ColorContextValue | null>(null)
