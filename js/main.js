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

const renderProduct = function (prod) {
    const producting = document.createElement("li");
    producting.className = "col-4";

    const productingId = getElement("p", "card-id");

    const productingImg = document.createElement("img");
    productingImg.src = prod.img;

    const productingTitle = getElement("h3", "card-title", prod.title);
    

    const productingPrice  = getElement("p", "card-text", prod.price);
    const productingIcon = getElement("s", "", prod.price);
    const productingDate = getElement("p", "", prod.addedDate);
    const productingBenefits = getElement("p", "", prod.benefits)
    
    
    const productingOld = document.createElement("p"); 
    productingOld.className = "card-text";
    productingOld.textContent = prod.price;

    const productingModel = document.createElement("p");
    productingModel.textContent = prod.model;
    productingModel.className = "bg-success";

    appendChilderen(prodTel,[productingId, productingImg, productingTitle, productingPrice, productingIcon, productingDate, productingBenefits, productingOld, productingModel]);

    return producting; 
}

const prodTel = document.querySelector("#telephones");


for (let i = 0; i < products.length; i++) {
    const currentProduct = products[i];
    const producting = renderProduct(currentProduct);

    prodTel.append(producting)
}


const addForm = document.querySelector("#add-form");
const addProductModalEl = new bootstrap.Modal(document.querySelector("#edit-student-modal"));

addForm.addEventListener("submit", function(evt){
    evt.preventDefault();


    const elements = evt.target.elements;

    const titleInput = elements.title;
    const numberInput = elements.price;
    const productSelect = elements.manufacturer;
    const benefitsInput = elements.benefits;

    const titleInputValue = titleInput.value;
    const numberInputValue = numberInput.value;
    const productSelectValue = productSelect.value;
    const benefitsInputValue = benefitsInput.value;

    if (titleInputValue.trim() && numberInputValue.trim() && productSelectValue.trim() && benefitsInputValue.trim()) {
        const product = {
            id: Math.floor(Math.random() * 1000),
            title: titleInputValue,
            price: numberInputValue,
            benefits: benefitsInputValue,
            addedDate:  new Date().toISOString(),
        }


        products.push(product);

        addForm.reset();
        addProductModalEl.hide();

        const producting = renderProduct(product); 
        prodTel.append(producting);
    }  
});
