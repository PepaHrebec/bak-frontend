/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignInImport } from './routes/sign-in'
import { Route as LogInImport } from './routes/log-in'
import { Route as InvertedImport } from './routes/inverted'
import { Route as IndexImport } from './routes/index'
import { Route as ListIndexImport } from './routes/list/index'
import { Route as ListRegularImport } from './routes/list/regular'
import { Route as ListInvertedImport } from './routes/list/inverted'

// Create/Update Routes

const SignInRoute = SignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const LogInRoute = LogInImport.update({
  id: '/log-in',
  path: '/log-in',
  getParentRoute: () => rootRoute,
} as any)

const InvertedRoute = InvertedImport.update({
  id: '/inverted',
  path: '/inverted',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ListIndexRoute = ListIndexImport.update({
  id: '/list/',
  path: '/list/',
  getParentRoute: () => rootRoute,
} as any)

const ListRegularRoute = ListRegularImport.update({
  id: '/list/regular',
  path: '/list/regular',
  getParentRoute: () => rootRoute,
} as any)

const ListInvertedRoute = ListInvertedImport.update({
  id: '/list/inverted',
  path: '/list/inverted',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/inverted': {
      id: '/inverted'
      path: '/inverted'
      fullPath: '/inverted'
      preLoaderRoute: typeof InvertedImport
      parentRoute: typeof rootRoute
    }
    '/log-in': {
      id: '/log-in'
      path: '/log-in'
      fullPath: '/log-in'
      preLoaderRoute: typeof LogInImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInImport
      parentRoute: typeof rootRoute
    }
    '/list/inverted': {
      id: '/list/inverted'
      path: '/list/inverted'
      fullPath: '/list/inverted'
      preLoaderRoute: typeof ListInvertedImport
      parentRoute: typeof rootRoute
    }
    '/list/regular': {
      id: '/list/regular'
      path: '/list/regular'
      fullPath: '/list/regular'
      preLoaderRoute: typeof ListRegularImport
      parentRoute: typeof rootRoute
    }
    '/list/': {
      id: '/list/'
      path: '/list'
      fullPath: '/list'
      preLoaderRoute: typeof ListIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/inverted': typeof InvertedRoute
  '/log-in': typeof LogInRoute
  '/sign-in': typeof SignInRoute
  '/list/inverted': typeof ListInvertedRoute
  '/list/regular': typeof ListRegularRoute
  '/list': typeof ListIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/inverted': typeof InvertedRoute
  '/log-in': typeof LogInRoute
  '/sign-in': typeof SignInRoute
  '/list/inverted': typeof ListInvertedRoute
  '/list/regular': typeof ListRegularRoute
  '/list': typeof ListIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/inverted': typeof InvertedRoute
  '/log-in': typeof LogInRoute
  '/sign-in': typeof SignInRoute
  '/list/inverted': typeof ListInvertedRoute
  '/list/regular': typeof ListRegularRoute
  '/list/': typeof ListIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/inverted'
    | '/log-in'
    | '/sign-in'
    | '/list/inverted'
    | '/list/regular'
    | '/list'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/inverted'
    | '/log-in'
    | '/sign-in'
    | '/list/inverted'
    | '/list/regular'
    | '/list'
  id:
    | '__root__'
    | '/'
    | '/inverted'
    | '/log-in'
    | '/sign-in'
    | '/list/inverted'
    | '/list/regular'
    | '/list/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  InvertedRoute: typeof InvertedRoute
  LogInRoute: typeof LogInRoute
  SignInRoute: typeof SignInRoute
  ListInvertedRoute: typeof ListInvertedRoute
  ListRegularRoute: typeof ListRegularRoute
  ListIndexRoute: typeof ListIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  InvertedRoute: InvertedRoute,
  LogInRoute: LogInRoute,
  SignInRoute: SignInRoute,
  ListInvertedRoute: ListInvertedRoute,
  ListRegularRoute: ListRegularRoute,
  ListIndexRoute: ListIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/inverted",
        "/log-in",
        "/sign-in",
        "/list/inverted",
        "/list/regular",
        "/list/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/inverted": {
      "filePath": "inverted.tsx"
    },
    "/log-in": {
      "filePath": "log-in.tsx"
    },
    "/sign-in": {
      "filePath": "sign-in.tsx"
    },
    "/list/inverted": {
      "filePath": "list/inverted.tsx"
    },
    "/list/regular": {
      "filePath": "list/regular.tsx"
    },
    "/list/": {
      "filePath": "list/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
