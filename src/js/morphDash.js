// morphDash.js

function el(element){
	return document.getElementById(element);
}

function sclass(classx){
	return document.getElementsByClassName(classx);
}

      

      // Data
var line1 = new TimeSeries();
var line2 = new TimeSeries();

// Add a random value to each line every second
setInterval(function() {
  line1.append(new Date().getTime(), Math.random());
  line2.append(new Date().getTime(), Math.random());
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
      	schart.addTimeSeries(line1,{ strokeStyle:'#3F88BF', fillStyle:'rgba(77, 157, 218, 0.68)', lineWidth:2 });

        schart.streamTo(document.getElementById("soundchart"), 500);
      }


window.onload = () =>{
	createTimeline();
	createSoundChart();
}      