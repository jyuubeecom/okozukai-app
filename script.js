// お手伝い設定
const choreNameInput =
  document.getElementById("chore-name");

const choreAmountInput =
  document.getElementById("chore-amount");

const addChoreButton =
  document.getElementById("add-chore-button");

const choreSettingsList =
  document.getElementById("chore-settings-list");

// お手伝い入力
const choreSelect =
  document.getElementById("chore-select");

const amountInput =
  document.getElementById("amount");

const recordButton =
  document.getElementById("record-button");

const choreDateInput =
  document.getElementById("chore-date");

// 支出入力
const expenseAmountInput =
  document.getElementById("expense-amount");

const expenseContentInput =
  document.getElementById("expense-content");

  const expenseCategorySelect =
  document.getElementById(
    "expense-category"
  );

const expenseButton =
  document.getElementById("expense-button");

const expenseDateInput =
  document.getElementById("expense-date");
// 月選択
const monthSelect =
  document.getElementById("month-select");

  // 予算設定
const budgetAmountInput =
  document.getElementById("budget-amount");

const saveBudgetButton =
  document.getElementById(
    "save-budget-button"
  );

// 表示部分
const summaryTitle =
  document.getElementById("summary-title");

const recordList =
  document.getElementById("record-list");

  // データ管理
const exportDataButton =
  document.getElementById(
    "export-data-button"
  );

const importDataInput =
  document.getElementById(
    "import-data-input"
  );

  const categorySummaryList =
  document.getElementById(
    "category-summary-list"
  );

const receivedTotal =
  document.getElementById("received-total");

const spentTotal =
  document.getElementById("spent-total");

const balanceTotal =
  document.getElementById("balance-total");

  const budgetTotal =
  document.getElementById("budget-total");

const remainingBudgetTotal =
  document.getElementById(
    "remaining-budget-total"
  );

  const budgetMessage =
  document.getElementById("budget-message");

const walletBalanceTotal =
  document.getElementById(
    "wallet-balance-total"
  );
// 最初から入っているお手伝い
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

// 保存済みのお手伝い設定を読み込む
const savedChores =
  JSON.parse(localStorage.getItem("chores"));

let chores = Array.isArray(savedChores)
  ? savedChores
  : defaultChores.map(function (chore) {
      return { ...chore };
    });

// 保存済みの記録を読み込む
const savedRecords =
  JSON.parse(localStorage.getItem("records"));

let records = Array.isArray(savedRecords)
  ? savedRecords
  : [];

  // 保存済みの予算を読み込む
const savedBudgets =
  JSON.parse(localStorage.getItem("budgets"));

let budgets =
  savedBudgets &&
  typeof savedBudgets === "object" &&
  !Array.isArray(savedBudgets)
    ? savedBudgets
    : {};

// 今日の日付を取得する
function getToday() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 今月を取得する
function getCurrentMonth() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  return `${year}-${month}`;
}

// 日付を「7/18」の形にする
function formatDate(dateText) {
  const parts = dateText.split("-");

  return `${Number(parts[1])}/${Number(parts[2])}`;
}

// 月を「2026年7月」の形にする
function formatMonth(monthText) {
  const parts = monthText.split("-");

  return `${parts[0]}年${Number(parts[1])}月`;
}

// 選択している月を取得する
function getSelectedMonth() {
  return monthSelect.value || getCurrentMonth();
}

// 古い記録に種類と日付を追加する
records = records.map(function (record) {
  return {
    ...record,
    type: record.type || "income",
    date: record.date || getToday(),
    category:
      record.category || "その他"
  };
});

// お手伝い設定を保存する
function saveChores() {
  localStorage.setItem(
    "chores",
    JSON.stringify(chores)
  );
}

// 記録を保存する
function saveRecords() {
  localStorage.setItem(
    "records",
    JSON.stringify(records)
  );
}

// 予算を保存する
function saveBudgets() {
  localStorage.setItem(
    "budgets",
    JSON.stringify(budgets)
  );
}

// 選択中の月の予算を取得する
function getSelectedBudget() {
  const selectedMonth =
    getSelectedMonth();

  return Number(
    budgets[selectedMonth]
  ) || 0;
}

// 予算入力欄を更新する
function displayBudgetInput() {
  const budget =
    getSelectedBudget();

  if (budget > 0) {
    budgetAmountInput.value =
      budget;
  } else {
    budgetAmountInput.value = "";
  }
}

