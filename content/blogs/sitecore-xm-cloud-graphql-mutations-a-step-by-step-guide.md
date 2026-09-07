---
title: "Sitecore XM Cloud GraphQL Mutations: A Step-by-Step Guide"
description: "Sitecore XM Cloud GraphQL Mutations: A Step by Step Guide Sitecore XM Cloud uses GraphQL (GQL) to query content effectively. With mutations, you can add, modify, and remove items programmatically. This guide discusses"
keywords: "Sitecore, XM Cloud, Sitecore XP, Web Development"
metaDescription: "Sitecore XM Cloud GraphQL Mutations: A Step by Step Guide Sitecore XM Cloud uses GraphQL (GQL) to query content effectively. With mutations, you can add, modify, and remove items programmatically. This guide discusses"
featuredImage: /uploads/banner-xm-cloud-graphql-mutations.png
slug: sitecore-xm-cloud-graphql-mutations-a-step-by-step-guide
date: April 19, 2025 9:05 PM
modifiedDate: September 7, 2026 5:45 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/04/sitecore-xm-cloud-graphql-mutations.html"
tags:
  - tag: sitecore
  - tag: sitecore-xm-cloud
---
**Sitecore XM Cloud GraphQL Mutations: A Step-by-Step Guide**

Sitecore XM Cloud uses GraphQL (GQL) to query content effectively. With mutations, you can add, modify, and remove items programmatically. This guide discusses fundamental GraphQL mutations for dynamically managing Sitecore content.

### Creating an Item in Sitecore XM Cloud

Create a new item at a given parent path using the createItem mutation.

Example Mutation:

```
mutation {
  createItem(
    parentPath: "/sitecore/content/Home"
    name: "NewItem"
    templateId: "76036f5e-cbce-46d1-af0a-4143f9b557aa" # Your template ID
  ) {
    item {
      id
      name
      path
    }
  }
}
```

This will update an existing item at /sitecore/content/Home. The fields of the item will be updated with the values provided in the patch.

  

### Updating an Item's Fields

To change the field values of an existing item, employ the updateItem mutation.

Example Mutation:

```
mutation {
  updateItem(
    path: "/sitecore/content/Home/NewItem"
    fields: [{ name: "Title", value: "Updated Title" }]
  ) {
    item
    id
    name
    fields {
      name
      value
    }
  }
}
```

This removes the Title field of the NewItem item.

### Deleting an Item

To delete an item from Sitecore, use the deleteItem mutation.

Example Mutation:

```
mutation {
  deleteItem(path: "/sitecore/content/Home/NewItem") {
    deletedItemId
  }
}
```

This removes the item at /sitecore/content/Home/NewItem.

### Creating a Template Item

If you're creating an item from a certain template, make sure you supply the proper templateId.

Example Mutation:

```
mutation {
  createItem(
    parentPath: "/sitecore/content/Home"

    name: "BlogPost"

    templateId: "your-template-id-here"
  ) {
    item {
      id

      name

      path
    }
  }
}
```

This creates a new BlogPost item under /sitecore/content/Home using the specified template.

### Uploading a Media Item

Add a media file to the Sitecore Media Library using the createItem mutation under the media path.

Example Mutation:

```
mutation {
  createItem(
    parentPath: "/sitecore/media library/Images"

    name: "NewImage"

    templateId: "your-media-template-id"
  ) {
    item {
      id

      name

      path
    }
  }
}
```

This creates a new media item under /sitecore/media library/Images.

### Conclusion

Applying GraphQL mutations in Sitecore XM Cloud enables developers to update content dynamically without directly going to the Content Editor. Creating new items, modifying fields, deleting content, or uploading media – GraphQL gives you a straightforward means of dealing with Sitecore's headless CMS.

For more details, check out the official Sitecore documentation:

🔗 [Query Examples for Authoring Operations](https://doc.sitecore.com/xmc/en/developers/xm-cloud/query-examples-for-authoring-operations.html#query-examples)

Let me know if you'd like any other tweaks! 😊
