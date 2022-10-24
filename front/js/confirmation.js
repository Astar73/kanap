// Récupère le numéro de commande
let urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("id");
document.getElementById("orderId").innerHTML += `${orderId}`;
