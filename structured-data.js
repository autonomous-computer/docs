(function () {
  var docsOrigin = "https://docs.secapi.ai";
  var marketingOrigin = "https://secapi.ai";

  var pages = {
    "/plans-and-pricing": {
      type: "WebPage",
      title: "Plans and pricing",
      description: "Understand SEC API plans, free sandbox access, pay-as-you-go pricing, committed tiers, billing headers, and agent budget controls.",
      breadcrumb: ["Plans and pricing"],
      sameAs: [marketingOrigin + "/pricing", marketingOrigin + "/pricing.md"],
    },
    "/products/filing-search": {
      type: "Service",
      serviceType: "SEC filing search API",
      title: "EDGAR Filing Search API",
      description: "Search SEC filings by ticker, CIK, form type, date range, and full-text query with source-preserving results for applications and agents.",
      breadcrumb: ["Products", "EDGAR Filing Search API"],
      sameAs: [marketingOrigin + "/apis/filing-search", marketingOrigin + "/features/filing-search"],
    },
    "/mcp-workflows": {
      type: "TechArticle",
      title: "MCP workflows",
      description: "Use SEC API's hosted MCP server to give AI agents authenticated filing search, retrieval, ownership, and evidence-preserving tools.",
      breadcrumb: ["Hosted MCP", "MCP workflows"],
      sameAs: [marketingOrigin + "/agents/sec-filings-mcp-server"],
    },
    "/seo/sec-filing-search-api": {
      type: "TechArticle",
      title: "SEC Filing Search API",
      description: "Search SEC filings by company, form type, date range, and content with keyword and semantic search workflows.",
      breadcrumb: ["API guides by topic", "SEC Filing Search API"],
      sameAs: [marketingOrigin + "/apis/filing-search"],
    },
    "/seo/xbrl-api": {
      type: "TechArticle",
      title: "XBRL API",
      description: "Retrieve normalized XBRL facts and financial statement data from SEC filings for analytics, screening, and AI workflows.",
      breadcrumb: ["API guides by topic", "XBRL API"],
      sameAs: [marketingOrigin + "/apis/statements-and-facts", marketingOrigin + "/glossary/xbrl"],
    },
    "/seo/13f-data-api": {
      type: "TechArticle",
      title: "13F Data API",
      description: "Retrieve institutional holdings, manager filings, and quarter-over-quarter ownership changes from SEC Form 13F data.",
      breadcrumb: ["API guides by topic", "13F Data API"],
      sameAs: [marketingOrigin + "/apis/ownership", marketingOrigin + "/glossary/13f"],
    },
    "/seo/insider-trading-api": {
      type: "TechArticle",
      title: "Insider Trading API",
      description: "Monitor Form 3, Form 4, and Form 5 insider transactions with source links and structured ownership metadata.",
      breadcrumb: ["API guides by topic", "Insider Trading API"],
      sameAs: [marketingOrigin + "/apis/insiders", marketingOrigin + "/workflows/insider-trading-monitor"],
    },
    "/tutorials/build-sec-filing-monitor-agent": {
      type: "HowTo",
      title: "Build a SEC filing monitor agent",
      description: "Build an AI agent that monitors SEC filings, retrieves the right evidence, and preserves source metadata in the final answer.",
      breadcrumb: ["Build an agent", "Build a SEC filing monitor agent"],
      sameAs: [marketingOrigin + "/workflows/risk-factor-drift-agent"],
    },
    "/tutorials/build-13f-tracker-agent": {
      type: "HowTo",
      title: "Build a 13F tracker agent",
      description: "Build an agent that tracks institutional portfolio changes from 13F filings and summarizes quarter-over-quarter changes.",
      breadcrumb: ["Build an agent", "Build a 13F tracker agent"],
      sameAs: [marketingOrigin + "/workflows/13f-monitor-agent"],
    },
    "/tutorials/semantic-search-risk-factors": {
      type: "HowTo",
      title: "Semantic search for risk factors",
      description: "Use semantic search to find, compare, and cite risk-factor language across SEC filings.",
      breadcrumb: ["Tutorials", "Semantic search for risk factors"],
      sameAs: [marketingOrigin + "/workflows/risk-factor-drift-agent", marketingOrigin + "/guides/sec-filing-rag"],
    },
    "/compare-sec-api": {
      type: "WebPage",
      title: "Compare SEC API alternatives",
      description: "Compare SEC API against sec-api.io for filing search, extraction, pricing, agent workflows, and migration planning.",
      breadcrumb: ["Compare", "Compare SEC API alternatives"],
      sameAs: [marketingOrigin + "/compare/sec-api-io-alternative"],
    },
    "/compare-edgartools": {
      type: "WebPage",
      title: "Compare SEC API and EdgarTools",
      description: "Compare hosted SEC API workflows with the open-source EdgarTools Python library for research and production systems.",
      breadcrumb: ["Compare", "Compare SEC API and EdgarTools"],
      sameAs: [marketingOrigin + "/compare/edgartools-alternative"],
    },
  };

  function normalizedPath() {
    var dataPath = document.documentElement.getAttribute("data-current-path");
    var path = dataPath || location.pathname || "/";
    return path.replace(/\/+$/, "") || "/";
  }

  function absolute(path) {
    return docsOrigin + path;
  }

  function breadcrumb(page, path) {
    var entries = [{ name: "Docs", path: "/" }];
    for (var i = 0; i < page.breadcrumb.length; i += 1) {
      entries.push({ name: page.breadcrumb[i], path: i === page.breadcrumb.length - 1 ? path : null });
    }
    return {
      "@type": "BreadcrumbList",
      itemListElement: entries.map(function (item, index) {
        var listItem = {
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
        };
        if (item.path) listItem.item = absolute(item.path);
        return listItem;
      }),
    };
  }

  function primaryEntity(page, path) {
    var base = {
      "@type": page.type,
      "@id": absolute(path) + "#primary",
      name: page.title,
      headline: page.title,
      description: page.description,
      url: absolute(path),
      isPartOf: { "@id": docsOrigin + "/#website" },
      publisher: { "@id": marketingOrigin + "/#organization" },
    };

    if (page.type === "Service") {
      base.provider = { "@id": marketingOrigin + "/#organization" };
      base.serviceType = page.serviceType || "SEC data API";
      base.areaServed = "US public company filings and capital markets workflows";
    }

    if (page.type === "HowTo") {
      base.totalTime = "PT30M";
      base.supply = [
        { "@type": "HowToSupply", name: "SEC API key" },
        { "@type": "HowToSupply", name: "SEC filing or company workflow target" },
      ];
      base.tool = [
        { "@type": "HowToTool", name: "SEC API REST endpoints" },
        { "@type": "HowToTool", name: "SEC API MCP server" },
      ];
    }

    if (page.sameAs) base.sameAs = page.sameAs;
    return base;
  }

  function buildGraph(page, path) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": marketingOrigin + "/#organization",
          name: "secapi.ai",
          url: marketingOrigin + "/",
          logo: marketingOrigin + "/secapi-logo-lightmode.svg",
        },
        {
          "@type": "WebSite",
          "@id": docsOrigin + "/#website",
          name: "SEC API for AI Docs",
          url: docsOrigin + "/",
          description: "Documentation for SEC filing, company, ownership, market, and intelligence APIs for developers and agents.",
          publisher: { "@id": marketingOrigin + "/#organization" },
        },
        breadcrumb(page, path),
        primaryEntity(page, path),
      ],
    };
  }

  var path = normalizedPath();
  var page = pages[path];
  if (!page || document.querySelector("script[data-secapi-docs-structured-data]")) return;

  var script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-secapi-docs-structured-data", path);
  script.text = JSON.stringify(buildGraph(page, path));
  document.head.appendChild(script);
})();
