import {WorkshopServer} from './workshop'

declare global {
  var __SERVER__: WorkshopServer // eslint-disable-line no-var
}

export default async (): Promise<void> => {
  await global.__SERVER__.close()
}
