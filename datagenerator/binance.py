from client import Client
from json import loads
from datetime import datetime

import requests
from socket import socket
import websocket 
from json import loads

    

class Binance(Client):
    def __init__(self, url, exchange, orderbook, lock):
        super().__init__(url, exchange)

        # local data management
        self.orderbook = orderbook[exchange]
        self.lock = lock
        self.updates = 0
        self.last_update = orderbook

    # convert message to dict, process update
    def on_message(self, message):
        data = loads(message)
        value = data['c']
        # self.orderbook['lastPrice'].insert(value)
        self.orderbook['lastPrice'] = value
        # key = "Binance"
        # self.orderbook[key] = value
    def on_open(ws):
        print("Connected to Binance")

    def on_error(ws, error):
        print(error)

    def on_close(ws, close_status_code, close_msg):
        print("### closed ###")
