({
    doInit : function(component, event, helper) {
        //Read the Param
        let recIdFlag = true;
        let recordIdVar = component.get('v.recordId');
        console.log('****recordIdVar'+recordIdVar);
        if(typeof recordIdVar==='undefined'){
            //If record id is not assigned, check the URL for recId parameter
            let pageReference = component.get("v.pageReference");
            recordIdVar = pageReference.state.recId;
            console.log('****pr'+JSON.stringify(pageReference));
            if(recordIdVar){
                component.set('v.recordId',recordIdVar);
            }else{
                recIdFlag = false;
            }
        }
        if(recIdFlag){
            /*
             * Get Details from TabPanel Custom metadata type and 
             * pass parameters to create tabs
            */
            let getTabPanel_sa = component.get('c.getTabPanel');
            //Set Params
            getTabPanel_sa.setParams({
                tabPanelTemplateId : component.get('v.tabPanelId')
            });//It doesn't require any parameters
            //set callback
            getTabPanel_sa.setCallback(this, function(response){
                let state = response.getState();
                if(state==='SUCCESS'){
                    console.log('***responseIs:',response.getReturnValue());
                    let responseIs = response.getReturnValue();
                    //Store response in helper
                    component.set('v.responseMapIs',responseIs);
                    let tabsAreVar = component.get('v.tabsAre');
                    //Parse over the response to create tabs
                    let tabList = [];
                    let componentIs;
                    let paramObj;
                    let tabsListIs = Object.keys(responseIs);
                    let defaultTab;
                    tabsListIs.forEach(function(rec){
                        //Initialize object & list 
                        componentIs = [];
                        paramObj=new Object();
                        //Push element
                        componentIs.push('lightning:tab');
                        let tabId = rec.replace(/ /g,'_');
                        paramObj.label=rec;
                        paramObj.iconName=(responseIs[rec][0].Tab_Panel__r.Tab_Icon_Name__c?responseIs[rec][0].Tab_Panel__r.Tab_Icon_Name__c:"utility:work_order_type");
                        paramObj.id=tabId;//Generating Id from label
                        paramObj.onactive=component.getReference("c.addContent");
                        componentIs.push(paramObj);
                        if(responseIs[rec][0].Tab_Panel__r.Default__c){
                            defaultTab = tabId;
                        }
                        if(defaultTab){
                            component.set('v.defaultTab',defaultTab);
                        }
                        tabList.push(componentIs);
                    });
                    console.log('***tabList is'+JSON.stringify(tabList));
                    //Create components
                    $A.createComponents(tabList,function(newTabs, status, errorMessage){
                        console.log('***status is'+status);
                        if(status==='SUCCESS'){
                            console.log('***tabs created');
                            component.set('v.tabsAre',newTabs);
                        }
                    });
                }
            });
            //Enqueue action
            $A.enqueueAction(getTabPanel_sa);   
        }else{
            component.find('notifLib').showNotice({
                variant:'error',
                header:'Something has gone wrong',
                message: 'Check the record Id passed to the component.'
            });
        }
    },
    addContent : function(component, event) {
        var tab = event.getSource();
        if(tab.get('v.body').length==0){//if body is not there, then only create body
            var responseMapIsVar = component.get('v.responseMapIs');
            console.log('***tab clicked'+tab.get('v.id'));
            let keyIs = tab.get('v.id').replace(/_/g,' ');
            var relatedMdts = responseMapIsVar[keyIs];
            //Create TabContent component passing related mdt records
            $A.createComponent(
                'c:LTX_TabContent'
                ,
                {
                    fieldSets: relatedMdts,
                    recordId : component.get('v.recordId')
                },
                function(newComp, status, error){
                    if(status==='SUCCESS'){
                        tab.set('v.body',newComp);
                    }
                });
        }else{
            console.log('***Tab is already present.');
        }
    }
})