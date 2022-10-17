import {useContext} from 'react'
import {LevelContext} from './levelContext'

export function useLevel(level?: number): number {
  const levelContext = useContext(LevelContext) || 1 // TODO: define default value in theme

  return level || levelContext
}
