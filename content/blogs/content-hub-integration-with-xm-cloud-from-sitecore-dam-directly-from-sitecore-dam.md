---
title: "Content Hub Integration with XM Cloud from Sitecore DAM directly from Sitecore DAM"
description: "Do you use Sitecore and Content Hub in your organization? If so, you might be looking for a way to make these two platforms work better together. The good news is—you can! Sitecore provides a built in solution: the DAM"
keywords: "@sitecore xmc, DAM, xm cloud"
metaDescription: "Do you use Sitecore and Content Hub in your organization? If so, you might be looking for a way to make these two platforms work better together. The good news is—you can! Sitecore provides a built in solution: the DAM"
featuredImage: /uploads/banner-content-hub-xm-cloud-dam-integration.png
slug: content-hub-integration-with-xm-cloud-from-sitecore-dam-directly-from-sitecore-dam
date: May 11, 2025 4:37 PM
modifiedDate: September 7, 2026 5:45 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/05/content-hub-integration-with-xm-cloud.html"
tags:
  - tag: sitecore-xm-cloud
  - tag: dam
---
## 

Do you use Sitecore and Content Hub in your organization? If so, you might be looking for a way to make these two platforms work better together. The good news is—you can! Sitecore provides a built-in solution: the DAM Connector, part of the Sitecore Connect for Content Hub (SCCH).

This connector lets you browse, search, and insert digital assets from Content Hub DAM directly into the Experience Editor, making content creation smoother and more efficient.

In this guide, we’ll walk you through how to enable the DAM Connector for a Sitecore XM Cloud environment.

* * *

### Prerequisites

## 

Before you begin, make sure you have the following in place:

-   Access to the XM Cloud Deploy app.
    
-   A user account in Sitecore Content Hub with the necessary permissions.
    
-   An OAuth client created in Content Hub for the DAM connector integration.
    

* * *

### Steps to Enable the DAM Connector

### 1\. Log in to XM Cloud Deploy

## 

-   Go to XM Cloud Deploy and sign in with your credentials.
    

### 2\. Select the Right Project

## 

-   In the left-hand navigation menu, click Projects.
    
-   Choose the project that contains the environment where you want to enable the DAM connector.
    

### 3\. Open the Target Environment

## 

-   Click on the specific environment (e.g., development, staging, production) you want to configure.
    

### 4\. Add Environment Variables

## 

-   Navigate to the Variables tab.
    
-   Click Create variable.
    
-   Add each required variable for the DAM connector. Make sure to set the Target to `CM` (Content Management role) for each variable.
    

Variable

Value

Description

`Sitecore_ConnectionStrings_DAM_dot_ContentHub`

`ClientId={client_id};ClientSecret={client_secret};UserName={username};Password={password};URI={uri};`

Contains the OAuth credentials (Client ID and Secret), Content Hub username and password, and the URI of your Content Hub instance. Used to authenticate and connect Sitecore to Content Hub.

`Sitecore_ConnectionStrings_DAM_dot_SearchPage`

`https://your-content-hub-url/en-us/sitecore-dam-connect/approved-assets`

The full URL to the Content Hub DAM "Approved Assets" search page. This is used when browsing assets from within Sitecore.

`Sitecore_ConnectionStrings_DAM_dot_ExternalRedirectKey`

`Sitecore`

Defines the page that will open the DAM interface inside an iframe. This ensures the "Browse Sitecore DAM" button displays the correct content from the SCCH component.

`SITECORE_AppSettings_damEnabled__define`

`yes`

Enables the DAM integration feature in your Sitecore XM Cloud environment. Must be set to "yes" for the connector to function properly.

  

* * *

### Configure the DAM Connection

## 

After setting the environment variables, the next step is to connect your Content Hub DAM to your XM Cloud environment by adding a few config files to your codebase. Don’t worry—this sounds more technical than it really is. Let’s walk through it step by step.

* * *

### 1\. Clone Your XM Cloud Project

## 

Start by cloning the Git repository linked to your XM Cloud environment. If you already have it on your machine, you can skip this step.

* * *

### 2\. Create the Folder Structure

## 

In your project directory, navigate to:

```
src/platform/
```

