# ED Diagram

## Object Schema:

* Objects are not concrete & are abstract. We can use any object  & fieldsets to display information in tabs . 

## Configuration Schema:

1. Below is the configuration schema that is used to generate the tab & tab sections dynamically. In Aura Components, Sections are generated dynamically. However, in LWC sections needs to be generated on load itself.


[Image: image.png]
Custom Metadata Types:

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
    1. [Image: image.png]
4. Sample Schema used for the demo:
    1. [Image: image.png]
5. After installation, go to setup tab & click on ‘Generate Data’.
6. Click on “Show Demo” & it will navigate to the tab displaying demo setup data as below.

[Image: image.png]