// お手伝い選択欄を作る
function displayChoreOptions() {
  choreSelect.innerHTML = "";

  const firstOption =
    document.createElement("option");

  firstOption.value = "";
  firstOption.textContent =
    "お手伝いを選んでください";

  choreSelect.appendChild(firstOption);

  chores.forEach(function (chore) {
    const option =
      document.createElement("option");

    option.value = String(chore.id);
    option.textContent =
      `${chore.name}　${chore.amount.toLocaleString()}円`;

    option.dataset.name = chore.name;
    option.dataset.amount = String(chore.amount);

    choreSelect.appendChild(option);
  });
}

// お手伝い設定一覧を表示する
function displayChoreSettings() {
  choreSettingsList.innerHTML = "";

  if (chores.length === 0) {
    const emptyMessage =
      document.createElement("li");

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

  chores.forEach(function (chore) {
    const listItem =
      document.createElement("li");

    listItem.classList.add(
      "chore-setting-item"
    );

    const choreText =
      document.createElement("span");

    choreText.textContent =
      `${chore.name}　${chore.amount.toLocaleString()}円`;

    const buttonArea =
      document.createElement("div");

    buttonArea.classList.add(
      "chore-setting-buttons"
    );

    const editButton =
      document.createElement("button");

    editButton.textContent = "金額変更";

    editButton.classList.add(
      "edit-chore-button"
    );

    const deleteButton =
      document.createElement("button");

    deleteButton.textContent = "削除";

    deleteButton.classList.add(
      "remove-chore-button"
    );

    // 金額変更ボタン
    editButton.addEventListener(
      "click",
      function () {
        const newAmountText = prompt(
          `${chore.name}の新しい金額を入力してください`,
          chore.amount
        );

        if (newAmountText === null) {
          return;
        }

        const newAmount =
          Number(newAmountText);

        if (
          newAmount <= 0 ||
          !Number.isInteger(newAmount)
        ) {
          alert(
            "1円以上の整数を入力してください"
          );

          return;
        }

        chore.amount = newAmount;

        saveChores();
        displayChoreOptions();
        displayChoreSettings();
      }
    );

    // 設定削除ボタン
    deleteButton.addEventListener(
      "click",
      function () {
        const shouldDelete = confirm(
          `${chore.name}を設定から削除しますか？\n過去の記録は残ります。`
        );

        if (!shouldDelete) {
          return;
        }

        chores = chores.filter(
          function (item) {
            return item.id !== chore.id;
          }
        );

        saveChores();
        displayChoreOptions();
        displayChoreSettings();
      }
    );

    buttonArea.appendChild(editButton);
    buttonArea.appendChild(deleteButton);

    listItem.appendChild(choreText);
    listItem.appendChild(buttonArea);

    choreSettingsList.appendChild(
      listItem
    );
  });
}

// 選択した月の記録か確認する
function isSelectedMonth(record) {
  return record.date.startsWith(
    getSelectedMonth()
  );
}
// すべての記録から現在の残高を計算する
function calculateWalletBalance() {
  let walletBalance = 0;

  records.forEach(function (record) {
    const amount =
      Number(record.amount) || 0;

    if (record.type === "income") {
      walletBalance += amount;
    }

    if (record.type === "expense") {
      walletBalance -= amount;
      
    }
  });

  return walletBalance;
}

// 選択している月のカテゴリ別支出を表示する
function displayCategorySummary() {
  categorySummaryList.innerHTML = "";

  const selectedMonth =
    getSelectedMonth();

  const categoryTotals = {};

  records.forEach(function (record) {
    if (
      record.type !== "expense" ||
      !record.date ||
      !record.date.startsWith(selectedMonth)
    ) {
      return;
    }

    const category =
      record.category || "その他";

    const amount =
      Number(record.amount) || 0;

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    categoryTotals[category] += amount;
  });

  const categories =
    Object.keys(categoryTotals);

  if (categories.length === 0) {
    const emptyMessage =
      document.createElement("li");

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

  categories.sort(function (a, b) {
    return (
      categoryTotals[b] -
      categoryTotals[a]
    );
  });

  categories.forEach(function (category) {
    const listItem =
      document.createElement("li");

    listItem.classList.add(
      "category-summary-item"
    );

    const categoryName =
      document.createElement("span");

    categoryName.textContent =
      category;

const totalExpense =
  Object.values(categoryTotals).reduce(
    function (total, amount) {
      return total + amount;
    },
    0
  );

const categoryAmount =
  document.createElement("strong");

categoryAmount.textContent =
  `${categoryTotals[
    category
  ].toLocaleString()}円`;

const percentage =
  totalExpense > 0
    ? Math.round(
        categoryTotals[category] /
        totalExpense *
        100
      )
    : 0;

const percentageText =
  document.createElement("span");

percentageText.classList.add(
  "category-percentage"
);

percentageText.textContent =
  `${percentage}%`;

const barArea =
  document.createElement("div");

barArea.classList.add(
  "category-bar-area"
);

const bar =
  document.createElement("div");

bar.classList.add("category-bar");

bar.style.width =
  `${percentage}%`;

barArea.appendChild(bar);

const textArea =
  document.createElement("div");

textArea.classList.add(
  "category-summary-text"
);

textArea.appendChild(categoryName);
textArea.appendChild(categoryAmount);
textArea.appendChild(percentageText);

listItem.appendChild(textArea);
listItem.appendChild(barArea);

    categorySummaryList.appendChild(
      listItem
    );
  });
}

// 合計金額を計算して表示する
function updateTotal() {
  let incomeTotal = 0;
  let expenseTotal = 0;

  const selectedMonth =
    getSelectedMonth();

  records.forEach(function (record) {
    if (
      !record.date ||
      !record.date.startsWith(selectedMonth)
    ) {
      return;
    }

    const amount =
      Number(record.amount) || 0;

    if (record.type === "income") {
      incomeTotal += amount;
    }

    if (record.type === "expense") {
      expenseTotal += amount;
    }
  });

  const balance =
    incomeTotal - expenseTotal;

    const budget =
  getSelectedBudget();

const remainingBudget =
  budget - expenseTotal;

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

if (budget === 0) {
  budgetMessage.textContent =
    "今月の予算を設定してみよう";

  remainingBudgetTotal.classList.add(
    "budget-safe"
  );
} else if (remainingBudget < 0) {
  budgetMessage.textContent =
    `${Math.abs(remainingBudget).toLocaleString()}円、予算をこえています`;

  remainingBudgetTotal.classList.add(
    "budget-over"
  );
} else if (remainingBudget <= budget * 0.2) {
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

  if (summaryTitle) {
    summaryTitle.textContent =
      `${formatMonth(selectedMonth)}のまとめ`;
  }

  displayCategorySummary();

}

// 記録一覧を表示する
function displayRecords() {
  recordList.innerHTML = "";

  const selectedRecords =
    records.filter(isSelectedMonth);

  if (selectedRecords.length === 0) {
    const emptyMessage =
      document.createElement("li");

    emptyMessage.textContent =
      "この月の記録はまだありません";

    emptyMessage.classList.add(
      "empty-message"
    );

    recordList.appendChild(emptyMessage);

    return;
  }
  

  selectedRecords.forEach(
    function (record) {
      const listItem =
        document.createElement("li");

      const recordText =
        document.createElement("span");

      const deleteButton =
        document.createElement("button");

      const displayDate =
        formatDate(record.date);

      if (record.type === "income") {
        recordText.textContent =
          `${displayDate}　＋${record.amount.toLocaleString()}円　${record.content}`;

        listItem.classList.add(
          "income-record"
        );
      }

if (record.type === "expense") {
  recordText.textContent =
    `${displayDate}　－${record.amount.toLocaleString()}円　【${record.category || "その他"}】${record.content}`;

  listItem.classList.add(
    "expense-record"
  );
}

      deleteButton.textContent = "削除";

      deleteButton.classList.add(
        "delete-button"
      );

      deleteButton.addEventListener(
        "click",
        function () {
          records = records.filter(
            function (item) {
              return item.id !== record.id;
            }
          );

          saveRecords();
          displayRecords();
          updateTotal();
        }
      );

      listItem.appendChild(recordText);
      listItem.appendChild(deleteButton);

      recordList.appendChild(listItem);
    }
  );
}

// 記録や設定をファイルに書き出す
exportDataButton.addEventListener(
  "click",
  function () {
    const exportData = {
      version: 1,
      exportedAt:
        new Date().toISOString(),
      chores: chores,
      records: records,
      budgets: budgets
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
          type: "application/json"
        }
      );

    const fileUrl =
      URL.createObjectURL(file);

    const downloadLink =
      document.createElement("a");

    const today =
      getToday();

    downloadLink.href =
      fileUrl;

    downloadLink.download =
      `okozukai-data-${today}.json`;

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

// ファイルからデータを読み込む
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
            typeof importedData.budgets
              !== "object"
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
            importDataInput.value = "";
            return;
          }

          chores =
            importedData.chores;

          records =
            importedData.records;

          budgets =
            importedData.budgets || {};

          saveChores();
          saveRecords();
          saveBudgets();

          displayChoreOptions();
          displayChoreSettings();
          displayBudgetInput();
          displayRecords();
          updateTotal();

          alert(
            "データを読み込みました"
          );
        } catch (error) {
          alert(
            "このファイルは読み込めません"
          );

          console.error(error);
        }

        importDataInput.value = "";
      }
    );

    reader.readAsText(
      selectedFile
    );
  }
);

