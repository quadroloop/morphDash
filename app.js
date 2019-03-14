// IO server
// Author: Bryce Narciso C. Mercines

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var fs = fs || require('fs');

// init lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

//db defaults


app.use(express.static('src'));



app.set('port', (process.env.PORT || 3000));

http.listen(3000);

function guid() { 
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); 
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// get date
function nDate(){
  let date = new Date()
let options = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        };
let formattedDate = date.toLocaleString(undefined, options);
  return formattedDate;
}

// get time
function nTime(){
  var ts = new Date();
  return ts.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}


// new api functions here





// sending data for slower sensors
var route = "/slowData";
app.get(route,(req,res)=>{

   var dhthum = req.query.hum;
   var dhttemp = req.query.temp;
   var ultrasonic = req.query.ultrasonic;
   var raindrop = req.query.raindrop;
   var gas = req.query.gas;
   var ts = req.query.touch;

   //saving for dht
   var dht22 = db.get('dht22').value();
     var dhtData = { 
       "id": guid(),
       "humidity": dhthum,
       "temperature":dhttemp,
       "date":nDate(),
       "time":nTime()
     }
     dht22.push(dhtData);

   // saving ultrasonic data 
   var ultrasonicx = db.get('ultrasonic').value();
     var usdata = {
       "id": guid(),
       "reading": ultrasonic,
       "date": nDate(),
       "time": nTime()
      }
     ultrasonicx.push(usdata); 
   
   // saving gas sensor data
   var raindropSave = db.get('raindrop').value();
      var rainData = {
        "id": guid(),
        "reading": raindrop,
        "date": nDate(),
        "time": nTime()
      }
      raindropSave.push(rainData);

    //gas sensor
    var gasSensorx = db.get('gas').value();
       var gasData = {
         "id": guid(),       
         "reading": gas,
         "date": nDate(),
         "time": nTime()
       }
       gasSensorx.push(gasData);

    db.write();  

    var slowSensors = `
        temperature: ${dhttemp} 
        humidity: ${dhthum}
        ultrasonic: ${ultrasonic}
        raindrop: ${raindrop}
        gas: ${gas}

    `;

    var sensorSet1 = {
        temperature: dhttemp, 
        humidity: dhthum,
        ultrasonic: ultrasonic,
        raindrop: raindrop,
        gas: gas,
        touch: ts       
    }
    
    io.emit("s1",sensorSet1);

   res.send("sensor set 1: Ok");
})

// fast sensors
var route = "/fastSensors";
app.get(route,(req,res)=>{

    var sflame = req.query.flame;
    var slight = req.query.light;
    var ssound = req.query.sound;
    var shall = req.query.hall;

    var sensorSet2 = {
      flame: sflame,
      light: slight,
      sound: ssound,
      hall: shall
    }

    io.emit("s2",sensorSet2);
    res.send("sensor set 2: ok");

    // var sensors = req.query.sensor;
    // var sensorReading = req.query.reading;

    //    switch(sensors){
    //       // for light sensor
    //       case 'light':
    //          var lightTable = db.get('light').value();
    //             var newData = {
    //                id: guid(),
    //                reading: sensorReading,
    //                date: nDate(),
    //                time: nTime()
    //             }
    //        lightTable.push(newData);
    //       break;

    //       // for flame sensor
    //       case 'flame':
    //        var flameTable = db.get('flame').value();
    //             var newData = {
    //                id: guid(),
    //                reading: sensorReading,
    //                date: nDate(),
    //                time: nTime()
    //             }
    //        flameTable.push(newData);
    //       break;

    //       // for sound sensor
    //       case 'sound':
    //        var soundTable = db.get('sound').value();
    //             var newData = {
    //                id: guid(),
    //                reading: soundTable,
    //                date: nDate(),
    //                time: nTime()
    //             }
    //        soundTable.push(newData);
    //       break;

    //       // for hall effect
    //       case 'halleffect':
    //        var hallTable = db.get('halleffect').value();
    //             var newData = {
    //                id: guid(),
    //                reading: sensorReading,
    //                date: nDate(),
    //                time: nTime()
    //             }
    //        hallTable.push(newData);
    //       break;

    //    } 

       

       // io.emit(s2,);


})


// getting data logs
var route = "/datalogs";
app.get(route,(req,res)=>{
    var all = db.value();
    res.send(all);

})

var port = 3000;

// identify the user using ip


//welcome message
console.log("=======================")
console.log("    MorphDash v. 0.11  ");
console.log("=======================")
console.log(" Running server         ");
console.log("------------------------");
console.log("listening on port: "+port);

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {

    socket.broadcast.emit('welcome', { message: 'Welcome!' });
   // socket functions here

});

