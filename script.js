// =====================================
// おこづかいメモ
// Ver. 0.11.0
// =====================================

// HTML部品

const choreNameInput =
  document.getElementById("chore-name");

const choreAmountInput =
  document.getElementById("chore-amount");

const addChoreButton =
  document.getElementById("add-chore-button");

const choreSettingsList =
  document.getElementById(
    "chore-settings-list"
  );

const choreSelect =
  document.getElementById("chore-select");

const amountInput =
  document.getElementById("amount");

const recordButton =
  document.getElementById("record-button");

const choreDateInput =
  document.getElementById("chore-date");

const expenseAmountInput =
  document.getElementById(
    "expense-amount"
  );

const expenseContentInput =
  document.getElementById(
    "expense-content"
  );

const expenseCategorySelect =
  document.getElementById(
    "expense-category"
  );

const expenseButton =
  document.getElementById(
    "expense-button"
  );

const expenseDateInput =
  document.getElementById(
    "expense-date"
  );

const monthSelect =
  document.getElementById(
    "month-select"
  );

const budgetAmountInput =
  document.getElementById(
    "budget-amount"
  );

const saveBudgetButton =
  document.getElementById(
    "save-budget-button"
  );

const summaryTitle =
  document.getElementById(
    "summary-title"
  );

const recordList =
  document.getElementById(
    "record-list"
  );

const categorySummaryList =
  document.getElementById(
    "category-summary-list"
  );

const receivedTotal =
  document.getElementById(
    "received-total"
  );

const spentTotal =
  document.getElementById(
    "spent-total"
  );

const balanceTotal =
  document.getElementById(
    "balance-total"
  );

const budgetTotal =
  document.getElementById(
    "budget-total"
  );

const remainingBudgetTotal =
  document.getElementById(
    "remaining-budget-total"
  );

const budgetMessage =
  document.getElementById(
    "budget-message"
  );

const walletBalanceTotal =
  document.getElementById(
    "wallet-balance-total"
  );

const exportDataButton =
  document.getElementById(
    "export-data-button"
  );

const importDataInput =
  document.getElementById(
    "import-data-input"
  );

// 貯金目標

const savingsGoalNameInput =
  document.getElementById(
    "savings-goal-name"
  );

const savingsGoalAmountInput =
  document.getElementById(
    "savings-goal-amount"
  );

const saveSavingsGoalButton =
  document.getElementById(
    "save-savings-goal-button"
  );

const clearSavingsGoalButton =
  document.getElementById(
    "clear-savings-goal-button"
  );

const savingsGoalTitle =
  document.getElementById(
    "savings-goal-title"
  );

const savingsSavedAmount =
  document.getElementById(
    "savings-saved-amount"
  );

const savingsTargetAmount =
  document.getElementById(
    "savings-target-amount"
  );

const savingsProgressBar =
  document.getElementById(
    "savings-progress-bar"
  );

const savingsProgressText =
  document.getElementById(
    "savings-progress-text"
  );

// 編集画面

const editRecordModal =
  document.getElementById(
    "edit-record-modal"
  );

const editModalTitle =
  document.getElementById(
    "edit-modal-title"
  );

const editRecordAmount =
  document.getElementById(
    "edit-record-amount"
  );

const editRecordContent =
  document.getElementById(
    "edit-record-content"
  );

const editCategoryArea =
  document.getElementById(
    "edit-category-area"
  );

const editRecordCategory =
  document.getElementById(
    "edit-record-category"
  );

const editRecordDate =
  document.getElementById(
    "edit-record-date"
  );

const saveEditButton =
  document.getElementById(
    "save-edit-button"
  );

const cancelEditButton =
  document.getElementById(
    "cancel-edit-button"
  );

let editingRecordId = null;

// 最初のお手伝い

const defaultChores = [
  {
    id: "default-1",
    name: "お皿あらい",
    amount: 100
  },
  {
    id: "default-2",
    name: "おふろそうじ",
    amount: 150
  },
  {
    id: "default-3",
    name: "ゴミ出し",
    amount: 50
  },
  {
    id: "default-4",
    name: "くつならべ",
    amount: 20
  }
];

// localStorage

