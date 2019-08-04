var count=0;
var questionData;
var radioCount=0;
var PetQuestions={
    medicalIllnessCond: "",
    undergoMediSurg: "",
    noOfPetsResideWithPet1: "",
    petUsedForOtherWork: "",
    behavioralProblems: "",
    insCancelledByPrevIns: ""
 };

function storeData(){
var medical = document.getElementsByName('medicalIllnessCond');
for(var i = 0; i < medical.length; i++){
        if(medical[i].checked){
            PetQuestions.medicalIllnessCond = medical[i].value;
           }
}

var undergoMedi=document.getElementsByName('undergoMediSurg');
for(var i = 0; i < undergoMedi.length; i++){
    if(undergoMedi[i].checked){
        PetQuestions.undergoMediSurg = undergoMedi[i].value;
       }
}

var noofpet=$('#noOfPetsResideWithPet1').val();

PetQuestions.noOfPetsResideWithPet1=noofpet;

var petUseOther=document.getElementsByName('petUsedForOtherWork');
for(var i = 0; i < petUseOther.length; i++){
    if(petUseOther[i].checked){
        PetQuestions.petUsedForOtherWork = petUseOther[i].value;
       }
}

var bp=document.getElementsByName('behavioralProblems');
for(var i = 0; i < bp.length; i++){
    if(bp[i].checked){
        PetQuestions.behavioralProblems = bp[i].value;
       }
}

var insCBP=document.getElementsByName('insCancelledByPrevIns');
for(var i = 0; i < insCBP.length; i++){
    if(insCBP[i].checked){
        PetQuestions.insCancelledByPrevIns = insCBP[i].value;
       }
}
sessionStorage.setItem("PetQuestionsData",PetQuestions);
}

function getPetQuestions(){
    $.getJSON("petjsons/preQualificationQuestions.json",function (data) {
     questionData=data
     document.getElementById('lobInfoHead').innerHTML="PreQualification Questions";
     for(var i=0;i<questionData.questions.length;i++){
         var info=questionData.questions[i];
         if(info.type=="dropdown"){                  
            var dropdata=document.getElementById('lobInfoBody').innerHTML+
            "<tr>"+
           "<td><div class=form-group><label for="+info.id+"><h4>"+info.question+":</h4></label></div></td>"+
           "<td> <select class=form-control id="+info.id+">";
           var options;                 
            
            //"."+$('#petId1').val()          
            options = info.availableOptions
           
        console.log(options);
            for(var j=0;j<options.length;j++) {            
            dropdata+="<option>"+options[j]+"</option>";          
                       
            }
            document.getElementById('lobInfoBody').innerHTML=dropdata+"</select></td></tr>";
      
        }
        else if(info.type=="radio"){

            var dropdata=document.getElementById('lobInfoBody').innerHTML+
            "<tr>"+
           "<td><div class=form-group><label for="+info.id+"><h4>"+info.question+":</h4></label></div></td>"+
           "<td>";

            for(var j=0;j<info.availableOptions.length;j++) {
                radioCount++;
                if(j==1){
                    dropdata+="<label class=radio-inline><input type=radio name="+info.id+" checked>"+info.availableOptions[j]+"</label>";          
                }        
                else
                {    
                dropdata+="<label class=radio-inline><input type=radio name="+info.id+" required>"+info.availableOptions[j]+"</label>";          
                }   
            }
            document.getElementById('lobInfoBody').innerHTML=dropdata+"</td></tr>";
        }
     }
        console.log(data);
    })
    storeData();
}