// お手伝い設定を追加する
addChoreButton.addEventListener(
  "click",
  function () {
    const name =
      choreNameInput.value.trim();

    const amount =
      Number(choreAmountInput.value);

    if (
      name === "" ||
      amount <= 0 ||
      !Number.isInteger(amount)
    ) {
      alert(
        "お手伝いの名前と、1円以上の金額を入力してください"
      );

      return;
    }

    const alreadyExists =
      chores.some(function (chore) {
        return chore.name === name;
      });

    if (alreadyExists) {
      alert(
        "同じ名前のお手伝いがすでにあります"
      );

      return;
    }

    const newChore = {
      id: Date.now(),
      name: name,
      amount: amount
    };

    chores.push(newChore);

    saveChores();
    displayChoreOptions();
    displayChoreSettings();

    choreSelect.value =
      String(newChore.id);

    amountInput.value =
      newChore.amount;

    choreNameInput.value = "";
    choreAmountInput.value = "";
    choreNameInput.focus();
  }
);
// お手伝いを選んだとき
choreSelect.addEventListener(
  "change",
  function () {
    const selectedOption =
      choreSelect.options[
        choreSelect.selectedIndex
      ];

    amountInput.value =
      selectedOption.dataset.amount || "";
  }
);

// 月を変更したとき
monthSelect.addEventListener(
  "change",
  function () {
    displayBudgetInput();
    displayRecords();
    updateTotal();
  }
);

