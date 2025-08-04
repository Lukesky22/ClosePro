let subcontractData = [];

document.getElementById("addSubcontractBtn").addEventListener("click", () => {
    const tag = document.getElementById("subTag").value;
    const desc = document.getElementById("subDesc").value;
    const spec = document.getElementById("subSpec").value;
    const qty = parseFloat(document.getElementById("subQty").value);
    const unit = document.getElementById("subUnit").value;

    const suppliers = [
        { name: document.getElementById("subSupplier1").value, price: parseFloat(document.getElementById("subPrice1").value) },
        { name: document.getElementById("subSupplier2").value, price: parseFloat(document.getElementById("subPrice2").value) },
        { name: document.getElementById("subSupplier3").value, price: parseFloat(document.getElementById("subPrice3").value) }
    ].filter(s => s.name && !isNaN(s.price));

    if (!tag || !desc || suppliers.length === 0 || isNaN(qty)) return;

    // Trouve l'index du fournisseur le moins cher
    const min = suppliers.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
    const selectedIndex = suppliers.findIndex(s => s.name === min.name);

    subcontractData.push({ tag, desc, spec, qty, unit, suppliers, selectedIndex });
    renderSubcontractTable();

    // Réinitialise les champs
    document.getElementById("subTag").value = "";
    document.getElementById("subDesc").value = "";
    document.getElementById("subSpec").value = "";
    document.getElementById("subQty").value = "";
    document.getElementById("subUnit").value = "";
    document.getElementById("subSupplier1").value = "";
    document.getElementById("subPrice1").value = "";
    document.getElementById("subSupplier2").value = "";
    document.getElementById("subPrice2").value = "";
    document.getElementById("subSupplier3").value = "";
    document.getElementById("subPrice3").value = "";
});

function renderSubcontractTable() {
    const tbody = document.getElementById("subcontractTableBody");
    tbody.innerHTML = "";

    subcontractData.forEach((item, index) => {
        const supplierListHTML = item.suppliers
            .map(s => `${s.name}: ${s.price.toFixed(2)}$`)
            .join("<br>");

        const supplierOptions = item.suppliers
            .map((s, i) => 
                `<option value="${i}" ${item.selectedIndex === i ? "selected" : ""}>
                    ${s.name}
                </option>`)
            .join("");

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.tag}</td>
            <td>${item.desc}</td>
            <td>${item.spec || "-"}</td>
            <td>${item.qty}</td>
            <td>${item.unit}</td>
            <td>${supplierListHTML}</td>
            <td>
                <select onchange="updateSelectedSupplier(${index}, this.value)">
                    ${supplierOptions}
                </select>
            </td>
            <td>${item.suppliers[item.selectedIndex]?.price.toFixed(2) || "0.00"}$</td>
            <td><button onclick="deleteSubcontract(${index})" class="btn">❌</button></td>
        `;
        tbody.appendChild(row);
    });
}

function updateSelectedSupplier(index, newIndex) {
    subcontractData[index].selectedIndex = parseInt(newIndex);
    renderSubcontractTable();
}

function deleteSubcontract(index) {
    subcontractData.splice(index, 1);
    renderSubcontractTable();
}
localStorage.setItem("recap_subcontract_total", total.toFixed(2));

