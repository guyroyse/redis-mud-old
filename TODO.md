# To Do List of Doing

## To Do

### Client

- ☐ Add command history to WebSocket client

### Server

- ☐ Implement /describe command to update description of the room
- ☐ Display doors to other rooms
- ☐ Implement /use command to use doors
- ☐ Implmenet /look command to see description of doors
- ☐ Implement /create command to create rooms
- ☐ Implement /create command to create doors

## Doing

### Client

### Server

## Done

### Client

- ☑︎ Write simple WebSocket client

### Server

- ☑︎ Write simple echo server
- ☑︎ Display welcome message upon connection
- ☑︎ Create 'The Hub' at server launch if it doesn't exist
- ☑︎ Display prompt with name of current room
- ☑︎ Implement /look command to see description of room


## Notes for Next Stream

- Use MERGE: MERGE (r:room {uuid:'room_uuid'}) ON CREATE SET r.name='The Hub', r.desc='Huge hub is huge' return r
- Setup stream wrapper

