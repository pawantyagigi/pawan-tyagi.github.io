---
title: "Pagination in Sitecore: Understanding Offset vs. Cursor"
description: "When working with APIs that return a lot of data, it’s not practical (or efficient) to get everything in one giant response. That’s where pagination comes in. Sitecore supports two main ways of handling this: offset"
keywords: "@sitecore xmc, sitecore, sitecore search"
metaDescription: "When working with APIs that return a lot of data, it’s not practical (or efficient) to get everything in one giant response. That’s where pagination comes in. Sitecore supports two main ways of handling this: offset"
featuredImage: /uploads/banner-pagination-offset-vs-cursor.png
slug: pagination-in-sitecore-understanding-offset-vs-cursor
date: June 29, 2025 3:58 PM
modifiedDate: September 7, 2026 5:45 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/06/pagination-in-sitecore-understanding.html"
tags:
  - tag: sitecore-xm-cloud
  - tag: sitecore
  - tag: sitecore-search
---
When working with APIs that return a lot of data, it’s not practical (or efficient) to get everything in one giant response. That’s where pagination comes in. Sitecore supports two main ways of handling this: offset-based and cursor-based pagination. Let’s break these down and see how you can use them in Sitecore.

### What Is Pagination?

Imagine you’re browsing a huge list of users or products. Instead of loading all 10,000 items at once, the system gives you smaller "pages"—maybe 100 at a time. This is pagination, and it makes things faster and easier to manage.

* * *

### Offset-Based Pagination

### How it works:

Offset-based pagination is like flipping through pages in a book. You ask for page 1, then page 2, then page 3, and so on.

Example API call:

```
https://example.com/api/users?pageSize=100&currentPage=1
```

### Sample API Response:

```
{
  "totalItems": 1000,
  "pageSize": 100,
  "currentPage": 1,
  "data": [ ... ]
}
```

### How to set it up in Sitecore:

In Sitecore, you can write a Request Extractor to automatically build the URLs for the next pages:

```
function extract(request, response) {
    const totalItems = response.body?.totalItems;
    const pageSize = response.body?.pageSize;
    const currentPage = response.body?.currentPage;

    const totalPages = Math.ceil(totalItems / pageSize);
    const urls = [];

    for (let i = currentPage + 1; i <= totalPages; i++) {
        urls.push({
            method: 'GET',
            url: `https://example.com/api/users?pageSize=${pageSize}&currentPage=${i}`,
            headers: request.headers
        });
    }

    return urls;
}
```

This script figures out how many more pages there are and builds the requests for each one.

* * *

### Cursor-Based Pagination

### How it works:

Instead of counting pages, the server tells you where to go next using a "cursor"—usually a token like nextPageToken or lastItemId.

Example API call:

```
https://example.com/api/users?cursor=abc123
```

### Sample API Response:

```
{
  "nextPageToken": "abc123",
  "data": [ ... ]
}
```

### How to set it up in Sitecore:

You can use this simple Request Extractor:

```
function extract(request, response) {
    const cursor = response.body?.nextPageToken;

    if (cursor) {
        return [{
            method: 'GET',
            url: `https://example.com/api/users?cursor=${cursor}`,
            headers: request.headers
        }];
    }
    return [];
}
```

If the API provides a cursor, Sitecore queues the next request using that token. When there's no more cursor, you're done.

* * *

### Extra Tip: Using Request Extractors and URL Matchers

Sometimes, you might need to go beyond just pagination—for example, fetching details for each user in the list. That’s where Request Extractors and URL Matchers come in handy. They help you build additional requests based on the API response and filter out the ones you don’t need.

  

Happy Coding!
