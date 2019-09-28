({
    createComps : function(component, fieldSetsVar, helper, i, bodyListAre, isCollapsed) {
        console.log('***createComps');
        let bodyList=[];//Holds components body
        if(bodyListAre && bodyListAre.length>0){
            bodyList=bodyListAre;
        }
        var contentVar = component.find('content');
        //Iterate over the fieldsets to create body
        //Create components
        let mdtRec = fieldSetsVar[i];
        if(mdtRec){
            if(mdtRec.Screen_Type__c=='Section'){
                $A.createComponent(
                    'c:LTX_SectionComponent',
                    {
                        settingsRec: mdtRec,
                        recordId:component.get('v.recordId'),
                        isCollapsed: isCollapsed,
                    }
                    ,
                    function(newComp, status, error){
                        if(status==='SUCCESS'){
                            bodyList.push(newComp);
                            contentVar.set('v.body',bodyList);
                            helper.createComps(component, fieldSetsVar, helper, ++i, bodyList, true);
                        }
                    }
                );
            }else if(mdtRec.Screen_Type__c=='Table'){
                $A.createComponent(
                    'c:LTX_TableComponent',
                    {
                        settingsRec: mdtRec,
                        recordId:component.get('v.recordId'),
                        isCollapsed: isCollapsed,
                    }
                    ,
                    function(newComp, status, error){
                        console.log('***child created');
                        if(status==='SUCCESS'){
                            bodyList.push(newComp);
                            contentVar.set('v.body',bodyList);
                            helper.createComps(component, fieldSetsVar, helper, ++i, bodyList, true);
                        }
                    }
                );
            }  
        }
    }
})