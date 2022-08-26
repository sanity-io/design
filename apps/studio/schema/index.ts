import {Schema} from 'sanity'
import {
  apiClass,
  apiFunction,
  apiInterface,
  apiPackage,
  apiReference,
  apiRelease,
  apiText,
  apiTokens,
  apiType,
  apiVariable,
} from './api'
import {article} from './article'
import {machine} from './machine'
import {nav, navItem} from './nav'
import {screen, screenSections} from './screen'
import {seo} from './seo'
import {settings} from './settings'
import {
  tsdocComment,
  tsdocExampleBlock,
  tsdocModifierTag,
  tsdocParamBlock,
  tsdocRemarksBlock,
  tsdocReturnsBlock,
  tsdocSeeBlock,
} from './tsdoc'

export const schemaTypes: Schema.TypeDefinition[] = [
  apiClass,
  apiFunction,
  apiInterface,
  apiPackage,
  apiReference,
  apiRelease,
  apiText,
  apiTokens,
  apiType,
  apiVariable,
  article,
  machine,
  nav,
  navItem,
  ...screenSections,
  screen,
  seo,
  settings,
  tsdocComment,
  tsdocExampleBlock,
  tsdocModifierTag,
  tsdocParamBlock,
  tsdocRemarksBlock,
  tsdocReturnsBlock,
  tsdocSeeBlock,
]
