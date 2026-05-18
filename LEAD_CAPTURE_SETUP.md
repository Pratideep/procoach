# Lead Capture Setup (Google Sheets) — 5 minutes, one time

Every form submission is now saved to a Google Sheet **before** WhatsApp opens, so
leads are no longer lost when someone fills the form but doesn't hit "send".

Until you complete the steps below the form still works — it just doesn't save
yet (`submitLead` is a safe no-op until the endpoint is set).

## Steps

1. Create a new Google Sheet. Add this header row in row 1
   (one column per cell):

   ```
   ts | name | phone | email | age | gender | height | currentWeight | targetWeight | goal | experience | daysPerWeek | notes | source | page
   ```

2. In the Sheet: **Extensions → Apps Script**. Delete any code and paste
   this (it writes the columns in a fixed order, so future field changes
   only need a tweak here — no re-deploy of the site):

   ```javascript
   var FIELDS = ['ts','name','phone','email','age','gender','height',
     'currentWeight','targetWeight','goal','experience','daysPerWeek',
     'notes','source','page'];

   function doPost(e) {
     try {
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
       var d = JSON.parse(e.postData.contents);
       d.ts = d.ts || new Date().toISOString();
       sheet.appendRow(FIELDS.map(function (k) { return d[k] || ''; }));
       return ContentService.createTextOutput('ok');
     } catch (err) {
       return ContentService.createTextOutput('error: ' + err);
     }
   }
   ```

3. **Deploy → New deployment** → gear icon → **Web app**.
   - Description: `lead capture`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, authorise when prompted, and **copy the Web app URL**
     (looks like `https://script.google.com/macros/s/AKfy.../exec`).

4. Paste that URL into `src/utils/leads.js`:

   ```js
   export const LEADS_ENDPOINT = 'https://script.google.com/macros/s/AKfy.../exec'
   ```

5. Rebuild / redeploy the site. Submit a test enquiry — a new row should
   appear in the sheet within a second or two.

## Notes

- The browser sends the request `no-cors` (Apps Script can't return CORS
  headers), so the site can't read the response — that's expected. The row
  still gets written. Confirm by checking the sheet, not the network tab.
- To turn lead capture off again, set `LEADS_ENDPOINT = ''`.
- `source` tells you which path the lead came from: `registration_form`
  (filled the full application) or `direct_whatsapp` (tapped "message the
  coach" — no details, just intent).
- Optional: add an `onEdit`/notification or a Google Form-style email trigger
  in Apps Script if you want an email per lead.
