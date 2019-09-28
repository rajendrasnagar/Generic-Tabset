public with Sharing class LTX_SectionComponent_CC {
	@AuraEnabled(cacheable=true)
    public static String sampleCall(String fieldSetName){
        System.debug('fs name:'+fieldSetName);
        return fieldSetName;
    }
    /* 
        We can't mark it as cacheble as we need to refresh data on delete from table component
     */
    @AuraEnabled
    public static RecordWraper getFieldsFromFieldSet(String fieldSetName, String objectNameIs, 
                                                     String recordId, String referenceId){
        System.debug('***getFieldsFromFieldSet_sa called:'+fieldSetName+' : '+objectNameIs+' : '+recordId+' : '+referenceId);
        list<String> fieldList = new list<String>();
        DescribeSObjectResult[] describes = Schema.describeSObjects(new String[] {objectNameIs});
        // There should only be the one match for the one object type name
        for(Schema.FieldSetMember fs : describes[0].fieldSets.getMap().get(fieldSetName).getFields()){
            fieldList.add(fs.getFieldPath());
        }

        //Remove last comma
        String queryIs = 'select Id from '+objectNameIs+' where '+referenceId+'=\''+recordId+'\' order by lastmodifieddate';
        System.debug('***queryIs is:'+queryIs);
        
        //return new RecordWraper(fwList, Database.query(fields));
        System.debug('***fieldList is:'+fieldList);
        list<sObject> objList = Database.query(queryIs);
        return new RecordWraper(fieldList, objList.size()>0?objList[0].Id:null);
    }

    public Class RecordWraper{
        @AuraEnabled
        public list<String> fieldList;
        @AuraEnabled
        public Id recId;
        public RecordWraper(list<String> fieldList, Id recId){
            this.fieldList = fieldList;
            this.recId = recId;
        }
    }
}