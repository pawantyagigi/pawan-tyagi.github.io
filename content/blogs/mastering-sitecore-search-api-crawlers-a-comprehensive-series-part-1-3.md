---
title: "Mastering Sitecore Search API Crawlers: A Comprehensive Series (Part 1-3)"
description: "Sitecore Search is an integral part of the Sitecore Experience Platform (XP) that helps businesses deliver highly personalized and relevant search experiences. One of the most powerful features of Sitecore Search is its"
keywords: "Api crawling, sitecore, sitecore search"
metaDescription: "Sitecore Search is an integral part of the Sitecore Experience Platform (XP) that helps businesses deliver highly personalized and relevant search experiences. One of the most powerful features of Sitecore Search is its"
featuredImage: /uploads/banner-sitecore-search-api-crawlers.png
slug: mastering-sitecore-search-api-crawlers-a-comprehensive-series-part-1-3
date: February 16, 2025 8:54 PM
modifiedDate: September 7, 2026 5:45 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/02/mastering-sitecore-search-api-crawlers.html"
tags:
  - tag: sitecore-search
  - tag: sitecore
---
## Mastering Sitecore Search API Crawlers

Sitecore Search is an integral part of the Sitecore Experience Platform (XP) that helps businesses deliver highly personalized and relevant search experiences. One of the most powerful features of Sitecore Search is its ability to index external data sources, such as APIs, to provide dynamic content in search results. In this guide, we’ll explore the ins and outs of using **Sitecore's API Crawler**—a tool that helps index API data—and show you how to implement it for seamless integration.

Whether you're a developer new to Sitecore or someone looking to improve your Sitecore Search implementation, this guide will take you through essential configurations, indexing scenarios, and advanced pagination techniques that will help you build powerful search experiences.

  

### Table of Content

-   What is Sitecore Search and API Crawling?

-   Key Concepts You Should Know

-   Setting Up Sitecore API Crawler for Basic Indexing

-   Understanding Pagination: Offset vs. Cursor

-   How to Implement Offset-Based Pagination

-   How to Implement Cursor-Based Pagination

-   Using Request Extractors and URL Matchers

-   Advanced Techniques: Handling MAX DEPTH and Data Indexing

-   Conclusion

  

### What is Sitecore Search and API Crawling?

**Sitecore Search** is a powerful search engine built into the Sitecore Experience Platform. It helps manage content and deliver personalized, relevant search results to your users. With Sitecore Search, you can index content from various data sources, including Sitecore-managed content and external APIs.

When you need to index content from an API, **API Crawlers** come into play. API Crawlers allow Sitecore Search to communicate with external APIs, extract data, and make it searchable on your site. This is particularly useful when your content resides in third-party systems or databases, rather than being directly managed within Sitecore.

  

### Key Concepts You Should Know

Before we dive deeper into the configurations, let’s review some essential concepts that will help you understand how Sitecore’s API Crawling works:

-   **Source**: A source in Sitecore defines the connection between the crawler and your data. For instance, you might have an API source configured to pull data from a third-party API.
    
-   **Attributes**: These are the data fields within your API response that you want to index. **For example:** id, name, street, city, state, zipcode, phone\_number, extension , webaddress, sites, type etc.
    
-   **Indexing**: This refers to the process of retrieving data from your source (API) and making it available for search. Sitecore will crawl the data, extract the relevant information, and build an index.
    
-   **Request Extractor**: A tool that dynamically constructs URLs based on your API response. This is especially useful when you're dealing with paginated data.
    
-   **Pagination**: When your API data is spread across multiple pages, you need a way to retrieve each page in sequence. There are two main types of pagination you can use in Sitecore: **offset-based** and **cursor-based** pagination.
    

## Setting Up Sitecore API Crawler for Basic Indexing

Let's start by setting up a simple API crawler that doesn’t require pagination. This means we’ll retrieve all the data from an API in a single call.

  

### Example API Response (Without Pagination):

Imagine an API that returns user data in the following structure:

```
{
  "totalItems": 20,
  "pageSize": 100,
  "currentPage": 1,
  "data": [    {        "Orgid": 1,        "name": "Tech Solutions HQ",        "street": "123 Innovation Drive",        "city": "San Francisco",        "state": "CA",        "zip": "94107",        "phone": "(415) 555-1234",        "extension": "101",        "website": "https://www.techsolutions.com",        "sites": [            "Main Office",            "West Coast Branch"        ],        "type": "Corporate Office"    },    {        "Orgid": 2,        "name": "Digital Labs",        "street": "456 AI Lane",        "city": "New York",        "state": "NY",        "zip": "10001",        "phone": "(212) 555-5678",        "extension": "202",        "website": "https://www.digitallabs.com",        "sites": [            "Research Center",            "Innovation Hub"        ],        "type": "R&D Facility"    },    {        "Orgid": 3,        "name": "Green Energy Solutions",        "street": "789 Solar Road",        "city": "Austin",        "state": "TX",        "zip": "73301",        "phone": "(512) 555-7890",        "extension": "303",        "website": "https://www.greenenergy.com",        "sites": [            "Solar Farm",            "Wind Turbine Field"        ],        "type": "Energy Company"    }
  ]
}
```

