import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {isEqual} from '../../lib/isEqual'
import {useWorkshop} from '../../useWorkshop'
import {decodeValue, encodeValue} from './helpers'
import {PropsMsg} from './msg'
import {PropsContext, PropsContextValue} from './PropsContext'
import {propsReducer} from './propsReducer'
import {PropSchema, PropsState} from './types'

/** @internal */
export const PropsProvider = memo(function PropsProvider(props: {
  children?: React.ReactNode
}): React.ReactElement {
  const {children} = props
  const {channel, broadcast, payload} = useWorkshop<PropsMsg>()
  const encodedValue =
    typeof payload.value === 'string' ? payload.value.replace(/ /g, '+') : payload.value
  const encodedValueRef = useRef(encodedValue)

  const decodedValue = useMemo(() => {
    if (!encodedValue) return {}

    try {
      return decodeValue(String(encodedValue))
    } catch (parseErr) {
      // eslint-disable-next-line no-console
      console.warn(parseErr)

      return {}
    }
  }, [encodedValue])

  const [{schemas, value}, setState] = useState<PropsState>({
    schemas: [],
    value: decodedValue,
  })

  const registerProp = useCallback(
    (schema: PropSchema) => {
      broadcast({type: 'workshop/props/registerProp', schema})
    },
    [broadcast]
  )

  const unregisterProp = useCallback(
    (name: string) => {
      broadcast({type: 'workshop/props/unregisterProp', name})
    },
    [broadcast]
  )

  const setPropValue = useCallback(
    (name: string, value: unknown) => {
      broadcast({type: 'workshop/props/setPropValue', name, value})
    },
    [broadcast]
  )

  const ctx: PropsContextValue = useMemo(
    () => ({registerProp, schemas, setPropValue, unregisterProp, value}),
    [registerProp, schemas, setPropValue, unregisterProp, value]
  )

  // Subscribe to global messages
  useEffect(
    () =>
      channel.subscribe((msg) => {
        setState((prevState) => {
          const nextState = propsReducer(prevState, msg)

          if (isEqual(prevState, nextState)) {
            return prevState
          }

          return nextState
        })
      }),
    [channel]
  )

  useEffect(() => {
    const nextEncodedValue = encodeValue(value)

    if (encodedValueRef.current !== nextEncodedValue) {
      encodedValueRef.current = nextEncodedValue

      broadcast({
        type: 'workshop/setPayloadValue',
        key: 'value',
        value: nextEncodedValue,
      })
    }
  }, [broadcast, value])

  useEffect(() => {
    if (encodedValueRef.current === encodedValue) {
      return
    }

    encodedValueRef.current = encodedValue

    try {
      const nextValue = encodedValue ? decodeValue(String(encodedValue)) : {}

      setState((prevState) => ({
        ...prevState,
        value: nextValue,
      }))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(err)
    }
  }, [encodedValue])

  return <PropsContext.Provider value={ctx}>{children}</PropsContext.Provider>
})
