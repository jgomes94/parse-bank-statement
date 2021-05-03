const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('./extract/FEV-2021Extrato global.pdf');

pdf(dataBuffer).then(async function (data) {
  console.log(data.text);
  var expenses = data.text.match(/\d{4}-\d{2}-\d{6}-\d{2}-\d{2}[a-zA-Z0-9_ ]{10,22}\d{0,10}-\d{1,3},\d{2}/g);
  var income = data.text.match(/\d{4}-\d{2}-\d{6}-\d{2}-\d{2}[a-zA-Z0-9_ ]{10,22}\d{0,10}\d{1,3},\d{2}/g);
  var totalExpenses = 0, resturantExpense = 0, money = 0, invest = 0, telecomunication = 0, rent = 0, supermarketExpense=0,reacurringbills=0;
  var otherExpenses = 0;
  console.log('expenses', expenses)

  for (var i = 0; i < expenses.length; i++) {
    var description = expenses[i].match(/[A-Za-z_ ]{4,24}|[A-Za-z_ ]{5}\d{1}[A-Za-z_ ]{2}/g)[0].toLowerCase();
    var value = parseFloat(expenses[i].match(/-\d{1,3},\d{2}/g)[0].replace(',', '.'));

    console.log('description', description, value)

    if ((description.includes('aldi') || description.includes('continente')
      || description.includes('mo cancela') || description.includes('sushi')
      || description.includes('subway') || description.includes('varunca')
      || description.includes('copenhagen') || description.includes('pg')
      || description.includes('hambur')) || description.includes('pizza')
      || description.includes('marcearia')
      || description.includes('hambur')) {
      resturantExpense += value;
    } else if (description.includes('aldi') || description.includes('lidl') 
      || description.includes('minipreco') || description.includes('mo cancela') 
      || description.includes('pg') ) {
      supermarketExpense += value;
    } else if (description.includes('levantamento')) {
      money += value;
    } else if ((description.includes('bondora')
      || description.includes('mintos')
      || description.includes('degiro'))) {
      invest += value;
    } else if (description.includes('axosoft') || description.includes('comissao conta caixa')) {
      reacurringbills += value;
    } else if (description.includes('wtf')) {
      telecomunication += value;
    } else if (description.includes('renda')) {
      rent += value;
    } else {
      otherExpenses += value;
    }

    totalExpenses += value;
  }

  //PASS THIS TO INDIIVUDAL FUNCTIOn
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
      path: 'extracted_data/file.csv',
      header: [
          {id: 'name', title: 'NAME'},
          {id: 'value', title: 'VALUE'}
      ]
  });

  const records = [
    {name: 'Rent',  value: rent},
    {name: 'Restaurants', value: resturantExpense},
    {name: 'Supermarket',  value: supermarketExpense},
    {name: 'Cash',  value: money},
    {name: 'Investment',  value: invest},
    {name: 'Reacurring',  value: reacurringbills},
    {name: 'Telecommunication',  value: telecomunication},
    {name: 'Other',  value: otherExpenses},
  ];
 
   await csvWriter.writeRecords(records)   

  console.log(money, 'money');
  console.log(resturantExpense, 'resturantExpense');
  console.log(supermarketExpense, 'supermarketExpense');
  console.log(invest, 'invest');
  console.log(reacurringbills, 'reacurringbills');
  console.log(rent, 'rent');
  console.log(telecomunication, 'telecomunication');
  console.log(otherExpenses, 'otherExpenses');
  console.log(totalExpenses, 'totalExpenses');

  //TODO: COLOCAR MATCH DO INCOME
  var income = data.text.match(/\d{4}-\d{2}-\d{6}-\d{2}-\d{2}[a-zA-Z0-9_ ]{10,22}\d{0,10}-\d{1,3},\d{2}/g);

});



async function create_results_csv_file(param){
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
      path: 'path/to/file.csv',
      header: [
          {id: 'name', title: 'NAME'},
          {id: 'lang', title: 'LANGUAGE'}
      ]
  });

  const records = [
    {name: 'Rent',  value: param.rent},
    {name: 'Restaurants', value: param.resturantExpense},
    {name: 'Supermarket',  value: param.supermarketExpense},
    {name: 'Cash',  value: param.money},
    {name: 'Investment',  value: param.invest},
    {name: 'Reacurring',  value: param.reacurringbills},
    {name: 'Telecommunication',  value: param.telecomunication},
    {name: 'Other',  value: param.otherExpenses},
  ];
 
   await csvWriter.writeRecords(records)   
}