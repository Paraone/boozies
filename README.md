# Boozies

Boozies is a 2D multiplayer game based on the classic game 
Tag. Users can login and create gamerooms. Others can join 
a created room. when player are ready you hit the start 
button and the game begins. One person is chosen at random
to be "it". The game continues in a help-tag fashion. players
tag other players until there is only one who is not "it".
That player wins the game. 3 players is the minimum amount of
players needed to play a successful game.

Tech Used:

	Frameworks:

	-ReactJS

	APIs:

	-Firebase

	Runtime Environment:

	-Apache

	Dependencies:

	-pixi.js
	-firebase
	-redux
	-react-redux

Approach:

	1. First steps where setting up redux and firebase to create
	user accounts.
	2. Next was to implement pixi.js to create a gameroom.
	3. Finally game logic implementation

installation:

	go to: 

	https://boozies.000webhostapp.com

unsolved problems:

	-There are some bugs when players leave a room and 
	return to lobby.

	-finish CRUD Update and Desroy for users.
	
	-I would like to change primitive graphics to 
	animated sprites

	-I would like to implement a single player and 2-player mode

	-Site is in critical need of styling.

MVP:

	An online multiplayer game.
	Deployed at boozies.000webhost.com
	Users and games stored in database
	Create games GUI using react and pixi.js




