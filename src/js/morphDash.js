// morphDash.js

function el(element){
	return document.getElementById(element);
}

function sclass(classx){
	return document.getElementsByClassName(classx);
}


// declare websocket server 

var socket = io();


// for parsing sensor set = 1
socket.on("s1",(sensors1)=>{
    el('hum').innerHTML = parseFloat(sensors1.humidity).toFixed(2);
    el('temp').innerHTML = parseFloat(sensors1.temperature).toFixed(2);
    el('us').innerHTML = parseFloat(sensors1.ultrasonic).toFixed(2);
    el('rd').innerHTML = parseInt(sensors1.raindrop);
    el('ct').innerHTML = sensors1.touch; 

    var gasReading = parseInt(sensors1.gas);
        if(gasReading == 1){
           el('gas').innerHTML = "Normal";
        }else{
           el('gas').innerHTML = "Warning!";
        }

})


// for parsing sensor set 2

socket.on("s2",(sensor2)=>{
   var soundReading = sensor2.sound;


   // reading sound
   if(soundReading == "1"){
      soundReading = 1+Math.random();
   }else{
      soundReading = 0
   }


   // detecting flames
   if(sensor2.flame == "0"){
      el('fs').innerHTML = "Warning"; 
   }else{
      el('fs').innerHTML = "Normal";
   }

   //  detecting light
   el('ls').innerHTML = sensor2.light;
   el('ssx').innerHTML = soundReading;

  if(sensor2.hall == "0"){
    el('he').innerHTML = "Magnetized";

  }else{
    el('he').innerHTML = "Normal"
  }

   console.log(sensor2);
})

      

// data

var line1 = new TimeSeries();
var line2 = new TimeSeries();
var line3 = new TimeSeries();

var humidity = 0;
var temperature = 0;
var sound = 0;

var cpage = "dashboard";

function parseDatalogs(){
    axios.get("/datalogs")
      .then(res=>{
       // temperature & humidity sensor
       el('th').innerHTML = "";
      
        var count1 = 1;
       res.data.dht22.forEach(dht=>{
         el('th').innerHTML += `
          <tr>
             <td>${count1}</td>
             <td>${dht.humidity}</td>
             <td>${dht.temperature} ℃</td>
             <td>${dht.date}</td>
             <td>${dht.time}</td>
          </tr>
         `;
         count1++;
       });

       // ultrasonic sensor
       var count2 = 1;
       el('dt').innerHTML = "";
        res.data.ultrasonic.forEach(dht=>{
         el('dt').innerHTML += `
          <tr>
             <td>${count2}</td>
             <td>${dht.reading}</td>
             <td>${dht.date}</td>
             <td>${dht.time}</td>
          </tr>
         `;
         count2++
       });
       // gas sensor
       var count3 = 1;
       el('gs').innerHTML = "";
        res.data.gas.forEach(dht=>{
         el('gs').innerHTML += `
          <tr>
             <td>${count3}</td>
             <td>${dht.reading}</td>
             <td>${dht.date}</td>
             <td>${dht.time}</td>
          </tr>
         `;
         count3++;
       });
       // sound sensor
       var count4 = 1;     
       el('ss').innerHTML = "";
       res.data.sound.forEach(dht=>{
         el('ss').innerHTML += `
          <tr>
             <td>${dht.id}</td>
             <td>${dht.reading}</td>
             <td>${dht.date}</td>
             <td>${dht.time}</td>
          </tr>
         `;
         count4++;
       });
       // touch sensor
       var count5 = 1;    
       el('ts').innerHTML = "";
        res.data.capacitive.forEach(dht=>{
         el('ts').innerHTML += `
          <tr>
             <td>${count5}</td>
             <td>${dht.reading}</td>
             <td>${dht.date}</td>
             <td>${dht.time}</td>
          </tr>
         `;
         count5++;
       });
       // flame sensor
       var count6 =1;    
       el('fsx').innerHTML = "";
        res.data.flame.forEach(dht=>{
         el('fsx').innerHTML += `
          <tr>
             <td>${count6}</td>
             <td>${dht.reading}</td>
             <td>${dht.date}</td>
             <td>${dht.time}</td>
          </tr>
         `;
         count6++;
       });
       // raindrop sensor
      var count7=1;    
       el('rs').innerHTML = "";
        res.data.raindrop.forEach(dht=>{
         el('rs').innerHTML += `
          <tr>
             <td>${count7}</td>
             <td>${dht.reading}</td>
             <td>${dht.date}</td>
             <td>${dht.time}</td>
          </tr>
         `;
         count7++;
       });
       // magnetic sensor
       var count8 =0;    
       el('ms').innerHTML = "";
        res.data.halleffect.forEach(dht=>{
         el('ms').innerHTML += `
          <tr>
             <td>${count8}</td>
             <td>${dht.reading}</td>
             <td>${dht.date}</td>
             <td>${dht.time}</td>
          </tr>
         `;
         count8++;
       });
       // list sensor
       var count9 = 1;    
       el('lsx').innerHTML = "";
        res.data.light.forEach(dht=>{
         el('lsx').innerHTML += `
          <tr>
             <td>${count9}</td>
             <td>${dht.reading}</td>
             <td>${dht.date}</td>
             <td>${dht.time}</td>
          </tr>
         `;
         count9++;
       });        
    });
}

function nav(page,btn){
   if(page === "datalogs"){
      parseDatalogs();
   }
   sclass('active')[0].classList.remove("active");
   btn.classList.add('active');
   el(cpage).style.display = "none";
   el(page).style.display = "block";
   el('cpage').innerHTML = page;
   el('cpage').style = "text-transform: Capitalize;"
   cpage = page;
}



// Add a random value to each line every second
setInterval(function() {
  line1.append(new Date().getTime(), parseInt(el('hum').innerHTML));
  line2.append(new Date().getTime(), parseInt(el('temp').innerHTML));
  line3.append(new Date().getTime(), parseFloat(el('ssx').innerHTML));
}, 500);

// Add to SmoothieChart


      function createTimeline() {
        var chart = new SmoothieChart({responsive: true});
        chart.addTimeSeries(line1,{ strokeStyle:'#3F88BF', fillStyle:'rgba(77, 157, 218, 0.68)', lineWidth:2 });
        chart.addTimeSeries(line2,{ strokeStyle:'#E21C33', fillStyle:'rgba(226, 28, 51, 0.58)', lineWidth:2 });

        chart.streamTo(document.getElementById("chart"), 500);
      }

      function createSoundChart(){
      	var schart = new SmoothieChart({responsive:true});
      	schart.addTimeSeries(line3,{ strokeStyle:'#3F88BF', fillStyle:'rgba(77, 157, 218, 0.68)', lineWidth:2 });

        schart.streamTo(document.getElementById("soundchart"), 500);
      }


window.onload = () =>{
	createTimeline();
	createSoundChart();
}      