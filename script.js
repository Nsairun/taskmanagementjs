const inputField = document.getElementById("myInput");
const addBtn = document.getElementById("inputForm");
const list = document.getElementById("list");

let items = [];

function handleInputSubmit(e) {
  e.preventDefault();
  const newInput = inputField.value;
  if (newInput !== "") {
    items.push(newInput);
    displayItems();
    inputField.value = "";
  }
}

function displayItems() {
  list.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let itemElement = document.createElement("div");
    itemElement.classList.add("w-screen", "grid", "grid-cols-3", "gap-4", "items-center", "rounded", "mb-4");    let itemText = document.createElement("div");
    itemText.classList.add("mr-4");

    let itemParagraph = document.createElement("p");
    itemParagraph.textContent = item;
    itemParagraph.classList.add("max-w-1/2");

    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("flex", "gap-2");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.classList.add( "align-baseline",
    "bg-red-500",
    "text-white",
    "px-4",
    "py-2",
    "rounded");
    deleteBtn.addEventListener("click", function () {
      deleteItem(i);
    });

    let editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add( "align-baseline",
    "bg-blue-500",
    "text-white",
    "px-4",
    "py-2",
    "rounded");
    editBtn.addEventListener("click", function () {
      editItem(i);
    });

    buttonsContainer.appendChild(deleteBtn);
    buttonsContainer.appendChild(editBtn);

    itemText.appendChild(itemParagraph);
    itemElement.appendChild(itemText);
    itemElement.appendChild(buttonsContainer);

    list.appendChild(itemElement);
  }
}

function deleteItem(index) {
  items.splice(index, 1);
  displayItems();
}

function editItem(index) {
  const itemToEdit = items[index];
  inputField.value = itemToEdit;
  inputField.focus();
  addBtn.removeEventListener("submit", handleInputSubmit);
  addBtn.addEventListener("submit", function (e) {
    e.preventDefault();
    const updatedInput = inputField.value;
    if (updatedInput !== "") {
      items[index] = updatedInput;
      displayItems();
      inputField.value = "";
      addBtn.removeEventListener("submit", arguments.callee);
      addBtn.addEventListener("submit", handleInputSubmit);
    }
  });
}

addBtn.addEventListener("submit", handleInputSubmit);