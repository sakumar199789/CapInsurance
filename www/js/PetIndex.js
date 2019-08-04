function refreshPage(){
var width= $(window).width();
var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
if(isMobile){
    jQuery('#zipInput').css('width',width+'px');
}
else{
    jQuery('#zipInput').css('width',18+'%');
}
}

function validateZipCodeData(){
    console.log("Sai Kumar Luckyy");
    var client = new XMLHttpRequest();
    client.open("GET", "http://api.zippopotam.us/us/"+$('#zipInput').val(), true);
    client.onreadystatechange = function() {
        if(client.readyState == 4) {
            zipcodedata=client.responseText;
            if(zipcodedata!=''||zipcodedata!=""){               
               // console.log(zipcodedata.places[0].state);
            //sessionStorage.setItem("State",zipcodedata.places[0].state);
            window.location="PetInfo.html";    
            }        
        };
    };
    client.send();
}