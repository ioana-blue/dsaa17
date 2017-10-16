/**
 *
 * main() will be invoked when you Run This Action
 *
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 *
 * @return The output of this action, which must be a JSON object.
 *
 */
var openwhisk = require('openwhisk')

function main(parameters) {
    var id = 0
    if (parameters.id)
	id = parameters.id

    const name = 'es/es-get-doc'
    const params = {id: id}
    var ow = openwhisk()

    return ow.actions.invoke({name: name, blocking: true, params: params}).then(result => {
        console.log('here is the doc', result.response.result._source)
	return {body: result.response.result._source}
    }).catch(err => {
	console.error('failed to invoke action ', err)
	return {body: err}
    })
}
