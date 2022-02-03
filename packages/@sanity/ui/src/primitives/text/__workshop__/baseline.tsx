import {Box, Stack, Text} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{$fontFamily: string}>`
  display: inline-block;
  box-shadow: 0 1px 0 0 rgba(0 0 255 / 0.5), 0 -1px 0 0 rgba(255 0 0 / 0.5);

  --offset: 1px;
  --ascender: 4px;
  --descender: 6px;
  --font-size: 16px;
  --line-height: 21px;

  & > div {
    font-family: ${(props) =>
      `${props.$fontFamily}, Comic Sans MS, Comic Sans, Times New Roman, Times, serif`};
    padding: var(--offset) 0;
    font-size: var(--font-size);
    line-height: var(--line-height);

    transform: translateY(var(--descender));

    html.windows & {
      transform: translateY(calc(var(--descender) - 2px));
    }

    &:before {
      content: '';
      display: block;
      height: 0;
      margin-top: calc(0px - var(--ascender) - var(--descender) - var(--offset));
    }

    &:after {
      content: '';
      display: block;
      height: 0;
      margin-bottom: calc(0px - var(--offset));
    }

    & > span {
      outline: 1px solid rgba(127 127 127 / 0.2);
      outline-offset: -1px;
    }
  }
`

export default function BaselineStory() {
  return (
    <Box padding={4}>
      <Stack space={4}>
        <div>
          <Wrapper $fontFamily="ui-sans-serif">
            <div>
              <span>Baseline: SF (ui-sans-serif)</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="-apple-system">
            <div>
              <span>Baseline: SF (-apple-system)</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="BlinkMacSystemFont">
            <div>
              <span>Baseline: SF (BlinkMacSystemFont)</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="Arial">
            <div>
              <span>Baseline: Arial</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="Segoe UI">
            <div>
              <span>Baseline: Segoe UI</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="Roboto">
            <div>
              <span>Baseline: Roboto</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="Oxygen">
            <div>
              <span>Baseline: Oxygen</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="Ubuntu">
            <div>
              <span>Baseline: Ubuntu</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="Cantarell">
            <div>
              <span>Baseline: Cantarell</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="Open Sans">
            <div>
              <span>Baseline: Open Sans</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="Helvetica Neue">
            <div>
              <span>Baseline: Helvetica Neue</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper $fontFamily="sans-serif">
            <div>
              <span>Baseline: sans-serif</span>
            </div>
          </Wrapper>
        </div>

        <div>
          <Text>Baseline</Text>
        </div>
      </Stack>
    </Box>
  )
}
