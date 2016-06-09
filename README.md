# bgen
Background generator plugin for Pinegrow

This is a plugin developed for  Pinegrow Web Editor - 2.9 to generate background images for websites.  The plugin adds a canvas tag with attributes for bgen to produce the image.
There are a bunch of parameters available in the PROP tab you can use to change the image one you have dragged BGen Component onto the page from the LIB tab.

This is my first attempt at a Pinegrow plugin, I used the Kelvin Pine plugin to get this going, beware there will be bugs.

Instructions.
I think you can put the unzipped file any where on your system, in Pinegrow open the folder as a project File->Open Project and click on the folder that contains the Them and Pinegrow folders
To start I open the Theme/blank.html file in the PRJ tab, then open the LIB tab and click on the cog looking icon to the right of the search field at the top of the LIB tab, this will open the Libraries & Plugins Manager.
At teh bottom of the manager click on the "Load plugin" link then the folder icon and choose the Pinegrow/bgen.js file.
BGen should appear in the Plugins list, click on + Activate.

If all went well you should see Components/BGen in the LIB tab, drag this on to your page. There will now be a stack of Options available in your PROP tab, if not click on the component you dragged on the page.

Any parameter with a integer number will expect an integer, any parameter with a float value will expect a float between 0 and one. BEWARE none of these values are validated yet so you can blow the thing up.
The Randon seed will change the arrangement of shapes, colours, sizes and fades. Some of the Blends wont work without the correct background colour. 


