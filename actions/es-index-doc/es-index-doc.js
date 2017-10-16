// the action receives the doc to be retrieved from ES
// the information required to connect to elastic search is received through the package parameter bindings

// params.index  - the elasticsearch index
// parmas.type  - the elasticsearch type

function main(params){
	return new Promise((resolve, reject) => {
		// create elasticsearch client
		var elasticsearch = require('elasticsearch')
		var client = new elasticsearch.Client({
			  host: `https://${params.esAuth}@${params.esHost}`,
			  log: 'error'
			})
		// the index
		var theIndex = params.index
		var theType = params.type
		var theDoc = params.doc
		client.index({
			  index: theIndex,
			  type: theType,
			  body: theDoc
			}, function (error, response) {
			  if (error)
			      reject(error)
		          console.log(response)
		          resolve(response)
	       })
	    }).then(() => {return {body: 'Thank you for your input. Your answer was recorded'}})
}

exports.main = main
