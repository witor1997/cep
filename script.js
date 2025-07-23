

// salvar os dados no localStorage
function salvarDados() {
    const campos = ['cep', 'logradouro', 'bairro', 'cidade', 'estado', 'numero'];
    campos.forEach(campo => {
        localStorage.setItem(campo, document.getElementById(campo).value);
    });
}

//  restaurar os dados do localStorage
function restaurarDados() {
    const campos = ['cep', 'logradouro', 'bairro', 'cidade', 'estado', 'numero'];
    campos.forEach(campo => {
        const valor = localStorage.getItem(campo);
        if (valor) {
            document.getElementById(campo).value = valor;
        }
    });
}

// Salva os dados sempre que o usuário digitar algo
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', salvarDados);
});

// Restaura os dados ao carregar a página
window.addEventListener('DOMContentLoaded', restaurarDados);




//evento do usuario

document.getElementById('cep').addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepinformado = elemento.value;

    if (!(cepinformado.length === 8 && /^\d+$/.test(cepinformado))) {
        return;
    }
    fetch(`https://viacep.com.br/ws/${cepinformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            } else {
                alert('CEP não encontrado. Verifique o número e tente novamente.');
            }
        })
        .catch(error => console.error('Erro ao buscar CEP:', error));
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
});


