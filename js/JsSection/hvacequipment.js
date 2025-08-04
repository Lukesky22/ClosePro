var Cdata = window.Cdata || [];

document.getElementById("addhvacBtn").addEventListener("click",() =>{
    const form = document.getElementById("hvacForm");
    form.style.display= form.style.display === "none" ? "block" : "none";
    // si fermer ouvre le block sinon ferme
});

document.getElementById("submithvacEquipment").addEventListener("click", () =>{
    const tag = document.getElementById("hvacTag").value;
    const description = document.getElementById("hvacDes").value;
    const speciality = document.getElementById("hvacspec").value;
    const qty = parseFloat(document.getElementById("hvacqty").value);
    const unit = document.getElementById("hvacUni").value;
    const hours = parseFloat(document.getElementById("hvacHeure").value);

    const supplier1 = document.getElementById("Csupplier1").value;
    const price1 = parseFloat(document.getElementById("Cprice1").value);
    const supplier2 = document.getElementById("Csupplier2").value;
    const price2 = parseFloat(document.getElementById("Cprice2").value);

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
    Cdata.push(newItem)
    renderheatingTable();
    document.getElementById("hvacForm").style.display = "none";
});
function renderheatingTable(){
    const tbody = document.getElementById("tbhvac")
    tbody.innerHTML = "";

    Cdata.forEach((item, index) =>{
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
        <button onclick="deletehvac(${index})" style="color:red;">❌</button>
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

function deletehvac(index) {
  if (confirm("Supprimer cet équipement ?")) {
    Cdata.splice(index, 1);
    renderhvacTable();
  }
}
function toggleComparison(index) {
  const row = document.getElementById(`compare-row-${index}`);
  row.style.display = row.style.display === "none" ? "table-row" : "none";
}
function selectSupplier(hvacIndex, supplierIndex) {
  // Met tous les suppliers à false
  Cdata[hvacIndex].suppliers.forEach(s => s.selected = false);
  // Active le bon
  Cdata[hvacIndex].suppliers[supplierIndex].selected = true;
  // Recharge le tableau pour appliquer les changements
  renderhvacTable();
}
localStorage.setItem("recap_hvac_total", total.toFixed(2));

