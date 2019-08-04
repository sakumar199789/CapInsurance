var count=0;
var formData;
var PetType="";
var petName="Pet";
var requiredFieldSet="";
var PetInfo={
   petName: "",
   petSex: "",
   petType: "",
   petAge: "",
   petBreed: "",
   petPrice: "",
   petWeight: ""
};
function changePetEvent(){
    console.log(formData)    
//Handling Pet Type and Pet Breed Dependencies
var petTypes = document.getElementsByName('petType');
var petTypeValue;
for(var i = 0; i < petTypes.length; i++){
        if(petTypes[i].checked){
            petTypeValue = petTypes[i].value;
           }
}
PetType=petTypeValue;
changeEvent();
var option = formData.section.PetBasicInformation[5].availableOptions[petTypeValue];
//Populating the Dependent Data for the respective PetTypes.
var dropdata="<tr>"+
           "<td><div class=form-group><label for=petBreed>"+formData.section.PetBasicInformation[5].question+":</label></div></td>"+
           "<td> <select class=form-control id=petBreed>";           
            for(var j=0;j<option.length;j++) {            
            dropdata+="<option>"+option[j]+"</option>";   
                       
            }
            document.getElementById('petBreed').innerHTML=dropdata+"</select></td></tr>";
            petType=petTypeValue;
}

