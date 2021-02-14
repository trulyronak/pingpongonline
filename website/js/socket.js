const socket = io("ws://localhost:4000", {
  reconnectionDelayMax: 10000,
});
let primarySet = false,
  isPrimary = false;
  const urlParams = new URLSearchParams(window.location.search);

let roomName = urlParams.get('roomName') ?? "",
  playerName = urlParams.get('playerName') ?? "";
document.getElementById("room-name").value = roomName;
document.getElementById("player-name").value = playerName;

let socketInitialized = false;

export const toast = (message) => {
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.innerHTML = message;
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
};

export const joinRoom = () => {
  roomName = document.getElementById("room-name").value;
  playerName = document.getElementById("player-name").value;
  if (!roomName || roomName === "" || !playerName || playerName === "") {
    toast("please enter in all fields!");
    return;
  }
  toast(`joining ${roomName}!`);
  document.getElementById("player-name-label").innerHTML = playerName;
  document.getElementById("opponent-name").innerHTML = "Waiting for Opponent";
  socket.emit("join", {
    roomName,
    playerName,
  });

  socketInitialized = true;
  document.getElementById("play-match").style.display = "none";
  document.getElementById("scorebox").style.display = "block";
  document.getElementById("player-name").innerText = playerName;
};

document.getElementById("join-room-button").onclick = joinRoom;

export const sendPlayerMovement = (x, y, z, width, height) => {
  if (socketInitialized) {
    socket.emit("movement", {
      roomName,
      playerName,
      x,
      y,
	  z,
	  width, height
    });
  }
};

export const sendRoundEnd = (score) => {
  // TODO(@stanley): Do this in server later
  if (socketInitialized) {
    socket.emit("round-end", {
      score
    });
  }
}

export const sendBallPosition = (position) => {
	if (socketInitialized) {
		console.log(`sending`)
		console.log(position)
		socket.emit("updateballposition", {position});
	}
}

export const setPrimary = (pSet, areWePrimary) => {
	primarySet = pSet;
	isPrimary = areWePrimary;
}

export {
  primarySet,
  isPrimary,
  roomName,
  playerName,
  socketInitialized,
  socket,
};
