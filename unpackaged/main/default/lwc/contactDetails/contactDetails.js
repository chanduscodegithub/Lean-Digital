import { LightningElement, track, api } from 'lwc';
import surveyController1 from '@salesforce/apex/surveyController.surveyController1';
// import Firstname1 from '@salesforce/schema/Contact.FirstName';
import Lastname1 from '@salesforce/schema/Contact.LastName';
import Phonename1 from '@salesforce/schema/Contact.Phone';
import Emailname1 from '@salesforce/schema/Contact.Email';
import Name1 from '@salesforce/schema/Contact.Name';

import CompanyUrl from '@salesforce/schema/Contact.Company_Url__c';
import Companyname from '@salesforce/schema/Contact.Company_Name__c';
import Rolename from '@salesforce/schema/Contact.Role__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';






export default class ContactDetails extends LightningElement {


    @track verify;
    @track new;
    @track email = '';
    verificationCode;
    //surveyid;
    contactid;
    surveyPage = false;

    @track error;
    // @track getSurveyRecord = {
    //   First_Name__c: Firstname,
    //   Last_Name__c: Lastname,
    //   Company_Name__c: Companyname,
    //   Phone__c: Phonename,
    //   Email__c: Emailname,
    //   Company_Url__c: CompanyUrl,
    //   Role__c: Rolename
    // };

    @track getContactRecord = {
        // FirstName: Firstname1,
        LastName: Lastname1,
        Company_Name__c: Companyname,
        Phone: Phonename1,
        Email: Emailname1,
        Name: Name1,
        Company_Url__c: CompanyUrl,
        Role__c: Rolename
    };


    // firstnameChange(event) {
    //   this.getSurveyRecord.First_Name__c = event.target.value;

    // }
    // lastnameChange(event) {
    //   this.getSurveyRecord.Last_Name__c = event.target.value;

    // }
    // companynameChange(event) {
    //   this.getSurveyRecord.Company_Name__c = event.target.value;

    // }

    // emailnameChange(event) {
    //   this.getSurveyRecord.Email__c = event.target.value;
    //   if (event.target.name === 'emailAddress') {
    //     this.email = event.target.value;
    //   }

    // }
    // phonenameChange(event) {
    //   this.getSurveyRecord.Phone__c = event.target.value;

    // }
    // companyurlnameChange(event) {
    //   this.getSurveyRecord.Company_Url__c = event.target.value;

    // }
    // rolenameChange(event) {
    //   this.getSurveyRecord.Role__c = event.target.value;

    // }

    // firstnameChange(event) {
    //     this.getContactRecord.FirstName = event.target.value;

    // }
    lastnameChange(event) {
        this.getContactRecord.LastName = event.target.value;

    }
    companynameChange(event) {
        this.getContactRecord.Company_Name__c = event.target.value;

    }

    emailnameChange(event) {
        this.getContactRecord.Email = event.target.value;
        if (event.target.name === 'emailAddress') {
            this.getContactRecord.Email = event.target.value;
        }

    }
    phonenameChange(event) {
        this.getContactRecord.Phone = event.target.value;

    }
    companyurlnameChange(event) {
        this.getContactRecord.Company_Url__c = event.target.value;

    }
    rolenameChange(event) {
        this.getContactRecord.Role__c = event.target.value;

    }
    // nameChange(event) {
    //   this.getContactRecord.Name = event.target.value;

    // }





    handleClick() {
        if (typeof this.getContactRecord.LastName === 'object' || typeof this.getContactRecord.Company_Name__c === 'object' || typeof this.getContactRecord.Email === 'object' || typeof this.getContactRecord.Phone === 'object' || typeof this.getContactRecord.Company_Url__c === 'object' || typeof this.getContactRecord.Role__c === 'object') {
            alert('All fields are mandatory!');
            // const toastEvent = new ShowToastEvent({
            //   title: 'Error!',
            //   message: 'All fields are mandatory!',
            //   variant: 'error'
            // });
            // this.dispatchEvent(toastEvent);
            return false;

        }
        let phn = this.template.querySelector('.phone');
        console.log(phn)
        const value = phn.value;
        if (isNaN(value)) {
            phn.setCustomValidity("Plaese enter the valid phone number")
        } else {
            phn.setCustomValidity("")
            console.log('Continue')
            surveyController1({ contactObj: this.getContactRecord })
                .then(result => {
                    //alert('Survey created successfully!');
                    // const toastEvent = new ShowToastEvent({
                    //   title: 'Success!',
                    //   message: 'Survey created successfully!',
                    //   variant: 'success'
                    // });
                    // this.dispatchEvent(toastEvent);
                    this.getContactRecord = {};
                    this.contactid = result;
                    console.log(this.contactid)
                    this.verify = true;
                })
                .catch(error => {
                    console.log(error);
                    this.error = error.message;

                });
        }
        phn.reportValidity()
        // console.log('Continue')
        // surveyController1({ contactObj: this.getContactRecord })
        //   .then(result => {
        //     //alert('Survey created successfully!');
        //     // const toastEvent = new ShowToastEvent({
        //     //   title: 'Success!',
        //     //   message: 'Survey created successfully!',
        //     //   variant: 'success'
        //     // });
        //     // this.dispatchEvent(toastEvent);
        //     this.getContactRecord = {};
        //     this.contactid = result;
        //     console.log(this.contactid)
        //     this.verify = true;
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     this.error = error.message;

        //   });
    }
    handleCloseModal(event) {
        this.verify = event.detail;
    }
    handleSurvey(event) {
        this.verify = false;
        if (event.detail) {
            this.surveyPage = true;
        }
    }
}