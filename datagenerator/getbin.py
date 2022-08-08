from socket import socket
import websocket 
from json import loads
cc = 'btcusdt'
socket = 'wss://stream.binance.com:9443/ws/btcusdt@ticker'

def on_open(ws):
    print("Opened connection to Binance")

def on_message(ws, message):
    data = loads(message)
    
    print(data['c'])

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")
    
ws = websocket.WebSocketApp(socket,
                              on_open=on_open,
                              on_message=on_message,
                              on_error=on_error,
                              on_close=on_close)

ws.run_forever()