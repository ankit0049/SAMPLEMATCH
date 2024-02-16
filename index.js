// index.js

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn');
    const btn2 = document.getElementById('btn2');
    const content = document.querySelector('.content');

    btn.addEventListener('click', async () => {
        const name = document.getElementById('yourName').value;
        const partner = document.getElementById('partnerName').value;

        try {
            const response = await fetch('http://localhost:3000/About', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, partner: partner })
            });

            const data = await response.json();
            console.log(data);

            content.innerHTML = `<p>Your name: ${data.name}</p><p>Partner's name: ${data.partner}</p>`;
        } catch (error) {
            console.error('Error:', error);
        }
    });btn2.addEventListener('click', async ()=>{
        try {
            const response = await fetch('http://localhost:3000/About');
            const data = await response.json();
            console.log(data);
    
            let htmlContent = '';
            data.forEach((item, index) => {
                // Check if the index is even or odd to apply the appropriate class
                const className = index % 2 === 0 ? 'partner-item' : 'partner-item odd';
                htmlContent += `<div class="${className}">
                                    <p>Your name: ${item.name}</p>
                                    <p>Partner's name: ${item.partner}</p>
                                </div>`;
            });
    
            content.innerHTML = htmlContent;
        } catch (error) {
            console.error('Error:', error);
        }
    });
    

});
    