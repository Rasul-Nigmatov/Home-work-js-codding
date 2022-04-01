const getElement = function(elName, className, textContent) {
    const createdElemment = document.createElement(elName);
    createdElemment.className = className;

    if (textContent) {
        createdElemment.textContent = textContent;
    }

    return createdElemment
}


const appendChilderen = function(parentElement, childeren) {
    for(let i = 0; i < childeren.length; i++) {
        parentElement.append(childeren[i])
    }
}

const prodTel = document.querySelector("#telephones");




for (let i = 0; i < products.length; i++) {
    const currentProduct = products[i];

    const product = document.createElement("li");
    product.className = "col-4";

    const productId = getElement("p", "card-id");

    const productImg = document.createElement("img");
    productImg.src = currentProduct.img;

    const productTitle = getElement("h3", "card-title", currentProduct.title);
    

    const productPrice  = getElement("p", "card-text", currentProduct.price);
    
    
    const productOld = document.createElement("p"); 
    productOld.className = "card-text";
    productOld.textContent = currentProduct.price;

    const productModel = document.createElement("p");
    productModel.textContent = currentProduct.model;
    productModel.className = "bg-success";

    appendChilderen(prodTel,[productId, productImg, productTitle, productPrice, productOld, productModel]);
    prodTel.append(product)
}

