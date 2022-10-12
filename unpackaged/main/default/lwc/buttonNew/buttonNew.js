import { LightningElement, track, api } from 'lwc';

export default class Button extends LightningElement {
    @api hide = false;
    @track img = false;
    @track yesClick = true;
    handleClick() {
        this.img = true;
        this.yesClick = false;
        this.hide = true;
        const hideEvent = new CustomEvent("hide", {
            detail: this.hide
        })
        this.dispatchEvent(hideEvent);
    }

}