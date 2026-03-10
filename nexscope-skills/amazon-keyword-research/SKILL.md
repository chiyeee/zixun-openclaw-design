---
name: amazon-keyword-research
description: "Amazon keyword research tool for sellers. Analyzes any keyword on Amazon US/UK/DE/JP and returns: search autocomplete suggestions (long-tail keywords), competitor landscape (product count, price range, rating distribution, top brands), Google Trends seasonality data, and a market opportunity score. No API key required — works out of the box. Use when: (1) researching new product ideas, (2) finding long-tail keyword opportunities, (3) analyzing keyword competition level, (4) checking seasonal trends for a product category, (5) evaluating market entry difficulty."
metadata: {"clawdbot":{"emoji":"🔍"}}
---

# Amazon Keyword Research 🔍

Free Amazon keyword research for sellers. No API key needed — works out of the box.

## What It Does

Give it any keyword, and it returns:

1. **Long-tail Keywords** — Amazon autocomplete suggestions for your seed keyword (what real shoppers type)
2. **Competitor Landscape** — Product count, price range, average rating, review counts, and top brands from Amazon search results
3. **Seasonal Trends** — Google Trends data showing search interest over the past 12 months
4. **Market Opportunity Score** — A calculated score based on competition, demand signals, and price room

## Usage

Just ask naturally:

```
Research the keyword "portable blender" on Amazon US
```

```
Analyze "yoga mat" keyword for Amazon — include long-tail suggestions and competition level
```

```
I want to sell resistance bands on Amazon. What does the keyword landscape look like?
```

```
Compare keywords: "laptop stand" vs "monitor stand" on Amazon US
```

### Multi-Market Support

```
Research "Küchenmesser" on Amazon Germany
```

```
Analyze "water bottle" across Amazon US, UK, and DE
```

## How It Works

This skill uses publicly available data sources — no paid API required:

- **Amazon Autocomplete API** — Real search suggestions from Amazon's own suggestion engine
- **Amazon Search Results** — Live product data from Amazon's storefront via web search
- **Google Trends** — Search interest trends and seasonality patterns

The skill's analysis script (`scripts/research.sh`) gathers data from these sources, then the agent synthesizes everything into an actionable keyword report.

## Output Format

The report includes:

- **Seed Keyword**: Your input keyword
- **Market**: Amazon US (or specified marketplace)
- **Long-tail Keywords**: 20-40 related search terms from Amazon autocomplete
- **Competition Snapshot**: Number of results, average price, average rating, FBA vs FBM ratio
- **Top Brands**: Dominant brands in the search results
- **Price Distribution**: Price range breakdown
- **Seasonality**: 12-month trend graph description and peak months
- **Opportunity Score**: 1-10 rating with explanation

## Limitations

This is the free version using publicly available data. For precise monthly search volumes, exact sales estimates, and keyword-level traffic data, consider upgrading to the Pro version powered by Nexscope (coming soon).

---

**Part of the [Nexscope](https://github.com/nexscope-ai) suite — AI-powered tools for Amazon sellers.**
