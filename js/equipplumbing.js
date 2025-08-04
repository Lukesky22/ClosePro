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
