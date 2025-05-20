
const API_URL = 'https://crudcrud.com/api/cec8c44db97f43d9bc0311d3b8992397/clientes'; 

const form = document.getElementById('clienteForm');
const lista = document.getElementById('listaClientes');


window.addEventListener('DOMContentLoaded', listarClientes);


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email })
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao cadastrar');
      form.reset();
      listarClientes();
    })
    .catch(() => alert('Erro de conexão ou token inválido'));
});


function listarClientes() {
  lista.innerHTML = '';
  fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error('Erro ao buscar');
      return res.json();
    })
    .then(clientes => {
      clientes.forEach(c => {
        const div = document.createElement('div');
        div.className = 'cliente';
        div.innerHTML = `
          <span>${c.nome} - ${c.email}</span>
          <button onclick="excluirCliente('${c._id}')">Excluir</button>
        `;
        lista.appendChild(div);
      });
    })
    .catch(() => {
      lista.innerHTML = '<p style="color:red;">Erro ao carregar clientes.</p>';
    });
}


function excluirCliente(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao excluir');
      listarClientes();
    })
    .catch(() => alert('Erro ao excluir cliente'));
}
