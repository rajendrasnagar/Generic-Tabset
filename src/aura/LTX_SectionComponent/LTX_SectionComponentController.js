({
	doInit : function(component, event, helper) {
        console.log('***Section Component: do init called'+component.get('v.recordId'));
        let getFieldsFromFieldSet_sa = component.get('c.getFieldsFromFieldSet');
        //Set Params
        getFieldsFromFieldSet_sa.setParams(
            {
                fieldSetName: component.get('v.settingsRec').FieldSet__c,
                objectNameIs: component.get('v.settingsRec').Object_Name__r.QualifiedApiName,
                recordId : component.get('v.recordId'),
                referenceId: component.get('v.settingsRec').Reference_Id__c
            }
        );//It doesn't require any parameters
        //set callback
        getFieldsFromFieldSet_sa.setCallback(this, function(response){
            let state = response.getState();
            if(state==='SUCCESS'){
                let recId = response.getReturnValue().recId;
                console.log('***field returned'+JSON.stringify(response.getReturnValue()));
                if(recId){
                    component.set('v.fieldList',response.getReturnValue().fieldList);
                    component.set('v.relatedRecordId',recId);   
                }else{
                    component.set('v.showSpinner',false);
                }
            }
        });
        //Enqueue action
        $A.enqueueAction(getFieldsFromFieldSet_sa);
	},
    opencontent : function(component, event) {
        console.log('***opencontent called');
        let targetVar = event.currentTarget.id;
        if(targetVar=='contentbodySec1_arrowup'){
            component.set('v.isCollapsed',false);
        }else if(targetVar=='contentbodySec1_arrowdown'){
            component.set('v.isCollapsed',true);
        }
    },
    resetErrorPanel : function(component, event, helper){
        console.log('***resetErrorPanel called');
        component.set('v.errMessageFlag',false);
        component.set('v.enableSave',true);
        component.set('v.errMessage','');
    },
    editIt : function(component, event, helper){
        console.log('***editIt called');
        component.set('v.inSave',true);
        component.set('v.isDisabled',false);
        component.set('v.isCollapsed',false);
    },
    cancelIt : function(component, event, helper){
        console.log('***cancelIt called');
        component.set('v.inSave',false);
        component.set('v.isDisabled',true);
    },
    handleLoad : function(component, event, helper){
        component.set('v.showSpinner',false);
    },
    handleOnSubmit : function(component, event, helper){
        console.log('***e',event.getSource());
        component.find('notifLib').showToast({
            title: "Update Information!",
            message: "The record has been updated successfully.",
            variant: "success",
            mode: "dismissable"
        });
        component.set('v.inSave',false);
        component.set('v.isDisabled',true);
    },
    callAction1 : function(component, event, helper){
        console.log('*** callAction1 called');
        $A.createComponent(
            'c:LTX_'+event.getSource().get('v.label').replace(/ /g,'_'),
            {
                recordId : component.get('v.relatedRecordId'),
                fields : component.get('v.fieldList')
            },
            function(newComp, status, error){
				console.log('****new comp created');
                //Create and assign component to container
            	var ele = component.find('sectionActionContainer');
                ele.set('v.body',newComp);
            }
        );
    },
    callAction2 : function(component, event, helper){
        console.log('*** callAction2 called');
    },
    UpdateSection : function(component, event, helper){
        console.log('***Update Section called',component.find('contentForm'));
    }
})