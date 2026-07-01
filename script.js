// Referências aos elementos da página
const inputValor = document.getElementById('valor');
const erroValor = document.getElementById('erro-valor');

const opcaoPix = document.getElementById('opcao-pix');
const opcaoCartao = document.getElementById('opcao-cartao');

const btnInformarDados = document.getElementById('btn-informar-dados');

const painelPix = document.getElementById('painel-pix');
const painelCartao = document.getElementById('painel-cartao');

const totalPixSpan = document.getElementById('total-pix');
const totalCartaoSpan = document.getElementById('total-cartao');

const inputNumeroCartao = document.getElementById('numero-cartao');
const erroNumero = document.getElementById('erro-numero');
const bandeiraIcone = document.getElementById('bandeira-cartao');

const selectParcelas = document.getElementById('parcelas');

const mensagemSucesso = document.getElementById('mensagem-sucesso');

const btnPagarPix = document.getElementById('btn-pagar-pix');
const btnPagarCartao = document.getElementById('btn-pagar-cartao');

// Ícones das bandeiras (SVGs simples, gerados em memória - sem precisar de arquivos externos)
const iconeBandeira1234 =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="24" height="24" rx="4" fill="%23e53935"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="white" font-family="Arial">1234</text></svg>'
  );

const iconeBandeira4321 =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="24" height="24" rx="4" fill="%231565c0"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="white" font-family="Arial">4321</text></svg>'
  );

// Guarda o valor "base" (sem formatação) usado nos cálculos
let valorInformado = 0;

// Função: converte o texto digitado em número
// Aceita formatos como "100", "100,50", "1.000,50"
function converterParaNumero(texto) {
  if (!texto) return NaN;
  const limpo = texto
    .replace(/\./g, '')   // remove separador de milhar
    .replace(',', '.');   // troca vírgula decimal por ponto
  return parseFloat(limpo);
}

// Função: formata número para "R$ 0,00"
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

// Esconde os dois painéis (garante que nunca fiquem visíveis ao mesmo tempo) e a mensagem de sucesso
function esconderPaineis() {
  painelPix.classList.add('escondido');
  painelCartao.classList.add('escondido');
  mensagemSucesso.classList.add('escondido');
}

// Clique em "Informar dados"
btnInformarDados.addEventListener('click', () => {
  const texto = inputValor.value.trim();

  // Validação do campo Valor
  if (texto === '') {
    erroValor.classList.remove('escondido');
    esconderPaineis();
    return;
  }

  const numero = converterParaNumero(texto);
  if (isNaN(numero) || numero <= 0) {
    erroValor.textContent = 'Informe um valor válido.';
    erroValor.classList.remove('escondido');
    esconderPaineis();
    return;
  }

  erroValor.classList.add('escondido');
  valorInformado = numero;

  // Mostra apenas o painel da opção marcada
  esconderPaineis();

  if (opcaoPix.checked) {
    mostrarPainelPix();
  } else {
    mostrarPainelCartao();
  }
});

// PIX: aplica 10% de desconto
function mostrarPainelPix() {
  painelPix.classList.remove('escondido');
  const totalComDesconto = valorInformado * 0.9;
  totalPixSpan.textContent = formatarMoeda(totalComDesconto);
}

// Cartão de crédito: calcula parcelas e exibe o painel
function mostrarPainelCartao() {
  painelCartao.classList.remove('escondido');

  // Limpa campos do cartão a cada nova consulta
  inputNumeroCartao.value = '';
  bandeiraIcone.classList.add('escondido');
  erroNumero.classList.add('escondido');

  calcularParcelas();
  atualizarTotalCartao();
}

//   1 a 3 parcelas --> sem juros
//   4 parcelas     --> 5% de juros sobre o valor informado
//   5 parcelas     --> 10% de juros sobre o valor informado

function calcularParcelas() {
  const valoresParcelas = {
    1: valorInformado / 1,
    2: valorInformado / 2,
    3: valorInformado / 3,
    4: (valorInformado * 1.05) / 4,
    5: (valorInformado * 1.10) / 5
  };

  for (let n = 1; n <= 5; n++) {
    const span = document.getElementById(`valor-parcela-${n}`);
    span.textContent = formatarMoeda(valoresParcelas[n]);
  }
}

// Atualiza o "Total" do painel do cartão conforme a quantidade de parcelas selecionada
function atualizarTotalCartao() {
  const parcelas = parseInt(selectParcelas.value, 10);
  let total = valorInformado;

  if (parcelas === 4) {
    total = valorInformado * 1.05;
  } else if (parcelas === 5) {
    total = valorInformado * 1.10;
  }

  totalCartaoSpan.textContent = formatarMoeda(total);
}

selectParcelas.addEventListener('change', atualizarTotalCartao);

// Identifica a bandeira do cartão conforme os 4 primeiros dígitos digitados
inputNumeroCartao.addEventListener('input', () => {
  const numero = inputNumeroCartao.value.replace(/\s/g, '');

  if (numero.startsWith('1234')) {
    bandeiraIcone.src = iconeBandeira1234;
    bandeiraIcone.classList.remove('escondido');
    erroNumero.classList.add('escondido');
  } else if (numero.startsWith('4321')) {
    bandeiraIcone.src = iconeBandeira4321;
    bandeiraIcone.classList.remove('escondido');
    erroNumero.classList.add('escondido');
  } else if (numero.length > 0) {
    bandeiraIcone.classList.add('escondido');
    erroNumero.classList.remove('escondido');
  } else {
    // campo vazio: não mostra ícone nem erro
    bandeiraIcone.classList.add('escondido');
    erroNumero.classList.add('escondido');
  }
});

// Clique em "Pagar" (PIX ou Cartão) -> mensagem de sucesso
function pagar() {
  mensagemSucesso.classList.remove('escondido');
}

btnPagarPix.addEventListener('click', pagar);
btnPagarCartao.addEventListener('click', pagar);

// Ao trocar entre PIX e Cartão de Crédito antes de clicar em "Informar dados", escondemos os painéis e a mensagem de erro/sucesso para não confundir o usuário
opcaoPix.addEventListener('change', esconderPaineis);
opcaoCartao.addEventListener('change', esconderPaineis);