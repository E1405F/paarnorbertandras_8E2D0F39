const primaries = [
  { name: 'Winfield M1873', price: 120 },
  { name: 'Winfield M1894', price: 260 },
  { name: 'Sparks LRR', price: 420 },
  { name: 'Evans Repeater', price: 340 },
  { name: 'Caldwell Rival 78', price: 200 },
  { name: 'Martini-Henry', price: 310 },
  { name: 'Springfield Trapdoor', price: 180 },
  { name: 'Sawed-Off Shotgun', price: 150 },
  { name: 'Repeating Shotgun', price: 380 },
  { name: 'Double Barrel', price: 230 },
  { name: 'Varmint Rifle', price: 275 },
  { name: 'Hunting Rifle', price: 330 },
  { name: 'Beacon Bolt-Action', price: 460 },
  { name: 'Bullpup Carbine', price: 295 },
  { name: 'Light Carbine', price: 210 }
];

const secondaries = [
  { name: 'Nagant M1895', price: 80 },
  { name: 'Lebel Pistol', price: 90 },
  { name: 'Derringer', price: 50 },
  { name: 'Cattleman Revolver', price: 110 },
  { name: 'Schofield Revolver', price: 125 },
  { name: 'Caldwell Conversion Pistol', price: 95 },
  { name: 'Volcanic Pistol', price: 70 },
  { name: 'Bolt-Action Pistol', price: 140 },
  { name: 'Pocket Pistol', price: 45 },
  { name: 'Veteran Revolver', price: 160 },
  { name: 'Electric Taser (sidearm)', price: 200 },
  { name: 'Flare Pistol', price: 60 },
  { name: 'Sawed-Off Pistol', price: 85 },
  { name: 'Antique Pocket Revolver', price: 55 }
];

function populateSelects() {
  const primarySelect = document.getElementById('primary');
  primarySelect.innerHTML = '';
  primaries.forEach((weapon, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${weapon.name} (€${weapon.price})`;
    primarySelect.appendChild(option);
  });

  const secondarySelect = document.getElementById('secondary');
  secondarySelect.innerHTML = '';
  secondaries.forEach((weapon, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${weapon.name} (€${weapon.price})`;
    secondarySelect.appendChild(option);
  });
}

function getMinLoadout() {
  let min = null;

  for (let i = 0; i < primaries.length; i++) {
    for (let j = 0; j < secondaries.length; j++) {
      const total = primaries[i].price + secondaries[j].price;
      if (min === null || total < min.total) {
        min = {
          primary: primaries[i],
          secondary: secondaries[j],
          total
        };
      }
    }
  }

  return min;
}

function getMaxLoadout() {
  let max = null;

  for (let i = 0; i < primaries.length; i++) {
    for (let j = 0; j < secondaries.length; j++) {
      const total = primaries[i].price + secondaries[j].price;
      if (max === null || total > max.total) {
        max = {
          primary: primaries[i],
          secondary: secondaries[j],
          total
        };
      }
    }
  }

  return max;
}

function calculateCart() {
  const primaryIndex = parseInt(document.getElementById('primary').value, 10) || 0;
  const secondaryIndex = parseInt(document.getElementById('secondary').value, 10) || 0;

  const primary = primaries[primaryIndex];
  const secondary = secondaries[secondaryIndex];
  const total = primary.price + secondary.price;

  const resultDiv = document.getElementById('result');

  let html = `
    <strong>Kosár tartalma:</strong><br>
    Elsődleges: ${primary.name} (€${primary.price})<br>
    Másodlagos: ${secondary.name} (€${secondary.price})<br>
    <strong>Teljes összeg:</strong> €${total}
  `;

  const min = getMinLoadout();
  const max = getMaxLoadout();

  if (min && max) {
    html += `
      <hr>
      <div style="padding:8px;border-radius:6px;">
        <strong>Legolcsóbb loadout lehetőség:</strong><br>
        Elsődleges: ${min.primary.name} (€${min.primary.price})<br>
        Másodlagos: ${min.secondary.name} (€${min.secondary.price})<br>
        <strong>Összesen:</strong> €${min.total}
      </div>

      <br>

      <div style="padding:8px;border-radius:6px;">
        <strong>Legdrágább loadout lehetőség:</strong><br>
        Elsődleges: ${max.primary.name} (€${max.primary.price})<br>
        Másodlagos: ${max.secondary.name} (€${max.secondary.price})<br>
        <strong>Összesen:</strong> €${max.total}
      </div>
    `;
  }

  resultDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  populateSelects();
  document.getElementById('calcBtn').addEventListener('click', calculateCart);
  calculateCart(); // alapértelmezett megjelenítés
});
