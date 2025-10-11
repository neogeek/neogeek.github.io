---
title: Building a Rhythm Game in Unity
subtitle: Utilizing an open source package for building rhythm games in multiple game engines, we will learn how to build a playable game in Unity with minimal steps.
date: 10/08/2025
draft: true
---

# Building a Rhythm Game in Unity

## Create Empty Project

For this demo, we will be using the latest LTS version of Unity (6.0) with the Universal Render Pipeline (URP).

## Install Package

Open the package manager and select **Install via Git URL**, then enter the following URL and hit enter:

```text
https://github.com/neogeek/rhythm-game-utilities.git?path=/UnityPackage
```

## Rendering Notes

For this section we are going to setup a lot of code that we will reference in later steps, so I'm going to break down everything piece by piece.

### Loading Notes

First we are going to take the song file from before (CONTENT NEEDED) and parse the data from it.

```csharp
var sections = RhythmGameUtilities.Parsers.ParseSectionsFromChart(contents);

var metaData = RhythmGameUtilities.Parsers.ParseMetaDataFromChartSection(sections
    .First(section => section.Key == NamedSection.Song)
    .Value);

var resolution = int.Parse(metaData["Resolution"]);

var tempoChanges = RhythmGameUtilities.Parsers.ParseTempoChangesFromChartSection(sections
    .First(section => section.Key == NamedSection.SyncTrack)
    .Value);

var timeSignatureChanges = RhythmGameUtilities.Parsers.ParseTimeSignatureChangesFromChartSection(sections[NamedSection.SyncTrack]);

var difficulties = Enum.GetValues(typeof(Difficulty))
    .Cast<Difficulty>()
    .Where(difficulty => sections.ToDictionary(item => item.Key, item => item.Value)
        .ContainsKey($"{difficulty}Single"))
    .ToDictionary(difficulty => difficulty,
        difficulty => RhythmGameUtilities.Parsers.ParseNotesFromChartSection(sections[$"{difficulty}Single"]));
```
