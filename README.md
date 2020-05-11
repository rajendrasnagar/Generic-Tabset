This is an Aura based Component to generic tabset dynamically using declarations stored in Custom Metadata types. 

# ED Diagram

## Object Schema:

* Objects are not concrete & are abstract. We can use any object  & fieldsets to display information in tabs . 

## Configuration Schema:

1. Below is the configuration schema that is used to generate the tab & tab sections dynamically. In Aura Components, Sections are generated dynamically. However, in LWC sections needs to be generated on load itself.

![Screenshot](https://user-images.githubusercontent.com/3901703/81552678-88a8c100-93a1-11ea-91ed-f4429f77bb99.png)

## Custom Metadata Types:

Create below custom metadata types to store Tab Panel information's:

1. 'Tab Panel Wizard' -> Use this component as the Tab Container identifier. It identify tabs characteristics like 'Default', 'Icon Name', 'Tab Order' and 'Tab Panel Template Identifier'.
2. 'TabPanel Component' -> Use this component to store details about the sections that will be hosted in the tab Container. It contains 'Tab Panel Container' reference, Object, Fieldset, screen type, icon, order etc information's.

## Features:

1. Create tab panel & sections declaratively using custom metadata types. 
2. Tab Sections are generated on the basis of object & field-sets provided. 
3. Sections are generated on the basis of recId parameter passed in the URL. 

## Installation Link: 

Aura Version: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t0o000003fd0bAAA

## Setup (Example):

1. Use the installation link provided to install the package. 
2. Assign user ‘Generic Tabset’ permission set.
3. Example of custom metadata type used for the demo:
    1. ![Screenshot](https://user-images.githubusercontent.com/3901703/81553612-08835b00-93a3-11ea-8f8d-d6efb312750f.png)
4. Sample Schema used for the demo:
    1. ![image](https://user-images.githubusercontent.com/3901703/81554269-1b4a5f80-93a4-11ea-9030-b8c82f527dd9.png)
5. After installation, go to setup tab & click on ‘Generate Data’.
6. Click on “Show Demo” & it will navigate to the tab displaying demo setup data as below.

![image](https://user-images.githubusercontent.com/3901703/81554322-34531080-93a4-11ea-87c6-40c01033ac89.png)

Cheers,
Rajendra Singh Nagar