function loadJson(
  key,
  fallback
) {
  try {

    const text =
      localStorage.getItem(key);

    if (!text) {
      return fallback;
    }

    return JSON.parse(text);

  } catch (error) {

    console.error(
      `${key}の読み込みに失敗しました`,
      error
    );

    return fallback;
  }
}

const savedChores =
  loadJson(
    "chores",
    null
  );

let chores =
  Array.isArray(savedChores)
    ? savedChores
    : defaultChores.map(
        function (chore) {
          return {
            ...chore
          };
        }
      );

const savedRecords =
  loadJson(
    "records",
    []
  );

let records =
  Array.isArray(savedRecords)
    ? savedRecords
    : [];

const savedBudgets =
  loadJson(
    "budgets",
    {}
  );

let budgets =
  savedBudgets &&
  typeof savedBudgets === "object" &&
  !Array.isArray(savedBudgets)
    ? savedBudgets
    : {};

const savedSavingsGoal =
  loadJson(
    "savingsGoal",
    null
  );

let savingsGoal =
  savedSavingsGoal &&
  typeof savedSavingsGoal === "object" &&
  !Array.isArray(savedSavingsGoal)
    ? savedSavingsGoal
    : null;

// 日付

function getToday() {

  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    String(
      today.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      today.getDate()
    ).padStart(
      2,
      "0"
    );

  return `${year}-${month}-${day}`;
}

function getCurrentMonth() {

  return getToday().slice(
    0,
    7
  );
}

function formatDate(
  dateText
) {

  const parts =
    dateText.split("-");

  return (
    `${Number(parts[1])}/` +
    `${Number(parts[2])}`
  );
}

function formatMonth(
  monthText
) {

  const parts =
    monthText.split("-");

  return (
    `${parts[0]}年` +
    `${Number(parts[1])}月`
  );
}

function getSelectedMonth() {

  return (
    monthSelect.value ||
    getCurrentMonth()
  );
}

function isValidDate(
  dateText
) {

  if (
    typeof dateText !== "string"
  ) {
    return false;
  }

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      dateText
    )
  ) {
    return false;
  }

  const parts =
    dateText.split("-");

  const year =
    Number(parts[0]);

  const month =
    Number(parts[1]);

  const day =
    Number(parts[2]);

  const date =
    new Date(
      year,
      month - 1,
      day
    );

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

// 古い記録を整える

function normalizeRecords(
  recordArray
) {

  return recordArray.map(
    function (
      record,
      index
    ) {

      const type =
        record.type === "expense"
          ? "expense"
          : "income";

      const normalized = {

        ...record,

        id:
          record.id !== undefined &&
          record.id !== null
            ? record.id
            : (
                "old-" +
                Date.now() +
                "-" +
                index
              ),

        type: type,

        amount:
          Number(
            record.amount
          ) || 0,

        content:
          String(
            record.content || ""
          ),

        date:
          isValidDate(record.date)
            ? record.date
            : getToday()

      };

      if (
        type === "expense"
      ) {

        normalized.category =
          record.category ||
          "その他";

      }

      return normalized;
    }
  );
}

records =
  normalizeRecords(
    records
  );

// 保存

function saveChores() {

  localStorage.setItem(
    "chores",
    JSON.stringify(chores)
  );
}

function saveRecords() {

  localStorage.setItem(
    "records",
    JSON.stringify(records)
  );
}

function saveBudgets() {

  localStorage.setItem(
    "budgets",
    JSON.stringify(budgets)
  );
}

function saveSavingsGoal() {

  if (savingsGoal) {

    localStorage.setItem(
      "savingsGoal",
      JSON.stringify(
        savingsGoal
      )
    );

  } else {

    localStorage.removeItem(
      "savingsGoal"
    );

  }
}

// 貯金目標

function calculateSavingsTotal() {

  let total = 0;

  records.forEach(
    function (record) {

      if (
        record.type === "expense" &&
        record.category === "貯金"
      ) {

        total +=
          Number(
            record.amount
          ) || 0;

      }

    }
  );

  return total;
}

