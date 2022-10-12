({   doInit: function(cmp) {
        
        var action = cmp.get("c.orgUrl");
          action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.url", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    savePDF : function(cmp, event, helper) {
         var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Success',
            message: 'Email Sent & Attachment Saved Successfully',
            duration:' 3000',
            key: 'info_alt',
            type: 'success',
            mode: 'dismissible'
        });
        var spinner = cmp.find("mySpinner");
         $A.util.removeClass(spinner, "slds-hide");
        var action = cmp.get("c.savePDFAcc");
        var recId = cmp.get("v.recordId");
         action.setParams({
             recId: recId
    });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                $A.util.addClass(spinner, "slds-hide");
                toastEvent.fire();
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    }
})