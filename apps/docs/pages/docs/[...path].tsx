import Head from 'next/head'
import React from 'react'
import {AppLayout, SEO, useApp} from '$components/app'
import {Article} from '$components/article'
import {PageLayout} from '$components/page'
import {Screen} from '$components/screen'
import {app, features} from '$config'
import {loadDocsPageData, loadDocsPagePaths} from '$lib/page'
import {isRecord} from '$lib/types'

export async function getStaticProps(opts: {params: {path: string[]}; preview?: boolean}) {
  const {params, preview = features.preview} = opts
  const pageData = await loadDocsPageData({params, preview})

  return {props: {...pageData, params, preview}}
}

export async function getStaticPaths() {
  const paths = await loadDocsPagePaths({preview: features.preview})

  return {paths, fallback: false}
}

export default function DocsPathPage() {
  const {data, menu} = useApp()
  const target = isRecord(data) && isRecord(data.target) ? data.target : undefined
  const seo = (target && isRecord(target.seo) && target.seo) || null
  const layout = (isRecord(target?.layout) && target?.layout) || {}

  return (
    <>
      <Head>{target && <title>{`${target.title} – ${app.siteName}`}</title>}</Head>

      <SEO seo={seo} title={isRecord(target) && target.title} />

      <AppLayout>
        {target?._type === 'article' && (
          <PageLayout menu={menu} {...layout}>
            <Article article={target} />
          </PageLayout>
        )}

        {target?._type === 'screen' && <Screen target={target} />}
      </AppLayout>
    </>
  )
}