// 予算を保存する
saveBudgetButton.addEventListener(
  "click",
  function () {
    const amount =
      Number(budgetAmountInput.value);

    if (
      amount < 0 ||
      !Number.isInteger(amount)
    ) {
      alert(
        "0円以上の整数を入力してください"
      );

      return;
    }

    const selectedMonth =
      getSelectedMonth();

    budgets[selectedMonth] =
      amount;

    saveBudgets();
    updateTotal();

    alert(
      `${formatMonth(selectedMonth)}の予算を保存しました`
    );
  }
);

// お手伝いを記録する
recordButton.addEventListener(
  "click",
  function () {
    const selectedOption =
      choreSelect.options[
        choreSelect.selectedIndex
      ];

    const amount =
      Number(selectedOption.dataset.amount);

    const content =
      selectedOption.dataset.name;

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
      id: Date.now(),
      type: "income",
      amount: amount,
      content: content,
      date: recordDate
    };

    records.push(newRecord);

    saveRecords();

    monthSelect.value =
      recordDate.slice(0, 7);

    displayRecords();
    updateTotal();

    choreSelect.value = "";
    amountInput.value = "";
    choreDateInput.value = getToday();
    choreSelect.focus();
  }
);
// 使ったお金を記録する
expenseButton.addEventListener(
  "click",
  function () {
    const amount =
      Number(expenseAmountInput.value);

const content =
  expenseContentInput.value.trim();

const category =
  expenseCategorySelect.value;

const recordDate =
  expenseDateInput.value;
if (
  amount <= 0 ||
  !Number.isInteger(amount) ||
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

    if (amount > walletBalance) {
      alert(
        `持っているお金は${walletBalance.toLocaleString()}円です`
      );

      return;
    }

const newRecord = {
  id: Date.now(),
  type: "expense",
  amount: amount,
  content: content,
  category: category,
  date: recordDate
};

    records.push(newRecord);

    saveRecords();

    monthSelect.value =
      recordDate.slice(0, 7);

    displayRecords();
    updateTotal();

expenseAmountInput.value = "";
expenseContentInput.value = "";
expenseCategorySelect.value = "";
expenseDateInput.value = getToday();
expenseAmountInput.focus();
  }
);
// 最初に今月を表示する
monthSelect.value =
  getCurrentMonth();

// 日付欄に今日の日付を入れる
choreDateInput.value =
  getToday();

expenseDateInput.value =
  getToday();

saveChores();
saveRecords();
saveBudgets();

displayChoreOptions();
displayChoreSettings();
displayBudgetInput();
displayRecords();
updateTotal();