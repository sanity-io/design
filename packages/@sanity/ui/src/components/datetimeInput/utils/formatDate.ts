import {format} from 'date-fns'

export function formatDate(value: Date): string {
  return format(value, 'MMM d, yyyy')
}
