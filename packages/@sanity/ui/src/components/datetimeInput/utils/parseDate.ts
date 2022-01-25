import {parse} from 'date-fns'

const DATE_FORMAT_1 = 'MMM d, yyyy'

type DateValue = {type: 'date'; value: Date} | {type: 'error'; error: Error}

export function parseDate(value: string): DateValue {
  try {
    // DATE_FORMAT_1
    try {
      const p1 = parse(value, DATE_FORMAT_1, new Date())

      if (p1 instanceof Date && p1.toJSON()) {
        return {type: 'date' as const, value: p1}
      }
    } catch (e1) {
      // ignore
    }

    const d = Date.parse(value)

    if (isNaN(d)) {
      throw new Error('Could not parse date string')
    }

    return {type: 'date' as const, value: new Date(d)}
  } catch (e) {
    return {type: 'error' as const, error: e as Error}
  }
}
