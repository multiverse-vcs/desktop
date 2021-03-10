#!/bin/sh

DIR=./bin

VERSION=0.0.5

FILES=(
    darwin_arm64
    darwin_x64
    linux_arm64
    linux_ia32
    linux_x64
    win32_ia32
    win32_x64
)

if [ -d "$DIR" ]; then
  exit 0
fi

set -e
mkdir $DIR
cd $DIR

for file in "${FILES[@]}"
do
    echo "downloading ${file}..."
    curl -sOL https://github.com/multiverse-vcs/go-multiverse/releases/download/v${VERSION}/multiverse_${VERSION}_${file}.tar.gz
    mkdir ${file}

    echo "extracting ${file}..."
    tar -xf multiverse_${VERSION}_${file}.tar.gz -C ${file}
    rm multiverse_${VERSION}_${file}.tar.gz
done
