let defaultExpenses = [
  { description: "Toilette", value: 1, unit: "lot", unitPrice: 150.00 },
  { description: "Peinture", value: 1, unit: "lot", unitPrice: 400.00 },
  { description: "Plan de séchage", value: 1, unit: "lot", unitPrice: 100.00 },
];

let expenseData = [...defaultExpenses];

function renderExpenseTable() {
  const tbody = document.getElementById("expenseTableBody");
  tbody.innerHTML = "";
  let total = 0;

  expenseData.forEach((row, index) => {
    const subTotal = row.value * row.unitPrice;
    total += subTotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="text" value="${row.description}" onchange="updateExpense(${index}, 'description', this.value)"></td>
      <td><input type="number" value="${row.value}" onchange="updateExpense(${index}, 'value', this.value)"></td>
      <td><input type="text" value="${row.unit}" onchange="updateExpense(${index}, 'unit', this.value)"></td>
      <td>${subTotal.toFixed(2)} $</td>
      <td><button onclick="deleteExpense(${index})">❌</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("expenseTotal").textContent = total.toFixed(2) + " $";
}

function updateExpense(index, field, value) {
  if (field === "value") value = parseFloat(value) || 0;
  expenseData[index][field] = value;
  renderExpenseTable();
}

function deleteExpense(index) {
  expenseData.splice(index, 1);
  renderExpenseTable();
}

function addExpenseRow() {
  expenseData.push({ description: "", value: 1, unit: "", unitPrice: 0 });
  renderExpenseTable();
}

function resetExpenses() {
  expenseData = [...defaultExpenses];
  renderExpenseTable();
}

// Initialise le tableau au chargement
renderExpenseTable();

localStorage.setItem("recap_expense_total", total.toFixed(2));

  

