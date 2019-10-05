public class LTX_TableComponent_CC {
    @AuraEnabled
    public static list<FieldWrapper> getTableFieldsFromFieldSet(String fieldSetName, String objectNameIs, String referenceId)
    {
        System.debug('***getTableFieldsFromFieldSet called:'+fieldSetName+' : '+objectNameIs+' : '+referenceId);
        list<FieldWrapper> fieldWrapperList = new list<FieldWrapper>();
        DescribeSObjectResult[] describes = Schema.describeSObjects(new String[] {objectNameIs});
        // There should only be the one match for the one object type name
        for(Schema.FieldSetMember fs : describes[0].fieldSets.getMap().get(fieldSetName).getFields()){
            fieldWrapperList.add(new FieldWrapper(fs.getLabel(), fs.getFieldPath(), String.valueOf(fs.getType()), fs.getRequired()));
        }
        
        System.debug('***fieldWrapperList is:'+fieldWrapperList);
        return fieldWrapperList;
    }
    
    public Class FieldWrapper{
        @AuraEnabled
        public String fieldLabel;
        @AuraEnabled
        public String fieldApi;
        @AuraEnabled
        public String dataType;
        @AuraEnabled
        public boolean isRequired;
        @AuraEnabled
        public String value;
        public FieldWrapper(String fieldLabel, String fieldApi, String dataType, boolean isRequired){
            this.fieldLabel = fieldLabel;
            this.fieldApi = fieldApi;
            this.dataType = dataType;
            this.isRequired = isRequired;
        }
    }
    
    @AuraEnabled
    public static list<sObject> getTableData(String recordId, String fieldsString, 
                                             String ObjectIs, String referenceId,
                                             String pageSize, String pageNumber)
    {
        System.debug('recordId'+recordId+':'+'recordId'+fieldsString+':'+'recordId'+ObjectIs+':'+
                     'recordId'+referenceId+':'+'recordId'+pageSize+':'+'recordId'+pageNumber);
        Integer psize = Integer.valueOf(pageSize);
        Integer pnumber = Integer.valueOf(pageNumber)-1;
        fieldsString = fieldsString.substring(0, fieldsString.length()-1);
        return Database.query('select '+fieldsString+' from '+ObjectIs+' where '+referenceId+'=\''+recordId+'\''+' LIMIT '+psize+' OFFSET '+(psize*pnumber));
    }
    
    /* Generic Method */
    @AuraEnabled
    public static void deleteRecord(String recordId)
    {
        String objectName = String.valueOf(Id.valueOf(recordId).getSObjectType());
        list<SObject> recList = Database.query('select id from '+objectName+' where Id =\''+recordId+'\'');
        Database.delete(recList);
    }
}