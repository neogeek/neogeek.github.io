---
layout: page
title: Projects
---

{% for project in site.data.projects %}

<h2><a href="{{ project.url }}">{{ project.name }}</a></h2>

{% if project.image %}
<img src="{{ project.image }}">
{% endif %}

<p>{{ project.description | markdownify }}</p>

{% endfor %}
