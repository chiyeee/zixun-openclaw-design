---
name: amazon-keyword-research
description: "Amazon keyword research for sellers. Retrieve autocomplete suggestions (long-tail keywords), analyze competitor landscape, and assess market opportunity for any keyword on Amazon US/UK/DE/JP/CA/AU and 6 more marketplaces. No API key required. Use when: (1) researching Amazon product ideas or niches, (2) finding long-tail keyword opportunities from Amazon autocomplete, (3) analyzing keyword competition on Amazon (number of results, price range, ratings, top brands), (4) checking seasonal search trends for a product category, (5) comparing multiple Amazon keywords, (6) evaluating market entry difficulty for a keyword."
metadata: {"clawdbot":{"emoji":"🔍"}}
---

# Amazon Keyword Research 🔍

Free keyword research for Amazon sellers. No API key — works out of the box.

## Workflow

### Step 1: Gather Autocomplete Data

Run the bundled script to collect Amazon autocomplete suggestions:

```bash
<skill>/scripts/research.sh "<keyword>" [marketplace]
```

- Marketplaces: `us` (default), `uk`, `de`, `fr`, `it`, `es`, `jp`, `ca`, `au`, `in`, `mx`, `br`
- Returns 100-200 long-tail keywords via seed + prefix expansion ("best", "cheap", "top") + a-z alphabet expansion
- Output is plain text, one keyword per line

Example:
```bash
<skill>/scripts/research.sh "portable blender" us
```

### Step 2: Analyze Competition

After collecting autocomplete data, use `web_search` to gather competitor intelligence for the seed keyword:

1. Search `site:amazon.com "<keyword>"` — note total result count
2. Search `"<keyword>" amazon review price` — extract price range, rating patterns, top brands from snippets
3. Identify dominant brands, average price range, and review counts from search results

### Step 3: Check Seasonality

Use `web_fetch` to pull Google Trends data:

```
https://trends.google.com/trends/explore?q=<keyword>&geo=US
```

Note the 12-month trend shape: rising, declining, seasonal peaks, or stable.

### Step 4: Synthesize Report

Combine all data into a structured report:

- **Seed Keyword** and marketplace
- **Long-tail Keywords**: Grouped by intent (informational, commercial, comparison)
- **Competition Snapshot**: Result count, price range, average rating, FBA ratio, top brands
- **Seasonality**: Trend direction and peak months
- **Opportunity Score (1-10)**: Based on competition density, price room, and demand signals. Explain the reasoning.

## Multi-Keyword Comparison

When comparing keywords, run the script for each keyword, then present a side-by-side table:

| Metric | Keyword A | Keyword B |
|--------|-----------|-----------|
| Autocomplete count | — | — |
| Avg price | — | — |
| Top brand dominance | — | — |
| Seasonality | — | — |
| Opportunity score | — | — |

## Limitations

This skill uses publicly available data (Amazon autocomplete + web search). It does not provide exact monthly search volumes or sales estimates. For precise data, the Pro version powered by Nexscope is coming soon.

---

**Part of the [Nexscope](https://github.com/nexscope-ai) suite — AI-powered Amazon seller tools.**
