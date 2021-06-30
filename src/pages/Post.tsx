import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PostParam, Post } from 'types'

export default () => {
  const { title } = useParams<PostParam>()
  const [postData, setPostData] = useState<Post | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/' + title + '.json')
      .then(res => res.json())
      .then((result) => {
        setLoading(false)
        setPostData(result)
      })
  }, [])

  const postTitle = loading ? 'Loading' : postData?.title

  return (
    <>{postTitle}</>
  )
}
