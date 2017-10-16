#!/bin/bash
ACTIONS_DIR=../actions/
ACTION=etcd-get-state
PKG_NAME=etcd
WSK_CLI="bx wsk"

# this script needs to be executed from within scripts directory (where the script resides)
# create zipped action to access and update state in etcd

# etcd info
if [ -z "$ETCD_HOSTS" ]; then
    echo Etcd hosts needs to be defined in ETCD_HOSTS
    exit
fi

if [ -z "$ETCD_AUTH" ]; then
    echo Etcd authentication needs to be defined in ETCD_AUTH
    exit
fi

if [ -z "$ETCD_CA" ]; then
    echo Etcd certificate needs to be defined in ETCD_CA
    exit
fi

# create package in default namespace with default parameters
$WSK_CLI package update $PKG_NAME -p etcdHosts ''"$ETCD_HOSTS"'' -p etcdAuth ''"$ETCD_AUTH"'' -p etcdCa $ETCD_CA

# create zipped action for etcd action 
CWD=`pwd`
cd $ACTIONS_DIR/$ACTION
npm install
zip -r $ACTION.zip ./*
cp $ACTION.zip ../
cd .. # cd to directory with all actions
# create action that gets and updates state in ETCD
$WSK_CLI action update $PKG_NAME/$ACTION $ACTION.zip --kind nodejs:6 -t 300000
cd $CWD # back to scripts