Inside that folder, create the following path:

```
App_Data/Xdts
```

So the full path should look like:

```
{YourRepo}/src/platform/App_Data/Xdts
```

* * *

### 3\. Add the Web.config.xdt File

## 

Now inside the `Xdts` folder, create a new file called:

```
Web.config.xdt
```

Open that file and paste in the following XML configuration:

```
<?xml version="1.0" encoding="utf-8"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <location path="sitecore">
    <system.webServer>
      <httpProtocol>
        <customHeaders>
          <!-- NOTE: This is just an example. Don’t copy this into production without reviewing. -->
          <add name="Content-Security-Policy"
               value="default-src 'self' 'unsafe-inline' 'unsafe-eval' https://apps.sitecore.net; img-src 'self' data: https://your-content-hub-url.cloud/ https://s.gravatar.com https://*.wp.com cdn.auth0.com/avatars; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' 'unsafe-inline' https://fonts.gstatic.com; block-all-mixed-content; child-src 'self' https://your-content-hub-url.cloud/; connect-src 'self' https://your-content-hub-url.cloud/; media-src https://your-content-hub-url.cloud/"
               xdt:Transform="Replace"
               xdt:Locator="Match(name)" />
        </customHeaders>
      </httpProtocol>
    </system.webServer>
  </location>
</configuration>
```

Be sure to replace `your-content-hub-url.cloud` with your actual Content Hub DAM domain.

* * *

### 4\. Tell XM Cloud to Use the Transform File

## 

Open the file called `xmcloud.build.json` and add the following inside the `"transforms"` section:

```
"transforms": [
  {
    "xdtPath": "/app_data/xdts/web.config.xdt",
    "targetPath": "/web.config"
  }
]
```

This tells XM Cloud to apply your custom configuration during deployment.

### 5\. Update the .csproj File to Include App\_Data

## 

Next, open the `Platform.csproj` file and add this snippet so the `App_Data` folder is included in your build:

```
<ItemGroup>
  <Content Include="App_Data\**" />
</ItemGroup>
```

* * *

### 6\. Save, Commit, and Deploy

## 

Once everything’s in place:

1.  Save all your changes.
    
2.  Commit and push the changes to your repository:
    
3.  Deploy the latest changes to your XM Cloud environment using your usual process.
    

* * *

### What Happens Next?

## 

After deployment is complete, go to your Sitecore Content Tree and check under:

```
/sitecore/system/Modules
```

  

Minimize image

Edit image

Delete image

![](/uploads/blogspot/content-hub-integration-with-xm-cloud-from-sitecore-dam-directly-from-sitecore-dam-1.png)

  

You should see a new DAM folder. That means the connector is working and ready to use!

### Configuring CORS for Sitecore DAM

## 

To allow your XM Cloud environment to communicate with Sitecore DAM, you need to configure CORS (Cross-Origin Resource Sharing) settings in Content Hub. Here’s how to do it:

### Steps to Configure CORS

## 

-   Log in to Sitecore DAM.
    
-   From the main menu, click Manage, then go to Settings.
    
-   In the settings menu, navigate to: `PortalConfiguration > CORSConfiguration`
    

Minimize image

Edit image

Delete image

![](/uploads/blogspot/content-hub-integration-with-xm-cloud-from-sitecore-dam-directly-from-sitecore-dam-2.png)

  

-   Under CORSConfiguration, add the following URLs:
    

Minimize image

Edit image

Delete image

![](/uploads/blogspot/content-hub-integration-with-xm-cloud-from-sitecore-dam-directly-from-sitecore-dam-3.png)

  

* * *

### Final Outcome

## 

Once everything is set up, you’ll be able to:

-   Browse, search, and insert digital assets from Sitecore DAM directly into the Experience Editor.
    
-   Use DAM assets in both Image and Link fields with ease.
    

For more details, check out the official Sitecore documentation:

[Enabling The Dam Connector in an environment deployed to xm-cloud](https://doc.sitecore.com/xmc/en/developers/xm-cloud/walkthrough--enabling-the-dam-connector-in-an-environment-deployed-to-xm-cloud.html)

Let me know if you'd like any other tweaks!
