---
layout: page
title: Projects
---

{% for project in site.data.projects %}

<h2><a href="{{ project.url }}">{{ project.name }}</a></h2>

{% if project.image %}
<a href="{{ project.url }}"><img src="{{ project.image }}"></a>
{% endif %}

<p>{{ project.description | markdownify }}</p>

{% endfor %}