function displaySavingsGoal() {

  const savedAmount =
    calculateSavingsTotal();

  savingsSavedAmount.textContent =
    `${savedAmount.toLocaleString()}円`;

  if (
    !savingsGoal ||
    !savingsGoal.name ||
    Number(
      savingsGoal.targetAmount
    ) <= 0
  ) {

    savingsGoalTitle.textContent =
      "目標を設定してみよう";

    savingsTargetAmount.textContent =
      "0円";

    savingsProgressBar.style.width =
      "0%";

    savingsProgressText.textContent =
      "「貯金」で記録するとここにたまります";

    return;
  }

  const targetAmount =
    Number(
      savingsGoal.targetAmount
    );

  const remaining =
    Math.max(
      targetAmount - savedAmount,
      0
    );

  const percentage =
    Math.min(
      Math.round(
        savedAmount /
        targetAmount *
        100
      ),
      100
    );

  savingsGoalTitle.textContent =
    savingsGoal.name;

  savingsTargetAmount.textContent =
    `${targetAmount.toLocaleString()}円`;

  savingsProgressBar.style.width =
    `${percentage}%`;

  if (
    savedAmount >= targetAmount
  ) {

    savingsProgressText.textContent =
      `🎉 目標達成！ ${percentage}%`;

  } else {

    savingsProgressText.textContent =
      `あと${remaining.toLocaleString()}円！ ${percentage}%`;

  }
}

function displaySavingsGoalInput() {

  if (savingsGoal) {

    savingsGoalNameInput.value =
      savingsGoal.name || "";

    savingsGoalAmountInput.value =
      savingsGoal.targetAmount || "";

  } else {

    savingsGoalNameInput.value =
      "";

    savingsGoalAmountInput.value =
      "";

  }
}

saveSavingsGoalButton.addEventListener(
  "click",
  function () {

    const name =
      savingsGoalNameInput.value.trim();

    const targetAmount =
      Number(
        savingsGoalAmountInput.value
      );

    if (
      name === "" ||
      targetAmount <= 0 ||
      !Number.isInteger(
        targetAmount
      )
    ) {

      alert(
        "貯金の目標と、1円以上の目標金額を入力してください"
      );

      return;
    }

    savingsGoal = {
      name: name,
      targetAmount: targetAmount
    };

    saveSavingsGoal();

    displaySavingsGoal();

    alert(
      "貯金目標を保存しました"
    );
  }
);

clearSavingsGoalButton.addEventListener(
  "click",
  function () {

    if (!savingsGoal) {

      alert(
        "現在、貯金目標はありません"
      );

      return;
    }

    const shouldClear =
      confirm(
        "貯金目標を削除しますか？\n貯金の記録は消えません。"
      );

    if (!shouldClear) {
      return;
    }

    savingsGoal = null;

    saveSavingsGoal();

    displaySavingsGoalInput();

    displaySavingsGoal();

  }
);

// 予算

function getSelectedBudget() {

  const selectedMonth =
    getSelectedMonth();

  return (
    Number(
      budgets[
        selectedMonth
      ]
    ) || 0
  );
}

function displayBudgetInput() {

  const budget =
    getSelectedBudget();

  if (
    budget > 0
  ) {

    budgetAmountInput.value =
      budget;

  } else {

    budgetAmountInput.value =
      "";

  }
}

// お手伝い設定

function displayChoreOptions() {

  choreSelect.innerHTML =
    "";

  const firstOption =
    document.createElement(
      "option"
    );

  firstOption.value =
    "";

  firstOption.textContent =
    "お手伝いを選んでください";

  choreSelect.appendChild(
    firstOption
  );

  chores.forEach(
    function (chore) {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        String(chore.id);

      option.textContent =
        `${chore.name}　` +
        `${Number(
          chore.amount
        ).toLocaleString()}円`;

      option.dataset.name =
        chore.name;

      option.dataset.amount =
        String(
          chore.amount
        );

      choreSelect.appendChild(
        option
      );
    }
  );
}

