const fs = require('fs');
let pdf = require('pdf-parse');

console.log('PDF Module Type:', typeof pdf);
console.log('PDF Module Keys:', Object.keys(pdf));

if (typeof pdf !== 'function' && pdf.PDFParse) {
    pdf = pdf.PDFParse;
} else if (typeof pdf !== 'function' && pdf.default) {
    pdf = pdf.default;
}

const filePath = 'T:/myWorks/My Doc/Thusitha Sampath Perera CV.pdf';

const dataBuffer = fs.readFileSync(filePath);

pdf(dataBuffer).then(function(data) {
    console.log('---START---');
    console.log(data.text);
    console.log('---END---');
}).catch(err => {
    console.error('PDF Parse Error:', err);
    process.exit(1);
});
