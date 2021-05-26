const seed   = require('../../../utils/save-seed.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');

// Once a googel sheet is "published to the web" we can access its JSON
// via a URL of this form. We just need to pass in the ID of the sheet
// which we can find in the URL of the document.
const sheetID = "15BINVTpoaIZsUgiLUgQRwWFH73pWCd2HNJWO0B0GtMI";
const API_KEY = "AIzaSyAwhZxE7CORL6J-UMH226f9fWa1i-zvJzQ";

process.on("unhandledRejection", (error) => {
  console.error("unhandledd", error); // This prints error with stack included (as for normal errors)
  throw error; // Following best practices re-throw error and let the process exit with error code
});

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let ourJSON = {};
    const doc = new GoogleSpreadsheet(sheetID);
    
    doc.useApiKey(API_KEY);
    await doc.loadInfo();
    for (let index = 0; index < doc.sheetCount; index++) {
      const sheet = doc.sheetsByIndex[index];
      await sheet.loadCells();
      const rows = await sheet.getRows();
      
      if(sheet.headerValues[0] == "key"){ //we have key/value list.
        ourJSON[sheet.title] = {};
        rows.forEach((row, _index)=>{
          ourJSON[sheet.title][row.key] = row.value;
        });
      } 
      else //We have a list of objects dont we now?
      { 
        ourJSON[sheet.title] = rows.map((row)=>{
          if(sheet.headerValues.length == 1)
          {
            return row[sheet.headerValues[0]];
          }
          else
          {
            let rowObj = {};
            sheet.headerValues.forEach((headerValue, _index)=>{
              rowObj[headerValue] = row[headerValue];
            })
            return rowObj;
          }
        }); 
      }
    }

    // stash the data locally for developing without
    // needing to hit the API each time.
    console.log(ourJSON);
    seed(JSON.stringify(ourJSON), `${__dirname}/../dev/sheet.json`);
  })
}
