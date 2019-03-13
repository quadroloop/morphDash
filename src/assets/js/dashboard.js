// dashboard.js

var socket = io();

var cpage = "leaderboard";

// get day function
function getDay(){
var options = {  weekday: 'long',day: 'numeric'};
var prnDt = new Date().toLocaleTimeString('en-us', options);
return prnDt.split(',')[0].split(' ')[1];
}

function getTime(){
  var ts = new Date();
  return ts.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}


function el(element){
  return document.getElementById(element);
}

function hide(element){
  document.getElementById(element).style.display = "none";
}

function show(element){
  document.getElementById(element).style.display = "block";
}

function cel(element){
  return document.getElementsByClassName(element);
}

if(localStorage.usr != "true"){
  document.body.innerHTML = "";
  window.location = '/';
}

function selectClass(classlist){
  var cstate = false;
  var cxclass= classlist[getTime()];
    if(cxclass){
     // whatthe fuck
    }else{
      show('nosched');
    }
}



function classes(page,navitem){
  el('clist').innerHTML = "";
  axios.get("/classes")
  .then(res=>{
    var lx = Object.keys(res.data);
    var rx = res.data;
    if(lx.length > 0){
       console.log(res.data);
       for(var i=0;  i < lx.length; i++){
        var classx = res.data[lx[i]];
          el('clist').innerHTML += `
         <tr>
        <td>1</td>
        <td>${classx.subject}</td>
        <td>${classx.section}</td>
        <td>${classx.date}</td>
        <td>${classx.day}</td>
        <td>${classx.startTime}</td>
        <td>${classx.gperiod}</td>
        <td>${classx.dismissal}</td>
     <td>
         <button class="btn btn-primary btn-sm" onclick="dash('${classx.id}')">View Class</button>
     </td>
    </tr>`;
       }
    }else{
     el('clist').innerHTML = "<h4>No classes foud.</h4>"
    }
     nav(page,navitem)
  });
 
}


function dashinit(){
  // axios.get(`/classes`)
  // .then(res=>{
  //   if(Object.keys(res.data).length === 0){
  //     show('noclass');
  //   }else{
  //     selectClass(res.data);
  //   }
  // })
  show('leaderboard');
}


function notif(message,type){
  $.notify({
  // options
  message: message 
},{
  // settings
  type: type
});
}

function dash(classid){
  axios.get(`/selectedClass/?class=${classid}`)
  .then(res=>{
    var sclass = res.data;
    el('stime').innerHTML = sclass.startTime;
    el('dtime').innerHTML = sclass.dismissal;
    el('gtime').innerHTML = sclass.gperiod;
   show('class');
   hide('classes');
  })
}

function backtoclasses(){
  hide('class');
  show('classes');
}


window.onload = () =>{
  // load home data
  dashinit();
}




function logout(){
	localStorage.usr = "false";
	window.location = '/'
}

function nav(page,navitem){
   if(cpage != page){
     hide(cpage);	
     show(page);
     cpage = page;
  }
  cel('active')[0].classList.remove('active');
  navitem.classList.add('active');
  el('pname').innerHTML = navitem.innerText.toLowerCase();
  el('pname').style = 'text-transform: capitalize;';
  hide('nosched');
  hide('class');
}

                                    // <tr>
                                    //   <td>
                                    //     <div class="bg-success present">
                                    //        <i class="pe-7s-check"></i> TIME IN
                                    //     </div>
                                    //   </td>
                                    //   <td>Bryce Mercines</td>
                                    //   <td>10:37 AM</td>
                                    //   <td>1/30/2019</td>
                                    // </tr>

                                    // <tr>
                                    //   <td>
                                    //     <div class="bg-danger absent">
                                    //        <i class="pe-7s-back"></i> TIME OUT
                                    //     </div>
                                    //   </td>
                                    //   <td>Bryce Mercines</td>
                                    //   <td>10:37 AM</td>
                                    //   <td>1/30/2019</td>
                                    // </tr>

                                    //  <tr>
                                    //   <td>
                                    //     <div class="bg-info register">
                                    //        <i class="pe-7s-plus"></i> REGISTRATION
                                    //     </div>
                                    //   </td>
                                    //   <td>New User</td>
                                    //   <td>10:37 AM</td>
                                    //   <td>1/30/2019</td>
                                    // </tr>
