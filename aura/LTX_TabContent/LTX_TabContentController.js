({
	doInit : function(component, event, helper) {
		console.log('***tab content called'+JSON.stringify(component.get('v.fieldSets')));
        //Iterate over the field list and generate section components
        let fieldSetsVar = component.get('v.fieldSets');
        //Order the sections
        fieldSetsVar.sort(function(a,b){
            return a['Section_Order__c']-b['Section_Order__c'];
        });
        helper.createComps(component, fieldSetsVar, helper, 0, false);
	}
})