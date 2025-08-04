var fdata = window.fdata || [];

document.getElementById("addfinitionBtn").addEventListener("click",() =>{
    const form = document.getElementById("finitionForm");
    form.style.display= form.style.display === "none" ? "block" : "none";
    // si fermer ouvre le block sinon ferme
});

document.getElementById("submitFinition").addEventListener("click", () =>{
    const tag = document.getElementById("finitionTag").value;
    const description = document.getElementById("finitionDes").value;
    const speciality = document.getElementById("finitonspec").value;
    const qty = parseFloat(document.getElementById("finitionqty").value);
    const unit = document.getElementById("finitionUni").value;
    const hours = parseFloat(document.getElementById("finitionHeure").value);

    const supplier1 = document.getElementById("Fsupplier1").value;
    const price1 = parseFloat(document.getElementById("Fprice1").value);
    const supplier2 = document.getElementById("Fsupplier2").value;
    const price2 = parseFloat(document.getElementById("Fprice2").value);

    if(!tag || !description || isNaN(qty)){
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
    fdata.push(newItem)
    renderfinitonTable();
    document.getElementById("finitionForm").style.display = "none";
});
function renderfinitonTable(){
    const tbody = document.getElementById("tbfiniton")
    tbody.innerHTML = "";

    fdata.forEach((item, index) =>{
       const supplier = item.suppliers.find(s => s.selected);
       const price = supplier?.price || 0; 

       const row = document.createElement("tr");
       row.innerHTML = `
        <td>${item.tag}</td>
      <td>${item.description}</td>
      <td>${item.speciality}</td>
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

function deletefinition(index) {
  if (confirm("Supprimer cet équipement ?")) {
    fdata.splice(index, 1);
    renderfinitonTable();
  }
}
function toggleComparison(index) {
  const row = document.getElementById(`compare-row-${index}`);
  row.style.display = row.style.display === "none" ? "table-row" : "none";
}

function selectSupplier(fintionIndex, supplierIndex) {
  // Met tous les suppliers à false
  fdata[finitionIndex].suppliers.forEach(s => s.selected = false);
  // Active le bon
  fdata[finitionIndex].suppliers[supplierIndex].selected = true;
  // Recharge le tableau pour appliquer les changements
  renderfinitonTable();
}
localStorage.setItem("recap_finish_total", total.toFixed(2));
