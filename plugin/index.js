
const glob = require('glob')
const toml = require('toml')

const { readFile, writeFile, existsSync, mkdirSync, rmdirSync } = require('fs')
const { join, split, sep } = require('path')

class PostPrepPlugin {
  constructor(fileGlob, destDir) {
    this.fileGlob = fileGlob
    this.destDir = destDir
  }

  getPostDirectoryDest() {
    return join(this.destDir, 'posts.json')
  }

  getRequestPath(fileName) {
    const dataPath = this.destDir.split(sep)
    return join('/', dataPath[dataPath.length - 1], fileName + '.json')
  }

  getFileWriteDest(fileName) {
    return join(this.destDir, fileName + '.json')
  }

  getPostName(postObject) {
    const symbolFreeTitle = postObject.info.title.replace(/[^\w\s]/gi, '')
    const allLowercase = symbolFreeTitle.toLowerCase()
    const hypenated = allLowercase.replace(/\s+/g, '-')
    return hypenated
  }

  apply (compiler) {
    compiler.hooks.emit.tapPromise('Post Prep Plugin', (compilation) => {
      return new Promise((resolve, reject) => {
        if (typeof this.fileGlob !== "string") {
          reject('File Glob not specificed! Please specify as first parameter when constructing the plugin.')
        }
  
        if (typeof this.destDir !== "string") {
          reject('PostPrepPlugin: Destination directory not specified! Please specify as second parameter when constructing the plugin.')
        }
  
        if (!existsSync(this.destDir)){
          mkdirSync(this.destDir);
        } else {
          rmdirSync(this.destDir, { recursive: true })
          mkdirSync(this.destDir);
        }

        glob(this.fileGlob, {}, (er, files) => {
          const promiseList = files.map((file) => 
            new Promise((resolveToml, rejectToml) => {
              readFile(file, (err, data) => {
                if (err) {
                  rejectToml(err)
                  return
                }

                try {
                  resolveToml(toml.parse(data))
                } catch (e) {
                  rejectToml("Parsing error on line " + e.line + ", column " + e.column + ": " + e.message)
                }
              })
            })
          )
          const convertPromise = Promise.all(promiseList)
          convertPromise.then((tomlObjects) => {
            const writePromises = tomlObjects.map((obj) => 
              new Promise((writeResolve, writeReject) => {
                const fileName = this.getPostName(obj)
                const writePath = this.getFileWriteDest(fileName)
                writeFile(writePath, JSON.stringify(obj), (err) => {
                  if (err) {
                    writeReject(err)
                    return
                  }

                  writeResolve(this.getRequestPath(fileName))
                })
              })
            )

            const allWrites = Promise.all(writePromises)
            allWrites.then((writePaths) => {
              const postObject = {
                posts: writePaths
              }
              writeFile(this.getPostDirectoryDest(), JSON.stringify(postObject), (err) => {
                if (err) {
                  reject(err)
                  return
                }

                console.log('Posts Updated Successfully!')
                resolve()
              })
            }).catch((e) => reject(e))
          }).catch((e) => reject(e))
        })
      })
    })
  }
}

module.exports = PostPrepPlugin
