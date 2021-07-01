import { getPhotoPath, getPhotoPathFromKey, getSmallPhotoPathFromKey, JsonToPost } from '../posts'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PostParam, Post, JsonPost } from 'types'
import BodySections from '../component/BodySections'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default () => {
  const { title } = useParams<PostParam>()
  const [postData, setPostData] = useState<Post | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/' + title + '.json')
      .then(res => res.json())
      .then((result: JsonPost) => {
        setLoading(false)
        setPostData(JsonToPost(result))
      })
  }, [])

  const dateFormatter = new Intl.DateTimeFormat('en-US')

  const postCoverPhoto = loading || !postData ? null : <LazyLoadImage className="w-100" effect="blur" placeholderSrc={getSmallPhotoPathFromKey(postData!!.info.cover, postData.photos)} src={getPhotoPathFromKey(postData!!.info.cover, postData.photos)} />
  const postTitle = loading ? 'Loading' : postData?.info.title
  const postDate = loading ? '' : dateFormatter.format(postData?.info.date)
  const postBody = loading ? '' : postData?.info.post

  const postDates = loading ? '' : postData?.info.tags.map((tag) => <li>{tag}</li>)

  console.log(postData)

  return (
    <>
      {postCoverPhoto}
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
