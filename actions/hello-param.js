/**
 *
 * main() will be invoked when you Run This Action
 *
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 *
 * @return The output of this action, which must be a JSON object.
 *
 */
function main(params) {
    if (params.name)
	return { body: 'Hello ' + params.name + '!'}
    return { body: 'Hello DSAA17!'}
}
