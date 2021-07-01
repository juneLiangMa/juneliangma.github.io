import React from 'react'
import { PhotoMap } from 'types'
import { getPhotoPath } from '../posts'

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
            return <img className="w-100" key={str + index} src={getPhotoPath(photos[key].path)} />
          } else {
            return <p key={str + index}>WARNING: Missing Photo</p>
          }
        } else {
          return <p key={str + index}>{str}</p>
        }
      })
    }
  </>
