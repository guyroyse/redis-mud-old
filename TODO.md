# To Do List of Doing

## Debt

- Switch to use RedisGraph.close()

## Backlog

- Add command history to WebSocket client
- Display doors to other rooms
- Implement /use command to use doors
- Implement /look command to see description of doors
- Implement command aliases
- Implement /help commands
- Implement /list rooms command
- To do list? ;)
- Implement /create command to create doors

## Doing

- Change Hub to be marked by property rather than ID (data has no meaning violation)
- Refactor Cypher queries to use internal ID over UUID
- Refactor Cypher queries to return individual fields over nodes
- Implement /list command to list rooms
- Implement /create command to create rooms
- Implement /teleport command to move between rooms

## Done

- Write tests for session
- Implement /describe command to update description of the room
- Break out WebSocket and HttpServer to own classes
- Implement error command
- Implement /emote command to emote things
- Use MERGE ON CREATE for creating initial room
- Implement /look command to see description of room
- Display prompt with name of current room
- Create 'The Hub' at server launch if it doesn't exist
- Display welcome message upon connection
- Write simple echo server
- Write simple WebSocket client
