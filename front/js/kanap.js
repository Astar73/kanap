//Récupération de l'API
fetch ("http://localhost:3000/api/products")
    .then (function(apiReponse) {
        //Si réponse de l'API ok
        if (apiReponse.ok) {
            console.log(apiReponse);
            return apiReponse.json();
        }
        //Sinon afficher Mauvaise réponse
        else {
            console.log("Mauvaise réponse de l'hôte");
        }
    })

    //Création des articles du DOM
    .then (function(articles) {
        // Pour chaque article des articles
        for (let article of articles) {                        

            // Création de la balise "a"
            let productLinkA = document.createElement("a");
            // items à pour enfant productLinkA
            document.getElementById("items").appendChild(productLinkA);
            // Référence du lien productLinkA sur l'API
            productLinkA.href = `product.html?id=${article._id}`;

            // Création de la balise "article"
            let productArticle = document.createElement("article");
            // productLinkA à pour enfant productArticle
            productLinkA.appendChild(productArticle);

            // Création de la balise Img
            let productImg = document.createElement("img");
            // productArticle à pour enfant productImg
            productArticle.appendChild(productImg);
            // Référence du lien productImg sur l'API
            productImg.src = article.imageUrl;
            // Référence du lien productImg sur l'API
            productImg.alt = article.altTxt;

            // Création de la balise "h3"
            let productName = document.createElement("h3");
            // productArticle à pour enfant productName
            productArticle.appendChild(productName);
            // Ajout d'une class productName à la balise "h3"
            productName.classList.add("productName");
            // Référence du lien productName sur l'API
            productName.innerHTML = article.name;

            // Création de la balise "p"
            let productDescription = document.createElement("p");
            // productArticle à pour enfant productDescription
            productArticle.appendChild(productDescription);
            // Ajout d'une classe productDescription à la balise "p"
            productDescription.classList.add("productDescription");
            // Référence du lien productLink sur l'API
            productDescription.innerHTML = article.description;
        }
    })
    //Afficher un message en cas d'erreur
    .catch (function(error){
        console.log("Problème lors du fetch:"+ error.message);
    }); 
//Fin de fetch




    

    