(function () {

    'use strict';

    // Add search filtering to article listing.

    var allArticles = document.querySelectorAll('.article');

    document.querySelector('.search').addEventListener('keyup', function (e) {

        var searchQuery = [];

        if (e.keyCode === 13) {

            this.blur();

            return false;

        }

        Array.prototype.slice.call(this.value.split(/\s+/)).forEach(function (value) {

            if (value) {

                searchQuery.push('.article a[data-title*="' + value.toLowerCase() + '"]');
                searchQuery.push('.article a[data-keywords*="' + value.toLowerCase() + '"]');

            }

        });

        if (searchQuery.length) {

            Array.prototype.slice.call(allArticles).forEach(function (obj) {

                obj.classList.add('hidden');

            });

            Array.prototype.slice.call(document.querySelectorAll(searchQuery.join(', '))).forEach(function (obj) {

                obj.parentNode.classList.remove('hidden');

            });

        } else {

            Array.prototype.slice.call(allArticles).forEach(function (obj) {

                obj.classList.remove('hidden');

            });

        }

    });

}());
