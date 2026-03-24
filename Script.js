class Battle {
  constructor(inventario, player, enemy) {
    this.inventario = inventario;
    this.player = player;
    this.enemy = enemy;

    this.pHp = document.getElementById("p-hp");
    this.eHp = document.getElementById("e-hp");
    this.log = document.getElementById("log");

    document
      .getElementById("btn-atacar")
      .addEventListener("click", () => this.atacar());

    document
      .getElementById("btn-curar")
      .addEventListener("click", () => this.usarPocion());
  }

  atacar() {
    if (this.verificarVictoria()) return;

    let random = Math.floor(Math.random() * 10);
    let damage = (this.player.ataque - this.enemy.defensa) + random;

    if (damage < 0) damage = 0;

    this.enemy.vida -= damage;
    if (this.enemy.vida < 0) this.enemy.vida = 0;

    this.eHp.textContent = this.enemy.vida;
    this.log.textContent += `Jugador hace ${damage} de daño\n`;

    if (this.verificarVictoria()) return;
    this.turnoEnemigo();
  }

  turnoEnemigo() {
    if (this.verificarVictoria()) return;

    let decision = Math.random();

    if (decision < 0.7) {
      let random = Math.floor(Math.random() * 10);
      let damage = (this.enemy.ataque - this.player.defensa) + random;

      if (damage < 0) damage = 0;

      this.player.vida -= damage;
      if (this.player.vida < 0) this.player.vida = 0;

      this.pHp.textContent = this.player.vida;
      this.log.textContent += `Enemigo hace ${damage} de daño\n`;
    } else {
      this.log.textContent += "Enemigo espera\n";
    }

    this.verificarVictoria();
  }

  usarPocion() {
    if (this.verificarVictoria()) return;

    this.player.vida += 5;
    this.pHp.textContent = this.player.vida;

    this.log.textContent += "Usa poción +5 vida\n";

    this.turnoEnemigo();
  }

  verificarVictoria() {
    if (this.enemy.vida <= 0) {
      this.log.textContent += "Victoria\n";
      this.bloquearJuego();
      return true;
    }

    if (this.player.vida <= 0) {
      this.log.textContent += "Game Over\n";
      this.bloquearJuego();
      return true;
    }

    return false;
  }

  bloquearJuego() {
    document.getElementById("btn-atacar").disabled = true;
    document.getElementById("btn-curar").disabled = true;
  }
}

const inventory = document.getElementById("p-inventory");

const jugador = {
  vida: 100,
  ataque: 10,
  defensa: 10,
  velocidad: 10,
};

const enemigo = {
  vida: 100,
  ataque: 10,
  defensa: 10,
  velocidad: 10,
};

const inventario = [
  { nombre: "pocion", tipo: "curacion", valor: 100 },
  { nombre: "ataque X", tipo: "potenciador", valor: 150 },
];

function crearInventario() {
  inventario.forEach((item) => {
    let btn = document.createElement("button");
    btn.textContent = item.nombre;

    btn.addEventListener("click", () => {
      console.log(`Item ${item.nombre} usado`);
    });

    inventory.appendChild(btn);
  });
}

crearInventario();

const battle = new Battle(inventario, jugador, enemigo);