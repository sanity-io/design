import {Box, Card, Code, ErrorBoundary, Flex, Heading, Spinner, Stack} from '@sanity/ui'
import React, {createElement, memo, Suspense, useCallback, useState} from 'react'
import {WorkshopStory} from '../types'
import {useWorkshop} from '../useWorkshop'
import {formatStack} from './formatStack'

export const WorkshopCanvas = memo(function WorkshopCanvas(): React.ReactElement {
  const {story} = useWorkshop()
  const [state, setState] = useState<{error: Error | null; errorInfo: React.ErrorInfo | null}>({
    error: null,
    errorInfo: null,
  })

  const catchError = useCallback(
    ({error, info: errorInfo}: {error: Error; info: React.ErrorInfo}) => {
      setState({error, errorInfo})
    },
    []
  )

  if (!story) {
    return <></>
  }

  if (state.error) {
    return (
      <Card as="main" height="fill" overflow="auto" tone="critical">
        <ErrorScreen error={state.error} errorInfo={state.errorInfo} />
      </Card>
    )
  }

  return (
    <>
      <h1 hidden>{story.title}</h1>

      <Suspense fallback={<LoadingScreen story={story} />}>
        <Card as="main" height="fill">
          <ErrorBoundary onCatch={catchError}>{createElement(story.component)}</ErrorBoundary>
        </Card>
      </Suspense>
    </>
  )
})

const LoadingScreen = memo(function LoadingScreen(props: {story: WorkshopStory}) {
  const {story} = props

  return (
    <>
      <h1 hidden>
        Loading <em>{story.title}</em>…
      </h1>

      <Flex align="center" as="main" height="fill" justify="center">
        <Spinner muted />
      </Flex>
    </>
  )
})

const ErrorScreen = memo(function ErrorScreen(props: {
  error: Error
  errorInfo: React.ErrorInfo | null
}) {
  const {error, errorInfo} = props

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Heading as="h1" size={[1, 1, 2]}>
          {error.message}
        </Heading>
        {error.stack && <Code size={1}>{formatStack(error.stack)}</Code>}
        {errorInfo && (
          <Code size={1}>{'Component stack:' + formatStack(errorInfo.componentStack)}</Code>
        )}
      </Stack>
    </Box>
  )
})