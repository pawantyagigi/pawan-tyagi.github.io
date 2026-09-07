---
title: "Publishing in Sitecore XM Cloud: Understanding v1 vs v2"
description: "If you’ve been working with Sitecore XM Cloud for a while, you probably know that publishing plays a major role in how your content reaches Experience Edge. But what you might not know is that Sitecore has introduced a"
keywords: "sitecore xm cloud publishing"
metaDescription: "If you’ve been working with Sitecore XM Cloud for a while, you probably know that publishing plays a major role in how your content reaches Experience Edge. But what you might not know is that Sitecore has introduced a"
featuredImage: /uploads/publishing-xm-cloud-v1-vs-v2-banner.png
slug: publishing-in-sitecore-xm-cloud-understanding-v1-vs-v2
date: October 17, 2025 8:45 PM
modifiedDate: September 7, 2026 5:30 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/10/publishing-in-sitecore-xm-cloud.html"
tags:
  - tag: sitecore-xm-cloud
---
If you’ve been working with Sitecore XM Cloud for a while, you probably know that publishing plays a major role in how your content reaches Experience Edge. But what you might *not* know is that Sitecore has introduced a brand-new publishing model that makes things dramatically faster and more efficient.

In this post, we’ll explore how Publishing v1 (the classic pipeline) compares to the new Publishing v2 (Edge Runtime Publishing)—and when you should consider switching.

* * *

### The Problem with Traditional Publishing (v1)

Sitecore’s default publishing model, v1, operates by serializing an entire layout and all its dependencies—essentially sending one big JSON payload to Experience Edge.

That means when you update something like a shared footer or a datasource used across multiple pages, the entire set of pages referencing it gets republished. Over time, this process can grow heavy and slow—especially for large content trees.

Developers often notice:

-   Longer publish times during “republish with subitems.”
    
-   Higher memory usage on the CM side.
    
-   Even occasional CM crashes when working with complex dependency trees.
    

This approach works fine for smaller sites, but it becomes a bottleneck for enterprise-scale content operations.

* * *

### The New Era: Publishing v2 (Edge Runtime)

With Publishing v2, Sitecore flips the script. Instead of merging everything into one large payload, it separates layout and datasource publishing into independent processes.

Here’s what changes:

-   Layout JSON and content data are published separately.
    
-   The Experience Edge runtime then recombines them as needed.
    
-   Only the changed item\- say, a single updated data source, gets republished.
    

The result? Much faster, more efficient updates that don’t overload your CM instance.

Real-world tests have shown the difference clearly:

-   Smart Publish: 8–12% faster
    
-   Republish with Sub-items: 14% faster
    
-   Full Site Republish: 22% faster
    
-   Incremental Publish: 75–85% faster
    

That’s the kind of improvement you *feel* immediately after enabling it.

* * *

### How to Enable Publishing v2

Turning on v2 takes just one configuration change in XM Cloud Deploy.

Add this below environment variable:

```
Sitecore_ExperienceEdge_dot_WorkerStoreEnabled = TRUE
```

Then redeploy your environment and perform a full publish. If something doesn’t behave as expected (like language fallback or certain dependency resolutions), you can revert by setting it back to FALSE.

* * *

### v1 vs v2: Key Differences at a Glance

Minimize image

Edit image

Delete image

![](https://media.licdn.com/dms/image/v2/D4E12AQFA95OWzaCDXQ/article-inline_image-shrink_400_744/B4EZnyqZVcHEAY-/0/1760712824721?e=1762387200&v=beta&t=mC8xv2dBU3pu3rDdmkti_5xpInSW2MWqTH4h3SufDXg)

* * *

### When Should You Switch?

If your team publishes content frequently, manages shared components across pages, or maintains a site with a deep content tree—v2 will be a game changer.

For small sites or environments that need full stability, v1 is still a safe choice. But for most modern composable architectures using XM Cloud, v2 offers the scalability and speed Sitecore promised when it moved to the cloud.

* * *

### Final Thoughts

Publishing v2 rethinks how Sitecore content moves from CM to Experience Edge. It’s more modular, more efficient, and designed for the kind of fast-moving, component-based content architectures that developers and marketers now rely on.

If you want to dive deeper, check out Sitecore’s official blog post on this topic here:

If you haven’t tried it yet, enable it in your next environment deployment and see the difference for yourself—it turns “publish and wait” into “publish and done.”
