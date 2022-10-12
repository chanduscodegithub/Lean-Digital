import { LightningElement, api } from 'lwc';
import generateNewCode from '@salesforce/apex/surveyController.generateNewCode';
import verifyCode from '@salesforce/apex/surveyController.verifyCode';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';




export default class Verification extends LightningElement {
    @api isModalOpen;
    @api contactRecordId;



    closeModal() {
        this.dispatchEvent(new CustomEvent('closemodal', {
            detail: false
        }));
    }
    submitDetails() {
        let enteredCode = this.template.querySelector('.inpText');
        verifyCode({ providedCode: enteredCode.value, conId: this.contactRecordId })
            .then(data => {
                console.log(data)
                if (data) {
                    //alert('Verified!');
                    // const toastEvent = new ShowToastEvent({
                    //     title: 'Success!',
                    //     message: 'Verified!',
                    //     variant: 'success'
                    // });
                    // this.dispatchEvent(toastEvent);
                    this.dispatchEvent(new CustomEvent('gotosurvey', {
                        detail: true
                    }));
                } else {
                    alert('Wrong Code!');
                    // const toastEvent = new ShowToastEvent({
                    //     title: 'Error!',
                    //     message: 'Wrong Code!',
                    //     variant: 'error'
                    // });
                    // this.dispatchEvent(toastEvent);
                }
            })

    }
    resendModal() {
        console.log(this.contactRecordId)
        generateNewCode({ conId: this.contactRecordId })
            .then(data => {
                alert('New code sent!');
                // const toastEvent = new ShowToastEvent({
                //     title: 'Success!',
                //     message: 'New code sent!',
                //     variant: 'success'
                // });
                // this.dispatchEvent(toastEvent);
            }).catch(err => {
                console.log(err)
            })
    }
}