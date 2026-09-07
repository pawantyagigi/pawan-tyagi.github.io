---
title: "Content Hub DAM Connector in an Environment Deployed to XM Cloud"
description: "Enabling the Content Hub DAM Connector in Sitecore XM Cloud Do you use Sitecore and Content Hub for your business? If so, you might be wondering how to make these two platforms work seamlessly together. The solution is"
keywords: "DAM, sitecore, xm cloud"
metaDescription: "Enabling the Content Hub DAM Connector in Sitecore XM Cloud Do you use Sitecore and Content Hub for your business? If so, you might be wondering how to make these two platforms work seamlessly together. The solution is"
featuredImage: /uploads/banner-content-hub-dam-connector-xmc.png
slug: content-hub-dam-connector-in-an-environment-deployed-to-xm-cloud
date: January 26, 2025 4:45 PM
modifiedDate: September 7, 2026 5:45 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/01/content-hub-dam-connector-in.html"
tags:
  - tag: dam
  - tag: sitecore
  - tag: sitecore-xm-cloud
---
**Enabling the Content Hub DAM Connector in Sitecore XM Cloud**

Do you use Sitecore and Content Hub for your business? If so, you might be wondering how to make these two platforms work seamlessly together. The solution is the Sitecore DAM component of the Sitecore Connect for Content Hub connector (SCCH). This component allows you to browse, search, and insert digital assets from Sitecore DAM directly into the Content and Experience Editor.  
  
This guide will walk you through enabling the DAM connector for environments deployed in XM Cloud.

## Prerequisites

Access to the XM Cloud Deploy app.

A user account in Sitecore Content Hub with the necessary permissions.

An OAuth client created for the DAM connector.

## Steps to Enable the DAM Connector

Configure and Enable the DAM Connector in XM Cloud

Log in to the XM Cloud Deploy app.

In the navigation menu, click Projects.

Select the project containing the environment where you want to enable the DAM connector.

Click on the environment you want to configure.

Go to Variables and click Create variable.

