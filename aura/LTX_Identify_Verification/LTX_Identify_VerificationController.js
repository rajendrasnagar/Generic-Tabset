({
    doInit : function(component, event, helper){
        console.log('****Credit Pull : doInit Called');
        component.find("notifLib").showToast({
            title:"Identify Verification",
            message:"Your Identity Verification is completed successfully !",
            variant:"success",
            mode:"dismissable"
        });
        
        component.getEvent('sectionStatus').setParams({'status':'REFRESH'}).fire();
    }
})