```

```

```
This API returns a list of users, with their ID, name, street, city, state, zipcode, phone_number, extension , webaddress, sites, type. Since this example does not use pagination, we can index all the users at once.Step 1: Create Custom Attributes in Sitecore SearchBefore indexing the data, you need to define custom attributes in Sitecore Search. These attributes represent the data you want to index. For this example, you’ll need attributes like name, street, city, state, zipcode, phone_number, extension , webaddress, sites, type.name(String)street(String)city(String)state(String)zipcode(String)phone_number(String)extension(String)webaddress(String)sites(Strings)type(String)To add these attributes to the system, you must be assigned the TechAdmin role. Navigate to the Administration menu in the sidebar, go to the Attributes tab, and click the Add Attribute button.In the dialog, configure the following fields: Entity, Display Name, Attribute Name (lowercase without spaces), Data Type, and optionally check the Return in API response checkbox to make it visible in search results.In the Use For Features view, you can enable additional features for the attribute, such as faceting and sorting options. When adding the AreaOfInterest attribute, be sure to check the Facets option. Repeat these steps for each field, and don’t forget to publish your changes by clicking the Publish button in the attribute list view.Source Creation in Sitecore SearchTo set up a source in Sitecore Search, you need to review three key documents from the official documentation:SourcesCreate a SourceConfiguring an API CrawlerAdding a SourceNavigate to the Sources view in the sidebar.Click the Add Source button.Configuring the SourceEnter a Source Name and Description.Select API Crawler as the connector.You can customize your source with various settings, such as Authentication and Scan Frequency, to match your needs.Configuring a Trigger in Sitecore SearchA Trigger defines the starting point for the crawler to begin indexing content.Setting Up a TriggerGo to the Trigger section and click Edit.
There are different types of triggers available, allowing you to configure details like the Request Body or Headers.For this example, we’ll keep it simple and use a GET request without additional configuration.Click Save to apply the changes.Configuring the Document ExtractorSince we’re not using a paging mechanism in this setup, we only need to configure a Document Extractor—no need for a Request Extractor.Locate the Document Extractors section and click Edit.Set a Name for the extractor and select JS as the Extractor Type.We don’t need URL Matchers for this case.Why use a JS Extractor instead of JSONPath?JSONPath extractors work well for indexing a single document per request but come with some limitations.A JS Extractor allows for more flexibility, such as transforming string-based dates into timestamps.Once configured, save your changes to complete the setup.Step 2: Configure the API Crawler SourceNext, configure the API Crawler source in Sitecore to start crawling the data. You’ll need to:Define the Source Name: A descriptive name for your API source, like "UserAPI".Set the Trigger: This is the starting point for your crawl. It should be a GET request to the URL of your API, like https://example.com/api/users.Once this is done, Sitecore will start indexing all the data from this API.Step 3: Extract the DataNow, you need to define how Sitecore should extract relevant data from the API response. This is where the Document Extractor comes in. You can use a JavaScript extractor to map the data to the attributes you defined earlier.Here’s an example of a simple JS Extractor:function extract(request, response) {  let requests = [];  const data = response.body;  if (    data  ) {    requests = data?.map((e, i) => {      return {        "id": e.Orgid,        "name": e.name,        "street": e.street,        "city": e.city,        "state": e.state,        "zipcode": e.zip,        "phone_number": e.phone,        "extension": e.extension,        "webaddress": e.website,        "sites": e.sites,        "type": "Level Of Care"      };    });  }  else {    return {      "description": response.body.data,      "id": "ename",      "url": "response.body.data.item.path",      "type": "ERROR",    };  }  return requests;}Saving and Publishing Your SourceAfter configuring the trigger and document extractor, follow these final steps:Click Save to apply your changes.Publish your source to initiate the indexing process.Wait a few minutes for the indexing to complete.If everything is set up correctly, you should see the indexed data in the Source view.To view your indexed documents, navigate to Content Collection in the sidebar. There, you should see all the documents that have been successfully indexed.
```

```
I hope this blog post makes it easier for you to set up and use an API Crawler in Sitecore Search!
```
