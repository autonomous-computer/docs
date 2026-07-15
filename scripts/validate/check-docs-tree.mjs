#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const docsJsonPath = path.join(root, "docs.json")

const retiredPages = [
  {
    source: "/index-constituents",
    destination: "/market-data",
    files: ["index-constituents.mdx", "index-constituents/index.mdx"],
  },
]

function fail(message) {
  console.error(message)
  process.exitCode = 1
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function normalizeRoute(route) {
  if (typeof route !== "string") return null
  const trimmed = route.trim()
  if (!trimmed || /^[a-z][a-z0-9+.-]*:/i.test(trimmed) || trimmed.startsWith("#")) return null
  const withoutLeadingSlash = trimmed.replace(/^\/+/, "")
  const withoutTrailingSlash = withoutLeadingSlash.replace(/\/+$/, "")
  return withoutTrailingSlash ? `/${withoutTrailingSlash}` : "/"
}

function routeCandidates(route) {
  const normalized = normalizeRoute(route)
  if (!normalized) return []
  const relative = normalized === "/" ? "index" : normalized.slice(1)
  return [
    path.join(root, `${relative}.mdx`),
    path.join(root, relative, "index.mdx"),
    path.join(root, relative),
  ]
}

function routeExists(route) {
  return routeCandidates(route).some((candidate) => fs.existsSync(candidate))
}

function collectNavigationRoutes(docsJson) {
  const routes = new Set()

  function visitPages(pages) {
    for (const page of pages ?? []) {
      if (typeof page === "string") {
        const route = normalizeRoute(page)
        if (route) routes.add(route)
      } else if (page && typeof page === "object") {
        const rootRoute = normalizeRoute(page.root)
        if (rootRoute) routes.add(rootRoute)
        visitPages(page.pages)
      }
    }
  }

  for (const tab of docsJson.navigation?.tabs ?? []) {
    for (const group of tab.groups ?? []) {
      const rootRoute = normalizeRoute(group.root)
      if (rootRoute) routes.add(rootRoute)
      visitPages(group.pages)
    }
  }

  return routes
}

function collectRedirects(docsJson) {
  return (docsJson.redirects ?? []).map((redirect) => ({
    source: normalizeRoute(redirect.source),
    destination: normalizeRoute(redirect.destination),
    raw: redirect,
  }))
}

if (!fs.existsSync(docsJsonPath)) {
  fail(`docs.json not found at ${docsJsonPath}`)
} else {
  const docsJson = readJson(docsJsonPath)
  const navRoutes = collectNavigationRoutes(docsJson)
  const redirects = collectRedirects(docsJson)

  const missingNavRoutes = [...navRoutes].filter((route) => !routeExists(route))
  if (missingNavRoutes.length > 0) {
    fail(`Navigation references missing pages: ${missingNavRoutes.join(", ")}`)
  }

  const missingRedirectDestinations = redirects
    .filter((redirect) => redirect.destination)
    .filter((redirect) => !routeExists(redirect.destination))
    .map((redirect) => `${redirect.raw.source} -> ${redirect.raw.destination}`)
  if (missingRedirectDestinations.length > 0) {
    fail(`Redirects point at missing destinations: ${missingRedirectDestinations.join(", ")}`)
  }

  for (const retired of retiredPages) {
    const redirect = redirects.find((candidate) => (
      candidate.source === retired.source && candidate.destination === retired.destination
    ))
    if (!redirect) {
      fail(`Retired page ${retired.source} must redirect to ${retired.destination}`)
    }

    const presentFiles = retired.files.filter((file) => fs.existsSync(path.join(root, file)))
    if (presentFiles.length > 0) {
      fail(`Retired page ${retired.source} still ships source files: ${presentFiles.join(", ")}`)
    }

    if (navRoutes.has(retired.source)) {
      fail(`Retired page ${retired.source} is still present in docs navigation`)
    }
  }

  const payload = {
    object: "docs_tree_validation",
    navRoutes: navRoutes.size,
    redirects: redirects.length,
    retiredPages: retiredPages.map((page) => page.source),
  }

  if (process.exitCode) {
    console.error(JSON.stringify(payload, null, 2))
  } else {
    console.log(JSON.stringify({ ...payload, status: "ok" }, null, 2))
  }
}
