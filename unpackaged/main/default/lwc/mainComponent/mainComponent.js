import { LightningElement } from 'lwc';

export default class MainComponent extends LightningElement {
    //activeSections = ['A', 'C'];
    value = '';

    get options() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}