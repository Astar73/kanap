function saveCart(cart) {
    // Sérialise l'objet en chaîne de caractères
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Récupérer le panier du localStorage
function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.table(cart);
    // Si il n'y as pas de produit dans le localStorage, alors le panier est vide
    if (cart == null) {
        const positionEmptyCart = document.querySelector("#cart__items");
        const emptyCart = `Vous n'avez aucun article dans votre panier`;
        positionEmptyCart.innerHTML = emptyCart;
    }
    // Sinon, créer un panier
    else {
        for (let product in cart) {
    
            // Création de la balise "article cart__item"
            let productArticle = document.createElement("article");
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', cart[product].productId);
            productArticle.setAttribute('data-color', cart[product].productColor);
            //Association de l'enfant à un parent
            document.querySelector("#cart__items").appendChild(productArticle);
        
            // Création de la balise "div cart__item__img"
            let productDivImg = document.createElement("div");
            productDivImg.className = "cart__item__img";
            //Association de l'enfant à un parent
            productArticle.appendChild(productDivImg);
        
            // Création de la balise "img"
            let productImg = document.createElement("img");
            productImg.src = cart[product].productImg;
            productImg.alt = cart[product].productImgAlt;
            //Association de l'enfant à un parent
            productDivImg.appendChild(productImg);
            
            // Création de la balise "div cart__item__content"
            let productItemContent = document.createElement("div");
            productItemContent.className = "cart__item__content";
            //Association de l'enfant à un parent
            productArticle.appendChild(productItemContent);
        
            // Création de la balise "div cart__item__content__titlePrice"
            let productItemContentTitlePrice = document.createElement("div");
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";
            //Association de l'enfant à un parent
            productItemContent.appendChild(productItemContentTitlePrice);
            
            // Création de la balise h2
            let productTitle = document.createElement("h2");
            productTitle.innerHTML = cart[product].productName;
            //Association de l'enfant à un parent
            productItemContentTitlePrice.appendChild(productTitle);
        
            // Création de la balise "p couleur"
            let productColor = document.createElement("p");
            productColor.innerHTML = cart[product].productColor;
            //Association de l'enfant à un parent
            productTitle.appendChild(productColor);
        
            // Création de la balise "p prix"
            let productPrice = document.createElement("p");
            productPrice.innerHTML = cart[product].productPrice + "€";
            //Association de l'enfant à un parent
            productItemContentTitlePrice.appendChild(productPrice);
        
            // Création de la balise "div cart__item__content__settings"
            let productItemContentSettings = document.createElement("div");
            productItemContentSettings.className = "cart__item__content__settings";
            //Association de l'enfant à un parent
            productItemContent.appendChild(productItemContentSettings);
        
            // Création de la balise "div cart__item__content__settings__quantity"
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            //Association de l'enfant à un parent
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            
            // Création de la balise "p Qté :"
            let productQte = document.createElement("p");
            productQte.innerHTML = "Qté : ";
            //Association de l'enfant à un parent
            productItemContentSettingsQuantity.appendChild(productQte);
        
            // Création de la balise "input itemQuantity"
            let productQuantity = document.createElement("input");
            productQuantity.setAttribute("type", "number");
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("name", "itemQuantity");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.value = cart[product].productQuantity;
            //Association de l'enfant à un parent
            productItemContentSettingsQuantity.appendChild(productQuantity);
        
            // Création de la balise "div cart__item__content__settings__delete"
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
            //Association de l'enfant à un parent
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
        
            // Création de la balise "p deleteItem"
            let productDeleteItem = document.createElement("p");
            productDeleteItem.className = "deleteItem";
            productDeleteItem.innerHTML = "Supprimer";
            // Association de l'enfant à un parent
            productItemContentSettingsDelete.appendChild(productDeleteItem);
        }
    }
}
// Lance la fonction getCart
getCart();



// Calcul de la quantités total de produit du panier
function cartTotalProductQuantity() {    
    // Récupère le panier
    let cart = JSON.parse(localStorage.getItem("cart"));
    // Récupération de la quantité total
    let productQuantity = 0;
    // Pour chaque produit dans le panier
    for (let product in cart) {
        // Additionne la quantité
        productQuantity += cart[product].productQuantity;
    }
    // Affichage de la quantité total
    let cartTotalProductQuantity = document.getElementById("totalQuantity");
    cartTotalProductQuantity.innerHTML = productQuantity;
    console.log(productQuantity);
}
// Lance la fonction cartTotalProductQuantity
cartTotalProductQuantity();



