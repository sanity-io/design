import {ThemeFonts} from '../lib/theme'

const monospaceFontFamily = [
  'ui-monospace',
  '-apple-system-ui-monospace', // Mac
  'SF Mono', // Mac
  'Menlo', // Mac
  'Consolas', // Windows
  'Liberation Mono', // Linux
  'monospace',
  'Apple Color Emoji',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
]

const sansSerifFontFamily = [
  'ui-sans-serif',
  '-apple-system', // Mac
  'BlinkMacSystemFont', // Mac
  'Roboto',
  'Segoe UI', // Windows
  'Helvetica', // Mac
  'Arial',
  'Liberation Sans', // Linux
  'sans-serif', // Linux
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
]

export const fonts: ThemeFonts = {
  code: {
    family: monospaceFontFamily.join(','),
    horizontalOffset: 0.075,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    sizes: [
      {
        ascenderHeight: 3,
        descenderHeight: 3,
        fontSize: 10,
        iconSize: 17,
        lineHeight: 13,
        letterSpacing: 0,
      },
      {
        ascenderHeight: 4,
        descenderHeight: 4,
        fontSize: 13,
        iconSize: 21,
        lineHeight: 17,
        letterSpacing: 0,
      },
      {
        ascenderHeight: 5,
        descenderHeight: 5,
        fontSize: 16,
        iconSize: 25,
        lineHeight: 21,
        letterSpacing: 0,
      },
      {
        ascenderHeight: 6,
        descenderHeight: 6,
        fontSize: 19,
        iconSize: 29,
        lineHeight: 25,
        letterSpacing: 0,
      },
      {
        ascenderHeight: 7,
        descenderHeight: 7,
        fontSize: 22,
        iconSize: 33,
        lineHeight: 29,
        letterSpacing: 0,
      },
    ],
  },
  heading: {
    family: sansSerifFontFamily.join(','),
    horizontalOffset: 0.075,
    weights: {
      regular: 700,
      medium: 800,
      semibold: 900,
      bold: 900,
    },
    sizes: [
      {
        ascenderHeight: 4,
        descenderHeight: 4,
        fontSize: 12,
        iconSize: 17,
        lineHeight: 17,
        letterSpacing: 0,
      },
      {
        ascenderHeight: 5,
        descenderHeight: 5,
        fontSize: 16,
        iconSize: 25,
        lineHeight: 21,
        letterSpacing: 0,
      },
      {
        ascenderHeight: 6,
        descenderHeight: 6,
        fontSize: 21,
        iconSize: 33,
        lineHeight: 27,
        letterSpacing: 0,
      },
      {
        ascenderHeight: 7,
        descenderHeight: 7,
        fontSize: 27,
        iconSize: 41,
        lineHeight: 33,
        letterSpacing: 0,
      },
      {
        ascenderHeight: 9,
        descenderHeight: 7,
        fontSize: 33,
        iconSize: 49,
        lineHeight: 39,
        letterSpacing: 0,
      },
      {
        ascenderHeight: 10,
        descenderHeight: 8,
        fontSize: 38,
        iconSize: 53,
        lineHeight: 45,
        letterSpacing: 0,
      },
    ],
  },
  label: {
    family: sansSerifFontFamily.join(','),
    horizontalOffset: 0.075,
    weights: {
      regular: 600,
      medium: 700,
      semibold: 800,
      bold: 900,
    },
    sizes: [
      {
        ascenderHeight: 2,
        descenderHeight: 2,
        fontSize: 9.8,
        iconSize: 15,
        lineHeight: 11,
        letterSpacing: 0.5,
      },
      {
        ascenderHeight: 2,
        descenderHeight: 2,
        fontSize: 11.25,
        iconSize: 17,
        lineHeight: 12,
        letterSpacing: 0.5,
      },
      {
        ascenderHeight: 2,
        descenderHeight: 2,
        fontSize: 12.75,
        iconSize: 19,
        lineHeight: 13,
        letterSpacing: 0.5,
      },
      {
        ascenderHeight: 2,
        descenderHeight: 2,
        fontSize: 14,
        iconSize: 21,
        lineHeight: 14,
        letterSpacing: 0.5,
      },
      {
        ascenderHeight: 2,
        descenderHeight: 2,
        fontSize: 15.5,
        iconSize: 23,
        lineHeight: 15,
        letterSpacing: 0.5,
      },
    ],
  },
  text: {
    family: sansSerifFontFamily.join(','),
    horizontalOffset: 0.075,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    sizes: [
      {
        ascenderHeight: 3,
        descenderHeight: 3,
        fontSize: 10,
        iconSize: 17,
        lineHeight: 13,
        letterSpacing: 0,

        os: {windows: {ascenderHeight: 2, descenderHeight: 4}},
      },
      {
        ascenderHeight: 4,
        descenderHeight: 4,
        fontSize: 13,
        iconSize: 21,
        lineHeight: 17,
        letterSpacing: 0,

        os: {windows: {ascenderHeight: 5, descenderHeight: 3}},
      },
      {
        ascenderHeight: 5,
        descenderHeight: 5,
        fontSize: 16,
        iconSize: 25,
        lineHeight: 21,
        letterSpacing: 0,

        os: {windows: {ascenderHeight: 6, descenderHeight: 4}},
      },
      {
        ascenderHeight: 6,
        descenderHeight: 6,
        fontSize: 19,
        iconSize: 29,
        lineHeight: 25,
        letterSpacing: 0,

        os: {windows: {ascenderHeight: 7, descenderHeight: 5}},
      },
      {
        ascenderHeight: 7,
        descenderHeight: 7,
        fontSize: 22,
        iconSize: 33,
        lineHeight: 29,
        letterSpacing: 0,

        os: {windows: {ascenderHeight: 8, descenderHeight: 6}},
      },
    ],
  },
}
