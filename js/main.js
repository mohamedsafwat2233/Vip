let title = document.querySelector(".title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let smal = document.getElementById("smal");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let create = document.querySelector(".create");
let deleteAllBtn = document.querySelector(".deleteAllBtn");
let searchTitle = document.getElementById("searchTitle");
let search = document.getElementById("search");

let modal = "create";
let indforI;

// total
function getTotal() {
  if (price.value != "") {
    
    let Total =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);

    smal.innerHTML = Total;
    smal.style.background = "rgb(67, 67, 135)";
    
  } else {
    smal.innerHTML = "";
    smal.style.background = "rgb(114, 163, 114)";
  }
}


let arrayProduct = [];

if (localStorage.keyProduct != null) {
  arrayProduct = JSON.parse(localStorage.keyProduct);
} else {
  arrayProduct = [];
}

create.onclick = function () {
  // storing information
  if (title.value != "" && category.value !="" &&count.value<=100) {
    let prodcut = {
      title: title.value.toLowerCase() ,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      smal: smal.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    }
    // count

      if (modal === "create") {
            if (prodcut.count > 0) {
              for (let i = 0; i <prodcut.count; i++) {
                arrayProduct.push(prodcut);
                localStorage.setItem(
                  "keyProduct",
                  JSON.stringify(arrayProduct)
                );
              }
            } else {
              arrayProduct.push(prodcut);
              localStorage.setItem("keyProduct", JSON.stringify(arrayProduct));
            }
      } else {
        // update
        arrayProduct[indforI] = prodcut;
        localStorage.setItem("keyProduct", JSON.stringify(arrayProduct));

        modal = "create";
        create.innerHTML = "create";
        create.style.background = "rgb(128, 128, 228)";
        count.style.display = "block";


        //    console.log(title.value)
      }

      
  clearPro();


  }

  showPro();

  // console.log(arrayProduct)
};

// clear inputs

function clearPro() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  smal.innerHTML = "";
  count.value = "";
  category.value = "";
}

// show product

function showPro(){
  let table = "";
  for (let i = 0; i < arrayProduct.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${arrayProduct[i].title}</td>
            <td>${arrayProduct[i].price}</td>
            <td>${arrayProduct[i].taxes}</td>
            <td>${arrayProduct[i].ads}</td>
            <td>${arrayProduct[i].discount}</td>
            <td>${arrayProduct[i].smal}</td>
            <td>${arrayProduct[i].count}</td>
            <td>${arrayProduct[i].category}</td>

            <td><button onclick='update(${i})' class="upd text-center">update</button></td>
            <td><button onclick="delet(${i})" class="del">delete</button></td>

          </tr> 
        
        `;
  }

  document.getElementById("bodyTable").innerHTML = table;

  delAll();
  getTotal();
}
showPro();

function delet(i) {
  console.log(i);

  arrayProduct.splice(i, 1);

  localStorage.setItem("keyProduct", JSON.stringify(arrayProduct));

  showPro();
}

function delAll() {
  if (arrayProduct.length != 0) {
    deleteAllBtn.classList.remove("hideBtn");
    document.getElementById("btnCount").innerHTML = arrayProduct.length;
  } else {
    deleteAllBtn.classList.add("hideBtn");
  }
}

deleteAllBtn.onclick = function () {
  arrayProduct.length = 0;
  localStorage.setItem("keyProduct", JSON.stringify(arrayProduct));
  showPro();
};

function update(i) {
  console.log(i)

  title.value = arrayProduct[i].title;
  price.value = arrayProduct[i].price;
  taxes.value = arrayProduct[i].taxes;
  ads.value = arrayProduct[i].ads;
  discount.value = arrayProduct[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = arrayProduct[i].category;
  modal = "update";
  create.innerHTML = modal;
  create.innerHTML = "update";

  create.style.background = "#ffc107";
  indforI = i;
  showPro();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search 

// button search
let searchMood ='title';
function moodSearch(id) {
  console.log(id);

  if (id == "searchTitle") {

    searchMood ='title';
    search.placeholder = "search by title";
  }else {
    searchMood ='category';

    search.placeholder = "search by category";

  }

  search.focus();
  showPro();

}

// input search

function searchInput(value){
  let table = "";


  for(let i=0; i<arrayProduct.length;i++){


    if(searchMood == 'title'){

      if(arrayProduct[i].title.includes(value.toLowerCase())){
          // console.log('K')

          table += `
          <tr>
              <td>${i + 1}</td>
              <td>${arrayProduct[i].title}</td>
              <td>${arrayProduct[i].price}</td>
              <td>${arrayProduct[i].taxes}</td>
              <td>${arrayProduct[i].ads}</td>
              <td>${arrayProduct[i].discount}</td>
              <td>${arrayProduct[i].smal}</td>
              <td>${arrayProduct[i].count}</td>
              <td>${arrayProduct[i].category}</td>
  
              <td><button onclick='update(${i})' class="upd text-center">update</button></td>
              <td><button onclick="delet(${i})" class="del">delete</button></td>
  
            </tr> 
          
          `;
          



      }

    }

    else{

      if(arrayProduct[i].category.includes(value.toLowerCase())){

        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${arrayProduct[i].title}</td>
            <td>${arrayProduct[i].price}</td>
            <td>${arrayProduct[i].taxes}</td>
            <td>${arrayProduct[i].ads}</td>
            <td>${arrayProduct[i].discount}</td>
            <td>${arrayProduct[i].smal}</td>
            <td>${arrayProduct[i].count}</td>
            <td>${arrayProduct[i].category}</td>

            <td><button onclick='update(${i})' class="upd text-center">update</button></td>
            <td><button onclick="delet(${i})" class="del">delete</button></td>

          </tr> 
        
        `;
        



       }

    }

  }
  document.getElementById("bodyTable").innerHTML = table;

}



const firebaseConfig = {
  apiKey: "AIzaSyBAKJRmugBHvN-XLqghvmGWRXMGQL2G5qY",
  authDomain: "test-firbase-d662a.firebaseapp.com",
  projectId: "test-firbase-d662a",
  storageBucket: "test-firbase-d662a.appspot.com",
  messagingSenderId: "884887117300",
  appId: "1:884887117300:web:e649b446be3cf16c6feda1",
  measurementId: "G-YQ5W5MT35Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);/* Firebase config */
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storageRef = firebaseApp.storage().ref();









