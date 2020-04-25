# RedisMUD Commands

## Communication

- **{_words_}**: Just type stuff to talk.
- **/emote {_words_}**: Displays and shares the words of the player in a descriptive fashion in the current room.
- **/shout {_words_}**: Displays and shares the words of the player in the current room and all adjacent rooms.
- **/whisper {_player_,_player_,_..._} {_words_}**: Displays and shares the words of the player to the list of players.

## Rooms

Rooms are where things happen. Players, monsters, objects, and loot can occupy rooms. Rooms can also contain doors. A room has a greeting message which is displayed when you enter the room. They also have a name and description. The description is only displayed when the room is looked at.

- **/create room {_name_}**: Creates a room with _name_.
- **/change room {_id_} name={_name_} description={_description_} greeting={_greeting_}**: change some or all of the properties of the room.
- **/list rooms**: Lists all the rooms in the MUD.

## Doors

Doors are one-way. If you want to link two rooms with a door, you need a door that returns. This allows one-way doors. Each door has a name and description. Descriptions are revealed when they are looked at. They have a traversal message that is displyed when the door is used. Doors can exist in multiple rooms (think magical doors) and can lead to multiple rooms (think a slide trap with forks and branches). If a door leads to multiple rooms, a destination room is picked at random.

- **/create door {_name_}**: Creates a door in the current room that leads no where with _name_.
- **/create door {_name_} to={_id_,_id_,_..._}**: Creates a door from the current room leading to rooms with _id_ with _name_.
- **/create door {_name_} from={_id_} to={_id_}**: Creates a door from room with _id_ to room with _id_ with _name_.
- **/create door {_name_} from={_id_,_id_,_..._} to={_id_,_id_,_..._}**: Creates a door from rooms with _id_ to rooms with _id_ with _name_.
- **/change door {_id_} name={_name_} description={_description_} traversal={_traversal_} from={_id_,_id_,_..._} to={_id_,_id_,_..._}**: change some or all of the properties of the room.
- **/use door {_id_}**: Uses a door by id, assuming it is in the room. If there is a door with a name that matches the id, the name will be used first. Don't give doors numeric names.
- **/use door {_name_}**: Uses a door from the name, assuming it is in the room. If there are multiple doors with that name, the command fails.

## Objects

Objects are immovable items in a room. They have a name and a description.

- **/use object {_id_}**: Uses an object by id, assuming it is in the room. If there is an object with a name that matches the id, the name will be used first. Don't give objects numeric names.
- **/use object {_name_}**: Uses an object from the name, assuming it is in the room. If there are multiple objects with that name, the command fails.

## Loot

Loot are items that players can take and use. They might be a weapon, gold, or a magic ring.

## Other

- **/teleport {_id_}**: Teleports to room where _id_ is the room id.

## Looking and Using Commands

- **/look**: Looks at a room.
- **/look {_id_}**: Looks at a thing in a room by it's id. If there is a thing with a name that matches the id, the name will be used first. Don't give things numeric names.
- **/look {_name_}**: Looks at a thing in a room by it's name. If there are multiple things with that name, the command fails.
- **/use {_id_}**: Uses a thing by id, assuming it is in the room. If there is a thing with a name that matches the id, the name will be used first. Don't give things numeric names.
- **/use {_name_}**: Uses a thing from the name, assuming it is in the room. If there are multiple things with that name, the command fails.

