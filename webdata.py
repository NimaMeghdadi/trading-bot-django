import websocket,json,random
ws=websocket.WebSocket()
ws.connect('ws://localhost:8000/ws/socket-server/')
listOfindex=['stock1','stock2','stock3','stock4','stock5']
for i in range(100):
    import time
    time.sleep(1)
    pp=json.dumps({'indexName':'stock1'
               ,'value':1})
#     print (pp)
    ws.send(pp)
random.choice(listOfindex)