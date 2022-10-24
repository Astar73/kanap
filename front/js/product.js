// Récupère la valeur de "id" dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log(productId);
let article = "";



// Récupération d'un produit de l'API en fonction de son ID 
function getProduct() {
    fetch(`http://localhost:3000/api/products/${productId}`)

    // Réponse de l'API
    .then(function(responseApi) {
        console.log(responseApi);
        return responseApi.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article) {
            displayProduct(article);
        }
    })

    // Message en cas d'erreur
    .catch(function(error) {
        console.log(error);
    });
}
// Lance la fonction "getProduct"
getProduct()



// Création des éléments du DOM
function displayProduct(article) {
    // Créer une balise Img
    let productImg = document.createElement("img");
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;
    // Association de l'enfant à un parent
    document.getElementsByClassName("item__img")[0].appendChild (productImg);

    //Récupération de l'id "title"
    let productTitle = document.getElementById("title");
    productTitle.innerHTML = article.name;

    //Récupération de l'id "price"
    let productPrice = document.getElementById("price");
    productPrice.innerHTML = article.price;

    //Récupération de l'id "description"
    let productDescription = document.getElementById("description");
    productDescription.innerHTML = article.description;

    //Ajout des options de couleurs
    for (colors of article.colors) {
        //Créer une balise option
        let productColors = document.createElement("option");
        productColors.innerHTML = colors;
        productColors.value = colors;
        //Association de l'enfant à un parent
        document.getElementById("colors").appendChild(productColors);
    }
    //Lance la fonction addToCart
    addToCart(article);
}

const selectedQuantity = document.getElementById("quantity");
const selectedColors = document.getElementById("colors");



// Ajouter au panier
function addToCart(article) {
    const addToCartBtn = document.getElementById("addToCart");
    addToCartBtn.addEventListener("click", function(event) {
        // Si la quantité choisie n'est pas 0, et est comprise entre 1 et 100
        if (selectedQuantity.value != 0 && selectedQuantity.value > 0 && selectedQuantity.value <=100) {  
            // Récupération des caractéristiques du produit choisie
            let productContent = {
                productId: productId,
                productName: article.name,
                productColor: selectedColors.value,
                productQuantity: selectedQuantity.value *1,
                productPrice: article.price,
                productDescription: article.description,
                productImg: article.imageUrl,
                productImgAlt: article.altTxt
            };
            // Définis le Local Storage cart
            let cart = JSON.parse(localStorage.getItem("cart"));
            if(cart) {
                let foundProduct = cart.find((p) => p.productId === productId || p.productColor === article.colors);
                // Si le produit est déjà dans le localStorage
                if(foundProduct) {
                    let cartQuantity = parseInt(productContent.productQuantity) + parseInt(foundProduct.productQuantity);
                    foundProduct.productQuantity = cartQuantity;
                    saveCart(cart);
                    console.table(cart);
                    confirmMsg();            
                } 
                // Si le produit n'est pas dans le localStorage
                else {
                    cart.push(productContent);
                    saveCart(cart);
                    console.table(cart);
                    confirmMsg();
                }        
            }
            // Si le localStorage est vide
            else {
                cart =[];
                cart.push(productContent);
                saveCart(cart);
                console.table(cart);
                confirmMsg();
            }
        }
    });
}


// Enregistrer le panier
function saveCart(cart) {
    // Sérialise l'objet en chaîne de caractères
    localStorage.setItem("cart", JSON.stringify(cart));
}



// Message de confirmation d'ajout au panier
function confirmMsg() {
    if(window.confirm(`L'article ${article.name} de couleur ${selectedColors.value} à bien été ajoutée au panier
Cliquez sur "OK" pour voir votre panier`)) {
        window.location.href ="cart.html";
    }
}