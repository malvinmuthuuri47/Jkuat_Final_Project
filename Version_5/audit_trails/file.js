const fs = require('node:fs');
const content = 'Some content';

fs.writeFile('test.txt', content, { flag: 'a+' },  err => {
	if (err)
	{
		console.log(err)
	} else {
		console.log('File written successfully');
	}
});
