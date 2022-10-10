
//Récupère la valeur de "id" dans l'URL
const urlParams = new URLSearchParams (window.location.search);
const kanapId = urlParams.get ('id');

//Récupération de l'API en fonction de l'ID produit
let api = fetch (`http://localhost:3000/api/products/${kanapId}`)

    //Traite la réponse de l'API
    .then (function (reponseApi) {
        if (reponseApi.ok) {
            console.log (reponseApi);
            return reponseApi.json();
        }
    })

    //Récupération des infos des canapés de l'API
    .then (function (kanapData) {
        console.log (kanapData);
        //Créer une balise Img
        let productImg = document.createElement ("img");
        //Récupération de la source de l'image
        productImg.src = kanapData.imageUrl;
        //Récupération du texte alternatif de l'image
        productImg.alt = kanapData.altTxt;
        //Association de l'enfant à un parent
        document.getElementsByClassName ("item__img")[0].appendChild (productImg);
        //Pour chaque couleur parmis les couleurs
        for (color of kanapData.colors) {
            //Créer une balise option
            let option = document.createElement ("option");
            //Ajout de la couleur comme texte
            option.text = color;
            //Ajout de la couleur comme valeur à option
            option.value = color;
            //Association de l'enfant à un parent
            document.getElementById ("colors").appendChild (option);
        }
        //Récupération de l'id "title"
        let productTitle = document.getElementById ("title");
        //Insert le texte correspondant à "name" depuis l'API
        productTitle.innerHTML = kanapData.name;
        //Récupération de l'id "price"
        let productPrice = document.getElementById ("price");
        //Insert le texte correspondant à "price" depuis l'API
        productPrice.innerHTML = kanapData.price;
        //Récupération de l'id "description"
        let productDescription = document.getElementById ("description");
        //Insert le texte correspondant à "description" depuis l'API
        productDescription.innerHTML = kanapData.description;
    })
    
    //Message en cas d'erreur
    .catch (function (error) {
        console.log (error);
    })
;
//Fin de la fonction fetch


