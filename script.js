let equipes = [];
let editandoIndex = null; 

const form = document.getElementById('equipe-form');
const btnSalvar = document.getElementById('btn-salvar');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dadosEquipe = {
        nome: document.getElementById('nome').value,
        pais: document.getElementById('pais').value,
        chefe: document.getElementById('chefe').value,
        motor: document.getElementById('motor').value,
        status: document.getElementById('status').value,
        titulos: document.getElementById('titulos').value
    };

    if (editandoIndex !== null) {
        equipes[editandoIndex] = dadosEquipe;
        editandoIndex = null; 
        btnSalvar.textContent = "Adicionar à Lista";
        btnSalvar.style.background = ""; 
    } else {
        equipes.push(dadosEquipe);
    }

    renderizarTabela();
    form.reset();
});

function prepararEdicao(index) {
    const eq = equipes[index];

    document.getElementById('nome').value = eq.nome;
    document.getElementById('pais').value = eq.pais;
    document.getElementById('chefe').value = eq.chefe;
    document.getElementById('motor').value = eq.motor;
    document.getElementById('status').value = eq.status;
    document.getElementById('titulos').value = eq.titulos;

    editandoIndex = index;
    btnSalvar.textContent = "Salvar Alterações";
    btnSalvar.style.background = "#ff9800"; 
}

function renderizarTabela() {
    const tbody = document.getElementById('equipes-list');
    tbody.innerHTML = '';
    
    equipes.forEach((eq, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${eq.nome}</td>
                <td>${eq.pais}</td>
                <td>${eq.chefe}</td>
                <td>${eq.motor}</td>
                <td>${eq.status}</td>
                <td>${eq.titulos}</td>
                <td>
                    <button type="button" onclick="prepararEdicao(${index})">Editar</button>
                    <button type="button" onclick="equipes.splice(${index}, 1); renderizarTabela();">Apagar</button>
                </td>
            </tr>`;
    });
}

// EXPORTAR CSV
function exportarCSV() {
    if (equipes.length === 0) return alert("Lista vazia!");
    let csv = "Nome;Pais;Chefe;Motor;Status;Titulos\n";
    equipes.forEach(eq => {
        csv += `${eq.nome};${eq.pais};${eq.chefe};${eq.motor};${eq.status};${eq.titulos}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipes.csv';
    a.click();
}