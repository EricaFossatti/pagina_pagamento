# Página de Pagamento - PIX e Cartão de Crédito
Atividade 3 do curso técnico de Análise e Desenvolvimento de Sistemas. Página web que simula o checkout de um site de compras, permitindo pagamento via **PIX** ou **Cartão de Crédito**, desenvolvida em **HTML, CSS e JavaScript puro** (sem frameworks).

## Funcionalidades implementadas
- Validação do campo **Valor** ao clicar em "Informar dados" (não pode estar em branco).
- Exibição do painel correspondente à forma de pagamento selecionada (PIX ou Cartão), nunca os dois ao mesmo tempo.
- **PIX**: aplica 10% de desconto sobre o valor informado e exibe o total.
- **Cartão de Crédito**:
  - Identificação da bandeira do cartão conforme os 4 primeiros dígitos digitados no número (`1234...` ou `4321...`), exibindo o ícone correspondente.
  - Mensagem de erro "Número de cartão inválido" quando o número não corresponde a nenhuma bandeira reconhecida.
  - Cálculo automático das opções de parcelamento (1x a 5x):
    - 1 a 3 parcelas: sem juros.
    - 4 parcelas: 5% de juros sobre o valor informado.
    - 5 parcelas: 10% de juros sobre o valor informado.
  - Atualização do total ao trocar a quantidade de parcelas selecionada.
- Botão **Pagar** exibe uma mensagem de sucesso.

## Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript

## Observações
Os ícones de bandeira do cartão são gerados via SVG embutido no próprio JavaScript (Data URI), sem depender de arquivos de imagem externos.

## Autor
Desenvolvido como atividade prática do curso técnico de ADS.
