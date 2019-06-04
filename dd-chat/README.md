
#Installation
---------------

1. Download app from https://github.com/subrahmanyampoluru/ChatApp
2. Run npm install or yarn install in terminal
3. npm start (It executes automatically : react, server, and web sockets)
4. After execution success in termnial it will open in http://localhost:3000/

###Note: Modified server.js due to port conflicts and integrated socket.io api to communicate between two server. Sorry for this :).

#Technologies used
------------------

1. Backend - Node, Express
2. Frontend - React
3. Communication - Socket.io

#Project Structure
------------------

doordash-chat
	--public 
		index.html
		faviocn.ico
		manifest.json
	--spec
		doordash specifications
	--src
		assets
			css
				chat-app.css
		components
			AvailableRooms
			ChatForm
			ChatHeader
			ChatMessages
			Message
			ProfileInfo
			SignIn
		constants
		layout
		services
		utils
			index.js



