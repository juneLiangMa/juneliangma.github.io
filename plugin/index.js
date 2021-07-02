const glob = require("glob");
const toml = require("toml");
const sharp = require("sharp");

const { readFile, writeFile, existsSync, mkdirSync, rmdirSync } = require("fs");
const { basename, dirname, join, sep } = require("path");

class PostPrepPlugin {
  constructor(fileGlob, photoGlob, destDir) {
    this.fileGlob = fileGlob;
    this.photoGlob = photoGlob;
    this.destDir = destDir;
  }

  getPostDirectoryDest() {
    return join(this.destDir, "posts.json");
  }

  getRequestPath(fileName) {
    const dataPath = this.destDir.split(sep);
    return join("/", dataPath[dataPath.length - 1], fileName + ".json");
  }

  getFileWriteDest(fileName) {
    return join(this.destDir, fileName + ".json");
  }

  getPostName(postObject) {
    const symbolFreeTitle = postObject.info.title.replace(/[^\w\s]/gi, "");
    const allLowercase = symbolFreeTitle.toLowerCase();
    const hypenated = allLowercase.replace(/\s+/g, "-");
    return hypenated;
  }

  getPhotoDest(photoPath) {
    const fullPath = photoPath.split(sep);
    const photosIndex = fullPath.indexOf("photos");
    const pathSubSection = join(...fullPath.slice(photosIndex));
    const joinedPath = join(this.destDir, pathSubSection);
    const newFileName = basename(joinedPath, ".jpg") + ".webp";
    return join(dirname(joinedPath), newFileName);
  }

  getPhotoDestDir(photoPath) {
    const fullPath = photoPath.split(sep);
    const photosIndex = fullPath.indexOf("photos");
    const pathSubSection = join(
      ...fullPath.slice(photosIndex, fullPath.length - 1)
    );
    return join(this.destDir, pathSubSection);
  }

  parseToml(file) {
    return new Promise((resolveToml, rejectToml) => {
      readFile(file, (err, data) => {
        if (err) {
          rejectToml(err);
          return;
        }

        try {
          resolveToml(toml.parse(data));
        } catch (e) {
          rejectToml(
            "Parsing error on line " +
              e.line +
              ", column " +
              e.column +
              ": " +
              e.message
          );
        }
      });
    });
  }

  getPhotoPath(id, allPhotos) {
    let result = null;
    allPhotos.forEach((photo) => {
      if (id === photo.id) {
        result = photo.path;
        return;
      }
    });

    return result;
  }

  writeObjects(obj) {
    return new Promise((writeResolve, writeReject) => {
      const fileName = this.getPostName(obj);
      const writePath = this.getFileWriteDest(fileName);
      writeFile(writePath, JSON.stringify(obj), (err) => {
        if (err) {
          writeReject(err);
          return;
        }

        writeResolve({
          path: fileName,
          title: obj.info.title,
          tags: obj.info.tags,
          date: obj.info.date,
          cover: this.getPhotoPath(obj.info.cover, obj.photos),
          shortDescription: obj.info.post.split(" ").slice(0, 20).join(" "),
        });
      });
    });
  }

  onTomlFilesParsed(tomlObjects) {
    return new Promise((resolve, reject) => {
      const writePromises = tomlObjects.map((obj) => this.writeObjects(obj));
      const allWrites = Promise.all(writePromises);
      console.log("[PPP] Writing Posts...");

      allWrites
        .then((postObjects) => {
          const allPosts = {
            posts: postObjects,
          };
          writeFile(
            this.getPostDirectoryDest(),
            JSON.stringify(allPosts),
            (err) => {
              if (err) {
                reject(err);
                return;
              }

              resolve();
            }
          );
        })
        .catch((e) => reject(e));
    });
  }

  onPhotoGlob(er, photos) {
    return new Promise((resolve, reject) => {
      const mainPhotos = photos.map((photo) => {
        mkdirSync(this.getPhotoDestDir(photo), { recursive: true });
        return sharp(photo).resize(900).webp().toFile(this.getPhotoDest(photo));
      });

      const smallPhotos = photos.map((photo) => {
        mkdirSync(this.getPhotoDestDir(photo), { recursive: true });
        const smallPhoto = photo.replace(".jpg", ".small.jpg");
        return sharp(photo)
          .resize(240)
          .webp()
          .toFile(this.getPhotoDest(smallPhoto));
      });

      console.log("[PPP] Converting Photos...");
      const mainPhotoPromises = Promise.all(mainPhotos).then(() =>
        Promise.all(smallPhotos)
      );
      mainPhotoPromises.then(() => resolve()).catch((e) => reject(e));
    });
  }

  processPhotos() {
    return new Promise((resolve, reject) => {
      console.log("[PPP] Getting Photos to Convert...");
      glob(this.photoGlob, {}, (er, files) =>
        this.onPhotoGlob(er, files)
          .then(() => resolve())
          .catch((e) => reject(e))
      );
    });
  }

  onPostGlob(er, files) {
    return new Promise((resolve, reject) => {
      const promiseList = files.map((file) => this.parseToml(file));
      const convertPromise = Promise.all(promiseList);

      convertPromise.then((tomlObjects) =>
        this.onTomlFilesParsed(tomlObjects)
          .then(() => this.processPhotos().then(() => resolve()))
          .catch((e) => reject(e))
      );
    });
  }

  apply(compiler) {
    compiler.hooks.beforeRun.tapPromise("Post Prep Plugin", (compilation) => {
      return new Promise((resolve, reject) => {
        if (typeof this.fileGlob !== "string") {
          reject(
            "File Glob not specificed! Please specify as the first parameter when constructing the plugin."
          );
        }

        if (typeof this.photoGlob !== "string") {
          reject(
            "Photo Glob not specificed! Please specify as the second parameter when constructing the plugin."
          );
        }

        if (typeof this.destDir !== "string") {
          reject(
            "PostPrepPlugin: Destination directory not specified! Please specify as the third parameter when constructing the plugin."
          );
        }

        console.log("[PPP] Starting Compile...");

        if (!existsSync(this.destDir)) {
          mkdirSync(this.destDir);
          mkdirSync(join(this.destDir, "photos"));
        } else {
          rmdirSync(this.destDir, { recursive: true });
          mkdirSync(this.destDir);
        }

        glob(this.fileGlob, {}, (er, files) =>
          this.onPostGlob(er, files)
            .then(() => {
              console.log("[PPP] Processing Complete!");
              resolve();
            })
            .catch((e) => reject(e))
        );
      });
    });
  }
}

module.exports = PostPrepPlugin;
