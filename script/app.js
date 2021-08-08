const bill = document.getElementById('bill')
const customTip = document.getElementById('custom-tip')
const people = document.getElementById('people')
const tips = document.querySelectorAll('input[type=radio]');
const tipAmountElement = document.querySelector('#tip-amount');
const totalBillElement = document.querySelector('#total-bill');
const resetButton = document.querySelector('#btn-reset');
const defaultMoney = '$0.00'

function calculateTip() {
    let tipValue = customTip.value;
    tips.forEach(item => {
        if (item.checked) tipValue = item.value;
    })

    let tipAmount = 0;
    let total = 0;
    if (bill.value && people.value){
        tipAmount = bill.value * (tipValue / 100) / people.value;
        total = (bill.value / people.value) + tipAmount;
    }

    let conditions = [bill.value, tipAmount, people.value]
    if(conditions.every(item => item > 0)) {
        tipAmountElement.innerHTML = `$${tipAmount.toFixed(2)}`;
        totalBillElement.innerHTML = `$${total.toFixed(2)}`;
        resetButton.disabled = false;
    } else {
        tipAmountElement.innerHTML = defaultMoney;
        totalBillElement.innerHTML = defaultMoney;
    }
}

function uncheckTip() {
    tips.forEach(item => {
        if (item.checked) {
            item.checked = false;
        }
    })
}

function deleteCustomTip() {
    customTip.value = '';
}

function resetCalc() {
    bill.value = '';
    customTip.value = '';
    people.value = '';
    tips.forEach(item => item.checked = false);
    tipAmountElement.innerHTML = '$0.00';
    totalBillElement.innerHTML = '$0.00';
    resetButton.disabled = true;
}

function zeroAlert() {
    const strongCyan = 'hsl(172, 67%, 45%)';
    const red = 'red';
    const alertText = `Can't be zero`;

    const billAlert = document.getElementById('bill-alert');
    if (bill.value === '0') {
        document.documentElement.style.setProperty('--billborder', red);
        billAlert.innerHTML = alertText;
    } else {
        document.documentElement.style.setProperty('--billborder', strongCyan);
        billAlert.innerHTML = '';
    }

    const peopleAlert = document.getElementById('people-alert');
    if (people.value === '0') {
        document.documentElement.style.setProperty(`--peopleborder`, red);
        peopleAlert.innerHTML = alertText;
    } else {
        document.documentElement.style.setProperty(`--peopleborder`, strongCyan);
        peopleAlert.innerHTML = '';
    }

    if (customTip.value === '0') {
        document.documentElement.style.setProperty(`--customborder`, red);
    } else {
        document.documentElement.style.setProperty(`--customborder`, strongCyan);
    }
}

tips.forEach(item => {
    item.addEventListener('click', deleteCustomTip);
})
customTip.addEventListener('click', uncheckTip);
resetButton.addEventListener('click', resetCalc);
window.addEventListener('keyup', zeroAlert);
window.addEventListener('keyup', calculateTip);
window.addEventListener('change', calculateTip);