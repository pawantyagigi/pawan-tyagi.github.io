---
title: "Complete Guide: Setting Up Page & DataSource Workflows in Sitecore XM Cloud"
description: "In this article, I’ll walk you through how to set up page and data source workflows that work together using Datasource Workflow Actions—a powerful feature in XM Cloud that keeps everything in sync. Now, when you're"
keywords: "@sitecore xmc"
metaDescription: "In this article, I’ll walk you through how to set up page and data source workflows that work together using Datasource Workflow Actions—a powerful feature in XM Cloud that keeps everything in sync. Now, when you're"
featuredImage: /uploads/banner-xm-cloud-page-datasource-workflows.png
slug: complete-guide-setting-up-page-datasource-workflows-in-sitecore-xm-cloud
date: July 2, 2025 8:13 PM
modifiedDate: September 7, 2026 5:45 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/07/complete-guide-setting-up-page.html"
tags:
  - tag: sitecore-xm-cloud
---
In this article, I’ll walk you through how to set up page and data source workflows that work together using Datasource Workflow Actions—a powerful feature in XM Cloud that keeps everything in sync.

Now, when you're working with pages AND components (like cards, banners, etc.), each one often lives in its own item (commonly called a data source item). These also need reviewing. Without workflows on data sources, you might publish an approved page... with an outdated or unreviewed component.

* * *

### Step 1: Plan the Workflow Structure

You’ll need to set up two separate workflows:

1.  Page Workflow Used for content pages like Home, About Us, Contact, etc.
    
2.  Datasource Workflow Used for supporting content like cards, testimonials, hero banners, etc.
    

Why two? To keep things modular and clean. A banner might be used on multiple pages—you want control over it separately.

* * *

### Step 2: Create Workflow States

Go to: `/sitecore/system/Workflows`

Create folders under this section for your new workflows:

-   Page Workflow
    
-   Datasource Workflow
    

Now inside each, create States. Here’s a common setup:

  

Minimize image

Edit image

Delete image

![](/uploads/blogspot/complete-guide-setting-up-page-datasource-workflows-in-sitecore-xm-cloud-1.png)

  

```
Draft → Awaiting Approval → Approved → Published
```

Each state should also include Commands (like Submit, Approve, Reject), which are what trigger the move between states.

* * *

### Step 3: Create the Commands

Under each state, insert:

-   Submit (Draft → Awaiting Approval)
    
-   Approve (Awaiting Approval → Approved)
    
-   Reject (Awaiting Approval → Draft)
    

  

Minimize image

Edit image

Delete image

![](/uploads/blogspot/complete-guide-setting-up-page-datasource-workflows-in-sitecore-xm-cloud-2.png)

  

You’ll do this for both workflows (Page and DataSource).

* * *

### Step 4: Add the DataSource Workflow Action to Page Commands

Let’s say you want your data source items to move in sync with the page.

Example: When a page goes from Draft → Awaiting Approval, you want the card it uses to also move from Draft → Awaiting Approval.

Minimize image

Edit image

Delete image

![](/uploads/blogspot/complete-guide-setting-up-page-datasource-workflows-in-sitecore-xm-cloud-3.png)

  

To do this:

1.  Go to the Submit command under Page Workflow.
    
2.  Right-click → Insert → Datasource Workflow Action
    
3.  Give it a name, like `Submit Related Components`.
    

This action tells Sitecore, “Also move the associated data sources.”

  

* * *

### Step 5: Configure the Datasource Workflow Action

You’ll now see a few fields to fill in:

Minimize image

Edit image

Delete image

![](/uploads/blogspot/complete-guide-setting-up-page-datasource-workflows-in-sitecore-xm-cloud-4.png)

  

### Command Item

-   This is the matching command in the Datasource Workflow
    
-   For example, if page submits with “Submit”, the datasource should use its own “Submit” command
    
-   Browse to it and link it
    

Minimize image

Edit image

Delete image

![](/uploads/blogspot/complete-guide-setting-up-page-datasource-workflows-in-sitecore-xm-cloud-5.png)

  

### Scope

-   Choose how far the action should apply:
    

Use Descendants for things like grouped navigation items or multi-card blocks.

* * *

### Step 6: Repeat for Approve and Reject

So far, we only linked the Submit command.

Minimize image

Edit image

Delete image

![](/uploads/blogspot/complete-guide-setting-up-page-datasource-workflows-in-sitecore-xm-cloud-6.png)

  

Now repeat the process for:

-   Approve (Page → Approve command on datasource)
    
-   Reject (Page → Reject command on datasource)
    

This keeps both types of content completely in sync.

* * *

### Step 7: Assign Workflows to Templates

### Assign Page Workflow to Page Templates

1.  Open Content Editor
    
2.  Go to your Page Template’s Standard Values
    
3.  Turn on Standard Fields from the View tab
    
4.  Under the Workflow section, set your new Page Workflow
    

  

Minimize image

Edit image

Delete image

![](/uploads/blogspot/complete-guide-setting-up-page-datasource-workflows-in-sitecore-xm-cloud-7.png)

  

### Assign Datasource Workflow to Component Templates (SXA)

Minimize image

Edit image

Delete image

![](/uploads/blogspot/complete-guide-setting-up-page-datasource-workflows-in-sitecore-xm-cloud-8.png)

  

For SXA:

1.  Navigate to: `/sitecore/content/[YourSite]/Settings/Standard Values`
    
2.  Right-click → Insert → Standard Values
    
3.  Click on the Datasource Templates tab
    
4.  Select templates for your components and assign the Datasource Workflow
    

Minimize image

Edit image

Delete image

![](/uploads/blogspot/complete-guide-setting-up-page-datasource-workflows-in-sitecore-xm-cloud-9.png)

  

Note: Templates must inherit from this base to show up: `/_PerSiteStandardValues` Path: `/sitecore/Templates/Foundation/Experience Accelerator/StandardValues/`

  

For more details, check out the official Sitecore documentation:

🔗 [configure-page-and-datasource-workflows](https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/workflow#configure-page-and-datasource-workflows)

Let me know if you'd like any other tweaks! 😊
