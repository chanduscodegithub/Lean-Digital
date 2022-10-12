import { LightningElement, api } from 'lwc';
import ldtImg from '@salesforce/resourceUrl/ldttoolsImages';

export default class LdtToolHomeLwr extends LightningElement {
    hidevalue;
    LDT2Logo;
    crmitlogo;
    digitalocean;
    Group361;
    ldtBanner;

    LDT2Logo = ldtImg + '/ldttoolsImages/LDT2Logo.png';
    crmitlogo = ldtImg + '/ldttoolsImages/crmit.jpg';
    digitalocean = ldtImg + '/ldttoolsImages/Icon-simple-digitalocean@2x.png';
    Group361 = ldtImg + '/ldttoolsImages/Group-361.png';
    ldtBanner = ldtImg + '/ldttoolsImages/ldtBanner.png';

    hanldeProgressValueChange(event) {
        this.hidevalue = event.detail;
    }



}