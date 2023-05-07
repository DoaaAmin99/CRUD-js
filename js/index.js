var productNameInput = document.getElementById('productName'); // input kolo
var productPriceInput = document.getElementById('productPrice'); // input kolo
var productCategoryInput = document.getElementById('productCategory'); // input kol
var productDescInput = document.getElementById('productDesc'); // input kolo
// var searchInput = document.getElementById('searchInput');// input kolo
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var uIndex =0;
var productNameAlert = document.getElementById('productNameAlert'); 



var productsContainer = [];
// لما يفتح يلاقي الدتا القديمة اذا كانت قديمة
if(localStorage.getItem('products') != null)  //Zboon adim
{
    productsContainer = JSON.parse(localStorage.getItem('products')) ;
    displayProducts(productsContainer);
}
function addproduct(){
    if(validateProductName()){
        var product = {
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescInput.value,
        }
        productsContainer.push(product);
        // console.log(productsContainer);
        localStorage.setItem("products",JSON.stringify(productsContainer)); //حطيت الاراي كله في اللوكال
        displayProducts(productsContainer);
        clearForm();
    }
    
}

function clearForm(){
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value="";
}
function displayProducts(arr){
    var cartoona = ``;
    for(var i =0 ;i<arr.length;i++){
        cartoona += `<tr>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].desc}</td>
        <td><button onclick="setFormForUpdate(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}

function deleteProduct(index){
    productsContainer.splice(index,1);
    localStorage.setItem("products",JSON.stringify(productsContainer));
    //كنا عارضين القديم  لازم بعد ما امسح اخليه يعرضلي الاراي مرة تانية عشان يمسح
    displayProducts(productsContainer);

}

function searchProducts(term){
    var matchedProducts = [];
    for(var i=0;i<productsContainer.length;i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) === true){
            matchedProducts.push(productsContainer[i]);
        }
    }
    displayProducts(matchedProducts);
}
// searchProducts(searchInput.value);

function setFormForUpdate(index){
    uIndex=index;
    addBtn.classList.replace('d-block','d-none');
    updateBtn.classList.replace('d-none','d-block');
    productNameInput.value = productsContainer[index].name;
    productPriceInput.value = productsContainer[index].price;
    productCategoryInput.value = productsContainer[index].category;
    productDescInput.value = productsContainer[index].desc;
}
function updateProduct(){
    console.log("Updated");
        var product = {
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescInput.value,
        }
        productsContainer.splice(uIndex,1,product);
        localStorage.setItem("products",JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();
        updateBtn.classList.replace('d-block','d-none');
        addBtn.classList.replace('d-none','d-d-block');
}

function validateProductName(){
    var regex = /^[A-Z][a-z]{3,8}$/;
    if(regex.test(productNameInput.value) == true){
        productNameAlert.classList.replace('d-block','d-none');
        return true;
    } 
    else{
        productNameAlert.classList.replace('d-none','d-block');
        return false;
    };
}


