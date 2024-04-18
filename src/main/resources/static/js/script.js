var createFuncio = document.getElementById("criarFuncionarioId");
var createDepend = document.getElementById("criarDependenteId");
var exibirFuncio = document.getElementById("exibirFuncionarioId");

var selectIds = document.getElementById("iExibirFuncionario");

function createF(){
    createFuncio.style.display = "block";
    createDepend.style.display = "none";
    exibirFuncio.style.display = "none";
}

function createD(){
    createFuncio.style.display = "none";
    createDepend.style.display = "block";
    exibirFuncio.style.display = "none";
}

function exibirF(){
    createFuncio.style.display = "none";
    createDepend.style.display = "none";
    exibirFuncio.style.display = "block";
}

function getNome(){
    var nome = document.getElementById("nome");
    if(nome){
        var value = nome.value;
        return value;
    }
    return "None";
}

function getRg(){
    var rg = document.getElementById("rg");
    if(rg){
        var value = rg.value;
        return value;
    }
    return "None";
}

function getCpf(){
    var cpf = document.getElementById("cpfFuncionario");
    if(cpf){
        var value = cpf.value;
        return value;
    }
    return "None";
}

function getCargo(){
    var cargo = document.getElementById("cargo");
    if(cargo){
        var value = cargo.value;
        return value;
    }
    return "AUXILIAR";
}

function getFuncao(){
    var funcao = document.getElementById("funcao");
    if(funcao){
        var value = funcao.value;
        return value;
    }
    return "None";
}

function getPeriodo(){
    var radioButtons = document.querySelectorAll('input[type="radio"][name="typePeriodo"]');

    for (var i = 0; i < radioButtons.length; i++) {
        var radioButton = radioButtons[i];
        if (radioButton.checked) {
            var selectedRadioValue = radioButton.value;
            return selectedRadioValue;
            break;
        }
    }
    return "MATUTINO";
}

function getSexo(){
    var radioButtons = document.querySelectorAll('input[type="radio"][name="typeSexo"]');

    for (var i = 0; i < radioButtons.length; i++) {
        var radioButton = radioButtons[i];
        if (radioButton.checked) {
            var selectedRadioValue = radioButton.value;
            return selectedRadioValue;
            break;
        }
    }
    return "MASCULINO";
}

function getDateF(){
    var dataAniversario = document.getElementById("dataAniversarioF");
    if(dataAniversario){
        var value = dataAniversario.value;
        return value;
    }
    return "None";
}

function getAssegurado(){
    var categoriaAss = document.getElementById("categoriaAss");
    if(categoriaAss){
        var value = categoriaAss.value;
        return value;
    }
    return "EMPREGADO_CONTRATADO";
}

//endereço

function getRua(){
    var rua = document.getElementById("rua");
    if(rua){
        var value = rua.value;
        return value;
    }
    return "None";
}

function getNumero(){
    var numero = document.getElementById("numero");
    if(numero){
        var value = numero.value;
        return value;
    }
    return "None";
}

function getBairro(){
    var bairro = document.getElementById("bairro");
    if(bairro){
        var value = bairro.value;
        return value;
    }
    return "None";
}

function getCidade(){
    var cidade = document.getElementById("cidade");
    if(cidade){
        var value = cidade.value;
        return value;
    }
    return "None";
}

function getCep(){
    var cep = document.getElementById("cep");
    if(cep){
        var value = cep.value;
        return value;
    }
    return "None";
}

function limparInputs(){
    var radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(function(input) {
        input.checked = false;
    });
    document.getElementById("nome").value = "";
    document.getElementById("rg").value = "";
    document.getElementById("cpfFuncionario").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("funcao").value = "";
    document.getElementById("dataAniversarioF").value = "";
    document.getElementById("categoriaAss").value = "";
    document.getElementById("rua").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("cep").value = "";
}

function criarJson(){
        var json = {
        "nome": getNome(),
        "rg": getRg(),
        "cpf": getCpf(),
        "typeCargo": getCargo(),
        "funcao": getFuncao(),
        "typePeriodo": getPeriodo(),
        "typeSexo": getSexo(),
        "dataAniversario": getDateF(),
        "endereco": {
            "rua": getRua(),
            "numero": getNumero(),
            "bairro": getBairro(),
            "cidade": getCidade(),
            "cep": getCep()
        },
        "typeCategoriaSegurados": getAssegurado(),
    }

    return json;
}

function criarFuncionario(){

    var url = "http://localhost:8080/api/v1/created"

    var json = criarJson();

    console.log(json);

    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(json)
    })
    .then(response => {
        if (response.status == 201) {
            return response.json();
        }else{
            throw new Error('Erro ao acessar a API: ' + response.status);
        }
    })
    .then(data => {
        limparInputs();
        alert("Funcionario Criado!");
        console.log(data);

        var option = document.createElement("option");
        option.value = data['id'];
        option.textContent = '' + data['nome'] + " - CPF: " + data['cpf'];

        selectIds.appendChild(option);

    })
    .catch(error => {
        console.error('Erro de requisição:', error);
        alert("Não foi possivel criar o funcionario, Revise os dados inseridos e tente novamente!");
    });
}

function encontrarFuncionario(){

    var response = document.getElementById("exibir");

    if(selectIds){
        var value = selectIds.value;
    }

    var id = value;
    var url = "http://localhost:8080/api/v1/" + id;

    fetch(url)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }else{
                throw new Error('Erro ao acessar a API: ' + response.status);
            }
        })
        .then(data => {
            console.log("Entrou");

            var htmlString = `
            <p>Nome: ${data.nome}</p>
            <p>RG: ${data.rg}</p>
            <p>CPF: ${data.cpf}</p>
            <p>Cargo: ${data.typeCargo}</p>
            <p>Função: ${data.funcao}</p>
            <p>Período: ${data.typePeriodo}</p>
            <p>Sexo: ${data.typeSexo}</p>
            <p>Data de Aniversário: ${data.dataAniversario}</p>
            <p>Endereço:</p>
            <ul>
                <li>Rua: ${data.endereco.rua}</li>
                <li>Número: ${data.endereco.numero}</li>
                <li>Bairro: ${data.endereco.bairro}</li>
                <li>Cidade: ${data.endereco.cidade}</li>
                <li>CEP: ${data.endereco.cep}</li>
            </ul>
            <p>Categoria de Segurados: ${data.typeCategoriaSegurados}</p>
            `;

            console.log("Criou a String certo");

            response.innerHTML = htmlString;

            console.log("Deu bom");
    
        })
        .catch(error => {
            console.error('Erro de requisição:', error);
            alert("Não foi possivel exibir o funcionario, tente novamente!");
        });
}