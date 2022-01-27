import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'
import 'expect-playwright'

if (!global.setImmediate) {
  global.setImmediate = setTimeout as any
}
