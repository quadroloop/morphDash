window.onload = () => {
     document.getElementById("email").focus();
}

var cpage = "login";

function el(element){
	return document.getElementById(element);
}

function hide(element){
	document.getElementById(element).style.display = "none";
}

function show(element){
	document.getElementById(element).style.display = "block";
}

document.body.onkeyup = (event) =>{
    if(event.keyCode === 13){
       switch(cpage){
       	 case 'login':
       	   login();
       	 break;
       	 case 'signin':
       	   signin()
       	 break;
       }
    }
}



function login(){
   // login process	
   var email = el('email').value;
   var password = el('password').value;
      if(email && password){
         axios.get(`/auth/?id=${email}&&pass=${password}`)
         .then(res=>{
           if(res.data == "user found"){
           	 window.location  = "/dashboard";
           	 localStorage.usr = "true";
           }else{
           	 show('lerror');
           } 
         })
      }
}

function signin(){
	// sign password
}

