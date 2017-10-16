
function main(params) {
   // etcd credentials are passed in the parameters params
    etcdCa = params.etcdCa
    etcdAuth = params.etcdAuth
    hosts = params.etcdHosts
    var ca = new Buffer(etcdCa, 'base64');
    var opts = {
        auth: etcdAuth,
        ca: ca
   }
   var Etcd = require('node-etcd')
       console.log(hosts)
       console.log(opts)
   var etcd = new Etcd(hosts, opts)
   var max = 3
   if (params.max) max = params.max
   var crtId = etcd.getSync('/dsaa17/crtId')
   var id = crtId.body.node.value
   console.log(id)
   var newId = (id + 1) % max
   etcd.setSync('dsaa17/crtId', newId)
   console.log(newId)
   return {id: id}
}

exports.main=main

