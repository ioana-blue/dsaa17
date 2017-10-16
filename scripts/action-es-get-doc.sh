#!/bin/bash
ACTIONS_DIR=../actions/
ACTION=es-get-doc
PKG_NAME=es
WSK_CLI="bx wsk"

# this script needs to be executed from within scripts directory (where the script resides)
# create zipped action to access one doc in ES by id 

# elasticsearch info
if [ -z "$ES_HOST" ]; then
    echo Elasticsearch host needs to be defined in ES_HOST
    exit
fi

if [ -z "$ES_AUTH" ]; then
    echo Elasticsearch authentication needs to be defined in ES_AUTH
    exit
fi

# create package in default namespace with default parameters
$WSK_CLI package update $PKG_NAME -p esHost $ES_HOST -p esAuth $ES_AUTH

# create zipped action for elastic search get document by id
CWD=`pwd`
cd $ACTIONS_DIR/$ACTION
npm install
zip -r $ACTION.zip ./*
cp $ACTION.zip ../
cd .. # cd to directory with all actions
# create action that reads doc from ES (in the default namespace)
INDEX=tutorial
TYPE=data
# default parameters for index and type
$WSK_CLI action update $PKG_NAME/$ACTION $ACTION.zip --kind nodejs:6 -t 300000 -p index $INDEX -p type $TYPE
cd $CWD # back to scripts
