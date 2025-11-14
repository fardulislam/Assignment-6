const Categories = document.getElementById("Categoriescontainer");
const Alltrees = document.getElementById("clicktrees");
const treecarddata = document.getElementById("treecard");
const centerdata = document.getElementById("mycard");
let total = 0;
const pricetotal = document.getElementById("totalprice");
const modal = document.getElementById('my_modal_5');



const catagories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories);
      Categoriescontainer.innerHTML = "";
      const categoriesdata = data.categories.forEach((element) => {
        Categoriescontainer.innerHTML += `
       <li id='${element.id}' class="hover:bg-[#15803d] rounded-sm hover:text-white">${element.category_name}</li>
       `;
      });
      Categoriescontainer.addEventListener("click", (e) => {
        const allli = document.querySelectorAll("li");
        allli.forEach((li) => {
          li.classList.remove("bg-[#15803d]");
        });
        if (e.target.localName === "li") {
          // console.log(e.target.id)
          e.target.classList.add("bg-[#15803d]");
          loadtreescategories(e.target.id);
        }
      });
    });
};

const loadtreescategories = (categoriesid) => {
  showloading();
  console.log(categoriesid);
  fetch(`https://openapi.programming-hero.com/api/category/${categoriesid}`)
    .then((res) => res.json())
    .then((data) => {
      showalltrees(data.plants);
    });
};

const showalltrees = (plants) => {
  mycard.innerHTML = "";
  plants.forEach((plants) => {
    mycard.innerHTML += `
           <div class="overflow-hidden object-fit rounded-lg p-2 bg-white">
              <img class="w-full object-cover   rounded-lg h-40" src=${plants.image} alt="">
              <div id="${plants.id}" class=" space-y-1 ">
                <h1 class="font-semibold">${plants.name}</h1>
                <p class="text-xs">${plants.description}</p>
                <div class=" flex justify-between items-center ">
                <p class="bg-green-100 text-[#15803d]  rounded-full px-4 text-sm py-1  ">${plants.category}</p>
                <p class="font-semibold">$ ${plants.price}</p>
              </div>

              </div>
              
              <div class=" mt-2">
                <button class=" w-full bg-green-800 text-white rounded-full py-2">Add to Card</button>
              </div>
            </div>
          `;
  });
};

const showalltreedata = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.plants)
      treesdata(data.plants);
    });
};
const treesdata = (plants) => {
  mycard.innerHTML = "";
  plants.forEach((plants) => {
    mycard.innerHTML += `
            <div  class="overflow-hidden rounded-lg p-2 bg-white">
              <img class="w-full object-cover   rounded-lg h-40" src=${plants.image} alt="">
              <div id=${plants.id}  class=" space-y-1 ">
                <h1 class="font-semibold">${plants.name}</h1>
                <p class="text-xs">${plants.description}</p>
                <div class=" flex justify-between items-center ">
                <p class="bg-green-100 text-[#15803d]  rounded-full px-4 text-sm py-1  ">${plants.category}</p>
                <p class="font-semibold">$ ${plants.price}</p>
              </div>

              </div>
              
              <div class=" mt-2">
                <button class=" w-full bg-green-800 text-white rounded-full py-2">Add to Card</button>
              </div>
            </div>
           
           `;
  });
};

mycard.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Card") {
    const card = e.target.closest(".overflow-hidden");

    const idDiv = card.querySelector("[id]");
    const id = idDiv ? idDiv.id : null;

    const name = idDiv.querySelector("h1")?.innerText;
    const priceText = idDiv.querySelector(
      ".font-semibold:last-child"
    )?.innerText;
    const price = priceText ? parseFloat(priceText.replace("$", "").trim()) : 0;

    total += price;
    pricetotal.innerText = total;

    treecarddata.innerHTML += `
     <div 
              class="cart-item flex overflow-hidden justify-between items-center px-2 rounded-lg bg-green-100 my-2 gap-2"
            >
              <div>
                <h1>${name}</h1>
                <p>$ <span class="item-price">${price}</span> × 1</p>
              </div>
              <div>
                <span ><i class=" fa-solid fa-xmark remove"></i></span>
              </div>
            </div>
    
    `;
  }
});
treecarddata.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const item = e.target.closest(".cart-item");
    const itemPrice = parseFloat(item.querySelector(".item-price").innerText);

    total -= itemPrice;
    pricetotal.innerText = total;

    item.remove();
  }
});

treecard.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.target.closest("div.flex").remove();
  }
});

Alltrees.addEventListener("click", () => {
  catagories(), showalltreedata();
});

const showloading = () => {
  mycard.innerHTML = `
  <div class="text-center ">
            <h1 class="text-2xl font-semibold">Loading...</h1></div>
  `;
};




showalltreedata();
