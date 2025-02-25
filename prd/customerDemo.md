## Sign In and Sign Up Features
The following document will outline the requirements for the demo version of the Customer View.

The Page will be broken out into the following 3 sections, described later in the document:
1. The left hand side will have the artowkr and action buttons below.
The right hand section will be broken into 2 sections stacked in a column.
2. The top section will be the "Customer Config" Section. 
3. Below that will be the "Customer Purchase Options"

## Artwork display and Actions
Requirements
1. The top section will be a Simple P5.js sketch. The sketch can be generic but must include strokeColor, backgroundColor, and circleSize variables that get exposed to the customer in the "Customer Config" section described below. The sketch should use HSL color values
2. The Sketch should be roughly half the width of the screen.
3. Below the sketch should be a series of action buttons including an action to rerun the sketch and and option to save the image as a PNG.


## Customer Config
Requirements
1. This section should contain a few variables that are exposed to the customer. This should include strokeColor, backgroundColor, and circleSize. 
2. The customer should be able to configure the color fields to any HSL color value
3. The custoemr should be able to configure the circle size to any number between 1 and 100

## Customer Purchase Options
1. The final section should contain purchase options. I am allowing customers to choose from all the products made available by the https://www.printful.com/api. Create a UI that allows users to configure the product and product settings that they want
2. This section should also include a purchase button that will take users to a checkout page. For now, this checkout page can be stubbed out.