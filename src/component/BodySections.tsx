import React from 'react'
import { PhotoMap } from 'types'
import { getPhotoPathFromKey, getSmallPhotoPathFromKey } from '../posts'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import CaptionedPhoto from './CaptionedPhoto'

interface BodyParagraphParams {
  text?: string,
  photos?: PhotoMap,
}

export default ({ text, photos }: BodyParagraphParams) => 
  <>
    {
      text?.split('\n').map((str: string, index: number) => {
        if (str.match(/!!([A-Z]|[a-z])+/g)) {
          const key = str.replace('!!', '')
          if (photos !== undefined && photos[key]) {
            console.log(key)
            return <CaptionedPhoto photoKey={key} photos={photos} />
          } else {
            return <p key={str + index}>WARNING: Missing Photo</p>
          }
        } else {
          return <p key={str + index}>{str}</p>
        }
      })
    }
  </>
