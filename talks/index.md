---
layout: page
title: Talks
---

{% for talk in site.data.talks %}

<h2><a href="{{ talk.url }}">{{ talk.title }}</a></h2>

<p>{{ talk.description | markdownify }}</p>

{% endfor %}
