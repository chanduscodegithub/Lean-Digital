import { LightningElement, track, api } from 'lwc';
import surveyController1 from '@salesforce/apex/surveyController.surveyController1';
import Firstname1 from '@salesforce/schema/Contact.FirstName';
import Lastname1 from '@salesforce/schema/Contact.LastName';
import Phonename1 from '@salesforce/schema/Contact.Phone';
import Emailname1 from '@salesforce/schema/Contact.Email';
import Name1 from '@salesforce/schema/Contact.Name';

import CompanyUrl from '@salesforce/schema/Contact.Company_Url__c';
import Companyname from '@salesforce/schema/Contact.Company_Name__c';
import Rolename from '@salesforce/schema/Contact.Role__c';
import country from '@salesforce/schema/Contact.country__c';
import code from '@salesforce/schema/Contact.Country_Code__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';






export default class Survey1 extends LightningElement {

  @track country
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
    FirstName: Firstname1,
    LastName: Lastname1,
    Company_Name__c: Companyname,
    Phone: Phonename1,
    Email: Emailname1,
    Name: Name1,
    Company_Url__c: CompanyUrl,
    Role__c: Rolename,
    country__c: country,
    Country_Code__c: code
  };

  get options() {
    return [
      { label: 'Andorra', value: 'AD' },
      { label: 'United Arab Emirates', value: 'AE' },
      { label: 'Afghanistan', value: 'AF' },
      { label: 'Antigua and Barbuda', value: 'AG' },
      { label: 'Anguilla', value: 'AI' },
      { label: 'Albania', value: 'AL' },
      { label: 'Armenia', value: 'AM' },
      { label: 'Angola', value: 'AO' },
      { label: 'Antarctica', value: 'AQ' },
      { label: 'Argentina', value: 'AR' },
      { label: 'Austria', value: 'AT' },
      { label: 'Australia', value: 'AU' },
      { label: 'Aruba', value: 'AW' },
      { label: 'Aland Islands', value: 'AX' },
      { label: 'Azerbaijan', value: 'AZ' },
      { label: 'Bosnia and Herzegovina', value: 'BA' },
      { label: 'Barbados', value: 'BB' },
      { label: 'Bangladesh', value: 'BD' },
      { label: 'Belgium', value: 'BE' },
      { label: 'Burkina Faso', value: 'BF' },
      { label: 'Bulgaria', value: 'BG' },
      { label: 'Bahrain', value: 'BH' },
      { label: 'Burundi', value: 'BI' },
      { label: 'Benin', value: 'BJ' },
      { label: 'Saint Barth??lemy', value: 'BL' },
      { label: 'Bermuda', value: 'BM' },
      { label: 'Brunei Darussalam', value: 'BN' },
      { label: 'Bolivia, Plurinational State of', value: 'BO' },
      { label: 'Bonaire, Sint Eustatius and Saba', value: 'BQ' },
      { label: 'Brazil', value: 'BR' },
      { label: 'Bahamas', value: 'BS' },
      { label: 'Bhutan', value: 'BT' },
      { label: 'Bouvet Island', value: 'BV' },
      { label: 'Botswana', value: 'BW' },
      { label: 'Belarus', value: 'BY' },
      { label: 'Belize', value: 'BZ' },
      { label: 'Canada', value: 'CA' },
      { label: 'Cocos (Keeling) Islands', value: 'CC' },
      { label: 'Congo, the Democratic Republic of the', value: 'CD' },
      { label: 'Central African Republic', value: 'CF' },
      { label: 'Congo', value: 'CG' },
      { label: 'Switzerland', value: 'CH' },
      {
        label: "Cote d'Ivoire", value: 'CI'
      },
      { label: 'Cook Islands', value: 'CK' },
      { label: 'Chile', value: 'CL' },
      { label: 'Cameroon', value: 'CM' },
      { label: 'China', value: 'CN' },
      { label: 'Colombia', value: 'CO' },
      { label: 'Costa Rica', value: 'CR' },
      { label: 'Cuba', value: 'CU' },
      { label: 'Cape Verde', value: 'CV' },
      { label: 'Cura??ao', value: 'CW' },
      { label: 'Christmas Island', value: 'CX' },
      { label: 'Cyprus', value: 'CY' },
      { label: 'Czech Republic', value: 'CZ' },
      { label: 'Germany', value: 'DE' },
      { label: 'Djibouti', value: 'DJ' },
      { label: 'Denmark', value: 'DK' },
      { label: 'Dominica', value: 'DM' },
      { label: 'Dominican Republic', value: 'DO' },
      { label: 'Algeria', value: 'DZ' },
      { label: 'Ecuador', value: 'EC' },
      { label: 'Estonia', value: 'EE' },
      { label: 'Egypt', value: 'EG' },
      { label: 'Western Sahara', value: 'EH' },
      { label: 'Eritrea', value: 'ER' },
      { label: 'Spain', value: 'ES' },
      { label: 'Ethiopia', value: 'ET' },
      { label: 'Finland', value: 'FI' },
      { label: 'Fiji', value: 'FJ' },
      { label: 'Falkland Islands (Malvinas)', value: 'FK' },
      { label: 'Faroe Islands', value: 'FO' },
      { label: 'France', value: 'FR' },
      { label: 'Gabon', value: 'GA' },
      { label: 'United Kingdom', value: 'GB' },
      { label: 'Grenada', value: 'GD' },
      { label: 'Georgia', value: 'GE' },
      { label: 'French Guiana', value: 'GF' },
      { label: 'Guernsey', value: 'GG' },
      { label: 'Ghana', value: 'GH' },
      { label: 'Gibraltar', value: 'GI' },
      { label: 'Greenland', value: 'GL' },
      { label: 'Gambia', value: 'GM' },
      { label: 'Guinea', value: 'GN' },
      { label: 'Guadeloupe', value: 'GP' },
      { label: 'Equatorial Guinea', value: 'GQ' },
      { label: 'Greece', value: 'GR' },
      { label: 'South Georgia and the South Sandwich Islands', value: 'GS' },
      { label: 'Guatemala', value: 'GT' },
      { label: 'Guinea-Bissau', value: 'GW' },
      { label: 'Guyana', value: 'GY' },
      { label: 'Heard Island and McDonald Islands', value: 'HM' },
      { label: 'Honduras', value: 'HN' },
      { label: 'Croatia', value: 'HR' },
      { label: 'Haiti', value: 'HT' },
      { label: 'Hungary', value: 'HU' },
      { label: 'Indonesia', value: 'ID' },
      { label: 'Ireland', value: 'IE' },
      { label: 'Israel', value: 'IL' },
      { label: 'Isle of Man', value: 'IM' },
      { label: 'India', value: 'IN' },
      { label: 'British Indian Ocean Territory', value: 'IO' },
      { label: 'Iraq', value: 'IQ' },
      { label: 'Iran, Islamic Republic of', value: 'IR' },
      { label: 'Iceland', value: 'IS' },
      { label: 'Italy', value: 'IT' },
      { label: 'Jersey', value: 'JE' },
      { label: 'Jamaica', value: 'JM' },
      { label: 'Jordan', value: 'JO' },
      { label: 'Japan', value: 'JP' },
      { label: 'Kenya', value: 'KE' },
      { label: 'Kyrgyzstan', value: 'KG' },
      { label: 'Cambodia', value: 'KH' },
      { label: 'Kiribati', value: 'KI' },
      { label: 'Comoros', value: 'KM' },
      { label: 'Saint Kitts and Nevis', value: 'KN' },
      { label: "Korea, Democratic People's Republic of", value: 'KP' },
      { label: 'Korea, Republic of', value: 'KR' },
      { label: 'Kuwait', value: 'KW' },
      { label: 'Cayman Islands', value: 'KY' },
      { label: 'Kazakhstan', value: 'KZ' },
      {
        label: "Lao People's Democratic Republic", value: 'LA'
      },
      { label: 'Lebanon', value: 'LB' },
      { label: 'Saint Lucia', value: 'LC' },
      { label: 'Liechtenstein', value: 'LI' },
      { label: 'Sri Lanka', value: 'LK' },
      { label: 'Liberia', value: 'LR' },
      { label: 'Lesotho', value: 'LS' },
      { label: 'Lithuania', value: 'LT' },
      { label: 'Luxembourg', value: 'LU' },
      { label: 'Latvia', value: 'LV' },
      { label: 'Libya', value: 'LY' },
      { label: 'Morocco', value: 'MA' },
      { label: 'Monaco', value: 'MC' },
      { label: 'Moldova Republic of', value: 'MD' },
      { label: 'Montenegro', value: 'ME' },
      { label: 'Saint Martin (French part)', value: 'MF' },
      { label: 'Madagascar', value: 'MG' },
      { label: 'Macedonia, the former Yugoslav Republic of', value: 'MK' },
      { label: 'Mali', value: 'ML' },
      { label: 'Myanmar', value: 'MM' },
      { label: 'Mongolia', value: 'MN' },
      { label: 'Macao', value: 'MO' },
      { label: 'Martinique', value: 'MQ' },
      { label: 'Mauritania', value: 'MR' },
      { label: 'Montserrat', value: 'MS' },
      { label: 'Malta', value: 'MT' },
      { label: 'Mauritius', value: 'MU' },
      { label: 'Maldives', value: 'MV' },
      { label: 'Malawi', value: 'MW' },
      { label: 'Mexico', value: 'MX' },
      { label: 'Malaysia', value: 'MY' },
      { label: 'Mozambique', value: 'MZ' },
      { label: 'Namibia', value: 'NA' },
      { label: 'New Caledonia', value: 'NC' },
      { label: 'Niger', value: 'NE' },
      { label: 'Norfolk Island', value: 'NF' },
      { label: 'Nigeria', value: 'NG' },
      { label: 'Nicaragua', value: 'NI' },
      { label: 'Netherlands', value: 'NL' },
      { label: 'Norway', value: 'NO' },
      { label: 'Nepal', value: 'NP' },
      { label: 'Nauru', value: 'NR' },
      { label: 'Niue', value: 'NU' },
      { label: 'New Zealand', value: 'NZ' },
      { label: 'Oman', value: 'OM' },
      { label: 'Panama', value: 'PA' },
      { label: 'Peru', value: 'PE' },
      { label: 'French Polynesia', value: 'PF' },
      { label: 'Papua New Guinea', value: 'PG' },
      { label: 'Philippines', value: 'PH' },
      { label: 'Pakistan', value: 'PK' },
      { label: 'Poland', value: 'PL' },
      { label: 'Saint Pierre and Miquelon', value: 'PM' },
      { label: 'Pitcairn', value: 'PN' },
      { label: 'Palestine', value: 'PS' },
      { label: 'Portugal', value: 'PT' },
      { label: 'Paraguay', value: 'PY' },
      { label: 'Qatar', value: 'QA' },
      { label: 'Reunion', value: 'RE' },
      { label: 'Romania', value: 'RO' },
      { label: 'Serbia', value: 'RS' },
      { label: 'Russian Federation', value: 'RU' },
      { label: 'Rwanda', value: 'RW' },
      { label: 'Saudi Arabia', value: 'SA' },
      { label: 'Solomon Islands', value: 'SB' },
      { label: 'Seychelles', value: 'SC' },
      { label: 'Sudan', value: 'SD' },
      { label: 'Sweden', value: 'SE' },
      { label: 'Singapore', value: 'SG' },
      { label: 'Saint Helena, Ascension and Tristan da Cunha', value: 'SH' },
      { label: 'Slovenia', value: 'SI' },
      { label: 'Svalbard and Jan Mayen', value: 'SJ' },
      { label: 'Slovakia', value: 'SK' },
      { label: 'Sierra Leone', value: 'SL' },
      { label: 'San Marino', value: 'SM' },
      { label: 'Senegal', value: 'SN' },
      { label: 'Somalia', value: 'SO' },
      { label: 'Suriname', value: 'SR' },
      { label: 'South Sudan', value: 'SS' },
      { label: 'Sao Tome and Principe', value: 'ST' },
      { label: 'El Salvador', value: 'SV' },
      { label: 'Sint Maarten (Dutch part)', value: 'SX' },
      { label: 'Syrian Arab Republic', value: 'SY' },
      { label: 'Swaziland', value: 'SZ' },
      { label: 'Turks and Caicos Islands', value: 'TC' },
      { label: 'Chad', value: 'TD' },
      { label: 'French Southern Territories', value: 'TF' },
      { label: 'Togo', value: 'TG' },
      { label: 'Thailand', value: 'TH' },
      { label: 'Tajikistan', value: 'TJ' },
      { label: 'Tokelau', value: 'TK' },
      { label: 'Timor-Leste', value: 'TL' },
      { label: 'Turkmenistan', value: 'TM' },
      { label: 'Tunisia', value: 'TN' },
      { label: 'Tonga', value: 'TO' },
      { label: 'Turkey', value: 'TR' },
      { label: 'Trinidad and Tobago', value: 'TT' },
      { label: 'Tuvalu', value: 'TV' },
      { label: 'Taiwan', value: 'TW' },
      { label: 'Tanzania, United Republic of', value: 'TZ' },
      { label: 'Ukraine', value: 'UA' },
      { label: 'Uganda', value: 'UG' },
      { label: 'United States', value: 'US' },
      { label: 'Uruguay', value: 'UY' },
      { label: 'Uzbekistan', value: 'UZ' },
      { label: 'Holy See (Vatican City State)', value: 'VA' },
      { label: 'Saint Vincent and the Grenadines', value: 'VC' },
      { label: 'Venezuela Bolivarian, Republic of', value: 'VE' },
      { label: 'Virgin Islands, British', value: 'VG' },
      { label: 'Vietnam', value: 'VN' },
      { label: 'Vanuatu', value: 'VU' },
      { label: 'Wallis and Futuna', value: 'WF' },
      { label: 'Samoa', value: 'WS' },
      { label: 'Yemen', value: 'YE' },
      { label: 'Mayotte', value: 'YT' },
      { label: 'South Africa', value: 'ZA' },
      { label: 'Zambia', value: 'ZM' },
      { label: 'Zimbabwe', value: 'ZW' }
    ];
  }

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

  firstnameChange(event) {
    this.getContactRecord.FirstName = event.target.value;

  }
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

  handleChange(event) {
    this.getContactRecord.country__c = event.target.options.find(opt => opt.value === event.detail.value).label;
    this.getContactRecord.Country_Code__c = event.target.value;
    this.country = event.target.value;
    console.log(event.target.options.find(opt => opt.value === event.detail.value).label);
    console.log(event.target.value);
  }

  handleClick(event){

  }



  // nameChange(event) {
  //   this.getContactRecord.Name = event.target.value;

  // }





  handleClick() {
    if (typeof this.getContactRecord.FirstName === 'object' || typeof this.getContactRecord.LastName === 'object' || typeof this.getContactRecord.Company_Name__c === 'object' || typeof this.getContactRecord.Email === 'object' || typeof this.getContactRecord.Phone === 'object' || typeof this.getContactRecord.Company_Url__c === 'object' || typeof this.getContactRecord.Role__c === 'object' || typeof this.getContactRecord.country__c === 'object') {
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