import React from 'react'
import { Photo, PhotoMap } from 'types'

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
            return <img src={'/data/photos/' + photos[key].path} />
          } else {
            return <p>WARNING: Missing Photo</p>
          }
        } else {
          return <p key={str + index}>{str}</p>
        }
      })
    }
  </>
