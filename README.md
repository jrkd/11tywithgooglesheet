# Edits from the original fork 
This has been modified so you can have any number of sheets, and access each sheet via the template eg `sheet.sheetName.sheetValue`

## Mostly updated sheets.js so we can feed in an unlimited number of sheets
- these sheets can be col 1 = key, col 2 = value, in which case you can access each value via `sheet.sheetName.key`
- or as a list of objects based on row 0 header names for property names eg. `sheet.sheetName[0].col1HeaderName`

NB:
- This doesnt work without row 0 having header names 
- Also you should make sure to have no spaces or special characters in sheetnames to be valid JSON.
