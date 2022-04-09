const getElement = function(elName, className, textContent) {
    const createdElemment = document.createElement(elName);
    createdElemment.className = className;

    if (textContent) {
        createdElemment.textContent = textContent;
    }

    return createdElemment
}

//const  manufacturerChoose 

const appendChilderen = function(parentElement, childeren) {
    for(let i = 0; i < childeren.length; i++) {
        parentElement.append(childeren[i])
    }
}

const renderProduct = function (prod) {
    const{id, title,model, price, addedDate,benefits } = prod;
    const producting = getElement("li", "col-4");
    const card = getElement("div", "card");


    const productingImg = document.createElement("img");
    productingImg.src = prod.img;

    const CardBody = getElement("div", "card-body");

    const productingTitle = getElement("h3", "card-title", `${title}`);
    

    const productingPrice  = getElement("p", "card-text  fw-bold");
    const productPriceMark = getElement("mark", "", price)
    productingPrice.append(productPriceMark)

    const productingOldPrice  = getElement("p", "card-text");
    const productPriceS = getElement("s", "", price)
    productingOldPrice.append(productPriceS)


    const productingModels = getElement("p","badge bg-success",`${model}`)
    const productingDate = getElement("p", "", `${addedDate}`);
    //const productingBenefits = getElement("p", "", `${benefits}`)

    const productsUl = getElement("ul", "d-flex flex-wrap list-unstyled");
    const productLi = getElement("li", "badge bg-primary me-1 mb-1", `${benefits}`);
    
    
    const ProductMarker = getElement("div", "position-absolute top-0 end-0 d-flex");
    const productEditBtn = getElement("button", "btn rounded-0 btn-secondary");
    productEditBtn.setAttribute("data-bs-toggle", "modal")
    productEditBtn.setAttribute("data-bs-target", "#add-student-modal")
    productEditBtn.setAttribute("dataset", id);
    const ProductIcon = getElement("i","fa-solid fa-pen");
    ProductIcon.style.pointerEvents = "none"
    const ProductBank = getElement("i", "fa-solid fa-trash");


    ProductBank.style.pointerEvents = "none";
    const productDel = getElement("button", "btn rounded-0 btn-danger"); 
    productDel.setAttribute("data-product", id);
    productsUl.append(productLi)
    productEditBtn.append(ProductIcon);
    productDel.append(ProductBank);
    ProductMarker.append(productEditBtn);
    ProductMarker.append(productDel);    

    
    appendChilderen(CardBody,[productingTitle, productingPrice, productingOldPrice, productingModels, productingDate,productLi, ProductMarker]);
    card.append(productingImg);
    card.append(CardBody);
    producting.append(card);
    CardBody.append(productsUl)
    
    return producting; 
    
}


const renderProducts = function(productsArray = products) {
    prodTel.innerHTML = "";
    productsArray.forEach(function(productings) {
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
const addProductModalEl = new bootstrap.Modal(document.querySelector("#add-student-modal"));

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

    if (titleInputValue.trim() && numberInputValue.trim() && productSelectValue.trim() && benefitsInputValue.trim() ) {
        const product = {
            id: Math.floor(Math.random() * 1000),
            img: "https://picsum.photos/300/200",
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


editForm = document.querySelector("#edit-form");
const editProductModalEl = new bootstrap.Modal(document.querySelector("#edit-student-modal"));

editForm.addEventListener("submit" , function(evt) {
    evt.preventDefault();


}) 


const input = document.querySelector("#benefits");

const WrapperUl = document.querySelector(".mt-3");
const WrapperLi = document.querySelector(".mb-1")

const benefits = [];

addEventListener("input", function() {
    const splittedValue = input.value.trim().split(";");

    if (splittedValue.length === 2) {
        benefits.push(splittedValue[2]);
        input.value = "";

        for (let i = 0; i > benefits.length; i++) {
            const benefit = this.document.createElement("button");
            benefit.textContent = benefits[i];
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
    }else if (evt.target.matches(".btn-secondary")) {
        const clickedId = +evt.target.dataset.product;
        
        const clickedItem = products.find(function(productings) {
            return productings.id === clickedId
        })
        console.log(clickedItem);
    }
})
    renderProducts() 


    const filterForm = document.querySelector(".filter");

    filterForm.addEventListener("submit", function(evt) {
        evt.preventDefault();

        const element = evt.target.elements;

        const fromValue = element.from.value;
        const toValue = element.to.value;
        const filterProduct = products.filter(function(product) {
            return product.price >= fromValue
        })
        renderProducts(filterProduct)

        const filterProducts = products.filter(function(product) {
            return product.price <= toValue
        
        }) 
        
        renderProducts(filterProducts)
        
    console.log(filterProducts);
    })
