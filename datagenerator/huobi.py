from client import Client
from json import loads, dumps
from datetime import datetime
import json
import gzip


# inherits from Client
class Huobi(Client):
    # call init from parent class
    def __init__(self, url, exchange, orderbook, lock):
        super().__init__(url, exchange)

        # local data management
        self.orderbook = orderbook[exchange]
        self.lock = lock
        self.last_update = orderbook

    # convert message to dict, decode, extract top ask/bid
    def on_message(self, message):
        data = json.loads(gzip.decompress(message).decode('utf-8'))
        
        # extract bids/aks
        if 'tick' in data:
            with self.lock:
                self.orderbook['lastPrice'] = data['tick']['lastPrice']
                # self.last_update['last_update'] = datetime.now()

        # respond to ping message
        elif 'ping' in data:
            params = {"pong": "data['ping']"}
            self.ws.send(dumps(params))

    # convert dict to string, subscribe to data streem by sending message
    def on_open(self):
        print("connected to Huobi")
        super().on_open()
        params = {"sub": "market.btcusdt.ticker"}
        self.ws.send(dumps(params))
        
    def on_close(ws, close_status_code, close_msg):
        print("### closed Huobi connection ###")