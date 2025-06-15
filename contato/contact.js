document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Cria um objeto FormData com os dados do formulário
    const formData = new FormData(form);

    // Envia a requisição para o backend utilizando Fetch API
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        form.reset();
        formMessage.textContent = 'Obrigado! Sua mensagem foi enviada com sucesso.';
        formMessage.style.color = 'green';
      } else {
        response.json().then(data => {
          if (data.errors) {
            formMessage.textContent = data.errors.map(error => error.message).join(', ');
          } else {
            formMessage.textContent = 'Oops! Houve um problema. Tente novamente.';
          }
          formMessage.style.color = 'var(--color-error)';
        });
      }
    }).catch(error => {
      formMessage.textContent = 'Erro ao enviar. Verifique sua conexão com a internet.';
      formMessage.style.color = 'var(--color-error)';
    });
  });
});