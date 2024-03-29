from binance import Binance
from huobi import Huobi
import threading
import time
import websocket,json

def run(orderbooks, lock):
    while True:
        try:
            with lock:
                # extract and print data
                for key, value in orderbooks.items():
                    if key != 'last_update':
                        price = value['lastPrice']
                        print(f"{key}  Price: {price}")
                print()
                pp=json.dumps({'price_huobi':orderbooks['Huobi']['lastPrice'],
                            'price_binance':orderbooks['Binance']['lastPrice'],
                            })
                ws.send(pp)
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