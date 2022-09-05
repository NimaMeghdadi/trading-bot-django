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
var count_buy_sell_buy_ok_bsell = 0
var count_buy_sell_buy_ok_hsell = 0
var recData

var resp = localStorage.getItem("person_info");
// updateUser()
resp = JSON.parse(resp)

window.onload = init()

function init() {
    if (resp) {
        updateUser()
        updateAsset()
    }

}

function updateAsset() {
    document.getElementById("huobi_money").innerHTML = resp.huobi_money;
    document.getElementById("huobi_bitcoin").innerHTML = resp.huobi_bitcoin;
    document.getElementById("binance_money").innerHTML = resp.binance_money;
    document.getElementById("binance_bitcoin").innerHTML = resp.binance_bitcoin;
}

loginDetail()

function updateUser() {
    if (resp) {

        const request = new XMLHttpRequest();
        const url = 'http://127.0.0.1:8000/users/' + resp.email + '/' + resp.password + '';
        request.open("GET", url);
        request.send();

        request.onload = (e) => {
            // console.log(JSON.parse(request.response));
            let resp = JSON.parse(request.response)
            if (resp.id) {
                localStorage.setItem("person_info", request.response);
            }
        }

        updateAsset()
    }
}
let permission = Notification.permission;

if (permission === "default") {
    requestAndShowPermission();
}

function requestAndShowPermission() {
    Notification.requestPermission(function(permission) {
        if (permission === "granted") {
            showNotification();
        }
    });
}

function showNotification(benefit) {
    let title = "your benefit is";
    let body = benefit + "$";

    let notification = new Notification(title, { body });

    notification.onclick = () => {
        notification.close();
        window.parent.focus();
    }

}

function exchange(e) {
    e.preventDefault();
    if (resp && recData) {
        if (resp.huobi_money == null || resp.huobi_bitcoin == null || resp.binance_money == null || resp.binance_bitcoin == null || resp.huobi_money == 0 || resp.huobi_bitcoin == 0 || resp.binance_money == 0 || resp.binance_bitcoin == 0) {
            alert("you don't have money")
        } else {
            resp = localStorage.getItem("person_info");
            resp = JSON.parse(resp)
            percentage = Number(document.getElementById("percentage").value)
            let formData = new FormData(document.forms.person);
            if (diffrence(recData['price_huobi'], recData['price_binance']) > 0) {
                // console.log("Binance Sell");
                var minn = Math.min.apply(null, [(resp.binance_bitcoin * binance_price), resp.huobi_money])
                var mb = (minn * percentage / 100)
                var mm = mb / (binance_price)

                var new_binance_bitcoin = resp.binance_bitcoin - mm
                var new_binance_money = resp.binance_money + mb
                var new_huobi_money = resp.huobi_money - (mm * recData['price_huobi'])
                var new_huobi_bitcoin = resp.huobi_bitcoin + mm

                new_huobi_money = new_huobi_money.toFixed(2)
                new_huobi_bitcoin = new_huobi_bitcoin.toFixed(6)
                new_binance_money = new_binance_money.toFixed(2)
                new_binance_bitcoin = new_binance_bitcoin.toFixed(6)

                var sum_old = parseFloat(resp.huobi_money) + parseFloat(resp.binance_money)
                var sum_new = parseFloat(new_huobi_money) + parseFloat(new_binance_money)
                benefit = sum_new - sum_old
                benefit = benefit.toFixed(2)
                showNotification(benefit)
                console.log("benefit: " + benefit)

                formData.append("huobi_money", new_huobi_money);
                formData.append("huobi_bitcoin", new_huobi_bitcoin);
                formData.append("binance_money", new_binance_money);
                formData.append("binance_bitcoin", new_binance_bitcoin);

            } else if (diffrence(recData['price_huobi'], recData['price_binance']) < 0) {
                // console.log("diffrence price huobi:" + recData['price_huobi'] + "price huobi:" + recData['price_binance']);
                // console.log("Huobi sell");
                var minn = Math.min.apply(null, [(resp.huobi_bitcoin * recData['price_huobi']), resp.binance_money])
                var mb = (minn * percentage) / 100
                var mm = mb / (recData['price_huobi'])

                var new_huobi_bitcoin = resp.huobi_bitcoin - mm
                var new_huobi_money = resp.huobi_money + mb
                var new_binance_bitcoin = resp.binance_bitcoin + mm
                var new_binance_money = resp.binance_money - (mm * recData['price_binance'])

                new_huobi_money = new_huobi_money.toFixed(2)
                new_huobi_bitcoin = new_huobi_bitcoin.toFixed(6)
                new_binance_money = new_binance_money.toFixed(2)
                new_binance_bitcoin = new_binance_bitcoin.toFixed(6)

                var sum_old = parseFloat(resp.huobi_money) + parseFloat(resp.binance_money)
                var sum_new = parseFloat(new_huobi_money) + parseFloat(new_binance_money)
                benefit = (sum_new) - (sum_old)
                benefit = benefit.toFixed(2)
                    // console.log("benefit: " + benefit)

                showNotification(benefit)

                formData.append("huobi_money", new_huobi_money);
                formData.append("huobi_bitcoin", new_huobi_bitcoin);
                formData.append("binance_money", new_binance_money);
                formData.append("binance_bitcoin", new_binance_bitcoin);

            }
            let xhr = new XMLHttpRequest();
            url = 'http://127.0.0.1:8000/exchange/' + resp.email + '/' + resp.password + '';
            xhr.open("PUT", url);
            xhr.send(formData);

            xhr.onload = () => updateUser();


        }
    } else {
        window.location.href = 'login'

    }

}


