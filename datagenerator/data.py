import csv
from distutils.log import info
import random
from re import X
import time
from binance import Binance
from huobi import Huobi
# from kucoin import Kucoin
from datetime import datetime

import datetime as dt
import threading
import time


fieldnames = ["priceTime","priceBinance","priceHuobi","diffPer"]

with open('data.csv' , 'w') as csv_file:
    csv_writer = csv.DictWriter(csv_file , fieldnames = fieldnames)
    csv_writer.writeheader()
    

# Create figure for plotting
def run(orderbooks, lock):
    priceTime = 0
    priceBinance = 40000
    priceHuobi = 40000
    diffPer = 0
    # local last_update
    current_time = datetime.now()

    while True:
        try:
            # check for new update
            if orderbooks['last_update'] != current_time:
                with lock:
                    i = 2
                    # print("i =" + i)
                    for key, value in orderbooks.items():
                        i= i-1
                        price = value[key]
                        # print(f"{key} price: {price} i={i}")

                        if i == 0:
                            priceH = price
                            break
                        elif i == 1:
                            priceB= price
                        
                    with open('data.csv' , 'a') as csv_file:
                            csv_writer = csv.DictWriter(csv_file , fieldnames=fieldnames)
                            
                            info = {
                                "priceTime":priceTime,
                                "priceBinance":priceBinance,
                                "priceHuobi":priceHuobi ,
                                "diffPer":diffPer
                            }
                            
                            csv_writer.writerow(info)
                            # res = diffper(float(priceB),priceH)
                            # res = diffper(2,3)
                            print(priceTime , priceBinance, priceHuobi , diffPer )
                            
                            priceTime =dt.datetime.now().strftime('%H:%M:%S') #time
                            priceBinance = priceB
                            priceHuobi = priceH
                            diffPer = diffper(float(priceB),priceH)
                    print()
                    time.sleep(1)
                    # plt.show()

                    # set local last_update to last_update
                    current_time = orderbooks['last_update']
            time.sleep(0.1)
        except Exception:
            pass

def diffper(B, H):
    m = B/H
    if m>1:
        k= m - 1
    elif m<1:
        k = 1 - m
    else:
        k=0

    return round(k, 5)

def main():
    lock = threading.Lock()
    orderbooks = {
        "Binance": {},
        "Huobi": {},
        "Kucoin": {},
        "last_update": None,
    }

    # create websocket threads
    binance = Binance(
        url="wss://stream.binance.com:9443/ws/btcusdt@ticker",
        exchange="Binance",
        orderbook=orderbooks,
        lock=lock,
    )

    huobi = Huobi(
        url="wss://api.huobipro.com/ws",
        exchange="Huobi",
        orderbook=orderbooks,
        lock=lock,
    )
    
    # kucoin = Kucoin(
    #     url="wss://ws-api.kucoin.com/endpoint",
    #     exchange="Kucoin",
    #     orderbook=orderbooks,
    #     lock=lock,
    # )

    # start threads
    binance.start()
    huobi.start()
    # kucoin.start()

    # process websocket data
    run(orderbooks, lock)

if __name__ == "__main__":
    main()