public without sharing class assessmentController {
   @AuraEnabled
    public static String saveResponse(String allRespStr, String conId){
        String respId;
        try {
            Map<String, Object> allRespMap = (Map<String, Object>)JSON.deserializeUntyped(allRespStr);
            List<Assessment__c> allQues = [SELECT Name, Status__c FROM Assessment__c];
            
            Response__c resp = new Response__c();
            resp.Status__c = 'Open';
            resp.SubmissionDateTime__c = System.now();
            resp.Contact_Id__c = conId;
            insert resp;
            System.debug('Response'+ resp );
            respId = resp.id;
            Recomm__c recom =new Recomm__c();
            recom.Contact__c=conId; 
            recom.Response__c=respId;
            recom.Crmit_Url__c='https://www.crmit.com/';
            insert recom;
            System.debug('Response'+ recom );
            List<ResponseItem__c> allRespItem = new List<ResponseItem__c>();
            for(Assessment__c eachQues: allQues){
                ResponseItem__c respItem = new ResponseItem__c();
                respItem.Response1__c = resp.Id;
                String quesKey = 'Ques'+eachQues.Name.split('-')[1];
                respItem.Response__c = (String)allRespMap.get(quesKey);
                if(respItem.Response__c == null){
                    respItem.Response__c = 'Not Attempted';
                }
                respItem.SubmissionDateTime__c = System.now();
                respItem.Assessment__c = eachQues.Id;
                respItem.Response_Type__c = 'Response';
                allRespItem.add(respItem);
            }
            insert allRespItem;
            
            Contact contactObj=[SELECT FirstName ,LastName,Email from Contact WHERE id=:conId];
            messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
            String body = 'Hey '+' '+contactObj.FirstName+' '+contactObj.LastName+',<br/>Welcome to CRMIT!<br/><br/>Your assessment is submitted successfully<br/><br/>Thanks,<br/>CRMIT';
            List<String> toAddress = new List<String>();
            toAddress.add(contactObj.Email);
            String subject = 'Assessment Submission'; 
            mail.setToAddresses(toAddress);
            mail.setReplyTo('no-reply@xooa.com');
            mail.setSenderDisplayName('CRMIT Community');
            mail.setSubject(subject);
            mail.setHtmlBody(body);
            // mail.setEntityAttachments(files);
            // Test isRunningTest add it later
            Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});

            messaging.SingleEmailMessage mails = new messaging.SingleEmailMessage();
            String bodyy = 'Hey team,<br/><br/>A new Assessment is submitted for Survey<br/><br/>Thanks,<br/>CRMIT';
            List<String> toAddresss = new List<String>();
            toAddresss.add('bhaskar.narayan@crmit.com');
            String subjectt = 'Assessment for survey'; 
            mails.setToAddresses(toAddresss);
            mails.setReplyTo('no-reply@xooa.com');
            mails.setSenderDisplayName('CRMIT Community');
            mails.setSubject(subjectt);
            mails.setHtmlBody(bodyy);
            // mail.setEntityAttachments(files);
            // Test isRunningTest add it later
            Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mails});

        } catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            System.debug('At: '+e.getLineNumber());
            throw new AuraHandledException(e.getMessage());
        }
        return respId;
    }
    @AuraEnabled
    public static void newQuestions(String newQueStr, String conId, String respId){
        try {
            Map<String, Object> newQueMap = (Map<String, Object>)JSON.deserializeUntyped(newQueStr);
            // List<Additional_Questions__c> allNewQue = new List<Additional_Questions__c>();
            // for(    Object eachQue : newQueMap.values()){
            //     // Additional_Questions__c queItem = new Additional_Questions__c();
            //     // queItem.Contact__c = conId;
            //     // queItem.Questions__c = 
            //     // allNewQue.add(queItem);
            //     System.debug(String.valueOf(eachQue));
            //     Additional_Questions__c queItem = new Additional_Questions__c();
            //     queItem.Contact__c = conId;
            //     if(String.isNotBlank(String.valueOf(eachQue))){
            //         queItem.Questions__c = String.valueOf(eachQue);
            //         allNewQue.add(queItem);
            //     }
            // }
            List<ResponseItem__c> allNewQue = new List<ResponseItem__c>();
            for(    Object eachQue : newQueMap.values()){
                ResponseItem__c queItem = new ResponseItem__c();
                queItem.Response1__c = respId;
                queItem.Response_Type__c = 'Challenge';
                queItem.SubmissionDateTime__c = System.now(); 
                if(String.isNotBlank(String.valueOf(eachQue))){
                    queItem.Response__c = String.valueOf(eachQue);
                    allNewQue.add(queItem);
                }
            }

            insert allNewQue;
        } catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            System.debug('At: '+e.getLineNumber());
            throw new AuraHandledException(e.getMessage());
        }
    }
}