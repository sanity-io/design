export function isRecord(val: unknown): val is Record<string, unknown> {
  return Boolean(val) && !Array.isArray(val) && typeof val === 'object'
}

export function isArray<T = unknown>(val: unknown): val is Array<T> {
  return Array.isArray(val)
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}
