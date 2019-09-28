({
    doInit : function(component, event, helper){
        console.log('****Credit Pull : doInit Called');
        setTimeout(function(){
            component.set('v.simpleRecord.LTX_Credit_Score__c',9);
            component.set('v.simpleRecord.LTX_Current_Balance_in_Account__c',9500000);
            component.find("recordHandler").saveRecord($A.getCallback(function(saveResult) {
                // NOTE: If you want a specific behavior(an action or UI behavior) when this action is successful 
                // then handle that in a callback (generic logic when record is changed should be handled in recordUpdated event handler)
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // handle component related logic in event handler
                    component.find("notifLib").showToast({
                        title:"Credit Pull",
                        message:"Credit Pull request is successfully Completed !",
                        variant:"success",
                        mode:"dismissable"
                    });
                } else if (saveResult.state === "INCOMPLETE") {
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            }));  
        }, 2000);
    },
})