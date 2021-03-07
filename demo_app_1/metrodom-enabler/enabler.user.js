// ==UserScript==
// @name         Metrodom enabler
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Enable price and flat plan check for all appartments
// @author       lordmairtis
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.min.js
// @match        https://metrodom.hu/metrodom-ormezo/szintalaprajz*
// ==/UserScript==

(function () {
    'use strict';
    ///////////
    ///READY///
    ///////////
    $(() => {
        setInterval(() => {
            $("area").each(function () {
                $(this).attr("data-toggle", "modal");
            });
        }, 5000);

        setInterval(refreshQtips, 1000);
    });
})();


function refreshQtips() {
    $('area.property').each(function () {
        let data = $(this).data('tooltip');
        let qtipId = $(this).attr("data-hasqtip");

        let dataString = "";
        dataString += '<div class="'
            + data.class
            + '"><b>'
            + data.title
            + ' - '
            + data.text
            + '</b><br />'
            + data.size
            + '<br/>'
            + data.balcony
            + '<br/>';
        if (data.is_on_sale) {
            dataString += '<span style="opacity: .5; text-decoration: line-through;">'
                + data.price
                + '</span>'
                + '<br/>'
                + data.sale_price;
        } else {
            dataString += data.price;
        }
        dataString += '<br/>'
            + data.szocpol
            + '<br/>'
            + data.description
            + '<br/>'
            + data.floor_plan
            + '</div>';

        $(`#qtip-${qtipId}-content`).html(dataString)
    });
}