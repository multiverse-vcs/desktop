#!/bin/sh

VERSION=0.0.5
FILES=(darwin_arm64 darwin_x64 linux_arm64 linux_ia32 linux_x64 win32_ia32 win32_x64)
URL=https://github.com/multiverse-vcs/go-multiverse/releases/download
DIR=./bin

set -e

if [ ! -d "$DIR" ]; then
  mkdir $DIR
fi

cd $DIR

for file in "${FILES[@]}"
do
  cho "downloading ${file}..."
  curl -sOL ${URL}/v${VERSION}/multiverse_${VERSION}_${file}.tar.gz
  mkdir ${file}

  echo "extracting ${file}..."
  tar -xf multiverse_${VERSION}_${file}.tar.gz -C ${file}
  rm multiverse_${VERSION}_${file}.tar.gz
done
