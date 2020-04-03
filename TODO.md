# To Do List of Doing

## To Do

- ☐ Client: Add command history to WebSocket client
- ☐ Server: Implement /describe command to update description of the room
- ☐ Server: Display doors to other rooms
- ☐ Server: Implement /use command to use doors
- ☐ Server: Implement /look command to see description of doors
- ☐ Server: Implement /create command to create rooms
- ☐ Server: Implement /create command to create doors
- ☐ Server: Implement /emote command to emote things

## Doing

- ☐ Server: Use MERGE ON CREATE for creating initial room

      `MERGE (r:room { uuid: 'room_uuid' }) ON CREATE SET r.name='The Hub', r.desc='Huge hub is huge' RETURN r`

## Done

- ☑︎ Client: Write simple WebSocket client

### Server

- ☑︎ Server: Write simple echo server
- ☑︎ Server: Display welcome message upon connection
- ☑︎ Server: Create 'The Hub' at server launch if it doesn't exist
- ☑︎ Server: Display prompt with name of current room
- ☑︎ Server: Implement /look command to see description of room