//Funciton Used for Populaitng the Summary of the Pet.
function changeEvent(){
    //Handling values for the Microchipped for the MicrochipNumber Field
    var rates = document.getElementsByName('microchipped');
    var sex=document.getElementsByName('petSex');
      var rate_value,sex_value="";
   for(var i = 0; i < rates.length; i++){
      if(rates[i].checked){
        rate_value = rates[i].value;
         }
    }
    if(rate_value=="Yes"){
        document.getElementById('microchipNumber').disabled=false;
     }
    else if(rate_value=="No"){
      document.getElementById('microchipNumber').disabled=true;
    }
    //Getting Value of the Sex of the Pet for populating it in the Summary
    for(var i = 0; i < sex.length; i++){
        if(sex[i].checked){
          sex_value = sex[i].value;
           }
      }    

    var replaceValue=document.getElementById("petName").value;
    PetInfo.petName=replaceValue;
    PetInfo.petType=PetType;
    PetInfo.petSex=sex_value;
    PetInfo.petAge=document.getElementById("petAge").value;
    PetInfo.petBreed=document.getElementById("petBreed").value;
    PetInfo.petPrice=document.getElementById("petPurchasePrice").value;
    PetInfo.petWeight=document.getElementById("petWeight").value;   

    if(replaceValue=="" || replaceValue==''){
                document.getElementById('petSummary').innerHTML=PetInfo.petName;
            }    
      else{
        document.getElementById("1").innerHTML=document.getElementById("1").innerHTML.replace(petName,replaceValue);
        document.getElementById("2").innerHTML=document.getElementById("2").innerHTML.replace(petName,replaceValue);
        document.getElementById("3").innerHTML=document.getElementById("3").innerHTML.replace(petName,replaceValue);
        document.getElementById("5").innerHTML=document.getElementById("5").innerHTML.replace(petName,replaceValue);
        document.getElementById("7").innerHTML=document.getElementById("7").innerHTML.replace(petName,replaceValue);
        document.getElementById("9").innerHTML=document.getElementById("9").innerHTML.replace(petName,replaceValue);
       
        if(PetInfo.petName!=""){
            document.getElementById('petSummary').innerHTML=" Your Pet Name "+PetInfo.petName;
        }
        if(PetInfo.petType!=""){
            document.getElementById('petSummary').innerHTML+="<br>Your Pet Type "+PetInfo.petType;
        }
        if(PetInfo.petSex!=""){
            document.getElementById('petSummary').innerHTML+="<br>Your Pet is "+PetInfo.petSex;
        }
        if(PetInfo.petAge!=""){
            document.getElementById('petSummary').innerHTML+="<br>Your Pet is "+PetInfo.petAge+" Old";
        }
        if(PetInfo.petBreed!=""){
            document.getElementById('petSummary').innerHTML+="<br>Your Pet Breed is "+PetInfo.petBreed;
        }
        if(PetInfo.petPrice!="")
        {
            document.getElementById('petSummary').innerHTML+="<br>Your Pet Price is  "+PetInfo.petPrice+"$";
        }
        if(PetInfo.petWeight!=""){
            document.getElementById('petSummary').innerHTML+="<br>Your Pet Weight is "+PetInfo.petWeight+" Kg's ";
        }
        petName=document.getElementById("petName").value;         
      }
             sessionStorage.setItem("PetInfoData",PetInfo);
}
function getpetInfo(){     
     $.getJSON("petjsons/PetInfo.json",function (data) {
         formData = data         
        for(var k=0;k<formData.section.sectionTitle.length;k++){
            var sectionHead=formData.section.sectionTitle[k].replace(/ /g,'');
            if(k==0){
                document.getElementById('petInfoHead').innerHTML=formData.section.sectionTitle[k];
            }
            else{                
                document.getElementById('petInfoBody').innerHTML+="<tr><td colspan=2 align=center><h2 align=center>"+formData.section.sectionTitle[k]+"</h3></td></tr>";
            }
         for(var i=0;i<formData.section[sectionHead].length;i++){             
            var info=formData.section[sectionHead][i];
            
            if(info.type=="text" || info.type=="date" || info.type=="number"){ 
                if(info.isRequired){
                    requiredFieldSet="required";
                }          
                else{
                    requiredFieldSet="";
                }
            document.getElementById('petInfoBody').innerHTML+=
            "<tr>"+
           "<td><div class=form-group><label for="+info.id+"><h4 id="+count+">"+info.question+":</h4></label></div></td>"+
           "<td><input type="+info.type+" id="+info.id+" class=form-control oninput=changeEvent(); "+requiredFieldSet+"></td>"+
           "</tr>";
            }
            else if(info.type=="dropdown"){                  
            var dropdata=document.getElementById('petInfoBody').innerHTML+
            "<tr>"+
           "<td><div class=form-group><label for="+info.id+"><h4 id="+count+">"+info.question+":</h4></label></div></td>"+
           "<td> <select class=form-control id="+info.id+">";
           var options
           if(info.hasMultipleOptions!=null) {
            options=info.availableOptions["Dog"]
            //"."+$('#petId1').val()            
           }else{
            options = info.availableOptions
           }
            for(var j=0;j<options.length;j++) {            
            dropdata+="<option>"+options[j]+"</option>";          
                       
            }
            document.getElementById('petInfoBody').innerHTML=dropdata+"</select></td></tr>";      
        }
        else if(info.type=="radio"){
            var dropdata=document.getElementById('petInfoBody').innerHTML+
            "<tr>"+
           "<td><div class=form-group><label for="+info.id+"><h4 id="+count+">"+info.question+":</h4></label></div></td>"+
           "<td>";
           for(var j=0;j<info.availableOptions.length;j++) {
            if(info.question=="Pet Type"){
                if(info.availableOptions[j]=="Dog"){
                    dropdata+="<label class=radio-inline><input type=radio name="+info.id+" value="+info.availableOptions[j]+" onclick=changePetEvent(); required>"+info.availableOptions[j]+"</label>";          
                 }
             else{
                dropdata+="<label class=radio-inline><input type=radio name="+info.id+" value="+info.availableOptions[j]+" onclick=changePetEvent(); style="+"margin-left:2em"+">"+info.availableOptions[j]+"</label>";          
             }
        }
             else{
                 if(j==1){
            dropdata+="<label class=radio-inline><input type=radio name="+info.id+" value="+info.availableOptions[j]+" onclick=changeEvent(); style="+"margin-left:2em"+">"+info.availableOptions[j]+"</label>";          
                 }
                 else{
                    dropdata+="<label class=radio-inline><input type=radio name="+info.id+" value="+info.availableOptions[j]+" onclick=changeEvent();>"+info.availableOptions[j]+"</label>";          
                 }     
        }                      
            }
            document.getElementById('petInfoBody').innerHTML=dropdata+"</td></tr>";
        }
        count++;
    }        } 
     }) 
}