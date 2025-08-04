function updateRecap() {
  const fields = [
    { id: "material", label: "Matériel" },
    { id: "equipment", label: "Équipement" },
    { id: "finish", label: "Équipement de finition" },
    { id: "heating", label: "Équipement de chauffage" },
    { id: "hvac", label: "Équipement HVAC" },
    { id: "subcontract", label: "Sous-contrat" },
    { id: "expense", label: "Dépenses chantier" },
    { id: "labor", label: "Main d'œuvre" }
  ];

  let grandTotal = 0;
  const tbody = document.getElementById("recapTableBody");
  tbody.innerHTML = "";

  fields.forEach(({ id, label }) => {
    const total = parseFloat(localStorage.getItem(`recap_${id}_total`)) || 0;
    grandTotal += total;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${label}</td>
      <td>${total.toFixed(2)} $</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("grandTotal").textContent = grandTotal.toFixed(2) + " $";
}

document.addEventListener("DOMContentLoaded", updateRecap);
