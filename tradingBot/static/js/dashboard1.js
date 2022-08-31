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
var arr = new Array(5);
var arr = new Array(5);
var arr = new Array(5);
var arr = new Array(5);
var data_binance = []
var data_huobi = []
var last_update = []
var diff = []
var TICKINTERVAL = 86400000
let XAXISRANGE = 77760 //777600000
var sell_buy_ok = 0.0001
var binance_price
var huobi_price


// var email = document.getElementById("email"),
//     password = document.getElementById("password")
// var http = require('http');
// var email = localStorage.getItem("emailLocalStorage");
var resp = localStorage.getItem("person_info");
resp = JSON.parse(resp)

console.log(resp)
    // var empty = { "id": 0, "email": ' ', "first_name": ' ', "last_name": '', "money": 0, "bitcoin": 0 }
loginDetail()


function exchange() {
    if (resp) {
        console.log("going to buy");
        // e.preventDefault();
        let formData = new FormData(document.forms.person);
        var minn = Math.min.apply(null, [(resp.binance_bitcoin * binance_price), resp.huobi_money])
        var mn = (minn * 10 / 100) / (resp.binance_bitcoin * binance_price)
        var mm = mn * resp.binance_bitcoin
        var new_binance_bitcoin = resp.binance_bitcoin - mm
        var new_binance_money = resp.binance_money + 99.9 * (resp.binance_bitcoin * binance_price)
        var new_huobi_money = resp.huobi_money - mn
        var new_huobi_bitcoin = resp.huobi_bitcoin + 99.8 * (mm / huobi_price)

        new_huobi_money = new_huobi_money.toFixed(2)
        new_huobi_bitcoin = new_huobi_bitcoin.toFixed(6)
        new_binance_money = new_binance_money.toFixed(2)
        new_binance_bitcoin = new_binance_bitcoin.toFixed(6)
        console.log(new_huobi_money);
        console.log(new_huobi_bitcoin);
        console.log("bin " + new_binance_money);
        console.log(new_binance_bitcoin);
        // console.log("new_binance_bitcoin: " + new_binance_bitcoin);


        formData.append("huobi_money", new_huobi_money);
        formData.append("huobi_bitcoin", new_huobi_bitcoin);
        formData.append("binance_money", new_binance_money);
        formData.append("binance_bitcoin", new_binance_bitcoin);

        console.log(formData);
        // send it out
        let xhr = new XMLHttpRequest();
        url = 'http://127.0.0.1:8000/exchange/' + resp.email + '/' + resp.password + '';
        xhr.open("PUT", url);
        xhr.send(formData);

        xhr.onload = () => console.log(xhr.response);
    } else {
        window.location.href = 'login'

    }
}


function loginDetail() {
    if (resp) {
        console.log(resp);
        document.getElementById("name").innerHTML = resp.first_name + " " + resp.last_name;
        document.getElementById("email").innerHTML = resp.email;
        document.getElementById("login_true").style.display = "block"
    } else {
        document.getElementById("login_false").style.display = "block"
    }

    // localStorage.setItem("respLocalStorage", empty);
}

function eraseLoginInfo() {
    window.localStorage.removeItem('person_info');
    console.log("local: " + localStorage.getItem("person_info"));
}



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
            enabled: false,
            // easing: 'linear',
        },
    },
    plotOptions: {
        bar: {
            colors: {
                ranges: [{
                    from: 0,
                    to: sell_buy_ok,
                    color: '#feeb19'
                }, {
                    from: sell_buy_ok,
                    to: 1,
                    color: '#fe4719'
                }, {
                    from: -sell_buy_ok,
                    to: 0,
                    color: '#198cfe'
                }, {
                    from: -1,
                    to: -sell_buy_ok,
                    color: '#cc19fe'
                }]
            },
            columnWidth: '80%',
        }
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: true,
        x: {
            show: true,
            format: 'hh:mm:ss',
            formatter: undefined,
        },
        duration: 2000,

    },
    yaxis: {
        title: {
            text: 'Diffrence Percentage',
        },
        tickAmount: 0,
        labels: {
            formatter: function(y) {
                return y.toFixed(6) + "%";
            },
        },
    },
    xaxis: {
        type: "datetime",
        title: {
            text: 'Time'
        },
        range: XAXISRANGE,
        labels: {
            format: "hh:mm:ss",
            datetimeUTC: false,
            rotate: -90
        },
        tooltip: {
            enabled: true
        }
    }
};

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
            enabled: false,
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
        type: "datetime",
        title: {
            text: 'Time'
        },
        range: XAXISRANGE,
        labels: {
            format: "hh:mm:ss",
            datetimeUTC: false,
            rotate: -90
        },

    },
    yaxis: {
        title: {
            text: 'Price ($)'
        },
        forceNiceScale: true,
        decimalsInFloat: 8
    },
    legend: {
        show: false
    },
    colors: ['#77B6EA', '#545454']
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

