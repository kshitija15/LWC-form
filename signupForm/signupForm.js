import { LightningElement, wire, track} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STAGE_FIELD from '@salesforce/schema/Dummy_Project__c.Gender__c';
import STAGE_FIELD1 from '@salesforce/schema/Dummy_Project__c.Highest_Education__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import pageUrl from '@salesforce/resourceUrl/recaptchaV2';

export default class RecaptchaV2 extends LightningElement  {
@track personal=true;
@track user=false;
@track security=false;
@track navigateTo;
 recaptcha = true;
 validate ;
fname; lname; phone; selectedGender="--none--";
uname; email; company; selectedQualification;
pass; cpass; question;
recordId;
@wire(getPicklistValues,{
recordTypeId: '012000000000000AAA',
fieldApiName: STAGE_FIELD
})typeValues;
@wire(getPicklistValues,{
recordTypeId: '012000000000000AAA',
fieldApiName: STAGE_FIELD1
})typeValues1;
next(){
if(this.lname == null){

    const evt = new ShowToastEvent({
    title: "Warning: Cannot move forward",
    message: "Please fill the required field inorder to proceed",
    variant: 'warning',
});
this.dispatchEvent(evt);
}
else{ this.personal = false;
this.user = true;}

}
next1(){
if(this.uname==null || this.email==null || this.company==null){
const evt = new ShowToastEvent({
    title: "Warning: Cannot move forward",
    message: "Please fill the required field inorder to proceed",
    variant: 'warning',
});
this.dispatchEvent(evt);
}
else{
    this.user = false;
this.security = true;
this.recaptcha=false;
}

}
prev(){
this.user = false;
this.personal = true;
}
prev1(){
this.security = false;
this.user = true;
}

questionChangedHandler(event){
this.question = event.target.value;
}
changeHandler(event){
if(event.target.label=="First Name"){
this.fname = event.target.value;
console.log("naam bata==>"+this.fname);
}
if(event.target.label=="Last Name"){
this.lname = event.target.value;
console.log("pura naam bata==>"+this.fname+" "+this.lname);
}
if(event.target.label=="Phone"){
this.phone = event.target.value;
console.log(this.phone);
}
if(event.target.label=="Gender"){
this.selectedGender= event.target.value;
console.log(this.selectedGender);
}
if(event.target.label=="Username"){
this.uname = event.target.value;
console.log(this.uname);
}
if(event.target.label=="Email"){
this.email = event.target.value;
console.log(this.email);
}
if(event.target.label == "Company"){
this.company = event.target.value;
console.log(this.company);
}
if(event.target.label == "Highest Education Qualification"){
this.selectedQualification = event.target.value;
console.log(this.selectedQualification);
}
if(event.target.label == "Password"){
this.pass= event.target.value;
console.log(this.pass);
}
if(event.target.label == "Confirm Password"){
this.cpass = event.target.value;
console.log(this.cpass);

}
}
cancel(){
this.querySelectorAll(".common").value = '';
this.personal = true;
this.user = false;
this.security = false;
this.selectedGender = "--none--";
this.selectedQualification="--none--";
}
signup(){
if(this.pass==null || this.cpass==null || this.question==null){
const evt = new ShowToastEvent({
    title: "Warning: Cannot move forward",
    message: "Please fill the required field inorder to proceed",
    variant: 'warning',
});
this.dispatchEvent(evt);
}
else{
if(this.pass != this.cpass){
        const evt = new ShowToastEvent({
    title: "Error: Password and Confirm Password filed not matched",
    message: "Please check password fields to proceed",
    variant: 'error',
});
this.dispatchEvent(evt);
}
else{var fields = {'First_Name__c' : this.fname, 'Last_Name__c' : this.lname, 'Phone__c' : this.phone, 'Gender__c' : this.selectedGender,
            'Username__c' : this.uname, 'Email_Address__c' : this.email, 'Company__c' : this.company, 'Highest_Education__c' : this.selectedQualification,
            'Password__c' : this.pass, 'Answer__c' : this.question};
var objRecordInput = {'apiName' : 'Dummy_Project__c', fields};
if(this.validate == true){
    console.log(this.validate);
createRecord(objRecordInput).then(response => {this.recordId=response.id;
this.dispatchEvent(new ShowToastEvent({
    title: "Record Created",
    message: "Your record has been successfully created " ,
    variant: "success"
}),
    this.security = false,
this.personal = true,
this.querySelectorAll(".common").value = '',
this.selectedGender ="--none--",
this.selectedQualification="--none--",
).catch(error => {
this.dispatchEvent(
        new ShowToastEvent({
            title:'error creating opportunity',
            message: error.body.message,
            variant:'error',
        }),
    )
});

});
}else{
    const evt = new ShowToastEvent({
    title: "Warning: Cannot move forward",
    message: "Please validate before moving forward",
    variant: 'warning',
});
this.dispatchEvent(evt);
}


}
}
}

constructor(){

super();
    
   

     this.navigateTo = pageUrl;
  
 
window.addEventListener("message", (e) => {
            if(e.data=== 'VALID'){
                this.disable=false;  
                 this.validate=true; 
            }
        }, false)

}

captchaLoaded(event){

    console.log(this.validate);
    console.log("get status "+this.recaptcha)
if(event.target.getAttribute('src') == pageUrl ){
    console.log('Google reCAPTCHA is loaded.');
    
    
} 


//  window.addEventListener("message", this.listenForMessage);


}

// listenForMessage(message){
// if(message.data=="captcha success"){
//         console.log("initail validate"+this.validate);
//         this.recaptcha= false;
//         this.validate=true;
//             console.log("check status"+this.recaptcha);
//         console.log(this.validate);
//         alert("validated successfully")
//         console.log('message data : ' + message.data);//message.data - The object passed from the other window.
// console.log('message origin : ' + message.origin);//message.origin - The origin of the window that sent the message at the time postMessage was called.
// }
// else{
//     alert("validation failed! Try again")
//     console.log('message data : ' + message.data);//message.data - The object passed from the other window.
// console.log('message origin : ' + message.origin);//message.origin - The origin of the window that sent the message at the time postMessage was called.
// }

// }

}