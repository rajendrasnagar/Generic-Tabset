({
    initTable: function (component, tablemd, helper) {
        console.log('***tablemd table is called');
        //Action Object
        let actionsObjArray = [];
        //Generate actions supported
        let actionVar = component.get('v.settingsRec').Table_Actions_Supported__c;
        
        console.log('***actionVar:'+actionVar);
        if(actionVar=='R' || actionVar=='U' || actionVar=='D' || actionVar=='UD'){
            console.log('***actionsVar:'+actionVar);
            actionsObjArray.push({
                label : 'Show Details',
                name : 'show_details'
            });
        }
        
        if(actionVar=='U' || actionVar=='UD'){
            actionsObjArray.push({
                label : 'Edit Details',
                name : 'edit_details'
            });
        }
        if(actionVar=='D' || actionVar=='UD'){
            actionsObjArray.push({
                label : 'Delete',
                name : 'delete'
            });
        }
        console.log('***tablemd table is called2');
        //Generate Columns Var
        let columnsObjArray= [];
        let fields = '';
        tablemd.forEach(function(rec){
            console.log('***'+JSON.stringify(rec));
            console.log('****rec:dataType'+(rec.dataType=='DOUBLE')?'number':(rec.dataType=='BOOLEAN')?'boolean':'text');
            
            columnsObjArray.push({
                label : rec.fieldLabel,
                fieldName : rec.fieldApi,
                type : (rec.dataType=='DOUBLE')?'number':(rec.dataType=='BOOLEAN')?'boolean':'text',
                cellAttributes: { alignment: (rec.dataType=='DOUBLE')?'left':'left'}
            });
            fields+=rec.fieldApi+',';
        });
        //Apend actions in the columns
        columnsObjArray.push({
            type: 'action', 
            typeAttributes: { rowActions: actionsObjArray }
        });
        
        component.set('v.columns', columnsObjArray);
		console.log('***columnsObjArray'+JSON.stringify(columnsObjArray));
        //Get data to display
        component.set('v.fields',fields);
        helper.fetchData(component);
    },

    fetchData: function (component) {
        console.log('***fetchData called');
        let fields = component.get('v.fields');
        let getTableData_sa = component.get('c.getTableData');
        let pageSize = component.get("v.pageSize");
        let pageNumber = component.get("v.pageNumber");
        //Set params
        getTableData_sa.setParams({
            recordId : component.get('v.recordId'),
            fieldsString : fields,
            ObjectIs : component.get('v.settingsRec').Object_Name__r.QualifiedApiName,
            referenceId: component.get('v.settingsRec').Reference_Id__c,
            pageSize : pageSize,
            pageNumber : pageNumber
        });
        getTableData_sa.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('***getTableData_sa success'+JSON.stringify(response.getReturnValue()));
                let resultData = response.getReturnValue();
                component.set('v.data', resultData);
                if(resultData.length < component.get("v.pageSize")){
                    component.set("v.isLastPage", true);
                } else{
                    component.set("v.isLastPage", false);
                }
                component.set("v.dataSize", resultData.length);
                //Hide spinner
                component.set('v.showSpinner',false);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
                component.set('v.showSpinner',false);
            }
        }));
        $A.enqueueAction(getTableData_sa);
    },
    deleteRec: function (component, row) {
       let deleteRecord_sa = component.get('c.deleteRecord');
        //Set params
        deleteRecord_sa.setParams({
            recordId : row.Id,
        });
        deleteRecord_sa.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('*** Record is deleted');
                var rows = component.get('v.data');
                var rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                component.set('v.data', rows);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
                component.set('v.showSpinner',false);
            }
        }));
        $A.enqueueAction(deleteRecord_sa);
        
    }
})