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
    return { doc: {docid: params.docid, relevant: parseInt(params.relevant)} }
}
