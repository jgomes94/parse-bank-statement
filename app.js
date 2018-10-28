const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('./extract/Extrato global.pdf');

pdf(dataBuffer).then(function (data) {
    var expenses = data.text.match(/\d{4}-\d{2}-\d{6}-\d{2}-\d{2}[a-zA-Z0-9_ ]{10,22}\d{0,10}-\d{1,3},\d{2}/g);
    var totalExpenses = 0;
    for (var i = 0; i < expenses.length; i++) {
        var description = expenses[i].match(/[A-Za-z_ ]{8,24}|[A-Za-z_ ]{5}\d{1}[A-Za-z_ ]{2}/g)[0]
        var value = expenses[i].match(/-\d{1,3},\d{2}/g)[0].replace(',', '.');
        totalExpenses += parseFloat(value);
    }

    console.log(totalExpenses, 'totalExpenses')







    /*    var income = data.text.match(/\d{4}-\d{2}-\d{6}-\d{2}-\d{2}[a-zA-Z0-9_ ]{10,22}\d{0,10}-\d{1,3},\d{2}/g);
    for (var i = 0; i < income.length; i++) {
    }*/






}); 