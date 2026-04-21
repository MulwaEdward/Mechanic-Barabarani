Mechanic Barabarani – Garages anywhere

A simple JavaScript web app to help Kenyan drivers find nearby mechanics by town or county.

Problem
- No centralized way to search mechanics by town or county.  
- No map view or “nearest” filter.  
- No way to see which garages are available or have good ratings.

Solution
- Users can search by town or garage name.  
- “Use My Location” button (demo) shows results for a sample location.  
- “Emergency” button shows **only nearby and available** mechanics.  
- Simple **ratings (1–5)** help users choose the best garages.  
- Call and WhatsApp buttons for quick contact.

Technologies
- HTML5 – page layout  
- CSS + Tailwind CSS (via CDN) – responsive design  
- JavaScript (beginner level) – DOM, search, filter, events  
- JSON – store mechanic data  
- npm – manage Tailwind + Jest  
- Jest – simple tests for `filterMechanics` and `isValidPhone`

How to Run
1. Open `index.html` in your browser.  
2. Type a town (e.g., Nairobi, Mombasa, Kisumu) in the search bar.  
3. Click “Use My Location” or “Emergency” buttons to see filters.

Tests (Jest)
- `tests/helpers.test.js` tests:
  - `filterMechanics` with different search terms  
  - `isValidPhone` for Kenyan numbers  
You can run tests with:
```bash
npm test
```

Deployment
- You can host this on GitHub Pages or Netlify (upload the folder and use `index.html` as home).
