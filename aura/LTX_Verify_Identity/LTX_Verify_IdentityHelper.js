({
	showHideModal : function(component, frontElementId, backElementId, event) {
        
        var modal = component.find(frontElementId);
        $A.util.toggleClass(modal, 'slds-fade-in-open');
        var overlay = component.find(backElementId);
        $A.util.toggleClass(overlay, 'slds-backdrop_open');
        //Reset standard style
        component.set("v.cssStyle", ".forceStyle .viewport .oneHeader.slds-global-header_container {z-index:0} .forceStyle.desktop .viewport{overflow:hidden} .slds-global-header_container{z-index: 0;}");        
    },
    resizePopup : function(component){
        component.set("v.cssStyle", ".forceStyle .viewport .oneHeader.slds-global-header_container {z-index:5} .forceStyle.desktop .viewport{overflow:auto} .slds-global-header_container{z-index: 0;}");        
    },
})