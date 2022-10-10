const urlParams = new URLSearchParams(window.location.search);

const kanapId = urlParams.get('id');


//Récupération de l'API
let api = fetch(`http://localhost:3000/api/products/${kanapId}`)
    .then(function(reponseApi){
        if (reponseApi.ok) {
            console.log(reponseApi);
            return reponseApi.json();
        }
    })
    //Récupération des infos des canapés de l'API
    .then(function(kanapData){
        console.log(kanapData);
        let productImg = document.createElement("img");
        productImg.src = kanapData.imageUrl;
        productImg.alt = kanapData.altTxt;        
        document.getElementsByClassName("item__img")[0].appendChild(productImg);    
        for (color of kanapData.colors ) {
            let option = document.createElement("option");
            option.text = color;
            option.value = color;
            document.getElementById("colors").appendChild(option);
        }
        let productTitle = document.getElementById("title");
        productTitle.innerHTML = kanapData.name;
        let productPrice = document.getElementById("price");
        productPrice.innerHTML = kanapData.price;
        let productDescription = document.getElementById("description");
        productDescription.innerHTML = kanapData.description;
    })  

    .catch(function(error){
        console.log(error);
    });


