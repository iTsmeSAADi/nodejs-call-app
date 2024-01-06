const socket = io('http://localhost:3030');
let videoGrid = document.getElementById('video-grid');
let videoElement = document.createElement('video');
videoElement.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
});

let myvideoStream;

const leaveMeeting = () => {
    console.log('called');

    const videoGrid = document.getElementById('video-grid')
    if (videoGrid) {
        videoGrid.innerHTML = '';
        videoGrid.textContent = 'Disconnected';
    }

    peer.destroy();

    myvideoStream.getTracks().forEach(track => track.stop());

    socket.emit('leave-meeting');
};

const hideUnhide = () => {
    const rightPanel = document.querySelector('.main__right');
    if (rightPanel.style.display === 'none' || rightPanel.style.display === '') {
        rightPanel.style.display = 'flex';
        showChat(); 
    } else {
        rightPanel.style.display = 'none';
        hideChat();  
    }
};

const hideChat = () => {
    const html = `
    <i class="fas fa-comment-alt"></i>
    <span>Show Chat</span>
    `;
    document.querySelector('.main__chat__button').innerHTML = html;
    document.getElementById('leaveMeeting').style.position = 'inherit'
};

const showChat = () => {
    const html = `
    <i class="unmute fas fa-comment-slash"></i>
    <span>Hide Chat</span>
    `;
    document.querySelector('.main__chat__button').innerHTML = html;
    document.getElementById('leaveMeeting').style.position = 'relative'
    document.getElementById('leaveMeeting').style.right = '300%'
};

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myvideoStream = stream;
    addVideoStream(videoElement, stream);

    socket.on('user-connected', (userId) => {
        console.log('User connected:', userId);
        connectToNewUser(userId, stream);
    });

    socket.on('user-refreshed', (userId) => {
        console.log('User refreshed:', userId);
        handleUserRefreshed(userId);
    });

    socket.on('user-disconnected', (userId) => {
        console.log('User disconnected:', userId);
        handleUserDisconnected(userId);
    });

    socket.on('user-left', (userId) => {
        console.log('User left:', userId);
        handleUserLeft(userId);
    });
});

peer.on('open', (id) => {
    console.log('Peer ID:', id);
    socket.emit('join-room', ROOM_ID, id);

    socket.emit('refreshed', id);
});

peer.on('call', (call) => {
    call.answer(myvideoStream);

    let userVideoElement = document.createElement('video');

    call.on('stream', (userVideoStream) => {
        addVideoStream(userVideoElement, userVideoStream);
    });
});

const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    let userVideoElement = document.createElement('video');

    call.on('stream', (userVideoStream) => {
        addVideoStream(userVideoElement, userVideoStream, userId); 
    });
};

const addVideoStream = (video, stream, userId) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    video.classList.add(`video-${userId}`);
    videoGrid.append(video);
};

const handleUserRefreshed = (userId) => {
    const oldVideo = document.querySelector(`.video-${userId}`);
    if (oldVideo) {
        oldVideo.remove();
    }
};

const handleUserDisconnected = (userId) => {
    const oldVideo = document.querySelector(`.video-${userId}`);
    if (oldVideo) {
        oldVideo.remove();
    }
};

const handleUserLeft = (userId) => {
    const oldVideo = document.querySelector(`.video-${userId}`);
    if (oldVideo) {
        oldVideo.remove();
    }
};

$(document).on('keyup', '#chat_message', (e) => {
    if (e.keyCode === 13 && $(e.target).val().trim() !== '') {
        const message = $(e.target).val();
        socket.emit('message', message);
        $(e.target).val('');
    }
});

socket.on('createMessage', message => {
    $('.messages').append(`<li class="message"><b>user</b><br/>${message}</li>`);
    console.log(message);
});

const muteUnmute = () => {
    const enabled = myvideoStream.getAudioTracks()[0].enabled;

    if (enabled) {
        setUnmuteButton();
        myvideoStream.getAudioTracks()[0].enabled = false;
    } else {
        setMuteButton();
        myvideoStream.getAudioTracks()[0].enabled = true;
    }
};

const playStop = () => {
    const enabled = myvideoStream.getVideoTracks()[0].enabled;

    if (enabled) {
        setPlayVideo();
        myvideoStream.getVideoTracks()[0].enabled = false;
    } else {
        setStopVideo();
        myvideoStream.getVideoTracks()[0].enabled = true;
    }
};

const setMuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Unmute</span>
    `;
    document.querySelector('.main__mute__button').innerHTML = html;
};

const setUnmuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
    `;
    document.querySelector('.main__mute__button').innerHTML = html;
};

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span>Unmute</span>
    `;
    document.querySelector('.main__video__button').innerHTML = html;
};

const setPlayVideo = () => {
    const html = `
    <i class="unmute fas fa-video-slash"></i>
    <span>Unmute</span>
    `;
    document.querySelector('.main__video__button').innerHTML = html;
};

document.getElementById('leaveMeeting').addEventListener('click', leaveMeeting);
document.getElementById('hideUnhideButton').addEventListener('click', hideUnhide);
