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

  const dateFormatter = new Intl.DateTimeFormat('en-US')

  const postTitle = loading ? 'Loading' : postData?.info.title
  const postDate = loading ? '' : dateFormatter.format(postData?.info.date)
  const postBody = loading ? '' : postData?.info.post

  const postDates = loading ? '' : postData?.info.tags.map((tag) => <li>{tag}</li>)

  console.log(postData)

  return (
    <>
      <h1>{postTitle}</h1>
      <h3>{postDate}</h3>
      <h4>Tags</h4>
      <ul>
        {postDates}
      </ul>
      <BodySections text={postBody} photos={postData?.photos} />
    </>
  )
}