// Calcul du prix total du panier
function cartTotalPrice() {
    // Récupère le panier
    let cart = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = 0;
    // Pour chaque produit dans le panier
    for (let product in cart) {
        // Multiplie la quantité par le prix
        totalPrice += (cart[product].productPrice * cart[product].productQuantity);
    }
    // Affichage du prix total
    let cartTotalPrice = document.getElementById('totalPrice');
    cartTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
// Lance la fonction cartTotalPrice
cartTotalPrice();



// Modifier la quantité d'un produit du panier
function modifyProductQuantity() {
    // Récupère le panier
    let cart = JSON.parse(localStorage.getItem("cart"));
        // Selectionne les classes itemQuantity
    let modifyProductQuantity = document.querySelectorAll(".itemQuantity");
    for (let q = 0; q < modifyProductQuantity.length; q++) {
        // Ajoute un eventListener au click des boutons
        modifyProductQuantity[q].addEventListener("change", function(event) {         
            // Modifie la quantité
            cart[q].productQuantity = event.target.value *1;
            // Enregistre dans le localstorage
            saveCart(cart);
            // Recharge la page
            location.reload();            
        });
    }
}
modifyProductQuantity();



// Supprimer un produit du panier
function removeProductFromCart() {
    // Récupère le panier
    let cart = JSON.parse(localStorage.getItem("cart"));
    // Selectionne les classes deleteItem de chaque boutons supprimer
    let productDeleteItemBtn = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < productDeleteItemBtn.length; i++) {
        // Ajoute un eventListener au click des boutons
        productDeleteItemBtn[i].addEventListener("click", function(event) {            
            // Selection du produit devant être supprimer
            let productId = cart[i].productId;
            let productColor = cart[i].productColor;
            // Tri les éléments en fonction de leurs id et de leurs couleurs
            cart = cart.filter(element => element.productId !== productId && element.productColor !== productColor );
            // Enregistre dans le localstorage
            saveCart(cart);
            // Message informatif pour l'utilisateur
            alert("Ce produit a bien été supprimé du panier");
            // Recharge la page
            location.reload();
        });
    }
}
// Lance la fonction removeProductFromCart
removeProductFromCart();



// Validation du formulaire
function form() {
    // Selectionne l'emplacement du formulaire
    let form = document.querySelector(".cart__order__form");
    
    // Ajoute un eventListener sur la modification du prénom
    form.firstName.addEventListener('change', (event) => {
        validFirstName(event.target.value);
    });
    // Ajoute un eventListener sur la modification du nom
    form.lastName.addEventListener('change', (event) => {
        validLastName(event.target.value);
    });
    // Ajoute un eventListener sur la modification de l'adresse
    form.address.addEventListener('change', (event) => {
        validAddress(event.target.value);
    });
    // Ajoute un eventListener sur la modification de la ville
    form.city.addEventListener('change', (event) => {
        validCity(event.target.value);
    });
    // Ajoute un eventListener sur la modification de l'adresse mail
    form.email.addEventListener('change', (event) => {
        validEmail(event.target.value);
    });

    // Ajout des règles d'expressions régulières
    let standardRegExp = new RegExp("^[a-zA-Z '-]+$");
    let addressRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç0-9 '-]+");
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

    // Vérification de la validité du prénom
    const validFirstName = function(firstName) {
        // Selectionne l'emplacement de firstNameErrorMsg
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        // Si le prénom entrée est conforme à la regexp
        if (standardRegExp.test(firstName)) {
            firstNameErrorMsg.innerHTML = '';
        } 
        // Sinon, afficher le message d'erreur
        else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner un prénom valide';
        }
    };
    // Vérification de la validité du nom
    const validLastName = function(lastName) {
        // Selectionne l'emplacement de lastNameErrorMsg
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        // Si le nom entrée est conforme à la regexp
        if (standardRegExp.test(lastName)) {
            lastNameErrorMsg.innerHTML = '';
        } 
        // Sinon, afficher le message d'erreur
        else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner un nom valide';
        }
    };
    // Vérification de la validité de l'adresse postale
        const validAddress = function(address) {
        // Selectionne l'emplacement de addressErrorMsg
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        // Si l'adresse postale entrée est conforme à la regexp
        if (addressRegExp.test(address)) {
            addressErrorMsg.innerHTML = '';
        } 
        // Sinon, afficher le message d'erreur
        else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner une adresse postal valide';
        }
    };
    // Vérification de la validité de la ville
    const validCity = function(city) {
        // Selectionne l'emplacement de cityErrorMsg
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        // Si la ville entrée est conforme à la regexp
        if (standardRegExp.test(city)) {
            cityErrorMsg.innerHTML = '';
        } 
        // Sinon, afficher le message d'erreur
        else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner un nom de ville valide';
        }
    };
    // Vérification de la validité de l'adresse email
    const validEmail = function(email) {
        // Selectionne l'emplacement de emailErrorMsg
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        // Si l'adresse email entrée est conforme à la regexp
        if (emailRegExp.test(email)) {
            emailErrorMsg.innerHTML = '';
        } 
        // Sinon, afficher le message d'erreur
        else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner une adresse email valide';
        }
    };
}
// Lance la fonction form
form();



// Envoyer le formulaire
function sendForm() {
    // Récupère le panier
    let cart = JSON.parse(localStorage.getItem("cart"));
    let getProductId = cart.map(product => product.productId);
    // Selectionne le bouton Commander et ajotu d'un eventListener
    document.querySelector(".cart__order__form__submit").addEventListener("click", function(event) {
        event.preventDefault();
        // Si les informations du formulaire sont valide
        let validContactInfo = true;
        for(let input of document.querySelectorAll(".cart__order__form__question input")) {
            validContactInfo &= input.reportValidity();
            if (validContactInfo == 0) {
                break;
            } 
        }        
        // Si les informations du formulaire sont valide, alors envoyer les données à l'api
        if (validContactInfo) {
            // Envoi les infos vers l'api
            const order = fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    contact: {
                        // Selectionne les différents inputs
                        firstName: document.getElementById("firstName").value,
                        lastName: document.getElementById("lastName").value,
                        address: document.getElementById("address").value,
                        city: document.getElementById("city").value,
                        email: document.getElementById("email").value
                    },
                    products : getProductId
                })
            });            
            order.then(async (answer) => {
                try {
                    const data = await answer.json();
                    // Ajoute le numéro de commande à l'url
                    window.location.href = `confirmation.html?id=${data.orderId}`;
                    // Vide le localStorage
                    localStorage.clear();
                } 
                catch (event) {
                }
            });
        }
    })
}
sendForm();