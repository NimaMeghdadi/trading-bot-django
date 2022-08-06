import websocket,json,random
ws=websocket.WebSocket()
ws.connect('ws://localhost:8000/ws/socket-server/')
listOfindex=['stock1','stock2','stock3','stock4','stock5']
for i in range(10):
    import time
    time.sleep(1)
    pp=json.dumps({'indexName':random.choice(listOfindex)
               ,'value':random.randint(1,1000)})
#     print (pp)
    ws.send(pp)
random.choice(listOfindex)