from binance import Binance
from huobi import Huobi
from datetime import datetime
import threading
import time
import websocket,json,random

# print top bid/ask for each exchange
# run forever
def run(orderbooks, lock):
    # local last_update
    current_time = datetime.now()

    while True:
        try:
            # check for new update
            # if orderbooks['last_update'] != current_time:
            with lock:
                # extract and print data
                for key, value in orderbooks.items():
                    if key != 'last_update':
                        price = value['lastPrice']
                        print(f"{key}  Price: {price}")
                print()
                pp=json.dumps({'price_huobi':orderbooks['Huobi']['lastPrice'],
                            'price_binance':orderbooks['Binance']['lastPrice'],
                            # 'last_update':datetime.now()
                            })
                # print (pp)
                ws.send(pp)

                # set local last_update to last_update
            time.sleep(1)
        except Exception:
            pass


if __name__ == "__main__":
    ws=websocket.WebSocket()
    ws.connect('ws://localhost:8000/ws/socket-server/')
    # data management
    lock = threading.Lock()
    orderbooks = {
        "Binance": {},
        "Huobi": {},
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

    # start threads
    binance.start()
    huobi.start()

    # process websocket data
    run(orderbooks, lock)