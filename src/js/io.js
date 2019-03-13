 io.js


var cLimit;
var priceCharge = 9.9766;
var cdevice = 'io-tx-2466';

var socket = io();

function el(element){
  return document.getElementById(element);
}

function show(element){
  document.getElementById(element).style.display = "block";	
}

function hide(element){
	document.getElementById(element).style.display = "none";
}

function getDate(){
  var d = new Date();
 return  d.getMonth();

}

function changeValue(){
	swal({
      html: `
        <div class="">
           <h2 class="text-dark"><i class="fa fa-money text-info"></i> Change Price Limit</h2>
           <center>
               <input type="number" id="limitPrice" class="form-control text-muted text-center limit" placeholder="Price limit" value="${cLimit}">
               <p class="py-2 text-dark small">Set the price limit for your electric bill, you will be notified if 50% of that limit price is reached.</p>
           </center>
        </div>
     `,
     showCancelButton: true
    }).then((res)=>{
        if(res){
            var newValue = document.getElementById("limitPrice").value;
						if(newValue != 0){
            axios.get(`/changeLimit?valuex=${newValue}&device=${cdevice}`)
            .then(res=>{
              swal({
              	title: "Success",
              	text: "Changed Price Limit!",
              	showConfirmButton: true,
              	type: 'success',
              });
              updateDashboard();
            });
					}else{
						swal("Sorry","you can not set price limit to zero","info");
					}
        }
    })
}

// update dashboard
// setInterval(()=>{
//   axios.get("io.php?getStats=get&device="+cdevice)
//     .then((res)=>{
//      document.getElementById("limitx").innerHTML = (parseFloat(res.data[0][0])).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
// 		 document.getElementById("lpower").innerHTML = `${res.data[0][3]/1000} KW`;
// 		 document.getElementById("tpower").innerHTML = `${res.data[0][1]/1000} KW`;
// 		 document.getElementById("tbill").innerHTML = ((parseInt(res.data[0][1])/1000)/(res.data[0][2]/3600).toFixed(4)*cc).toFixed(4);
//     // 50% of the price limit
// 		 var plimit = (((parseInt(res.data[0][1])/1000)/(res.data[0][2]/3600).toFixed(4)*9.9766).toFixed(4)/(parseFloat(res.data[0][0]))*100).toFixed(0);
// 		 if(plimit >= 50){
// 			 notification();
// 		 }

// 	})
// },2000);





'use strict';

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

(function(global) {
	var Months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = Months[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function() {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());


}(this));


var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var color = Chart.helpers.color;
		

		window.onload = function() {
			
       document.getElementById("email").focus();
       if(localStorage.usr == "false"){
       	 el('lcontainer').style.display = "block";
       	 el('scontainer').style.display = "none";
       	 el('app').style.display = "none";
       	 el('email').focus();
       	 cpage = "login";
       }else{
       	 loadDashboard();
       	 el('app').style.display = "block";
       }

		};


function ndate(){
  let date = new Date(2014, 0, 30)
let options = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        };
let formattedDate = date.toLocaleString(undefined, options);
  return formattedDate;
}


function tbill(val){
	el('tbill').innerHTML = val;
}

function priceFormat(val){
	return parseInt(val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function updateDashboard(){
	axios.get(`/getDashboard?user=${localStorage.email}`)
.then(res=>{

el('limitx').innerHTML = priceFormat(res.data.priceLimit);
el('tpower').innerHTML = res.data[MONTHS[getDate()]];
el('cm').innerHTML = MONTHS[getDate()];
el('cd').innerHTML = ndate();
tbill(res.data[MONTHS[getDate()]]);
});
}

// load every data in the dashboard
function loadDashboard() {
axios.get(`/getDashboard?user=${localStorage.email}`)
.then(res=>{

el('limitx').innerHTML = priceFormat(res.data.priceLimit);
el('tpower').innerHTML = res.data[MONTHS[getDate()]];
el('cm').innerHTML = MONTHS[getDate()];
el('cd').innerHTML = ndate();
tbill(res.data[MONTHS[getDate()]]);

var delta = [res.data['January'], res.data['February'], res.data['March'], res.data['April'], res.data['May'], res.data['June'], res.data['July'], res.data['August'], res.data['September'], res.data['October'], res.data['November'], res.data['December']];
var pc = delta.map(x=>parseInt(x));
var tb = delta.map(y=>parseInt(y));
var barChartData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			datasets: [{
				label: 'Power consuption (KWph)',
				backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
				borderColor: window.chartColors.purple,
				borderWidth: 1,
				data: pc
			},

			{
				label: 'Bill (Philippine Peso)',
				backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
				borderColor: window.chartColors.yellow,
				borderWidth: 1,
				data: tb
			},

			 ]

		};

	var ctx = document.getElementById('canvas').getContext('2d');
			window.myBar = new Chart(ctx, {
				type: 'bar',
				data: barChartData,
				options: {
					responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: ''
					}
				}
			});
 });
}		

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

