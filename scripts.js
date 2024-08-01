/* Cotação de moedas do dia. */
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")

const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

/* Manipulando o input amount para receber somente números */
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

/* capturando o evento de envio do formulário */
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break;
  
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break;
  
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break;
  }
}


/**
 * 
 * @param {String} amount
 * @param {Number} price 
 * @param {String} symbol 
 */
function convertCurrency(amount, price, symbol) {
  try {
    /* Atualizando a cotação da moeda selecionada */
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price, "currency")}`

    let total = Number(amount) * price;
    result.textContent = `${formatCurrencyBRL(total)} Reais`

    /* Aplica a classe que exibe o footer para mostrar o resultado */
    footer.classList.add("show-result")
  } catch (error) {
    /* Remove a classe do footer removendo ele da tela */
    footer.classList.remove("show-result")
    
    console.log(error)
    alert("Não foi possível converter. Tente novamente mais tarde.")
  }
}

function formatCurrencyBRL(value, style) {
  if(style === "currency") {
    return Number(value).toLocaleString("pt-BR", {
      style,
      currency: "BRL",
    })
  }
  else {
    return Number(value).toLocaleString("pt-BR", {
      minimumFractionDigits: 2
    })
  }

}
