const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('./extract/Extrato global.pdf');

pdf(dataBuffer).then(function (data) {
    console.log(data.text);
    var expenses = data.text.match(/\d{4}-\d{2}-\d{6}-\d{2}-\d{2}[a-zA-Z0-9_ ]{10,22}\d{0,10}-\d{1,3},\d{2}/g);
    var income = data.text.match(/\d{4}-\d{2}-\d{6}-\d{2}-\d{2}[a-zA-Z0-9_ ]{10,22}\d{0,10}\d{1,3},\d{2}/g);
    var totalExpenses = 0, foodExpense = 0, money = 0, invest = 0, telecomunication = 0;
    var otherExpenses = 0;
    for (var i = 0; i < expenses.length; i++) {

        var description = expenses[i].match(/[A-Za-z_ ]{8,24}|[A-Za-z_ ]{5}\d{1}[A-Za-z_ ]{2}/g)[0].toLowerCase();
        var value = parseFloat(expenses[i].match(/-\d{1,3},\d{2}/g)[0].replace(',', '.'));

        if ((description.includes('aldi') || description.includes('continente')
            || description.includes('mo cancela') || description.includes('sushi')
            || description.includes('subway') || description.includes('varunca')
            || description.includes('hambur'))
            && description.includes('compra')) {
            foodExpense += value;
        } else if (description.includes('levantamento')) {
            money += value;
        } else if ((description.includes('bondora') || description.includes('mintos')
            || description.includes('degiro')) && description.includes('compra')) {
            invest += value;
        } else if (description.includes('wtf')) {
            telecomunication += value;
        } else {
            otherExpenses += value;
        }

        totalExpenses += value;
    }
    if (Math.round(money + foodExpense + invest + telecomunication + otherExpenses * 100) / 100 <= totalExpenses) {
        /*  console.log(money + foodExpense + invest + telecomunication + otherExpenses, 'expenses');
          console.log(totalExpenses, 'totalExpenses');
          console.log('something went wrong...')*/
    }

    /*console.log(money, 'money');
    console.log(foodExpense, 'foodExpense');
    console.log(invest, 'invest');
    console.log(telecomunication, 'telecomunication');
    console.log(otherExpenses, 'otherExpenses');
    console.log(totalExpenses, 'totalExpenses');*/

    //TODO: COLOCAR MATCH DO INCOME
    var income = data.text.match(/\d{4}-\d{2}-\d{6}-\d{2}-\d{2}[a-zA-Z0-9_ ]{10,22}\d{0,10}-\d{1,3},\d{2}/g);
    for (var i = 0; i < income.length; i++) {
    }

}); 