function displayChoreSettings() {

  choreSettingsList.innerHTML =
    "";

  if (
    chores.length === 0
  ) {

    const emptyMessage =
      document.createElement(
        "li"
      );

    emptyMessage.textContent =
      "お手伝い設定がありません";

    emptyMessage.classList.add(
      "chore-empty-message"
    );

    choreSettingsList.appendChild(
      emptyMessage
    );

    return;
  }

  chores.forEach(
    function (chore) {

      const listItem =
        document.createElement(
          "li"
        );

      listItem.classList.add(
        "chore-setting-item"
      );

      const choreText =
        document.createElement(
          "span"
        );

      choreText.textContent =
        `${chore.name}　` +
        `${Number(
          chore.amount
        ).toLocaleString()}円`;

      const buttonArea =
        document.createElement(
          "div"
        );

      buttonArea.classList.add(
        "chore-setting-buttons"
      );

      const editButton =
        document.createElement(
          "button"
        );

      editButton.textContent =
        "金額変更";

      editButton.classList.add(
        "edit-chore-button"
      );

      const deleteButton =
        document.createElement(
          "button"
        );

      deleteButton.textContent =
        "削除";

      deleteButton.classList.add(
        "remove-chore-button"
      );

      editButton.addEventListener(
        "click",
        function () {

          const newAmountText =
            prompt(
              `${chore.name}の新しい金額を入力してください`,
              chore.amount
            );

          if (
            newAmountText === null
          ) {
            return;
          }

          const newAmount =
            Number(
              newAmountText
            );

          if (
            newAmount <= 0 ||
            !Number.isInteger(
              newAmount
            )
          ) {

            alert(
              "1円以上の整数を入力してください"
            );

            return;
          }

          chore.amount =
            newAmount;

          saveChores();

          displayChoreOptions();

          displayChoreSettings();

        }
      );

      deleteButton.addEventListener(
        "click",
        function () {

          const shouldDelete =
            confirm(
              `${chore.name}を設定から削除しますか？\n過去の記録は残ります。`
            );

          if (!shouldDelete) {
            return;
          }

          chores =
            chores.filter(
              function (item) {

                return (
                  item.id !==
                  chore.id
                );

              }
            );

          saveChores();

          displayChoreOptions();

          displayChoreSettings();

        }
      );

      buttonArea.appendChild(
        editButton
      );

      buttonArea.appendChild(
        deleteButton
      );

      listItem.appendChild(
        choreText
      );

      listItem.appendChild(
        buttonArea
      );

      choreSettingsList.appendChild(
        listItem
      );

    }
  );
}

// 残高

function calculateWalletBalance(
  excludeRecordId = null
) {

  let walletBalance =
    0;

  records.forEach(
    function (record) {

      if (
        excludeRecordId !== null &&
        record.id === excludeRecordId
      ) {
        return;
      }

      const amount =
        Number(
          record.amount
        ) || 0;

      if (
        record.type === "income"
      ) {

        walletBalance +=
          amount;

      }

      if (
        record.type === "expense"
      ) {

        walletBalance -=
          amount;

      }

    }
  );

  return walletBalance;
}

function isSelectedMonth(
  record
) {

  return (
    typeof record.date === "string" &&
    record.date.startsWith(
      getSelectedMonth()
    )
  );
}

// カテゴリ別支出

