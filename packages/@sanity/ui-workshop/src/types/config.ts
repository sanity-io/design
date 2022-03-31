import {WorkshopCollection, WorkshopScope} from './core'
import {WorkshopPlugin} from './plugin'

export interface WorkshopConfig {
  collections?: WorkshopCollection[]
  features?: {
    navbar?: boolean
  }
  frameUrl?: string
  plugins?: WorkshopPlugin[]
  scopes: WorkshopScope[]
  title?: string
}