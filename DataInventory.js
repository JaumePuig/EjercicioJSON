const inventory = document.getElementById("p-inventory");
const inventoryBtnList = [];
const jugador = { vida: 10, ataque: 10, defensa: 10, velocidad: 10 };
const enemigo = { vida: 10, ataque: 10, defensa: 10, velocidad: 10 };
const inventario = [
  { nombre: "pocion", tipo: "curacion", valor: 100 },
  { nombre: "ataque X", tipo: "potenciador", valor: 150 },
];

function CreaInventario() {
  inventario.forEach((element) => {
    let newItem = document.createElement("button");
    newItem.textContent = element.nombre;
    inventory.appendChild(newItem);
    inventoryBtnList.push(newItem);
    newItem.addEventListener("click", () => {
      UseItem(newItem);
    });
  });
}

function UseItem(itemBtn) {
    console.log("Item " + itemBtn.textContent + " usado");
    inventario.splice(inventario.findIndex((element) => element.nombre == itemBtn.textContent),1);
    itemBtn.remove();
}

CreaInventario();