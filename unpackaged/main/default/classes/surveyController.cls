public without sharing class surveyController {
    @AuraEnabled
    public static String surveyController1(Contact contactObj){
        User currUser = [SELECT Name FROM User WHERE Id=:UserInfo.getUserId()];
        
        try {
            //surveyObj.Name = currUser.Name;
            contactObj.Code__c = Integer.valueOf(Math.floor(Math.random()*1000000));
            insert contactObj;

            // if(contactObj.country__c=='India'){
            //     countryCode='IN';
            // }
            
            Lead createLead = new Lead();
                createLead.FirstName = contactObj.FirstName;
                createLead.LastName = contactObj.LastName;
                createLead.Email = contactObj.Email;
                createLead.Company = contactObj.Company_Name__c;
                createLead.Website = contactObj.Company_Url__c;
                createLead.Phone = contactObj.Phone;
                createLead.country__c = contactObj.country__c;
                createLead.Country_Code__c = contactObj.Country_Code__c;
                createLead.LeadSource='Web';
                insert createLead;
            // Send Email
            messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
            String body = 'Hey '+contactObj.FirstName +' '+ contactObj.LastName+',<br/>Welcome to CRMIT!<br/><br/>Your verification code is:'+contactObj.Code__c+'<br/>Thanks,<br/>CRMIT';
            List<String> toAddress = new List<String>();
            toAddress.add(contactObj.Email);
            String subject = 'Welcome to our community'; 
            mail.setToAddresses(toAddress);
            mail.setReplyTo('no-reply@xooa.com');
            mail.setSenderDisplayName('CRMIT Community');
            mail.setSubject(subject);
            mail.setHtmlBody(body);
            // mail.setEntityAttachments(files);
            // Test isRunningTest add it later
            Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
            
            

//             //Create parameter
// Map<String, Object> Params = new Map<String, Object>();
// Params.put('recordId',contactObj);

// //create instance of Interview
// Flow.Interview Mail = new Flow.Interview.Mail(Params);

// //Invoke start methods
// stage.start();

// //get value from Flow
// // string stageName=(string)stage.getvariableValue('opprtunityStage');
// // system.debug('stageName::: '+stageName);
            return contactObj.id;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }
    @AuraEnabled
    public static void generateNewCode(String conId){
        try {
            Contact contactRec = [SELECT Code__c, FirstName, LastName, Email FROM Contact WHERE Id=:conId];
            contactRec.Code__c = Integer.valueOf(Math.floor(Math.random()*1000000));
            update contactRec;

            messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
            String body = 'Hey '+' '+contactRec.LastName+',<br/>Welcome to CRMIT!<br/><br/>Your new verification code is:'+contactRec.Code__c+'<br/>Thanks,<br/>CRMIT';
            List<String> toAddress = new List<String>();
            toAddress.add(contactRec.Email);
            String subject = 'Welcome to our community'; 
            mail.setToAddresses(toAddress);
            mail.setReplyTo('no-reply@xooa.com');
            mail.setSenderDisplayName('CRMIT Community');
            mail.setSubject(subject);
            mail.setHtmlBody(body);
            // mail.setEntityAttachments(files);
            // Test isRunningTest add it later
            Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
        } catch (Exception e) {
            System.debug('Exception Thrown: '+e.getMessage()+' at '+e.getLineNumber());
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Boolean verifyCode(Integer providedCode, String conId){
        Boolean flag = false;
        try {
            Contact contactRec = [SELECT Code__c FROM Contact WHERE Id=:conId];
            flag = contactRec.Code__c == providedCode ? true : false;
            // if(flag==true){
            //     Contact leadRec = [SELECT FirstName, LastName, Email, Company_Name__c, Company_Url__c, Role__c, Phone FROM Contact WHERE Id=:conId ];
            //     Lead createLead = new Lead();
            //     createLead.FirstName = leadRec.FirstName;
            //     createLead.LastName = leadRec.LastName;
            //     createLead.Email = leadRec.Email;
            //     createLead.Company = leadRec.Company_Name__c;
            //     createLead.Website = leadRec.Company_Url__c;
            //     createLead.Phone = leadRec.Phone;
            //     insert createLead;
            // }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return flag;
    }

}