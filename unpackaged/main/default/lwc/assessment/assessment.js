import { LightningElement, api, track } from 'lwc';
import saveResponse from '@salesforce/apex/assessmentController.saveResponse';
import newQuestions from '@salesforce/apex/assessmentController.newQuestions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';




export default class Assessment extends LightningElement {
    @api contactid;

    Questions = {};
    AdditionalQue = {};
    Button = true;

    get options() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }

    get options1() {
        return [
            { label: 'Planned', value: 'planned' },
            { label: 'Just Started', value: 'just started' },
            { label: 'Inprogress', value: 'inprogress' },
            { label: 'Implemented', value: 'implemented' },
            { label: 'Continous Improvement', value: 'continous improvement' }
        ];
    }
    get options2() {
        return [
            {
                label: 'Forecasting', value: 'forecasting'
            },
            { label: 'Orders', value: 'orders' },
            { label: 'Opportunities', value: 'opportunities' },
            { label: 'Agreements', value: 'agreements' },
            { label: 'All of the above', value: 'all of the above' },
        ];
    }
    get options3() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options4() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options5() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options6() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options7() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options8() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options9() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options10() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options11() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options12() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options13() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options14() {
        return [
            {
                label: 'Digital Transformation', value: 'Digital Transformation'
            },
            { label: 'Business Growth', value: 'Business Growth' },
            { label: 'Control Wastage', value: 'Control Wastage' },
            { label: 'Process improvement', value: 'Process improvement' },
        ];
    }
    get options15() {
        return [
            {
                label: 'Siloed systems', value: 'Siloed systems'
            },
            { label: 'Legacy systems', value: 'Legacy systems' },
            { label: 'Lack of Digital presence', value: 'Lack of Digital presence' },
            { label: 'Too much wastage', value: 'Too much wastage' },
        ];
    }
    get options16() {
        return [
            {
                label: 'Lack of digitization', value: 'Lack of digitization'
            },
            {
                label: 'Complex business processes', value: 'Complex business processes' },
            { label: 'Rapidly changing business landscapes', value: 'Rapidly changing business landscapes' },
        ];
    }
    get options17() {
        return [
            {
                label: 'Legacy systems', value: 'Legacy systems'
            },
            {
                label: 'Process', value: 'Process'
            },
            { label: 'Decision making', value: 'Decision making' },
        ];
    }
    get options18() {
        return [
            {
                label: 'Manual', value: 'Manual'
            },
            {
                label: 'Automated', value: 'Automated'
            },
        ];
    }
    get options19() {
        return [
            {
                label: 'Salesforce', value: 'Salesforce'
            },
            {
                label: 'Excel', value: 'Excel'
            },
            {
                label: 'Others', value: 'Others'
            },
        ];
    }
    get options20() {
        return [
            {
                label: 'Manual', value: 'Manual'
            },
            {
                label: 'Automated', value: 'Automated'
            },
        ];
    }
    get options21() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options22() {
        return [
            {
                label: 'Ease of Operations', value: 'Ease of Operations'
            },
            {
                label: 'Automation', value: 'Automation'
            },
            {
                label: 'Control Manual errors', value: 'Control Manual errors'
            },
        ];
    }
    get options23() {
        return [
            {
                label: 'Within 6 months', value: 'Within 6 months'
            },
            {
                label: 'Within 1 year', value: 'Within 1 year'
            },
            {
                label: 'Within 2 years', value: 'Within 2 years'
            },
        ];
    }
    get options24() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options25() {
        return [
            {
                label: 'Manual', value: 'Manual'
            },
            {
                label: 'Automated', value: 'Automated'
            },
        ];
    }
    get options26() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options27() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }
    get options28() {
        return [
            {
                label: 'Salesforce', value: 'Salesforce'
            },
            {
                label: 'Other', value: 'Other'
            },
            { label: 'None', value: 'None' },
        ];
    }
    get options29() {
        return [
            {
                label: 'Stock check', value: 'Stock check'
            },
            { label: 'Removing of obsolete inventory', value: 'Removing of obsolete inventory' },
            {
                label: 'Production levelling', value: 'Production levelling' },
            { label: 'Combination of above', value: 'Combination of above' },
        ];
    }
    handleChange(event) {
        let value = event.detail.value;
        this.Questions.Ques01 = value;
        console.log(this.Questions.Ques01.length);
    }
    handleChange1(event) {
        let value = event.detail.value;
        this.Questions.Ques02 = value;
    }
    handleChange2(event) {
        let value = event.detail.value;
        this.Questions.Ques03 = value;
    }

    handleChange3(event) {
        let value = event.detail.value;
        this.Questions.Ques04 = value;
    }
    handleChange4(event) {
        let value = event.detail.value;
        this.Questions.Ques05 = value;
    }
    handleChange5(event) {
        let value = event.detail.value;
        this.Questions.Ques06 = value;
    }
    handleChange6(event) {
        let value = event.detail.value;
        this.Questions.Ques07 = value;
    }
    handleChange7(event) {
        let value = event.detail.value;
        this.Questions.Ques08 = value;
    }
    handleChange8(event) {
        let value = event.detail.value;
        this.Questions.Ques09 = value;
    }
    handleChange9(event) {
        let value = event.detail.value;
        this.Questions.Ques10 = value;
    }
    handleChange10(event) {
        let value = event.detail.value;
        this.Questions.Ques11 = value;
    }
    handleChange11(event) {
        let value = event.detail.value;
        console.log(event);
        console.log(value);
        this.Questions.Ques12 = value;

    }
    handleChange12(event) {
        let value = event.detail.value;
        this.Questions.Ques13 = value;
    }
    handleChange13(event) {
        let value = event.detail.value;
        this.Questions.Ques14 = value;
    }
    handleChange14(event) {
        let value = event.detail.value;
        this.Questions.Ques15 = value;
    }
    handleChange15(event) {
        let value = event.detail.value;
        console.log(value);
        console.log(event);
        this.Questions.Ques16 = value;

    }
    handleChange16(event) {
        let value = event.detail.value;
        this.Questions.Ques17 = value;
    }

    handleChange17(event) {
        let value = event.detail.value;
        this.AdditionalQue.q1 = value;
    }
    handleChange18(event) {
        let value = event.detail.value;
        this.AdditionalQue.q2 = value;
    }
    handleChange19(event) {
        let value = event.detail.value;
        this.AdditionalQue.q3 = value;
    }
    handleChange20(event) {
        let value = event.detail.value;
        this.AdditionalQue.q4 = value;
    }
    handleChange21(event) {
        let value = event.detail.value;
        this.AdditionalQue.q5 = value;
    }
    handleChange22(event) {
        let value = event.detail.value;
        this.AdditionalQue.q6 = value;
    }
    handleChange23(event) {
        let value = event.detail.value;
        this.AdditionalQue.q7 = value;
    }
    handleChange24(event) {
        let value = event.detail.value;
        this.AdditionalQue.q8 = value;
    }
    handleChange25(event) {
        let value = event.detail.value;
        this.AdditionalQue.q9 = value;
    }
    handleChange26(event) {
        let value = event.detail.value;
        this.AdditionalQue.q10 = value;
    }
    handleChange27(event) {
        let value = event.detail.value;
        this.AdditionalQue.q11 = value;
    }
    handleChange28(event) {
        let value = event.detail.value;
        this.AdditionalQue.q12 = value;
    }
    handleChange29(event) {
        let value = event.detail.value;
        this.AdditionalQue.q13 = value;
    }
    handleChange30(event) {
        let value = event.detail.value;
        this.AdditionalQue.q14 = value;
    }
    handleChange31(event) {
        let value = event.detail.value;
        this.AdditionalQue.q15 = value;
    }
    handleChange32(event) {
        let value = event.detail.value;
        this.Questions.Ques18 = value;
    }
    handleChange33(event) {
        let value = event.detail.value;
        this.Questions.Ques19 = value;
    }
    handleChange34(event) {
        let value = event.detail.value;
        this.Questions.Ques20 = value;
    }
    handleChange35(event) {
        let value = event.detail.value;
        this.Questions.Ques21 = value;
    }
    handleChange36(event) {
        let value = event.detail.value;
        this.Questions.Ques22 = value;
    }
    handleChange37(event) {
        let value = event.detail.value;
        this.Questions.Ques23 = value;
    }
    handleChange38(event) {
        let value = event.detail.value;
        this.Questions.Ques24 = value;
    }
    handleChange39(event) {
        let value = event.detail.value;
        this.Questions.Ques25 = value;
    }
    handleChange40(event) {
        let value = event.detail.value;
        this.Questions.Ques26 = value;
    }
    handleChange41(event) {
        let value = event.detail.value;
        this.Questions.Ques27 = value;
    }
    handleChange42(event) {
        let value = event.detail.value;
        this.Questions.Ques28 = value;
    }
    handleChange43(event) {
        let value = event.detail.value;
        this.Questions.Ques29 = value;
    }
    handleChange44(event) {
        let value = event.detail.value;
        this.Questions.Ques30 = value;
    }
    handleChange45(event) {
        let value = event.detail.value;
        this.Questions.Ques31 = value;
    }
    handleChange46(event) {
        let value = event.detail.value;
        this.Questions.Ques32 = value;
    }
    handleChange47(event) {
        let value = event.detail.value;
        this.Questions.Ques33 = value;
    }
    handleChange48(event) {
        let value = event.detail.value;
        this.Questions.Ques34 = value;
    }
    handleChange49(event) {
        let value = event.detail.value;
        this.Questions.Ques35 = value;
    }
    handleChange50(event) {
        let value = event.detail.value;
        this.Questions.Ques36 = value;
    }
    handleChange51(event) {
        let value = event.detail.value;
        this.Questions.Ques37 = value;
    }
    // handleChange52(event) {
    //     let value = event.detail.value;
    //     this.Questions.Ques38 = value;
    // }

    handleclick() {
        // alert('QuestionsQues01length' + JSON.stringify(this.Questions));
        // console.log('QuestionsQues01length>>' + this.Questions.Ques01);
        if ((this.Questions.Ques01 == undefined) || (this.Questions.Ques02 == undefined) || (this.Questions.Ques04 == undefined) || (this.Questions.Ques19 == undefined) || (this.Questions.Ques21 == undefined) || (this.Questions.Ques24 == undefined) || (this.Questions.Ques26 == undefined) || (this.Questions.Ques27 == undefined) || (this.Questions.Ques07 == undefined) || (this.Questions.Ques10 == undefined)     || (this.Questions.Ques32 == undefined) || (this.Questions.Ques11 == undefined) || (this.Questions.Ques12 == undefined) || (this.Questions.Ques28 == undefined)) {
            alert('Please fill the required fields!');
            //return false;
        }
        else {
            //console.log(JSON.stringify(this.Questions));

            console.log(JSON.stringify(this.Questions));
            saveResponse({ allRespStr: JSON.stringify(this.Questions), conId: this.contactid })
                .then((data) => {
                    return newQuestions({ newQueStr: JSON.stringify(this.AdditionalQue), conId: this.contactid, respId: data })
                    // this.Button = false;
                })
                .then(() => {
                    alert('Thank you for submitting your assessment. One of our consultant will get in touch with you for further discussions.');
                })
                .catch(err => { console.log(err) });
            
            //return true;
            // this.Button = false;
        this.Button = false;
        }
    }

}