var txbill = 0;
var txpower = 0;

socket.on("updateDash",()=>{
  el('lpower').innerHTML = rand(70,90);
  txpower += rand(70,90)/1000;
  el('tpower').innerHTML = (txpower).toFixed(4); 
  txbill += 20;
  el('tbill').innerHTML = txbill;
    var limitxx = parseFloat(el('limitx').innerHTML)

    if(limitxx < txbill){
    	 notification();
    }
 }); 

function viewProfile(){
	swal({
		html: `<h3 class="text-dark"><i class="fa fa-user-circle mr-1 text-info"></i>Profile</h3>
    <hr>
		<h3 class="text-info">${localStorage.username}<br>
     <span class="small text-muted">${localStorage.email}</span>
		</h3>
		<div class="account-toolbar py-1 px-0">
		  <!-- <button class="btn btn-small btn-round btn-sm" id="upass">Update Password</button> -->
			 <button class="btn btn-danger btn-small btn-round btn-sm" id="lg"><i class="fa fa-circle mr-1"></i> Log out</button>
		</div>
		`
	})

	document.getElementById("lg").addEventListener("click", function(){
	  logout();
	});

	document.getElementById("upass").addEventListener("click",()=>{
		changePassword();
	});

}



function changePassword(){
	swal({
	  title: 'Change Password',
		html: `<div class="mx-3">
		   <p class="py-1 text-muted small">Chang your password by completing the form below</p>
		   <input type="text" id="opass" class="form-control text-dark" placeholder="Old password">
			 <br>
			 <input type="text" id="npass" class="form-control text-dark" placeholder="New password">
   </div>
		`
	})
}



function logout(){
	swal("Logging out...");swal.showLoading();
	setTimeout(()=>{
		localStorage.usr = false;
		location.reload();
	},1500);
}

function viewDevices() {

	axios.get("io.php?listDevices")
	.then(res=>{
			var dlist = "";
			res.data.forEach(device=>{
				dlist += `
				<li class="text-dark">
				 ${device[0]} | <small class="text-info">${device[1]}</small>
				 <button id="editName" class="btn btn-sm float-right d-none"><i class="fa fa-edit mr-1"></i> Edit Name</button>
				<li>
				`
			});
			swal({
					html:`<h3 class="text-dark"><i class="fa fa-bars mr-1 text-info"></i> Device details</h3>
					 <ul style="list-style:none" class="p-0">
					  ${dlist}
					 </ul>
					`,
				})
	})
}


function editdeviceName(){
	swal({
		title: 'Edit device name:',
	  html: `
      <div class="mx-5">
       <input class="form-control text-dark" style="font-weight:500!important" placeholder="Device Name" id="dname">
       <p class="text-muted"> You can change the device name by clic</p>
			</div>
		`
	});
}

function viewCharge() {
	swal({
		title: 'Power charge',
		type: 'info',
		text: `${priceCharge} Pesos per KiloWatt hour`
	})
}


var cpage;

document.body.onkeyup = (event) =>{
    if(event.keyCode === 13){
    	if(cpage == 'login' || localStorage.usr == "false"){
    		auth('login');
    	}
    	if(cpage == 'signin'){
            auth('sign')
    	}
    }
}



