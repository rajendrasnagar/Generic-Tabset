public with sharing class LTX_TabPanel_CC {
    /*
     * This method will return a sorted list of tab configs
     * tab name -> tab section components
    */
    @AuraEnabled(cacheable=true)
    public static map<String, list<TabPanel_Component__mdt>> getTabPanel(String tabPanelTemplateId){
        map<String, list<TabPanel_Component__mdt>> unorderedTabMap = new map<String,list<TabPanel_Component__mdt>>();
        map<String, list<TabPanel_Component__mdt>> orderedTabMap = new map<String,list<TabPanel_Component__mdt>>();
        map<String, String> tabLabelMap = new map<String, String>();
        for(TabPanel_Component__mdt rec: [SELECT Id, Label, MasterLabel, Object_Name__r.QualifiedApiName, FieldSet__c, 
                                          Section_Actions_Supported__c, Table_Actions_Supported__c, Screen_Type__c, 
                                          Action_1__c, Action_2__c, Reference_Id__c, Section_Icon_Name__c, Section_Order__c,
                                          Tab_Panel__r.Tab_Icon_Name__c,Tab_Panel__r.Tab_Order__c, Tab_Panel__r.MasterLabel,
                                          Tab_Panel__r.Default__c, Is_Collapsed__c
                                          FROM TabPanel_Component__mdt 
                                          where Is_Active__c=true and Tab_Panel__r.TabPanel_Unique_Key__c=:tabPanelTemplateId
                                          order by Section_Order__c asc])
        {
            if(unorderedTabMap.containsKey(rec.Tab_Panel__r.Tab_Order__c)){
                unorderedTabMap.get(rec.Tab_Panel__r.Tab_Order__c).add(rec);
            }else{
                unorderedTabMap.put(rec.Tab_Panel__r.Tab_Order__c,new list<TabPanel_Component__mdt>{rec});
            }
            tabLabelMap.put(rec.Tab_Panel__r.Tab_Order__c, rec.Tab_Panel__r.MasterLabel);
        }
        //Sorting the keys using list as we can't sort set
        list<String> deciList = new list<String>();
        deciList.addAll(unorderedTabMap.keySet());
        deciList.sort();
        for(String rec: deciList){
            orderedTabMap.put(tabLabelMap.get(rec),unorderedTabMap.get(rec));
            System.debug('****order:-> :'+unorderedTabMap.get(rec));
        }
        System.debug('****orderedTabMap:'+orderedTabMap);
        return orderedTabMap;
    }
}