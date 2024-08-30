document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
        
        var formData = new FormData(form);
        var formDataentri = Object.fromEntries(formData);
        var formDatajson = JSON.stringify(formDataentri);

            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: formDatajson,
                    mode: 'cors'
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Sucesso:', result);
                    alert('Login efetuado com sucesso!');
                }

            } catch (error) {
                alert('Usuário ou senha não encontrados', error);
            }
        });
    }
});