function checkKey(event){
     if(event.keyCode === 13){
     var key = document.getElementById("dkey").value;
       axios.get(`/checkDevice?key=${key}`).
       then(res=>{
           if(res.data == "found"){
         	document.getElementById("keystate").innerHTML = `<span class="text-success"><i class="fa fa-check"></i> Device Found!</span>`;
            var zone  = document.getElementsByClassName("si");
            for(var i=0; i < zone.length; i++){
               zone[i].disabled = false;
           }
          }else{
            document.getElementById("keystate").innerHTML = `<span class="text-danger"><i class="fa fa-times"></i> Device not Found</span>`;
            var zone  = document.getElementsByClassName("si");
            for(var i=0; i < zone.length; i++){
               zone[i].disabled = true;
            }
         }
       });
    }
   }

 var submitState = false;
 function checkpassword() {
    var pass = document.getElementById("pass1");
    var cpass = document.getElementById("pass2");
    var submitBtn = document.getElementById("sbtn");
    if(pass.value && cpass.value){
       if(pass.value !== cpass.value){
          document.getElementById('keystate').innerHTML = `<span class="text-danger">Passwords do not match!</span>`
          submitBtn.disabled = true;
          submitState = false;
       }else{
         document.getElementById('keystate').innerHTML = `<span class="text-success">Passwords matched!</span>`
         submitBtn.disabled = false;
         submitState = true;
       }
     }
 }

 function login(){
  var loginmodal = document.getElementById('lcontainer');
  var signinmodal = document.getElementById('scontainer');
     loginmodal.style.display = "block";
     signinmodal.style.display = "none";
     cpage = "login";
     el('email').focus();
}

function signup(){
  var loginmodal = document.getElementById('lcontainer');
   var signinmodal = document.getElementById('scontainer');
     signinmodal.style.display = "block";
     loginmodal.style.display = "none";
     cpage = "signin";
     el('dkey').focus();
}



function formError(err,type){
  switch(type){
  	case 'login':
  	  document.getElementById("lerror").style.display = "block";
  	  document.getElementById("lerror").innerHTML = `<i class="fa fa-times"></i> ${err}`;
  	break;
   case 'sign':
  	  document.getElementById("s-error").style.display = "block";
  	  document.getElementById("s-error").innerHTML = `<i class="fa fa-times"></i> ${err}`;
  	break;
  }
}



function auth(mode){
	switch(mode){
		case 'login':
           var email = el('email').value;
           var password =  el('password').value;
              if(email && password){
                 // test login flow :)
                 axios.get(`/auth?id=${email}&pass=${password}`)
                 .then(res=>{
                 	if(res.data.state == 'ok'){
                        swal("Logging In...");
                         localStorage.email = email;
                         localStorage.username = res.data.username;
		             	 loadDashboard();
		             	swal.showLoading();
                 		setTimeout(ds=>{
                 		   hide('lcontainer');
                 		   show('app');
		             	   swal.close(); 
		             	},2000);

		             	localStorage.usr = true;
                 }else{
                   formError("User does not exist","login");
                 }
                 })
              }         
		break;
		case 'sign':
		  var deviceKey = el('dkey').value;
		  var email = el('email1').value;
		  var pass1 = el('pass1').value;
		  var pass2 = el('pass2').value;
		  var fullName = el('fname').value;
		     if(deviceKey && email && pass1 && pass2 && fullName){
                 axios.get(`/signin?key=${deviceKey}&name=${fullName}&email=${email}&password=${pass1}`)
                   .then(res=>{
                   	  if(res.data == "ok"){
                   	    swal("Success","Account created succesfully!, try to login to view dashboard!","success")
                        .then(res1=>{
                            window.location.reload();
                        })
                   	  }else{
                   	  	formError(res.data,"sign");
                   	  }
                   })
		     }else{
		     	formError("Complete the details below!","sign");
		     }
		break;
	}
}


// push notifications
function notification(message){
	if(window.Notification && Notification.permission !== "denied") {
	Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
		var n = new Notification('Electric Bill reminder!', {
			body: 'You have surpassed the expected electric bill limit!',
			icon: './img/icon.png'
		});
	});
}
}


function AC(){
	swal({
		width: '700',
		height: '1000',
		title: 'AC offset'
		
	})
}



