# Photo Blog

[![Deployment CI](https://github.com/juneLiangMa/PhotoBlog/actions/workflows/node.js.yml/badge.svg)](https://github.com/juneLiangMa/PhotoBlog/actions/workflows/node.js.yml)

## Requirements

- Git LFS
- Yarn

```
# Install Packages
yarn install

# Start Dev Server
yarn start

# Build Prod Site
yarn build

# Build and Serve a Prod Site locally
yarn serve
```

## Project Structure

### `/src` Source Directory

This directory contains all of the React code used to build the web app.

- `/src/component` contains any shared components used between files.
- `/src/pages` contains modules that are used for React router pages. These should default export the entry point into the page.
- `/src/styles` contains any `scss` files related to website styling. Note that `style.scss`, and any other styling files, should be imported in `index.tsx`.
- `App.tsx` contains the routing table for React router, in addition to shared page components.
- `index.tsx` is the entrypoint to the web app.
- `posts.ts` contains utility functions for interfacing with the posts requests and data.
- `types.ts` contains shared Typescript typings for the web app.

### `/plugin` Plugin Directory

This directory contains the `PostPrepPlugin`, a custom plugin to stage posts in the `/posts/` directory into an optimized format for use on the deployed website.

The `PostPrePlugin` stages right before webpack compiles components (see [`beforeRun`](https://webpack.js.org/api/compiler-hooks/)). If for any reason your post does not immediately become available during development, you may need to rerun `yarn start` to regenerate the post files.

### `/posts` Post Directory

This directory contains all of the TOML-formatted posts that are converted into articles.

All photos for posts must be stored within the `/posts/photos/` directory or subdirectories. **All photos must be JPEGs (and must end in .jpg)**

**Example**

```
[info]
# Article Title (used in web link)
title = "This is a testing article"

# Article Write Date (Can be anything)
date = "6/29/2021"

# Indexing Tags for article collections
tags = ["nature", "test"]

# Photo ID for cover photo
cover = "smnp"

# White spaced post
post = '''
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

# !![id] is the format for placing an image component into the post.
!!smnp

Text can continue fine after images!
'''

# TOML Array Tables are used for related photos.
[[photos]]

# Photo id
id = "smnp"

# Extension-less photo path, working directory from /posts/photos
path = "1/smokeymountainsnationalpark"

# Caption for photo
caption = "Smokey Mountain National Park"
```
