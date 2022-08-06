import asyncio
import json
import random
from sqlite3 import connect
from channels.generic.websocket import WebsocketConsumer

from channels.generic.websocket import AsyncWebsocketConsumer


class  ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.group_name = 'tableData'
        await  self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        # print(text_data)
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type':'randomFunction',
                'value':text_data,
            }
        )
    async def randomFunction(self, event):
        print(event['value'])
        await self.send(event['value'])






# class ChatConsumer(WebsocketConsumer):
#     def connect(self):
#         self.accept()
        
#         self.send(text_data=json.dumps({
#             'type':'connection_established',
#             'message':'You are now connected!'
#         }))
#     def receive(self,text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json['message']
        
#         print('Message:' , message)

#         self.send(text_data = json.dumps({
#             'type':'chat' , 
#             'message': random.randint(0,22) 
#         }))