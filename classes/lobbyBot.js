var io = require('socket.io-client');

class LobbyBot {

  constructor(socket, name) {
    this.name = (name) ? name : "";
    this.socket = socket;
    this.state = "available";
  }

  async awaitSocket(data) {
    return new Promise((resolve, reject) => {
      var timeout = 5000;
      // create timer to timeout request if it takes too long
      var timer = setTimeout(()=> {
        reject(new Error("timed out waiting for response"));
        this.socket.removeListener(data.emit, responseHandler)
      }, timeout)

      // handels response from server and if reponse times out
      function responseHandler(msg) {
        resolve(msg);
        clearTimeout(timer);
      }
      // emit data and listen to response
      this.socket.emit(data.emit, data.emitData);
      this.socket.once(data.emit, responseHandler);
    })
  }

  async getState() {
    return await this.awaitSocket({
      emit: "getState",
      emitData: ""
    }).then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  async restartClient() {
    var name = this.name
    if (name == "") return false;
    return await this.awaitSocket({
      emit: "restartClient",
      emitData: {
        name: name
      }
    }).then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  async createLobby(options) {
    return await this.awaitSocket({
      emit: "createLobby",
      emitData: options
    }).then(data => {
      this.state = "creatingLobby";
      this.name = data;
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  async leaveLobby() {
    var name = this.name;
    return await this.awaitSocket({
      emit: "leaveLobby",
      emitData: {
        name: name
      }
    }).then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  async getSummoner(summoner) {
    var name = this.name;
    return await this.awaitSocket({
      emit: "getSummoner",
      emitData: {
        name: name,
        summoner: summoner
      }
    }).then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  async invitePlayer(id) {
    var name = this.name;
    return await this.awaitSocket({
      emit: "invitePlayer",
      emitData: {
        name: name,
        id: id
      }
    }).then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  async switchTeams(team) {
    var name = this.name;
    return await this.awaitSocket({
      emit: "switchTeams",
      emitData: {
        name: name,
        team: team
      }
    }).then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  async lobbyDetails() {
    var name = this.name;
    return await this.awaitSocket({
      emit: "lobbyDetails",
      emitData: {
        name: name
      }
    }).then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  async disconnect() {
    this.socket.disconnect();
  }
}

module.exports = {
  async createConnection(login, name) {
    var socket = io.connect("http://127.0.0.1:54221");
    socket.on("connect", () => {
      socket.emit("authenticate", login);
    })
    return new LobbyBot(socket, name);
  }
}
