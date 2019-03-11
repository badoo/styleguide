#!/bin/bash

function usage() {
    local msg="Usage: build.sh --targetDir=/path/to/dir"
    if [ -n "$1" ]; then
        msg=$1$msg
    fi
    echo $msg
}

if [ $# -eq 0 ]; then
    usage "Incorrect parameters count. "
    exit 1
fi

TARGET_DIR=0

for i in $@; do
    kv=(`echo $i | tr '=' ' '`)
    case ${kv[0]} in
        --targetDir)
        TARGET_DIR=${kv[1]}
        ;;
    esac
done

if [ -z "$TARGET_DIR" ]; then
    usage "Specify target directory. "
    exit 1
fi

# Prepare output directory
mkdir -p $TARGET_DIR

# Script folder
BASE_DIR=`cd $(dirname "$0") && pwd`

# Install clientside dependencies
cd $BASE_DIR/..
yarn run build --buildDir=$TARGET_DIR
