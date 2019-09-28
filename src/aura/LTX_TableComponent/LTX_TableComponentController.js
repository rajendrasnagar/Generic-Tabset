({
    doInit : function(component, event, helper) {
        console.log('***Table Component: do init called');
        let getTableFieldsFromFieldSet_sa = component.get('c.getTableFieldsFromFieldSet');
        //Set Params
        getTableFieldsFromFieldSet_sa.setParams(
            {
                fieldSetName: component.get('v.settingsRec').FieldSet__c,
                objectNameIs: component.get('v.settingsRec').Object_Name__r.QualifiedApiName,
                referenceId: component.get('v.settingsRec').Reference_Id__c
            }
        );
        //set callback
        getTableFieldsFromFieldSet_sa.setCallback(this, function(response){
            let state = response.getState();
            console.log('***getFieldsFromFieldSet_sa state'+state);
            if(state==='SUCCESS'){
				console.log('***field wrapper fetched:'+response.getReturnValue());
                helper.initTable(component, response.getReturnValue(), helper);
            }
        });
        //Enqueue action
        $A.enqueueAction(getTableFieldsFromFieldSet_sa);
	},
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        switch (action.name) {
            case 'show_details':
                var navigateToRecord = $A.get("e.force:navigateToSObject");
                console.log('***row'+JSON.stringify(row));
                navigateToRecord.setParams({
                    "recordId": row.Id
                });
                navigateToRecord.fire();
                break;
            case 'edit_details':
                var editRecordEvent = $A.get("e.force:editRecord");
                console.log('***row'+row.Id);
                editRecordEvent.setParams({
                    "recordId": row.Id
                });
                editRecordEvent.fire();
                break;
            case 'delete':
                helper.deleteRec(component, row)
                break;
        }
    },
    handleNext : function(component, event, helper) { 
        //Show spinner
        component.set('v.showSpinner',true);
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber+1);
        helper.fetchData(component);
    },
    handlePrev : function(component, event, helper) {    
        //Show spinner
        component.set('v.showSpinner',true);
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber-1);
        helper.fetchData(component);
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
    }
})