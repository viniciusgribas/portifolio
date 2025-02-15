document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('exportButton').addEventListener('click', function() {
        const resumeElement = document.getElementById('resume');
        
        // Add the pdf-export class
        resumeElement.classList.add('pdf-export');
        
        const opt = {
            margin: 0.1,
            filename: 'Vinicius_Gribas_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        
        html2pdf().from(resumeElement).set(opt).save().then(() => {
            // Remove the pdf-export class after export
            resumeElement.classList.remove('pdf-export');
        });
    });
});
