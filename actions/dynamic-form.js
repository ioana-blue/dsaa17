var openwhisk = require('openwhisk')

const htmlContent = `<html lang="en">
    <head>
      <title>DSAA17 - Data Collection</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </head>
    <body>
    <!-- Form Name -->
    <legend>DSAA17 Tutorial</legend>

    

   <form class="form-horizontal" action="https://openwhisk.ng.bluemix.net/api/v1/web/ioana@us.ibm.com_DSAA/default/clean-and-save" method="POST">
   <fieldset>


    <div class="container"> 
        <h3>Paper Title</h3>        
        <p>TITLE_PLACEHOLDER</p>
        <h3>Authors</h3>        
        <p>AUTHOR_PLACEHOLDER</p>
        <h3>Abstract</h3>        
        <p>ABSTRACT_PLACEHOLDER</p>
    </div>

    <div class="form-group">
      <label class="col-md-4 control-label" for="textinput">Document ID</label> 
      <div class="col-md-4">
      <input id="docid" name="docid" type="text" placeholder="DOC_PLACEHOLDER" class="form-control" value="DOC_PLACEHOLDER" readonly>
      </div>
    </div>

<!-- Multiple Radios -->
<div class="form-group">
  <label class="col-md-4 control-label" for="relevant">Please select whether the abstract is relevant or not.</label>
  <div class="col-md-4">
  <div class="radio">
    <label for="radios-0">
      <input type="radio" name="relevant" id="radios-0" value="0" checked="checked">
      Not Relevant
    </label>
</div>
  <div class="radio">
    <label for="radios-1">
      <input type="radio" name="relevant" id="radios-1" value="1">
      Relevant
    </label>
</div>
  </div>
</div>

<!-- Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for="singlebutton"></label>
  <div class="col-md-4">
    <button id="singlebutton" name="singlebutton" class="btn btn-primary">Submit</button>
  </div>
</div>

</fieldset>
</form>
</body>
</html>`

function main(params) {

    // invoke ow sequence which returns the ES doc based on state
    var ow = openwhisk()
    name = 'get-dynamic-doc'
    return ow.actions.invoke({name: name, blocking: true}).then(result => {

	const doc = result.response.result._source
        console.log('here is the doc', doc)
	var theContent = htmlContent.replace('TITLE_PLACEHOLDER', doc.title)
	theContent = theContent.replace('AUTHOR_PLACEHOLDER', doc.authors)
	theContent = theContent.replace('ABSTRACT_PLACEHOLDER', doc.abstract)
        theContent = theContent.replace(/DOC_PLACEHOLDER/g, doc.id)
	return {body: theContent}
    }).catch(err => {
	console.error('failed to invoke action ', err)
	return {body: err}
    })
}

exports.main=main