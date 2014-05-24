/*globals window, document */
/*jslint regexp: true */

(function () {

    'use strict';

    var toread = document.querySelector('.toread'),
        minutes = document.querySelector('article').innerText.match(/\s+/g).length / 180,
        minutes_floor = Math.floor(minutes),
        minutes_round = Math.round(minutes),
        links = document.querySelectorAll('a[href^="#email"]'),
        email_address = window.atob('aGVsbG9Ac2NvdHRkb3hleS5jb20=');

    // Display duration to read per article (based on 180 words a minute).

    if (minutes_round) {

        if (minutes_floor === minutes_round) {

            toread.innerHTML = 'about ' + minutes_round + ' minutes to read';

        } else {

            toread.innerHTML = 'less than ' + minutes_round + ' minutes to read';

        }

        if (minutes_round === 1) {

            toread.innerHTML = toread.innerHTML.replace('minutes', 'minute');

        }

    }

    // Add IDs and anchors to all h2 and h3 tags.

    Array.prototype.slice.call(document.querySelectorAll('h2, h3')).forEach(function (obj) {

        obj.setAttribute('id', obj.innerText.toLowerCase().replace(/[^a-z0-9]+/g, '-'));

        obj.innerHTML = '<a href="#' + obj.getAttribute('id') + '">' + obj.innerText + '</a>';

    });

    // Decode and add email address to all email links.

    if (links) {

        Array.prototype.slice.call(links).forEach(function (link) {

            link.setAttribute('href', 'mailto:' + email_address + '?subject=Re: ' + document.title);
            link.innerHTML = email_address;

        });

    }

}());