function loginDetail() {
    if (resp) {
        // console.log(resp);
        resp.first_name = resp.first_name === null ? ' ' : resp.first_name
        resp.last_name = resp.last_name === null ? ' ' : resp.last_name
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
    // console.log("local: " + localStorage.getItem("person_info"));
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
                    color: '#ede209'
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
                    color: '#3f00ff'
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
    colors: ['#ede209', '#198cfe']
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

dataSocket.onmessage = function(e) {
    recData = JSON.parse(e.data);
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
        switch (true) {
            case count_buy_sell_buy_ok_bsell == 0 && count_buy_sell_buy_ok_hsell == 0:
                document.getElementById("buy_btn").disabled = true;
                document.getElementById("buy_btn").innerHTML = "0/3"
                break;
            case count_buy_sell_buy_ok_bsell == 1 || count_buy_sell_buy_ok_hsell == 1:
                document.getElementById("buy_btn").disabled = true;
                document.getElementById("buy_btn").innerHTML = "1/3"
                break;
            case count_buy_sell_buy_ok_bsell == 2 || count_buy_sell_buy_ok_hsell == 2:
                document.getElementById("buy_btn").disabled = true;
                document.getElementById("buy_btn").innerHTML = "2/3"
                break;

            case count_buy_sell_buy_ok_bsell >= 3 || count_buy_sell_buy_ok_hsell >= 3:
                document.getElementById("buy_btn").disabled = false;
                document.getElementById("buy_btn").innerHTML = "BUY"
                break;

        }
    }
    document.getElementById("huobi_price").innerHTML = recData['price_huobi'];
    huobi_price = recData['price_huobi']
    document.getElementById("binance_price").innerHTML = parseFloat(recData['price_binance']).toFixed(2);
    binance_price = parseFloat(recData['price_binance']).toFixed(2)
    document.getElementById("difference").innerHTML = diffrence(recData['price_huobi'], recData['price_binance']);
    if (diffrence(recData['price_huobi'], recData['price_binance']) > 0) {
        document.getElementById("difference").style.color = "#cad104"
    } else {
        document.getElementById("difference").style.color = "#02acd6"
    }
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
var btn = document.getElementById("asset");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}