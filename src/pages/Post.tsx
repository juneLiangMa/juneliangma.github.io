import { JSONToPost } from '../posts'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PostParam, Post, JSONPost } from 'types'
import BodySections from '../component/BodyParagraph'

export default () => {
  const { title } = useParams<PostParam>()
  const [postData, setPostData] = useState<Post | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/' + title + '.json')
      .then(res => res.json())
      .then((result: JSONPost) => {
        setLoading(false)
        setPostData(JSONToPost(result))
      })
  }, [])

  const postTitle = loading ? 'Loading' : postData?.info.title
  const postBody = loading ? '' : postData?.info.post

  console.log(postData)

  return (
    <>
      <h1>{postTitle}</h1>

      <BodySections text={postBody} photos={postData?.photos} />
    </>
  )
}
