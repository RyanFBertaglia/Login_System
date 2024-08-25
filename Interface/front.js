document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                // Enviar os dados para o servidor via fetch
                const response = await fetch('http://localhost:3000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // Enviar os dados no corpo da requisição
                });

                // Tratar a resposta do servidor
                if (response.ok) {
                    const result = await response.json();
                    console.log('Sucesso:', result); // Exibir a resposta no console
                    alert('Usuário cadastrado com sucesso!'); // Alerta para o usuário
                } else {
                    console.error('Erro:', response.statusText);
                    alert('Ocorreu um erro ao cadastrar o usuário.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao conectar com o servidor.');
            }
        });
    } else {
        console.error('Formulário não encontrado');
    }
});
