---
title: "Removing Edge Content and Purging Edge Cache with Sitecore XM Cloud Admin API"
description: "Edge database removal and Edge cache purging through the Admin API of Sitecore XM Cloud could be performed by developers to carry out the necessary Edge related operations and also keeping an optimized environment for"
keywords: "@sitecore xmc, XMC admin api"
metaDescription: "Edge database removal and Edge cache purging through the Admin API of Sitecore XM Cloud could be performed by developers to carry out the necessary Edge related operations and also keeping an optimized environment for"
featuredImage: /uploads/banner-edge-cache-purge-admin-api.png
slug: removing-edge-content-and-purging-edge-cache-with-sitecore-xm-cloud-admin-api
date: March 30, 2025 3:02 PM
modifiedDate: September 7, 2026 5:45 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/03/removing-edge-content-and-purging-edge.html"
tags:
  - tag: sitecore-xm-cloud
---
## Introduction

Edge database removal and Edge cache purging through the Admin API of Sitecore XM Cloud could be performed by developers to carry out the necessary Edge-related operations and also keeping an optimized environment for updating content, testing, and debugging purposes.

In this blog discussion, we'll discuss how to take advantage of the Sitecore XM Cloud Admin API to:

-   Delete the Edge Db.
    
-   Purge Edge Cache.
    

## Prerequisites

Before moving ahead, you need to confirm that you have the following items:

\- An active Sitecore XM Cloud environment

\- Admin API access with appropriate permissions

\- API Key and credentials for authentication

\- A tool, such as Postman, to send API requests

  

### Step 1: Receive Your API Key (Request JWT for Experience Edge XM Using OAuth) 

In order to communicate with the Admin API, you'll need an API key, which can be obtained from the Sitecore XM Cloud portal in the API Management section:

OAuth Endpoint

-   POST a request to the following OAuth endpoint to receive a JWT (JSON Web Token):
    

POST [https://auth.sitecorecloud.io/oauth/token](https://auth.sitecorecloud.io/oauth/token)

Request Headers

-   Usage: Default request headers for the POST method. 
    

Request Body Parameters

-   Below are the set of input parameters in your JWT request:
    

Minimize image

Edit image

Delete image

![](https://media.licdn.com/dms/image/v2/D5612AQEvCumraB9nGA/article-inline_image-shrink_400_744/B56ZXmLdPpGQAY-/0/1743323518447?e=1749081600&v=beta&t=JJrnElnxFUR5mcz2cq-Ppe88cPtKncqPJpT3kggvU34)

  

To request a token:

Request an access token for the Experience Edge APIs using a POST request.

For example, for new tenants, you can request the JWT as follows:

Minimize image

Edit image

Delete image

![](https://media.licdn.com/dms/image/v2/D5612AQE5qg1wIcEJAA/article-inline_image-shrink_400_744/B56ZXmOb72GcAY-/0/1743324299692?e=1749081600&v=beta&t=vYCoIpVlfbVKnpXkYQlOKGKu-w0CQ84TEGTyZqahqVc)

  

Response

The obtained access token has a JSON structure as below:

```
{

  "access_token": "your_access_token_here",

  "token_type": "Bearer",

  "expires_in": 86400

}
```

Important: The expires in property indicates that the token is valid for 24 hours. You must request a new token once it expires.

### Step 2: Remove the Edge Database

By removing the Edge database, you delete all published content in the Edge environment.

Steps to Remove Edge Content

1.  Open Postman (or use cURL) to create a new request.
    
2.  Set request type to DELETE.
    
3.  Enter the request URL:-   [https://edge.sitecorecloud.io/api/admin/v1/content](https://edge.sitecorecloud.io/api/admin/v1/content)
    
4.  Go to the Authorization tab and add: "Bearer Token"
    
5.  Click Send.  
    

Minimize image

Edit image

Delete image

![](https://media.licdn.com/dms/image/v2/D5612AQGrzU0CwVUItQ/article-inline_image-shrink_400_744/B56ZXmSLzjGQAY-/0/1743325282165?e=1749081600&v=beta&t=ZcqQcoqQxGB7a3FtKAL3cSR6nbXM2280SsIkL8vfzdY)

  

Expected Response

If successful, the API will respond back with:

```
{

  "status": "success",

  "message": "Edge content has been deleted."

}
```

### Step 3: Clear the Edge Cache

Clearing the Edge caches would remove the old or incorrect contents allowing fetching new ones. 

Steps to Clear Edge Cache

1\. Open Postman (or use cURL) to create a fresh request.

2\. Set request type to POST.

3\. Enter the request URL:

```
https://edge.sitecorecloud.io/api/admin/v1/cache
```

4\. Go to the Headers tab and add:

```
Authorization: Bearer YOUR_ACCESS_TOKEN

  Content-Type: application/json
```

5\. Click Send.

Minimize image

Edit image

Delete image

![](https://media.licdn.com/dms/image/v2/D5612AQEna2tKg-0M2g/article-inline_image-shrink_400_744/B56ZXmURqAHoAY-/0/1743325830266?e=1749081600&v=beta&t=DzqULRk17BV6z0DOC-ghromE3lBKxA7SvM48ZGhQv9k)

  

Expected Response

If successful, the API will return:

```
{

  "status": "success",

  "message": "Edge cache has been cleared."

}
```

### Step 4: Check Changes

When you have performed these API calls, you can confirm that:

\- Edge GraphQL queries return with the expected results.

\- Republishing content ensures freshness of new data.

\- Logs should not show any errors related to Edge operations.

### Conclusion

With the functionality of the Sitecore XM Cloud Admin API, one could carry out deleting as well clearing the Edge database and Edge cache efficiently. It makes sure that the environment content is always up-to-date, and consistent maintenance of both of them keeps this from happening as well as enhancing overall performance.

For more details, check out the official Sitecore documentation:

🔗 [Sitecore Admin API Documentation](https://doc.sitecore.com/xp/en/developers/101/developer-tools/admin-api.html)

Let me know if you'd like any other tweaks! 😊
