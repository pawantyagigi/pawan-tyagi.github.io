---
title: "Implementing a Feed Crawler in Sitecore Search with SFTP"
description: "Implementing a Feed Crawler in Sitecore with SFTP body { font family: Arial, sans serif; line height: 1.6; margin: 20px; padding: 20px; } h1, h2, h3 { color: 333; } code { background color: f4f4f4; padding: 3px; border"
keywords: "Feed crawler, sitecore search"
metaDescription: "Implementing a Feed Crawler in Sitecore with SFTP body { font family: Arial, sans serif; line height: 1.6; margin: 20px; padding: 20px; } h1, h2, h3 { color: 333; } code { background color: f4f4f4; padding: 3px; border"
featuredImage: /uploads/banner-sitecore-search-feed-crawler-sftp.png
slug: implementing-a-feed-crawler-in-sitecore-search-with-sftp
date: March 3, 2025 5:01 PM
modifiedDate: September 7, 2026 5:45 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/03/implementing-feed-crawler-in-sitecore.html"
tags:
  - tag: sitecore-search
---
Implementing a Feed Crawler in Sitecore with SFTP body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; padding: 20px; } h1, h2, h3 { color: #333; } code { background-color: #f4f4f4; padding: 3px; border-radius: 4px; } pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }

# Setting Up a Feed Crawler in Sitecore with SFTP

## Introduction

A feed crawler is essential for fetching and indexing external data sources into Sitecore. Whether integrating product catalogs, news articles, or structured data from an external system, Sitecore’s feed crawler enables seamless content synchronization. This guide will walk you through setting up a feed crawler in Sitecore using **SFTP** as the data source.

## Prerequisites

-   Access to Sitecore CMS (XM Cloud or XP)
-   Knowledge of Sitecore Content Search and Indexing
-   SFTP server credentials (hostname, username, password, or SSH key)
-   External data source (CSV, JSON on an SFTP server)

## Step 1: Define the Feed Source

Before setting up the crawler, ensure that the feed file is structured correctly and accessible via SFTP.

### Example JSON Feed Structure

```
{"id": "1", "name": "Harry Potter", "city": "London", "type": "Test"}
{"id": "2", "name": "Don Quixote", "city": "Madrid", "type": "Test"}
{"id": "3", "name": "Joan of Arc", "city": "Paris", "type": "Test"}
{"id": "4", "name": "Rosa Parks", "city": "Alabama", "type": "Test"}
{"id": "5", "name": "Ram", "city": "London", "type": "Test"}
{"id": "6", "name": "Don", "city": "Madrid", "type": "Test"}
{"id": "8", "name": "Joan D", "city": "Madrid", "type": "Test"}
{"id": "10", "name": "Rosa Don", "city": "Emeia", "type": "Test"}
```

### Example SFTP File Structure

```
/upload/
    test.json
```

## Step 2: SFTP Upload Directory Setup

We have successfully created the **"upload"** directory, which will act as the upload location for the feed files.

## Step 3: Configure the Sitecore Feed Crawler with SFTP

1.  Navigate to **Sitecore Search Admin > Crawlers**.
2.  Click **Add New Crawler**.
3.  Select **Feed Crawler**.
4.  Configure the feed source:
    -   **Protocol:** SFTP
    -   **Host:** sftp.example.com
    -   **Port:** 22
    -   **Username & Password** (or SSH Key Authentication)
    -   **Remote Path:** /upload/test.json
    -   **Schedule:** Daily, Hourly, or Custom Interval
5.  Define **Data Mapping** to match feed fields to Sitecore fields.
6.  Save and start the crawl.

## Step 4: Ensuring Proper Feed Formatting

-   Feed files should be structured as one JSON object per line.
-   The document extractor function should return an array of objects.

```

```

-   Example JavaScript Extractor:

```
return [JSON.parse(line)];
```

```

```

## Step 5: Troubleshooting Indexing Errors

If you encounter an error such as:

```
Internal Server Error
Validation Error: The number of indexed documents should be bigger than 0
```

Follow these steps:

-   Ensure that the JSON file is correctly formatted.
-   Verify that the file is uploaded to the correct directory.
-   Check the **Document Extractor** settings.
-   Confirm that transformers are properly configured.

## Limitations

The **Analytic Dashboard** currently does not support Feed Crawler visibility. A feature request has been submitted for future consideration.

## Conclusion

Using SFTP for feed crawling in Sitecore allows for secure and automated content ingestion. By leveraging Sitecore Search organizations can efficiently manage external data sources while maintaining data security.