function displayCategorySummary() {

  categorySummaryList.innerHTML =
    "";

  const selectedMonth =
    getSelectedMonth();

  const categoryTotals =
    {};

  records.forEach(
    function (record) {

      if (
        record.type !== "expense" ||
        !record.date ||
        !record.date.startsWith(
          selectedMonth
        )
      ) {
        return;
      }

      const category =
        record.category ||
        "その他";

      const amount =
        Number(
          record.amount
        ) || 0;

      if (
        !categoryTotals[
          category
        ]
      ) {

        categoryTotals[
          category
        ] = 0;

      }

      categoryTotals[
        category
      ] += amount;

    }
  );

  const categories =
    Object.keys(
      categoryTotals
    );

  if (
    categories.length === 0
  ) {

    const emptyMessage =
      document.createElement(
        "li"
      );

    emptyMessage.textContent =
      "この月の支出はまだありません";

    emptyMessage.classList.add(
      "category-empty-message"
    );

    categorySummaryList.appendChild(
      emptyMessage
    );

    return;
  }

  categories.sort(
    function (
      a,
      b
    ) {

      return (
        categoryTotals[b] -
        categoryTotals[a]
      );

    }
  );

  const totalExpense =
    Object.values(
      categoryTotals
    ).reduce(
      function (
        total,
        amount
      ) {

        return (
          total + amount
        );

      },
      0
    );

  categories.forEach(
    function (category) {

      const listItem =
        document.createElement(
          "li"
        );

      listItem.classList.add(
        "category-summary-item"
      );

      const categoryName =
        document.createElement(
          "span"
        );

      categoryName.textContent =
        category;

      const categoryAmount =
        document.createElement(
          "strong"
        );

      categoryAmount.textContent =
        `${categoryTotals[
          category
        ].toLocaleString()}円`;

      const percentage =
        totalExpense > 0
          ? Math.round(
              categoryTotals[
                category
              ] /
              totalExpense *
              100
            )
          : 0;

      const percentageText =
        document.createElement(
          "span"
        );

      percentageText.classList.add(
        "category-percentage"
      );

      percentageText.textContent =
        `${percentage}%`;

      const barArea =
        document.createElement(
          "div"
        );

      barArea.classList.add(
        "category-bar-area"
      );

      const bar =
        document.createElement(
          "div"
        );

      bar.classList.add(
        "category-bar"
      );

      bar.style.width =
        `${percentage}%`;

      barArea.appendChild(
        bar
      );

      const textArea =
        document.createElement(
          "div"
        );

      textArea.classList.add(
        "category-summary-text"
      );

      textArea.appendChild(
        categoryName
      );

      textArea.appendChild(
        categoryAmount
      );

      textArea.appendChild(
        percentageText
      );

      listItem.appendChild(
        textArea
      );

      listItem.appendChild(
        barArea
      );

      categorySummaryList.appendChild(
        listItem
      );

    }
  );
}

// 合計

function updateTotal() {

  let incomeTotal =
    0;

  let expenseTotal =
    0;

  const selectedMonth =
    getSelectedMonth();

  records.forEach(
    function (record) {

      if (
        !record.date ||
        !record.date.startsWith(
          selectedMonth
        )
      ) {
        return;
      }

      const amount =
        Number(
          record.amount
        ) || 0;

      if (
        record.type === "income"
      ) {

        incomeTotal +=
          amount;

      }

      if (
        record.type === "expense"
      ) {

        expenseTotal +=
          amount;

      }

    }
  );

  const balance =
    incomeTotal -
    expenseTotal;

  const budget =
    getSelectedBudget();

  const remainingBudget =
    budget -
    expenseTotal;

  const walletBalance =
    calculateWalletBalance();

  receivedTotal.textContent =
    `${incomeTotal.toLocaleString()}円`;

  spentTotal.textContent =
    `${expenseTotal.toLocaleString()}円`;

  budgetTotal.textContent =
    `${budget.toLocaleString()}円`;

  remainingBudgetTotal.textContent =
    `${remainingBudget.toLocaleString()}円`;

  remainingBudgetTotal.classList.remove(
    "budget-safe",
    "budget-warning",
    "budget-over"
  );

  if (
    budget === 0
  ) {

    budgetMessage.textContent =
      "今月の予算を設定してみよう";

    remainingBudgetTotal.classList.add(
      "budget-safe"
    );

  } else if (
    remainingBudget < 0
  ) {

    budgetMessage.textContent =
      `${Math.abs(
        remainingBudget
      ).toLocaleString()}円、予算をこえています`;

    remainingBudgetTotal.classList.add(
      "budget-over"
    );

  } else if (
    remainingBudget <=
    budget * 0.2
  ) {

    budgetMessage.textContent =
      "予算が残り少なくなっています";

    remainingBudgetTotal.classList.add(
      "budget-warning"
    );

  } else {

    budgetMessage.textContent =
      "予算の範囲内です";

    remainingBudgetTotal.classList.add(
      "budget-safe"
    );

  }

  balanceTotal.textContent =
    `${balance.toLocaleString()}円`;

  walletBalanceTotal.textContent =
    `${walletBalance.toLocaleString()}円`;

  summaryTitle.textContent =
    `${formatMonth(
      selectedMonth
    )}のまとめ`;

  displayCategorySummary();

  displaySavingsGoal();
}

function refreshScreen() {

  displayBudgetInput();

  displayRecords();

  updateTotal();
}

// 編集画面

