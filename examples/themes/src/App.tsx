import {
  Box,
  Button,
  Code,
  Container,
  Flex,
  Heading,
  Inline,
  Stack,
  Text,
  useTheme,
} from '@sanity/ui'
import React from 'react'

export function App() {
  return (
    <Flex direction="column" style={{minHeight: '100%'}}>
      <DebugTheme />
      <Box
        flex={1}
        height="fill"
        mode="default"
        padding={4}
        palette="default"
        sizing="border"
        tone="default"
      >
        <DebugTheme />

        <Container border p={3} width={1}>
          <DebugTheme />

          <Stack palette="brand" space={4}>
            <Box border px={4} py={6} tone="default" radius={2}>
              <DebugTheme />

              <Heading size={5}>Text</Heading>

              <Box fg="default" mb={4} mt={3} mode="muted" palette="default">
                {/* <DebugTheme /> */}
                <Text>Display text using well-defined typographic styles.</Text>
              </Box>

              <Box
                border
                // tone="primary"
                mode="muted"
                p={3}
              >
                <DebugTheme />
                <Heading>Box</Heading>

                <Buttons />
                <Buttons mode="muted" />
                <Buttons mode="default" />

                <Box border tone="positive" mt={3} p={3}>
                  <DebugTheme />

                  <Heading>Box</Heading>

                  <Box border tone="positive" mode="solid" mt={3} p={3}>
                    <DebugTheme />
                    <Heading>Box</Heading>
                    <Buttons />
                    <Buttons mode="muted" />
                    <Buttons mode="default" />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box border mode="solid" p={3} tone="primary" padding={3}>
              <DebugTheme />
              <Heading>Box</Heading>
            </Box>

            <Box border mode="solid" p={3} tone="positive" padding={3}>
              <DebugTheme />
              <Heading>Box</Heading>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Flex>
  )
}

function DebugTheme() {
  const theme = useTheme()

  return (
    <Box border overflow="auto" p={3} my={3} tone={theme.color.config.tone}>
      <Code size={0}>{JSON.stringify(theme.color.config)}</Code>
    </Box>
  )
}

function Buttons(props: {mode?: string}) {
  const {mode} = props

  return (
    <Box mt={2}>
      <Inline>
        <Button mode={mode} tone="default" text="default" />
        <Button mode={mode} tone="primary" text="primary" />
        <Button mode={mode} tone="positive" text="positive" />
        <Button mode={mode} tone="caution" text="default" />
        <Button mode={mode} tone="critical" text="critical" />
      </Inline>
    </Box>
  )
}
