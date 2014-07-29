---
layout: page
title: Games
---

{% for game in site.data.games %}

<h2><a href="{{ game.url }}">{{ game.name }}</a></h2>

{% if game.image %}
<a href="{{ game.url }}"><img src="{{ game.image }}"></h2>
{% endif %}

<p>{{ game.description | markdownify }}</p>

{% endfor %}