var chart_diff = new ApexCharts(document.querySelector("#diff_chart"), diff_chart);
chart_diff.render();


let url = `ws://${window.location.host}/ws/socket-server/`

const dataSocket = new WebSocket(url)
dataSocket.onopen = function(e) {
    console.log('connection establish')

}
var count_buy_sell_buy_ok_bsell = 0
var count_buy_sell_buy_ok_hsell = 0
dataSocket.onmessage = function(e) {
    var recData = JSON.parse(e.data);
    const myObj = {
        binance: recData['price_binance'],
        huobi: recData['price_huobi'],
    };

    if (diffrence(recData['price_huobi'], recData['price_binance']) > sell_buy_ok) {
        count_buy_sell_buy_ok_bsell++

    } else {
        count_buy_sell_buy_ok_bsell = 0
    }
    if (diffrence(recData['price_huobi'], recData['price_binance']) < -1 * (sell_buy_ok)) {
        count_buy_sell_buy_ok_hsell++
    } else {
        count_buy_sell_buy_ok_hsell = 0
    }
    if (resp) {
        if (count_buy_sell_buy_ok_bsell == 0 && count_buy_sell_buy_ok_hsell == 0) {
            // document.getElementById("buy_btn").style.backgroundColor = "#d9340b"
            document.getElementById("buy_btn").disabled = false;
            document.getElementById("buy_btn").innerHTML = "0/3"
        } else if (count_buy_sell_buy_ok_bsell == 1 || count_buy_sell_buy_ok_hsell == 1) {
            // document.getElementById("buy_btn").style.backgroundColor = "#d9340b"
            document.getElementById("buy_btn").disabled = false;
            document.getElementById("buy_btn").innerHTML = "1/3"
        } else if (count_buy_sell_buy_ok_bsell == 2 || count_buy_sell_buy_ok_hsell == 2) {
            // document.getElementById("buy_btn").style.backgroundColor = "#d9340b"
            document.getElementById("buy_btn").disabled = false;
            document.getElementById("buy_btn").innerHTML = "2/3"
        } else if (count_buy_sell_buy_ok_bsell >= 3 || count_buy_sell_buy_ok_hsell >= 3) {
            // document.getElementById("buy_btn").style.backgroundColor = "#0942bd"
            document.getElementById("buy_btn").disabled = false;
            document.getElementById("buy_btn").innerHTML = "buy mtf"
        }
    }

    // console.log("bsell: " + count_buy_sell_buy_ok_bsell + " hsell: " + count_buy_sell_buy_ok_hsell);

    // var num2 = parseFloat(recData['price_binance']).toFixed(2)
    // console.log(typeof recData['price_binance'])
    document.getElementById("huobi_price").innerHTML = recData['price_huobi'];
    huobi_price = recData['price_huobi']
        // if (recData["price_huobi"] > 0) {
        //     document.getElementById("huobi_price").style.color = "green"
        // } else {
        //     document.getElementById("huobi_price").style.color = "red"
        // }
    document.getElementById("binance_price").innerHTML = parseFloat(recData['price_binance']).toFixed(2);
    binance_price = parseFloat(recData['price_binance']).toFixed(2)
        // if (recData["price_binance"] > 0) {
        //     document.getElementById("binance_price").style.color = "green"
        // } else {
        //     document.getElementById("binance_price").style.color = "red"
        // }
    document.getElementById("difference").innerHTML = diffrence(recData['price_huobi'], recData['price_binance']);
    if (diffrence(recData['price_huobi'], recData['price_binance']) > 0) {
        document.getElementById("difference").style.color = "#cad104"
    } else {
        document.getElementById("difference").style.color = "#02acd6"
    }


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

    // console.log(diff)
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

    if (data_binance.length > 85) {
        diff.shift()
        data_binance.shift()
        data_huobi.shift()

    }
}

function diffrence(huobi_price, binance_price) {
    return ((binance_price / huobi_price) - 1).toFixed(6)
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("asset");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}