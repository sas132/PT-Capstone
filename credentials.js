module.exports = {
    mongo: {
        development: {
            connectionString: 'mongodb://localhost:27017/test'
        },
        production: {
            connectionString: 'mongodb://test:password1@ds211259.mlab.com:11259/heroku_p2nnx61j'
        }
	}
};