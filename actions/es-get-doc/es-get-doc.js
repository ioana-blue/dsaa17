// the action receives the id of a doc to be retrieved from ES
// the information required to connect to elastic search is received through the package parameter bindings

// params.index  - the elasticsearch index
// parmas.type  - the elasticsearch type

function main(params){
	return new Promise((resolve, reject) => {
		// create elasticsearch client
		var elasticsearch = require('elasticsearch')
		var client = new elasticsearch.Client({
			  host: `https://${params.esAuth}@${params.esHost}`,
			  log: 'trace'
			})
		// the index
		var theIndex = params.index
		var theType = params.type
		var theId = params.id
		client.get({
			  index: theIndex,
			  type: theType,
			  id: theId
			}, function (error, response) {
			  if (error)
				  reject(error)
		      console.log(response)
		      resolve(response)
			})
	})
}

exports.main = main
