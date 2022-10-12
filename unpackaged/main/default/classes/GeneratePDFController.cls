public class GeneratePDFController {
 
    @AuraEnabled
    public static string orgUrl(){
        string sfUrl = URL.getSalesforceBaseUrl().toExternalForm();
        string[] slist = sfUrl.split('\\.my.salesforce.com');
        slist.add('--c.visualforce.com');
        sfUrl = String.join( slist, '' );
        return sfUrl;
    }
    
    @auraEnabled
    public static void savePDFAcc(String recId){
        PageReference pdfPage1 = new PageReference('/apex/RecommendationPdf');
        
        pdfPage1.getParameters().put('Id', recId);
        
        Blob pdfContent1 = pdfPage1.getContent();
        
        Attachment attach1= new Attachment();
        attach1.ParentId = recId;
        attach1.Name = 'Test Attachment for PDF 1';
        attach1.Body = pdfContent1;
        attach1.contentType = 'application/pdf';
        insert attach1;
       
  

          
        
        /*Messaging.SingleEmailMessage semail = new Messaging.SingleEmailMessage();
        Messaging.EmailFileAttachment attach = new Messaging.EmailFileAttachment();
        attach.setFileName('GenPdf.pdf');
        attach.setBody(pdfContent1);
        semail.setSubject('Test Email');
        String[] sendTo = new String[]{'gurjot.singh@crmit.com'};
        semail.setToAddresses(sendTo);
        semail.setPlainTextBody('Please find the attached pdf ');
        semail.setFileAttachments(new Messaging.EmailFileAttachment[]{attach});
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{semail});*/
        
        Recomm__c Rec = [SELECT Contact__r.Name, contact__r.Email, contact__r.Phone FROM Recomm__c WHERE Id=:recId];
        messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
        Messaging.EmailFileAttachment attach = new Messaging.EmailFileAttachment();
        attach.setFileName('GenPdf.pdf');
        attach.setBody(pdfContent1);
            String body = 'Hey '+Rec.Contact__r.Name+' '+',<br/>We thank you for showing interest in our community & taking part in the Assessment. We have done the Survey & came up with a Recommendation, the same is enclosed with this mail. Feel free to reach out to us for further discussions.<br/><br/>'+'<br/>Thanks,<br/>CRMIT<br/><br/>Follow us<br/><a href="https://www.facebook.com/CRMITSolutions"><img src="https://img.icons8.com/fluency/344/facebook-new.png" width="25px"></a><a href="https://www.linkedin.com/"><img src="https://img.icons8.com/color/344/linkedin.png" width="25px"></a><a href="https://www.youtube.com/crmitsolutions"><img src="https://img.icons8.com/color/344/youtube-play.png" width="25px"></a><a href="https://twitter.com/crmitsolutions"><img src=https://img.icons8.com/color/344/twitter--v1.png" width="25px"></a>';
            List<String> toAddress = new List<String>();
            toAddress.add(Rec.contact__r.Email);
            String subject = 'Recommendation'; 
            mail.setToAddresses(toAddress);
            mail.setReplyTo('no-reply@xooa.com');
            mail.setSenderDisplayName('CRMIT Community');
            mail.setSubject(subject);
            mail.setHtmlBody(body);
            mail.setPlainTextBody('Please find the attached pdf ');
            mail.setFileAttachments(new Messaging.EmailFileAttachment[]{attach});
            // mail.setEntityAttachments(files);
            // Test isRunningTest add it later
            Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
        
    }
}