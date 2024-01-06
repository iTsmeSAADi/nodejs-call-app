# PLAN OF ACTION
- Initialize our NodeJS project
- Initialize our First View
- Create a Room ID
- Add the ability to View our own video
- Add the ability to allow others to Stream their video
- Add Styling
- Add the ability to create Messages
- Add Mute button
- Add Stop Video button


# Video Calling Application Documentation


Table of Contents
1.	Introduction
2.	Features
3.	Prerequisites
4.	Installation
5.	Usage
6.	Backend
7.	Frontend
8.	Dependencies
9.	Troubleshooting
10.	Contributing
11.	License

1. Introduction
Welcome to the Video Calling Application documentation. This application allows users to conduct video conferences, enabling real-time communication with multiple participants. It utilizes WebRTC for peer-to-peer communication and Socket.IO for signaling.

2. Features
1.	Video Calling with multiple participants
2.	Real-time chat functionality
3.	Mute/unmute audio
4.	Start/stop video
5.	Hide/unhide chat panel
6.	Leave the meeting

3. Prerequisites
Before you begin, ensure you have the following installed:
1.	Node.js
2.	npm (Node Package Manager)
3.	Web browser (Google Chrome recommended)

4. Installation
Before you begin, ensure you have the following installed:
1.	Clone the repository
git clone https://github.com/your-username/video-calling-app.git

2.	Change into the project directory
cd video-calling-app

3.	Install Backend Dependencies
npm install

4.	Change into the public directory:
cd public

5.	Install Frontend Dependencies
npm install
5. Usage
1.	Start the server
npm start

2.	Open a web browser and navigate to http://localhost:3030.
3.	Enter a unique room ID or use the generated one.
4.	Share the room ID with participants to j

6. Backend
The backend is built with Node.js and Express. It uses Socket.IO for real-time communication and PeerJS for WebRTC signaling. The Express server is responsible for handling HTTP requests, and Socket.IO manages WebSocket connections.


Server Configuration: server.js configures the Express server and sets up the Socket.IO connection.
Peer Server: PeerJS server is integrated using ExpressPeerServer to handle WebRTC signaling.

Socket.IO Events:
1.	join-room: Handles user joining a room.
2.	message: Handles chat messages.
3.	leave-meeting: Handles user leaving the meeting.
4.	disconnect: Handles user disconnection.
5.	refreshed: Handles user page refresh.

7. Frontend
The frontend is built with HTML, CSS, and JavaScript. It utilizes Bootstrap for styling, jQuery for DOM manipulation, and PeerJS for WebRTC functionality.

Room Page: room.ejs is the main HTML template for the video calling room. It includes styling, script references, and placeholders for video grids.
Script Logic: script.js contains the main client-side logic. It initializes the PeerJS instance, manages media stream, handles socket events, and updates the UI based on user actions.

8. Dependencies

Backend Dependencies:
express: Web framework for Node.js.
socket.io: Real-time bidirectional event-based communication library.
peer: Peer-to-peer WebRTC library.
ejs: Embedded JavaScript templates.
uuid: Generate unique identifiers.



Frontend Dependencies:
bootstrap: Frontend framework for styling.
jquery: JavaScript library for DOM manipulation.
peerjs: PeerJS library for WebRTC.

9. Troubleshooting
Port Conflict: If port 3030 is already in use, modify the server.listen method in server.js to use an available port.
Browser Compatibility: For optimal performance, use Google Chrome.

10. Contributing
Contributions are welcome! Fork the repository, make changes, and submit a pull request.

11. License
This project is licensed under the MIT License.

