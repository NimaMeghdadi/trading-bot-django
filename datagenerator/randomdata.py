import websocket,json,random

ws=websocket.WebSocket()
ws.connect('ws://localhost:8000/ws/socket-server/')
listOfindex=['stock1','stock2','stock3','stock4','stock5']
for i in range(500):
    import time
    time.sleep(1)
    pp=json.dumps({'indexName':random.choice(listOfindex)
            ,'value':random.randint(20000,25000)})
    ws.send(pp)