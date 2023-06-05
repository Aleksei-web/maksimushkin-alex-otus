const qs = require('querystring')
const axios = require('axios')
const parseString = require('xml2js').parseString;

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const requestBody = {
  INN: '9998887878',
  RegDate: '2019-12-01'
}
console.log(qs.stringify(requestBody));

axios.post('http://payaction.ru/uop/check.php', qs.stringify(requestBody), config)
	.then(res => {
		console.log(res.data.split('</head>')[1].includes('OK'));
	})
	.catch(er => {
		console.log(er);
	})

