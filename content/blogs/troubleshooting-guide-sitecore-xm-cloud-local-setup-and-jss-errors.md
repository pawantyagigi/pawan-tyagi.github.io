---
title: "Troubleshooting Guide: Sitecore XM Cloud Local Setup and JSS Errors"
description: "1. Error 1: Access Issue for Files Under the Project Folder 2. Error 2: Network Not Found 3. Error 3: Could Not Resolve Host 4. Error 4: Port 8984 Already in Use 5. Error 5: Traefik Port Conflict 6. Error 6:"
keywords: "@sitecore xmc, sitecore"
metaDescription: "1. Error 1: Access Issue for Files Under the Project Folder 2. Error 2: Network Not Found 3. Error 3: Could Not Resolve Host 4. Error 4: Port 8984 Already in Use 5. Error 5: Traefik Port Conflict 6. Error 6:"
featuredImage: /uploads/banner-xm-cloud-local-jss-troubleshooting.png
slug: troubleshooting-guide-sitecore-xm-cloud-local-setup-and-jss-errors
date: April 23, 2025 5:10 PM
modifiedDate: September 7, 2026 5:45 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/04/troubleshooting-guide-sitecore-xm-cloud.html"
tags:
  - tag: sitecore-xm-cloud
  - tag: sitecore
---
## Table of Contents

## 

1.  Error 1: Access Issue for Files Under the Project Folder
2.  Error 2: Network Not Found
3.  Error 3: Could Not Resolve Host
4.  Error 4: Port 8984 Already in Use
5.  Error 5: Traefik Port Conflict
6.  Error 6: hcsshim::ExpandScratchSize
7.  Error 7 & 8: Unhealthy Containers
8.  Error 9: Invalid Rewrites Found
9.  Error 10: Files are Blocked
10.  Error 11: CM Session Timeout
11.  Error 12: Container Compatibility
12.  Error 13: Errors During Initial Setup
13.  Error 14: Outdated JSS Dev Tools
14.  Error: Virtualization Not Enabled in BIOS
15.  Error: Container Mode Conflict (Linux vs Windows)
16.  Error: Outdated Sitecore JSS Dev Tools in package.json
17.  Docker Startup Issues

### \=====Errors and steps to resolve=========

### Error 1: Access issue for the files under the project folder

## 