function openEditModal(
  record
) {

  editingRecordId =
    record.id;

  editRecordAmount.value =
    record.amount;

  editRecordContent.value =
    record.content;

  editRecordDate.value =
    record.date;

  if (
    record.type === "expense"
  ) {

    editModalTitle.textContent =
      "使ったお金を編集";

    editCategoryArea.classList.remove(
      "hidden-field"
    );

    editRecordCategory.value =
      record.category ||
      "その他";

  } else {

    editModalTitle.textContent =
      "お手伝い記録を編集";

    editCategoryArea.classList.add(
      "hidden-field"
    );

  }

  editRecordModal.classList.remove(
    "is-hidden"
  );

  editRecordModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

  setTimeout(
    function () {

      editRecordAmount.focus();

    },
    50
  );
}

function closeEditModal() {

  editingRecordId =
    null;

  editRecordModal.classList.add(
    "is-hidden"
  );

  editRecordModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );
}

function saveEditedRecord() {

  const record =
    records.find(
      function (item) {

        return (
          item.id ===
          editingRecordId
        );

      }
    );

  if (!record) {

    closeEditModal();

    return;
  }

  const newAmount =
    Number(
      editRecordAmount.value
    );

  const newContent =
    editRecordContent.value.trim();

  const newDate =
    editRecordDate.value;

  if (
    newAmount <= 0 ||
    !Number.isInteger(
      newAmount
    )
  ) {

    alert(
      "金額は1円以上の整数を入力してください"
    );

    return;
  }

  if (
    newContent === ""
  ) {

    alert(
      "内容を入力してください"
    );

    return;
  }

  if (
    !isValidDate(
      newDate
    )
  ) {

    alert(
      "正しい日付を入力してください"
    );

    return;
  }

  if (
    record.type === "expense"
  ) {

    const availableMoney =
      calculateWalletBalance(
        record.id
      );

    if (
      newAmount >
      availableMoney
    ) {

      alert(
        `変更できる金額は最大${availableMoney.toLocaleString()}円です`
      );

      return;
    }

    record.category =
      editRecordCategory.value;

  } else {

    const balanceWithoutRecord =
      calculateWalletBalance(
        record.id
      );

    if (
      balanceWithoutRecord +
      newAmount <
      0
    ) {

      alert(
        "この金額に変更すると残高がマイナスになります"
      );

      return;
    }

  }

  record.amount =
    newAmount;

  record.content =
    newContent;

  record.date =
    newDate;

  saveRecords();

  monthSelect.value =
    newDate.slice(
      0,
      7
    );

  closeEditModal();

  refreshScreen();

  alert(
    "記録を変更しました"
  );
}

// 記録一覧

function displayRecords() {

  recordList.innerHTML =
    "";

  const selectedRecords =
    records.filter(
      isSelectedMonth
    );

  if (
    selectedRecords.length === 0
  ) {

    const emptyMessage =
      document.createElement(
        "li"
      );

    emptyMessage.textContent =
      "この月の記録はまだありません";

    emptyMessage.classList.add(
      "empty-message"
    );

    recordList.appendChild(
      emptyMessage
    );

    return;
  }

  selectedRecords.forEach(
    function (record) {

      const listItem =
        document.createElement(
          "li"
        );

      const recordText =
        document.createElement(
          "span"
        );

      const editButton =
        document.createElement(
          "button"
        );

      const deleteButton =
        document.createElement(
          "button"
        );

      const displayDate =
        formatDate(
          record.date
        );

      if (
        record.type === "income"
      ) {

        recordText.textContent =
          `${displayDate}　` +
          `＋${Number(
            record.amount
          ).toLocaleString()}円　` +
          `${record.content}`;

        listItem.classList.add(
          "income-record"
        );

      }

      if (
        record.type === "expense"
      ) {

        recordText.textContent =
          `${displayDate}　` +
          `－${Number(
            record.amount
          ).toLocaleString()}円　` +
          `【${record.category || "その他"}】` +
          `${record.content}`;

        listItem.classList.add(
          "expense-record"
        );

      }

      editButton.textContent =
        "編集";

      editButton.classList.add(
        "record-edit-button"
      );

      editButton.addEventListener(
        "click",
        function () {

          openEditModal(
            record
          );

        }
      );

      deleteButton.textContent =
        "削除";

      deleteButton.classList.add(
        "delete-button"
      );

      deleteButton.addEventListener(
        "click",
        function () {

          const shouldDelete =
            confirm(
              "この記録を削除しますか？"
            );

          if (!shouldDelete) {
            return;
          }

          records =
            records.filter(
              function (item) {

                return (
                  item.id !==
                  record.id
                );

              }
            );

          saveRecords();

          refreshScreen();

        }
      );

      listItem.appendChild(
        recordText
      );

      listItem.appendChild(
        editButton
      );

      listItem.appendChild(
        deleteButton
      );

      recordList.appendChild(
        listItem
      );

    }
  );
}

