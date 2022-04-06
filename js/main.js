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
    const{id, title, price, addedDate, benefits} = prod;
    const producting = document.createElement("li");
    producting.className = "col-4";

    const productingId = getElement("p", "card-id", id);

    const productingImg = document.createElement("img");
    productingImg.src = prod.img;

    const productingTitle = getElement("h3", "card-title", `${title}`);
    

    const productingPrice  = getElement("p", "card-text", `${price}`);
    const productingIcon = getElement("s", "", `${price}`);
    const productingDate = getElement("p", "", `${addedDate}`);
    const productingBenefits = getElement("p", "", `${benefits}`)
    
    
    const productingOld = document.createElement("p"); 
    productingOld.className = "card-text";
    productingOld.textContent = prod.price;

    const productingModel = document.createElement("p");
    productingModel.textContent = prod.model;
    productingModel.className = "bg-success";
    const ProductMarker = document.createElement("div");
    ProductMarker.className = "product-icon"
    const productEdit = document.createElement("button");
    productEdit.className = "btn-secondary";
    const productDel = document.createElement("button"); 
    productDel.className = "btn-danger";
    //productDel.setAttribute("id", `product-${id}`);
    productDel.setAttribute("data-product", id)
    const ProductIcon = document.createElement("i");
    ProductIcon.className = "fa-pen";
    ProductIcon.style.pointerEvents = "none";
    const ProductBank = document.createElement("i");
    ProductBank.className = "fa-trash";
    
    //productEdit.append(ProductIcon);
    //productDel.append(ProductBank)
    //ProductMarker.append(productEdit);
    //ProductMarker.append(productDel);
    
    /* productDel.addEventListener("click", function() {
        console.log(`button biosildi ${}`);
    } ) */
    appendChilderen(prodTel,[productingId, productingImg, productingTitle, productingPrice, productingIcon, productingDate, productingBenefits, productingOld, productingModel,ProductMarker,productEdit,productDel,ProductIcon, ProductBank]);
    
    return producting; 
    
}

const renderProducts = function() {
    prodTel.innerHTML = ""; 
        products.forEach(function(productings) {
            const producting = renderProduct(productings);
            prodTel.append(producting);
        })
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




const input = document.querySelector("#benefits");

const WrapperUl = document.querySelector(".mt-3");
const WrapperLi = document.querySelector(".mb-1")

const benefits = [];

addEventListener("input", function() {
    const splittedValue = input.value.trim().split(";");

    if (splittedValue.length===2) {
        benefits.push(splittedValue[2]);
        input.value = "";

        for (let i = 0; i < benefits.length; i++) {
            const benefit = this.document.createElement("button");
            benefit.textContent = benefits[i];
            console.log(benefit);
            benefit.append(benefits)  
        }
    }
})



prodTel.addEventListener("click", function(evt) {
    if (evt.target.matches(".btn-danger")) {
        const clickedItemId = +evt.target.dataset.product;
        const clickedItemIndex = products.findIndex(function(productings) {
            return productings.id === clickedItemId
        })
        products.splice(clickedItemIndex, 1);

        renderProducts()
    }
})
renderProducts()

/* products.forEach(function(productings) {
    const producting = renderProduct(productings);
    prodTel.append(producting);
}) */