![Article content](https://media.licdn.com/dms/image/v2/D5612AQG9Efdc7Xt-7A/article-inline_image-shrink_1000_1488/B56ZZiPBqrGUAQ-/0/1745404829083?e=1750896000&v=beta&t=BPvognF_WnnkxK8s218bbq740guuM0F1RcAfhC0fMO4)

Solution:

```
dir -Path . -Recurse | Unblock-File
```

Then run the up.ps1 script again to proceed with the setup.

* * *

### Error 2: Error Response from daemon: network xxxxxx not found

## 

![Article content](https://media.licdn.com/dms/image/v2/D5612AQH6f8ruQcEbJw/article-inline_image-shrink_1500_2232/B56ZZiPrNwHsAY-/0/1745404999060?e=1750896000&v=beta&t=2ISvE_UcpMj-hlNVBIgK6PLWUzpnPXg46k9z3u5irwg)

Solution:

```
cd "C:\Program Files\Docker\Docker"
.\DockerCli.exe -SwitchDaemon
.\DockerCli.exe -SwitchDaemon
```

Then run the up.ps1 script again.

* * *

### Error 3: Curl: (6) Could not resolve host: nodejs.org

## 

![Article content](https://media.licdn.com/dms/image/v2/D5612AQFN-wc_4ujRwQ/article-inline_image-shrink_1000_1488/B56ZZiQCSLGQAU-/0/1745405093720?e=1750896000&v=beta&t=Y0qVqZwxOtcxZW2OeCNuF7Qe3VcHQXVK7rNDGQF5gOQ)

Cause: DNS resolution issue inside Docker.

Solution: Add the following to Docker Daemon configuration:

```
"dns": ["8.8.8.8"]
```

Then restart Docker and run the up.ps1 script again.

* * *

### Error 4: Error response from daemon: failed to create endpoint xxxxx-solr-1 on network xxxxxx\_default: failed during hnsCallRawResponse: hnsCall failed in Win32: The process cannot access the file because it is being used by another process. (0x20)

## 

![Article content](https://media.licdn.com/dms/image/v2/D5612AQGqWkU8COOU6w/article-inline_image-shrink_1000_1488/B56ZZiQfBQHAAQ-/0/1745405211215?e=1750896000&v=beta&t=dHiYNAnC0e-pMltzdM27rv22t5RvqQLJ-JioIx6niAA)

Cause: SOLR service conflict.

Solution: Stop the SOLR services using port 8984 and run the up.ps1 script again.

* * *

### Error 5: Error response from daemon: failed to create endpoint xxxxx—traefil-1 on network xxxxxx\_default: failed during hnsCallRawResponse: hnsCall failed in Win32: The process cannot access the file because it is being used by another process. (0x20)

## 

  

![Article content](https://media.licdn.com/dms/image/v2/D5612AQGjechvnKod4A/article-inline_image-shrink_1000_1488/B56ZZiQ5ABHsAQ-/0/1745405317824?e=1750896000&v=beta&t=aXZ45LsxyQ9pMmU8_E0mEaKYu1npzWlnlToEuS1vV8U)

Solution:

1.  Stop IIS, , it might be due the port usage and Run the up script again.
2.  If the issue persists, Run the following commands:

```
Stop-Service docker
Stop-service hns
Start-service hns
Start-Service docker
```

Then rerun the up.ps1 script.

* * *

### Error 6: hcsshim::ExpandScratchSize issue

## 

Solution:

1.  Delete all containers, images, and networks in Docker.
2.  Uninstall Docker Desktop.
3.  Delete all files from:
4.  Reinstall Docker Desktop.
5.  Follow the Sitecore setup guide again.
6.  Run the up.ps1 script.

* * *

### Error 7: Dependency failed to start: Containers "xxx-cm-1" is unhealthy

## 

![Article content](https://media.licdn.com/dms/image/v2/D5612AQFIifliRQ78rA/article-inline_image-shrink_1000_1488/B56ZZiSUmvHsAQ-/0/1745405693030?e=1750896000&v=beta&t=NlFvYupkiIAGWJoQIlPjAXPe4Wgvc8OqQ2ky-HZEy60)

### Error 8: Error: for traefik Containers "xxxxxx" is unhealthy

## 

![Article content](https://media.licdn.com/dms/image/v2/D5612AQF5o_FoGu8ROg/article-inline_image-shrink_1000_1488/B56ZZiShqTGcAU-/0/1745405746612?e=1750896000&v=beta&t=2tmLZ-SJo7byOYjna4bHbwlAQsOYXH4M-sYpWSOMlzE)

Solution: *for error 7 & 8*

```
docker-compose stop
docker-compose down
iisreset /stop
docker-compose up -d
```

Then rerun the up.ps1 script.

* * *

### Error 9: Invalid Rewrites Found

## 

Solution: Create a deploy folder inside the Docker directory:

```
C:\projects\xxyx\code\docker\deploy\platform
```

* * *

### Error 10: Files are Blocked

## 

  

![Article content](https://media.licdn.com/dms/image/v2/D5612AQG4Cd4jNKATBA/article-inline_image-shrink_1000_1488/B56ZZiTwcKHgAU-/0/1745406069416?e=1750896000&v=beta&t=CMPcrEiNnt6LiqCqGWpraqhVzBCHp49RyP3QC1uJ-lA)

Solution: Right-click the file, select "Properties", and check the "Unblock" checkbox at the bottom.

  

![Article content](https://media.licdn.com/dms/image/v2/D5612AQFJHb5I7OlEiQ/article-inline_image-shrink_1000_1488/B56ZZiT43AGQAQ-/0/1745406103765?e=1750896000&v=beta&t=b7srsoUplWyU12h1pEliskxTjdK7zSuKclBa9atKoSE)

* * *

### Error 11: CM Session Timeout / Not Loading

## 

  

![Article content](https://media.licdn.com/dms/image/v2/D5612AQFVcskcO1W8Iw/article-inline_image-shrink_1000_1488/B56ZZiUBxvGoAQ-/0/1745406140491?e=1750896000&v=beta&t=HG2GCWTYKX3MOZbah6xW3b6MLOeSvNvL-NaAwD04GX4)

Solution:

1.  Try opening CM in Incognito mode:

```
https://xxyx.xmcloudcm.localhost/sitecore/shell/sitecore/client/Applications/Launchpad
```

1.  If that fails, try:

```
.\down.ps1
docker network prune
.\up.ps1
```

Or:

```
docker-compose stop
docker-compose down
docker-compose up -d
```

* * *

### Error 12: Container Compatibility

## 

  

![Article content](https://media.licdn.com/dms/image/v2/D5612AQH8djPLBbMJaQ/article-inline_image-shrink_1500_2232/B56ZZiUU6XGcAU-/0/1745406219023?e=1750896000&v=beta&t=uO1XfMyN0pL734K3xRoNErboX9E3rcFKoHQThDY4Z5s)

Solution: Switch the Docker container from Linux to Windows mode.

* * *

### Error 13: Errors During Initial Setup

## 

  

![Article content](https://media.licdn.com/dms/image/v2/D5612AQGNX9eMi4mrzg/article-inline_image-shrink_1000_1488/B56ZZiUgrRHAAQ-/0/1745406268158?e=1750896000&v=beta&t=ds4JG11nZCeOwm5pNZjC1cDTBdr1Ew0EdsjwQwm1epc)

Solution:

1.  Restart your system.
2.  Run the following and delete all contents:

```
%temp%
temp
```

* * *

### Error14: Virtualization Not Enabled in BIOS

## 

  

![Article content](https://media.licdn.com/dms/image/v2/D5612AQET8GFCD73kYA/article-inline_image-shrink_1000_1488/B56ZZiWxA8HUAQ-/0/1745406858183?e=1750896000&v=beta&t=Mmzfy1sIaPEaxswGIFsiB0cv-vGfx_voHXVkIKQ7hJ0)

Solution:

-   Access your system BIOS settings and enable the virtualization feature.

* * *

### Error15: Container Mode Conflict (Linux vs Windows)

## 

  

  

![Article content](https://media.licdn.com/dms/image/v2/D5612AQFPF-qCoYPtWw/article-inline_image-shrink_1000_1488/B56ZZiXQqMGQAQ-/0/1745406988611?e=1750896000&v=beta&t=d5DmyUQV7uSdrXujDAYYjfI0Y3DCe3avAA0mYCfX40Y)

Solution:

-   Ensure Docker is set to Windows containers, not Linux.

![Article content](https://media.licdn.com/dms/image/v2/D5612AQF1WMX-G_2vPA/article-inline_image-shrink_1500_2232/B56ZZiXY4KHUAU-/0/1745407022058?e=1750896000&v=beta&t=xicsDhhdsK3VCmAg8qxWelBZssH8cQbfu00R7WohQbw)

* * *

### Error 16: Outdated Sitecore JSS Dev Tools in package.json

## 

  

![Article content](https://media.licdn.com/dms/image/v2/D5612AQG1Af37lqGmJA/article-inline_image-shrink_1000_1488/B56ZZiU2uhGcAQ-/0/1745406358013?e=1750896000&v=beta&t=s7LqYMAsM2i6QQWxsE3ok8Vn2CD55lbyYsii4q3UvCw)

Solution: Ensure package.json is not modified before running npm commands. Update to the correct versions as per Sitecore’s recommendations.

* * *

### Error 17: Docker Startup Issues After Reboot

## 

Solution:

-   Remove the two Docker-related files causing conflict (paths not specified).

![Article content](https://media.licdn.com/dms/image/v2/D5612AQH2om3UIdf7pQ/article-inline_image-shrink_1000_1488/B56ZZiVVIBGQAQ-/0/1745406481442?e=1750896000&v=beta&t=YeX2loxyt_VZRrcrOVgU9mDgIHG7k9VavqzFWBcl5ck)

-   Clear all related background tasks via Task Manager (Run as Admin).

![Article content](https://media.licdn.com/dms/image/v2/D5612AQHNpd3n_pDzdQ/article-inline_image-shrink_1500_2232/B56ZZiVpb5GoAc-/0/1745406565162?e=1750896000&v=beta&t=Z7w8tCHm2DPWYVqgC3UZBqm5IsYzZ8PFlrWFydEGAzY)

-   Restart your system and check Docker again.

* * *

Note: Some importable command that need to be helpful:

```
.\down.ps1 
 docker compose stop
 cd docker 
 ./clean.ps1 
 cd..
 Stop-Service docker 
 Stop-service hns 
 Start-service hns 
 Start-Service docker 
 docker network prune
.\init.ps1 -InitEnv -LicenseXmlPath C:\Project\xxx\\license.xml -AdminPassword b
.\up.ps1 
-------------
 npm run build
 dotnet sitecore cloud login
 dotnet sitecore ser push x
---------------
 dotnet sitecore itemres cleanup -n "environment" --path "/sitecore/content/xxx" --force --what-if
```