// 編集イベント

saveEditButton.addEventListener(
  "click",
  saveEditedRecord
);

cancelEditButton.addEventListener(
  "click",
  closeEditModal
);

editRecordModal.addEventListener(
  "click",
  function (event) {

    if (
      event.target ===
      editRecordModal
    ) {

      closeEditModal();

    }
  }
);

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      !editRecordModal.classList.contains(
        "is-hidden"
      )
    ) {

      closeEditModal();

    }
  }
);

// データ書き出し

exportDataButton.addEventListener(
  "click",
  function () {

    const exportData = {

      version: 4,

      appVersion:
        "0.11.0",

      exportedAt:
        new Date().toISOString(),

      chores:
        chores,

      records:
        records,

      budgets:
        budgets,

      savingsGoal:
        savingsGoal

    };

    const jsonText =
      JSON.stringify(
        exportData,
        null,
        2
      );

    const file =
      new Blob(
        [jsonText],
        {
          type:
            "application/json"
        }
      );

    const fileUrl =
      URL.createObjectURL(
        file
      );

    const downloadLink =
      document.createElement(
        "a"
      );

    downloadLink.href =
      fileUrl;

    downloadLink.download =
      `okozukai-data-${getToday()}.json`;

    document.body.appendChild(
      downloadLink
    );

    downloadLink.click();

    downloadLink.remove();

    URL.revokeObjectURL(
      fileUrl
    );

    alert(
      "データを書き出しました"
    );
  }
);

// データ読み込み

importDataInput.addEventListener(
  "change",
  function () {

    const selectedFile =
      importDataInput.files[0];

    if (!selectedFile) {
      return;
    }

    const reader =
      new FileReader();

    reader.addEventListener(
      "load",
      function () {

        try {

          const importedData =
            JSON.parse(
              reader.result
            );

          if (
            !importedData ||
            !Array.isArray(
              importedData.chores
            ) ||
            !Array.isArray(
              importedData.records
            ) ||
            !importedData.budgets ||
            typeof importedData.budgets !==
              "object" ||
            Array.isArray(
              importedData.budgets
            )
          ) {

            throw new Error(
              "データ形式が違います"
            );

          }

          const shouldImport =
            confirm(
              "現在のデータを、読み込んだデータに置き換えますか？"
            );

          if (!shouldImport) {

            importDataInput.value =
              "";

            return;
          }

          chores =
            importedData.chores;

          records =
            normalizeRecords(
              importedData.records
            );

          budgets =
            importedData.budgets;

          if (
            importedData.savingsGoal &&
            typeof importedData.savingsGoal ===
              "object" &&
            !Array.isArray(
              importedData.savingsGoal
            )
          ) {

            savingsGoal =
              importedData.savingsGoal;

          } else {

            savingsGoal =
              null;

          }

          saveChores();

          saveRecords();

          saveBudgets();

          saveSavingsGoal();

          displayChoreOptions();

          displayChoreSettings();

          displaySavingsGoalInput();

          refreshScreen();

          alert(
            "データを読み込みました"
          );

        } catch (error) {

          alert(
            "このファイルは読み込めません"
          );

          console.error(
            error
          );

        }

        importDataInput.value =
          "";

      }
    );

    reader.readAsText(
      selectedFile
    );
  }
);

// お手伝い設定追加

