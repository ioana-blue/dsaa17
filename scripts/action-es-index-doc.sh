#!/bin/bash
ACTIONS_DIR=../actions/
ACTION=es-index-doc
PKG_NAME=es
WSK_CLI="bx wsk"

# this script needs to be executed from within scripts directory (where the script resides)
# create zipped action to index one doc in ES

# assumes package es exists already

# create zipped action for elastic search to index data in hardcoded index/type
CWD=`pwd`
cd $ACTIONS_DIR/$ACTION
npm install
zip -r $ACTION.zip ./*
cp $ACTION.zip ../
cd .. # cd to directory with all actions
# create action that indexes a doc in ES (in the default namespace)
INDEX=tutorial
TYPE=collected_data
# default parameters for index and type
$WSK_CLI action update $PKG_NAME/$ACTION $ACTION.zip --kind nodejs:6 -t 300000 -p index $INDEX -p type $TYPE
cd $CWD # back to scripts
