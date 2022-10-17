import {
  Button,
  Card,
  Code,
  Container,
  Heading,
  Label,
  Level,
  Size,
  Stack,
  Text,
  TextInput,
  useLevel,
  useSize,
} from '@sanity/ui'

function DebugHeading() {
  const level = useLevel()
  const size = useSize()

  return (
    <Heading>
      Heading {level} #{size}
    </Heading>
  )
}

function DebugLabel() {
  const size = useSize()

  return <Label>Label #{size}</Label>
}

function DebugText() {
  const size = useSize()

  return <Text muted>Text #{size}</Text>
}

function DebugCode() {
  return (
    <Size delta={-1}>
      <Card padding={3} tone="transparent">
        <Code>Code</Code>
      </Card>
    </Size>
  )
}

function Debug() {
  const level = useLevel()
  const size = useSize()

  return (
    <Card border padding={3}>
      <Size delta={2}>
        <Stack space={4}>
          {/* <Size delta={-1}>
            <Code>{JSON.stringify({level, size})}</Code>
          </Size>
          <DebugLabel />
          <Size delta={1}> */}
          <DebugHeading />
          {/* </Size>
          <DebugText />
          <TextInput placeholder="TextInput" />
          <Button text="Button" />
          <DebugCode /> */}
        </Stack>
      </Size>
    </Card>
  )
}

export default function ContextsStory() {
  return (
    <Card padding={5}>
      <Size delta={3}>
        <Heading>Heading</Heading>

        <Size delta={-1}>
          <Heading>Heading</Heading>

          <Size delta={-1}>
            <Heading>Heading</Heading>

            <Size delta={-1}>
              <Heading>Heading</Heading>

              <Size delta={-1}>
                <Heading>Heading</Heading>
              </Size>
            </Size>
          </Size>
        </Size>
      </Size>
    </Card>
  )
  // return (
  //   <Size>
  //     <Card padding={4}>
  //       <Container>
  //         <Stack space={4}>
  //           <Size delta={2}>
  //             <Debug />
  //           </Size>
  //           <Size delta={1}>
  //             <Debug />
  //           </Size>
  //           <Debug />
  //           <Level>
  //             <Size delta={-1}>
  //               <Debug />
  //               <Level>
  //                 <Size delta={-1}>
  //                   <Debug />

  //                   <Level>
  //                     <Size delta={-1}>
  //                       <Debug />

  //                       <Level>
  //                         <Size delta={-1}>
  //                           <Debug />

  //                           <Level>
  //                             <Size delta={-1}>
  //                               <Debug />
  //                             </Size>
  //                           </Level>
  //                         </Size>
  //                       </Level>
  //                     </Size>
  //                   </Level>
  //                 </Size>
  //               </Level>
  //             </Size>
  //           </Level>
  //         </Stack>
  //       </Container>
  //     </Card>
  //   </Size>
  // )
}