addChoreButton.addEventListener(
  "click",
  function () {

    const name =
      choreNameInput.value.trim();

    const amount =
      Number(
        choreAmountInput.value
      );

    if (
      name === "" ||
      amount <= 0 ||
      !Number.isInteger(
        amount
      )
    ) {

      alert(
        "お手伝いの名前と、1円以上の金額を入力してください"
      );

      return;
    }

    const alreadyExists =
      chores.some(
        function (chore) {

          return (
            chore.name ===
            name
          );

        }
      );

    if (alreadyExists) {

      alert(
        "同じ名前のお手伝いがすでにあります"
      );

      return;
    }

    const newChore = {

      id:
        Date.now(),

      name:
        name,

      amount:
        amount

    };

    chores.push(
      newChore
    );

    saveChores();

    displayChoreOptions();

    displayChoreSettings();

    choreSelect.value =
      String(
        newChore.id
      );

    amountInput.value =
      newChore.amount;

    choreNameInput.value =
      "";

    choreAmountInput.value =
      "";

    choreNameInput.focus();

  }
);

// お手伝い選択

choreSelect.addEventListener(
  "change",
  function () {

    const selectedOption =
      choreSelect.options[
        choreSelect.selectedIndex
      ];

    amountInput.value =
      selectedOption.dataset
        .amount ||
      "";

  }
);

// 月変更

monthSelect.addEventListener(
  "change",
  refreshScreen
);

// 予算保存

saveBudgetButton.addEventListener(
  "click",
  function () {

    const amount =
      Number(
        budgetAmountInput.value
      );

    if (
      amount < 0 ||
      !Number.isInteger(
        amount
      )
    ) {

      alert(
        "0円以上の整数を入力してください"
      );

      return;
    }

    const selectedMonth =
      getSelectedMonth();

    budgets[
      selectedMonth
    ] = amount;

    saveBudgets();

    updateTotal();

    alert(
      `${formatMonth(
        selectedMonth
      )}の予算を保存しました`
    );

  }
);

// お手伝い記録

recordButton.addEventListener(
  "click",
  function () {

    const selectedOption =
      choreSelect.options[
        choreSelect.selectedIndex
      ];

    const amount =
      Number(
        selectedOption.dataset
          .amount
      );

    const content =
      selectedOption.dataset
        .name;

    const recordDate =
      choreDateInput.value;

    if (
      choreSelect.value === "" ||
      amount <= 0 ||
      !content ||
      recordDate === ""
    ) {

      alert(
        "お手伝いと日付を選んでください"
      );

      return;
    }

    const newRecord = {

      id:
        Date.now(),

      type:
        "income",

      amount:
        amount,

      content:
        content,

      date:
        recordDate

    };

    records.push(
      newRecord
    );

    saveRecords();

    monthSelect.value =
      recordDate.slice(
        0,
        7
      );

    refreshScreen();

    choreSelect.value =
      "";

    amountInput.value =
      "";

    choreDateInput.value =
      getToday();

    choreSelect.focus();

  }
);

// 支出記録

expenseButton.addEventListener(
  "click",
  function () {

    const amount =
      Number(
        expenseAmountInput.value
      );

    const content =
      expenseContentInput.value.trim();

    const category =
      expenseCategorySelect.value;

    const recordDate =
      expenseDateInput.value;

    if (
      amount <= 0 ||
      !Number.isInteger(
        amount
      ) ||
      content === "" ||
      category === "" ||
      recordDate === ""
    ) {

      alert(
        "金額・内容・カテゴリ・日付を入力してください"
      );

      return;
    }

    const walletBalance =
      calculateWalletBalance();

    if (
      amount >
      walletBalance
    ) {

      alert(
        `持っているお金は${walletBalance.toLocaleString()}円です`
      );

      return;
    }

    const newRecord = {

      id:
        Date.now(),

      type:
        "expense",

      amount:
        amount,

      content:
        content,

      category:
        category,

      date:
        recordDate

    };

    records.push(
      newRecord
    );

    saveRecords();

    monthSelect.value =
      recordDate.slice(
        0,
        7
      );

    refreshScreen();

    expenseAmountInput.value =
      "";

    expenseContentInput.value =
      "";

    expenseCategorySelect.value =
      "";

    expenseDateInput.value =
      getToday();

    expenseAmountInput.focus();

  }
);

// 初期表示

monthSelect.value =
  getCurrentMonth();

choreDateInput.value =
  getToday();

expenseDateInput.value =
  getToday();

saveChores();

saveRecords();

saveBudgets();

saveSavingsGoal();

displayChoreOptions();

displayChoreSettings();

displaySavingsGoalInput();

refreshScreen();