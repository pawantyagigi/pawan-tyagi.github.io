---
title: "How to Export Media Usage Report in Sitecore Using PowerShell"
description: "Have you ever wondered where your images or PDFs are used across your Sitecore website? Or maybe you’re planning to clean up your media library but want to make sure the files are not being used somewhere? This blog"
keywords: "Sitecore, XM Cloud, Sitecore XP, Web Development"
metaDescription: "Have you ever wondered where your images or PDFs are used across your Sitecore website? Or maybe you’re planning to clean up your media library but want to make sure the files are not being used somewhere? This blog"
featuredImage: /uploads/banner-powershell-media-usage-report.png
slug: how-to-export-media-usage-report-in-sitecore-using-powershell
date: June 29, 2025 7:16 PM
modifiedDate: September 7, 2026 5:45 PM
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: "https://insightswithpawantyagi.blogspot.com/2025/06/how-to-export-media-usage-report-in.html"
tags:
  - tag: sitecore
  - tag: sitecore-xm-cloud
---
Have you ever wondered where your images or PDFs are used across your Sitecore website? Or maybe you’re planning to clean up your media library but want to make sure the files are not being used somewhere? This blog post is for you.

With just a single PowerShell script, you can generate an Excel report that tells you:

-   Which media items are being used
-   Where (which pages or content items) they are used
-   In which field, language, and version they appear

Let’s dive into how this works!

* * *

### Why You Might Need This

Here are a few real-life situations where this script can help:

-   You're doing a media cleanup and want to delete unused files
-   You're migrating content and need to track all media references
-   You're auditing your Sitecore media usage

This script will generate a full report of all media items and their usage across your Sitecore site.

* * *

### What You Need

Before you run the script, make sure:

-   You have Sitecore PowerShell Extensions (SPE) installed
-   You have permission to access the Content Editor or PowerShell ISE
-   You’re working in the master database

* * *

The PowerShell Script

```
Import-Function -Name ConvertTo-Xlsx

# Set the root path (adjust as needed)
$rootPath = "master:/sitecore/media library"

# Get root item
$rootItem = Get-Item -Path $rootPath

# Get all descendant items
$allItems = $rootItem.Axes.GetDescendants() | ForEach-Object { Get-Item $_.Paths.FullPath }

# List to hold referenced items
$referencedItems = @()

$bulk = New-Object 'Sitecore.Data.BulkUpdateContext'
try {
    foreach ($item in $allItems) {
        try {
            $templateName = $item.TemplateName

            # Exclude folders and "Page Data"
            if ($templateName -eq "Page Data" -or $templateName -like "*Folder*") {
                continue
            }

            # Get references to this item using LinkDatabase
            $links = [Sitecore.Globals]::LinkDatabase.GetReferrers($item)

            if ($links.Count -gt 0) {
                foreach ($link in $links) {
                    try {
                        $db = [Sitecore.Data.Database]::GetDatabase("master")
                        $sourceItem = $db.GetItem($link.SourceItemID)
                        $fieldName = ""
                        if ($sourceItem -ne $null) {
                            $field = $sourceItem.Fields[$link.SourceFieldID]
                            if ($field -ne $null) {
                                $fieldName = $field.Name
                            }
                        }

                        $referencedItems += [PSCustomObject]@{
                            ItemName           = $item.Name
                            ItemId             = $item.ID.ToString()
                            Path               = $sourceItem.Paths.FullPath
                            SourceItemLanguage = $link.SourceItemLanguage.Name
                            SourceItemVersion  = $link.SourceItemVersion.Number
                            SourceItemID       = $link.SourceItemID.ToString()
                            MediaUrl           = [Sitecore.Resources.Media.MediaManager]::GetMediaUrl($item)
                            FieldName          = $fieldName
                        }
                    } catch {
                        Write-Host "Error resolving link for item: $($item.Name)"
                    }
                }
            }
        } catch {
            Write-Host "Error processing item: $($item.Paths.FullPath)"
            Write-Host $_.Exception.Message
        }
    }
}
finally {
    $bulk.Dispose()
}

# Generate timestamp for filename
$datetime = Get-Date -Format "yyyyMMdd-HHmmss"

# Export to Excel
[byte[]]$outobject = $referencedItems | Select-Object `
    ItemId, ItemName, Path, SourceItemLanguage, SourceItemVersion, SourceItemID, FieldName, MediaUrl | ConvertTo-Xlsx

Out-Download -Name "Media-Ref-$datetime.xlsx" -InputObject $outobject

Write-Host "Export completed. Total referenced media items: $($referencedItems.Count)"
```

* * *

### What You’ll Get in the Report

Each row in the exported Excel file will include:

-   Media Item Name
-   Media Item ID
-   Referenced Path
-   Source Item ID
-   Source Item Language
-   Source Item Version
-   Field Name containing the media reference
-   Media URL

* * *

### Conclusion

Managing your media library doesn't have to be a guessing game. With this PowerShell script, you gain immediate insights into how your media is used across your Sitecore solution.

Happy Coding :😃
