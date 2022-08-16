// ! function(o) {
//     "use strict";

//     function e() { this.$body = o("body"), this.charts = [] }
//     e.prototype.initCharts = function() {
//         window.Apex = { chart: { parentHeightOffset: 0, toolbar: { show: !1 } }, grid: { padding: { left: 0, right: 0 } }, colors: ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"] };
//         var e = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"],
//             t = o("#revenue-chart").data("colors");
//         t && (e = t.split(","));
//         var r = { chart: { height: 364, type: "line", dropShadow: { enabled: !0, opacity: .2, blur: 7, left: -7, top: 7 } }, dataLabels: { enabled: !1 }, stroke: { curve: "smooth", width: 4 }, series: [{ name: "Current Week", data: [10, 20, 15, 25, 20, 30, 20] }, { name: "Previous Week", data: [0, 15, 10, 30, 15, 35, 25] }], colors: e, zoom: { enabled: !1 }, legend: { show: !1 }, xaxis: { type: "string", categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], tooltip: { enabled: !1 }, axisBorder: { show: !1 } }, yaxis: { labels: { formatter: function(e) { return e + "k" }, offsetX: -15 } } };
//         new ApexCharts(document.querySelector("#revenue-chart"), r).render();
//         e = ["#727cf5", "#e3eaef"];
//         (t = o("#high-performing-product").data("colors")) && (e = t.split(","));
//         r = { chart: { height: 257, type: "bar", stacked: !0 }, plotOptions: { bar: { horizontal: !1, columnWidth: "20%" } }, dataLabels: { enabled: !1 }, stroke: { show: !0, width: 2, colors: ["transparent"] }, series: [{ name: "Actual", data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81] }, { name: "Projection", data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59] }], zoom: { enabled: !1 }, legend: { show: !1 }, colors: e, xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], axisBorder: { show: !1 } }, yaxis: { labels: { formatter: function(e) { return e + "k" }, offsetX: -15 } }, fill: { opacity: 1 }, tooltip: { y: { formatter: function(e) { return "$" + e + "k" } } } };
//         new ApexCharts(document.querySelector("#high-performing-product"), r).render();
//         e = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"];
//         (t = o("#average-sales").data("colors")) && (e = t.split(","));
//         r = { chart: { height: 203, type: "donut" }, legend: { show: !1 }, stroke: { colors: ["transparent"] }, series: [44, 55, 41, 17], labels: ["Direct", "Affilliate", "Sponsored", "E-mail"], colors: e, responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: "bottom" } } }] };
//         new ApexCharts(document.querySelector("#average-sales"), r).render()
//     }, e.prototype.initMaps = function() { 0 < o("#world-map-markers").length && o("#world-map-markers").vectorMap({ map: "world_mill_en", normalizeFunction: "polynomial", hoverOpacity: .7, hoverColor: !1, regionStyle: { initial: { fill: "#e3eaef" } }, markerStyle: { initial: { r: 9, fill: "#727cf5", "fill-opacity": .9, stroke: "#fff", "stroke-width": 7, "stroke-opacity": .4 }, hover: { stroke: "#fff", "fill-opacity": 1, "stroke-width": 1.5 } }, backgroundColor: "transparent", markers: [{ latLng: [40.71, -74], name: "New York" }, { latLng: [37.77, -122.41], name: "San Francisco" }, { latLng: [-33.86, 151.2], name: "Sydney" }, { latLng: [1.3, 103.8], name: "Singapore" }], zoomOnScroll: !1 }) }, e.prototype.init = function() { o("#dash-daterange").daterangepicker({ singleDatePicker: !0 }), this.initCharts(), this.initMaps() }, o.Dashboard = new e, o.Dashboard.Constructor = e
// }(window.jQuery),
// function(t) {
//     "use strict";
//     t(document).ready(function(e) { t.Dashboard.init() })
// }(window.jQuery);

var lastDate = 0;
var data_binance = []
var data_huobi = []
var last_update = []
var diff = []
var TICKINTERVAL = 86400000
let XAXISRANGE = 77760 //777600000

var diff_chart = {
    series: [{
        name: 'DiffPercent',
        data: diff
    }],
    chart: {
        id: 'realtime',
        // height: '100%',
        // width: '100%',
        type: 'bar',
        height: 350,
        animations: {
            enabled: true,
            easing: 'linear',
        },
    },
    plotOptions: {
        bar: {
            colors: {
                ranges: [{
                    from: -100,
                    to: -46,
                    color: '#F15B46'
                }, {
                    from: -45,
                    to: 0,
                    color: '#FEB019'
                }]
            },
            columnWidth: '80%',
        }
    },
    dataLabels: {
        enabled: false,
    },
    yaxis: {
        title: {
            text: 'Growth',
        },
        labels: {
            formatter: function(y) {
                return y.toFixed(6) + "%";
            }
        }
    },
    xaxis: {
        type: 'datetime',
        title: {
            text: 'Time'
        },
        range: XAXISRANGE,
        labels: {
            format: "hh:mm:ss",
            datetimeUTC: false,
        },
        labels: {
            rotate: -90
        }
    }
};

var chart_diff = new ApexCharts(document.querySelector("#diff_chart"), diff_chart);




var options = {
    series: [{
            name: "binance",
            data: [].slice()
        },
        {
            name: "huobi",
            data: [].slice()
        }
    ],
    chart: {
        id: 'realtime',
        height: '100%',
        width: '100%',
        type: 'line',
        animations: {
            enabled: true,
            easing: 'linear',
        },
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    title: {
        text: 'BTC price',
        align: 'left'
    },
    markers: {
        size: 0
    },
    tooltip: {
        enabled: true,
        x: {
            show: true,
            format: "hh:mm:ss",
        },

    },
    xaxis: {
        type: 'datetime',
        title: {
            text: 'Time'
        },
        range: XAXISRANGE,
        labels: {
            format: "hh:mm:ss",
            datetimeUTC: false,
        },
        labels: {
            rotate: -90
        }

    },
    yaxis: {
        title: {
            text: 'Price ($)'
        },
        forceNiceScale: true,
        decimalsInFloat: 6
    },
    legend: {
        show: false
    },
    colors: ['#77B6EA', '#545454']
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

chart_diff.render();


let url = `ws://${window.location.host}/ws/socket-server/`

const dataSocket = new WebSocket(url)
dataSocket.onopen = function(e) {
    console.log('connection establish')

}
dataSocket.onmessage = function(e) {
    var recData = JSON.parse(e.data);
    const myObj = {
        binance: recData['price_binance'],
        huobi: recData['price_huobi'],
    };
    var num2 = parseFloat(recData['price_binance']).toFixed(2)
        // console.log(typeof recData['price_binance'])

    document.getElementById("huobi_price").innerHTML = recData['price_huobi'];
    document.getElementById("binance_price").innerHTML = num2;
    // console.log(myObj);

    data_binance.push({
        x: new Date(),
        y: recData['price_binance']
    })
    data_huobi.push({
        x: new Date(),
        y: recData['price_huobi']
    })
    diff.push({
        x: new Date(),
        y: diffrence(recData['price_huobi'], recData['price_binance'])
    })

    console.log(diff)
    chart.updateSeries([{
            name: 'binance',
            data: data_binance
        },
        {
            name: 'huobi',
            data: data_huobi
        },
    ])
    chart_diff.updateSeries([{
        name: 'DiffPercent',
        data: diff
    }, ])
}

function diffrence(huobi_price, binance_price) {
    return ((binance_price / huobi_price) - 1).toFixed(6)
}