const lobbyBot = require("./classes/lobbyBot");

var run = (async () => {
  var socket = await lobbyBot.createConnection({
    username: "root",
    password: "SAj12lksd9asd0asdj12"
  })
  socket.name = "summonerggbot1"
  var a = await socket.lobbyDetails();
  console.log(a)

  // var a = await socket.createLobby({
  //   map: 11,
  //   mode: 6,
  //   teamSize: 5,
  //   id: "21312321",
  //   password: "1312en129ue",
  //   region: "NA"
  // })
  // // socket.name = "summonerggbot1"
  // setTimeout(async ()=> {
  //   // await socket.leaveLobby();
  //   var b = await socket.getSummoner("pass")
  //   var c = await socket.lobbyDetails();
  //   console.log(c)
  //   await socket.switchTeams("one");
  //   await socket.invitePlayer(b.summonerId)
  //   await socket.disconnect();
  // }, 2000)
  // console.log(socket)
})();