Create the required variables. For each variable, set the target to CM.

  Sitecore DAM Configuration table { width: 100%; border-collapse: collapse; margin: 20px 0; } th, td { padding: 12px; text-align: left; border: 1px solid #ddd; } th { background-color: #f4f4f4; } tr:nth-child(even) { background-color: #f9f9f9; } tr:hover { background-color: #f1f1f1; }

# Sitecore DAM Configuration Variables

Variable

Value

Description

Sitecore\_ConnectionStrings\_DAM\_dot\_ContentHub

ClientId={client\_id};ClientSecret={client\_secret};UserName={username};Password={password};URI={uri};

The Client ID and Client Secret, which belong to the connector's OAuth client. These credentials are required to establish a connection between the connector and both Sitecore and Content Hub platforms. The username and password of the Content Hub user that you created. This allows you to authenticate the connection and access the Content Hub instance. The correct URI for your Content Hub instance.

Sitecore\_ConnectionStrings\_DAM\_dot\_SearchPage

https://your-content-hub-url/en-us/sitecore-dam-connect/approved-assets

Sitecore Content Hub search page URL. The correct URI for your Content Hub instance.

Sitecore\_ConnectionStrings\_DAM\_dot\_ExternalRedirectKey

Sitecore

The URL of the page that opens the DAM in an IFrame. This ensures that Browse Sitecore DAM opens the right page and displays assets from the SCCH component.

SITECORE\_AppSettings\_damEnabled\_\_define

yes

By default, when you deploy an environment to XM Cloud, the DAM connector is disabled. To enable the connector, set this value to yes.

  Sitecore Variables table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 16px; text-align: left; } th, td { border: 1px solid #ddd; padding: 8px; } th { background-color: #f4f4f4; } .highlight { background-color: #ffff99; /\* Yellow highlight \*/ }

# Sitecore Variables

Name

Value

Secret

Target

Sitecore\_ConnectionStrings\_DAM\_dot\_SearchPage

https://.../en-us/sitecore-dam-connect/approved-assets

No

CM

Sitecore\_ConnectionStrings\_DAM\_dot\_ExternalRedirectKey

Sitecore

No

CM

Sitecore\_ConnectionStrings\_DAM\_dot\_ContentHub

ClientId=...;ClientSecret=...;UserName=...;Password=...;URI=https://...

No

CM

SITECORE\_AppSettings\_damEnabled\_\_define

yes

No

CM

  

Configure the DAM Connection

Clone the source control repository for your XM Cloud environment.

In the repository folder, create this subfolder structure:

        {Project Repo Name}/src/platform/App\_Data/Xdts

In the Xdts folder, create a file named Web.config.xdt. Open it for editing and add the required XML configuration.

  <?xml version="1.0" encoding="utf-8"?>

  <configuration xmlns:xdt\="http://schemas.microsoft.com/XML-Document-Transform"\>

  <location path\="sitecore"\>

  <system.webServer>

  <httpProtocol>

  <customHeaders>

  *<!--DO NOT USE THIS CONTENT SECURITY POLICY EXAMPLE* *IN* *YOUR SOLUTION-->*

  <add name\="Content-Security-Policy" value\="default-src 'self' 'unsafe-inline' 'unsafe-eval' \[https://apps.sitecore.net\](https://apps.sitecore.net/); img-src 'self' data: https://your-content-hub-url.cloud/ \[https://s.gravatar.com\](https://s.gravatar.com/) https://\*.wp.com/cdn.auth0.com/avatars; style-src 'self' 'unsafe-inline' \[https://fonts.googleapis.com\](https://fonts.googleapis.com/); font-src 'self' 'unsafe-inline' \[https://fonts.gstatic.com\](https://fonts.gstatic.com/); block-all-mixed-content; child-src 'self' https://your-content-hub-url.cloud/; connect-src 'self' https://your-content-hub-url.cloud/; media-src https://your-content-hub-url.cloud/" xdt:Transform\="Replace" xdt:Locator\="Match(name)"/>

 </customHeaders>

 </httpProtocol>

 </system.webServer>

 </location>

 </configuration>

Save the file and update the xmcloud.build.json file with the transforms section..

 "transforms": \[

 {

 "xdtPath": "/app\_data/xdts/web.config.xdt",

 "targetPath": "/web.config"

 }

 \]

  

Update the Platform.csproj file to include App\_Data.

 <ItemGroup>

 <Content Include\="App\_Data\\\*\*" />

 </ItemGroup>

Commit and push the changes, then build and deploy to your environment.

Once these steps are done you would be able to see the DAM folder in System/Modules & Templates in the Content Tree.

[![](/uploads/blogspot/content-hub-dam-connector-in-an-environment-deployed-to-xm-cloud-1.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhynENedvDNG5d7RvovJLfYukdzP7aavAHcGuC4NE7zTXp8s5dLQo-NIAfIo8iaK7Ya0WqzuO6wj3tiYiXyoJRFap9OoZltuE6LUuqVwdlEce1ZSGetpLFkChjpuKUc0b4EiXnBw1MXQXd3YuqtBSldb04yeueBHnsJLO3jeVr87nH9v8z8Q_SVU8TGIo8/s587/enabling-the-dam-connector-in-an-environment-deployed.png)

  

  

## Configuring CORS for DAM

In the Sitecore DAM main menu, click **Manage** and then **Settings**.

[![](/uploads/blogspot/content-hub-dam-connector-in-an-environment-deployed-to-xm-cloud-2.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcZptcwKX7YSi7A_YSZ-ghj9g-F-Bf4P1OAqWE3flVWP1tC4-I_i8DdWvrnPjiZrbil-d07aSqbyEpgBy6clXuhSeJ5IVyd8zvZkaec0ybB1AuEFzLOhwnUureokRKNZfhR2Kv-2UcqUAhMM8vMuPcNWj0WS3Vsy8tYO3jtQJ4p9fPKhJhMU0nNXmj_PI/s1884/enabling-the-dam-connector-in-an-environment-deployed-to-xm-cloud---3.png)

  
  

Navigate to **PortalConfiguration** \> **CORSConfiguration**.

[![](/uploads/blogspot/content-hub-dam-connector-in-an-environment-deployed-to-xm-cloud-3.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEihJXfSUBKeZhSEg7PmJ2efTsW1-dHuSy5hwVfTspj6nkA7YS5YIhkv1VDxVJQ3UItnOgpdLWcy_X4FSkm8lO-gkSkA9TASSKxKqWNpqqfQ1jegkLFKO1x2sA507yKMwnJ5ymHvXc1I0Cktn4hYf1y2Kz8vcbtgbN77jopvDREbf8eCIAnHXZmXVZSciTM/s1880/enabling-the-dam-connector-in-an-environment-deployed-to-xm-cloud---4.png)

  

  

Add the following URLs:  
  
\- XM Cloud Pages URL: https://pages.sitecorecloud.io/  
\- Environment Host Name URL: Example: https://my-xmc-environment-host-name.cloud/

## Final Outcome

Once the setup is complete, you can:  

\- Browse, search, and insert digital assets from Sitecore DAM into the Content and Experience Editor.

\- Use DAM assets in Image and Link fields effortlessly.

This integration simplifies asset management and enhances the editor experience.

Thanks for reading! If you have questions or need help, feel free to reach out!
