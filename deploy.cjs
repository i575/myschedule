const ghpages = require('gh-pages')

ghpages.publish(
	'dist',
	{
		repo: 'https://github.com/i575/myschedule.git',
	},
	err => console.log(err),
)
