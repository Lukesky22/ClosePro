const data = [];


document.getElementById("addEquipmentBtn").addEventListener("click", () => {
  const form = document.getElementById("equipmentForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

document.getElementById("submitEquipment").addEventListener("click", () => {
  const tag = document.getElementById("tagInput").value;
  const description = document.getElementById("descInput").value;
  const spec = document.getElementById("specInput").value;
  const qty = parseFloat(document.getElementById("qtyInput").value);
  const unit = document.getElementById("unitInput").value;
  const hours = parseFloat(document.getElementById("hoursInput").value);

  const supplier1 = document.getElementById("supplier1").value;
  const price1 = parseFloat(document.getElementById("price1").value);
  const supplier2 = document.getElementById("supplier2").value;
  const price2 = parseFloat(document.getElementById("price2").value);

  if (!tag || !description || isNaN(qty)) {
    alert("Remplir les champs obligatoires");
    return;
  }

  const newItem = {
    tag,
    description,
    spec,
    qty,
    unit,
    hours,
    suppliers: [
      { name: supplier1, price: price1, selected: true },
      { name: supplier2, price: price2, selected: false }
    ]
  };

  data.push(newItem);
  renderEquipmentTable();
  document.getElementById("equipmentForm").style.display = "none";
});
function renderEquipmentTable() {
  const tbody = document.getElementById("equipmentTableBody");
  tbody.innerHTML = "";

  data.forEach((item, index) => {
    const supplier = item.suppliers.find(s => s.selected);
    const price = supplier?.price || 0;

    // Ligne principale
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.tag}</td>
      <td>${item.description}</td>
      <td>${item.spec}</td>
      <td>${item.qty}</td>
      <td>${item.unit}</td>
      <td>${supplier?.name || "—"}</td>
      <td>${price.toFixed(2)}</td>
      <td>${(price * item.qty).toFixed(2)}</td>
      <td>${item.hours}</td>
      <td>
        <button onclick="toggleComparison(${index})">Comparer</button>
        <button onclick="deleteEquipment(${index})" style="color:red;">❌</button>
      </td>
    `;
    tbody.appendChild(row);

    // Ligne de comparaison (cachée au départ)
    const compareRow = document.createElement("tr");
    compareRow.id = `compare-row-${index}`;
    compareRow.style.display = "none";
    compareRow.innerHTML = `
      <td colspan="10">
        <div style="display: flex; gap: 30px; padding: 10px; background-color: #f9f9f9; border: 1px solid #ccc;">
          ${item.suppliers.map((s, i) => `
            <div style="border: 1px solid #aaa; padding: 10px; width: 200px; background-color: ${s.selected ? "#d4edda" : "#fff"}">
              <strong>${s.name}</strong><br>
              Prix: ${s.price.toFixed(2)} $<br>
              <button onclick="selectSupplier(${index}, ${i})">Choisir</button>
            </div>
          `).join('')}
        </div>
      </td>
    `;
    tbody.appendChild(compareRow);
  });
}


function deleteEquipment(index) {
  if (confirm("Supprimer cet équipement ?")) {
    data.splice(index, 1);
    renderEquipmentTable();
  }
}
function toggleComparison(index) {
  const row = document.getElementById(`compare-row-${index}`);
  row.style.display = row.style.display === "none" ? "table-row" : "none";
}

function selectSupplier(equipmentIndex, supplierIndex) {
  // Met tous les suppliers à false
  data[equipmentIndex].suppliers.forEach(s => s.selected = false);
  // Active le bon
  data[equipmentIndex].suppliers[supplierIndex].selected = true;
  // Recharge le tableau pour appliquer les changements
  renderEquipmentTable();
}
localStorage.setItem("recap_equipment_total", total.toFixed(2));

