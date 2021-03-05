#!/bin/sh

DIR=./bin
VERSION=0.0.5
BASE=https://github.com/multiverse-vcs/go-multiverse/releases/download/v${VERSION}

wget -B ${BASE} -P ${DIR} multiverse_${VERSION}_darwin_arm64.tar.gz 
wget -B ${BASE} -P ${DIR} multiverse_${VERSION}_darwin_x64.tar.gz
wget -B ${BASE} -P ${DIR} multiverse_${VERSION}_linux_arm64.tar.gz
wget -B ${BASE} -P ${DIR} multiverse_${VERSION}_linux_ia32.tar.gz
wget -B ${BASE} -P ${DIR} multiverse_${VERSION}_linux_x64.tar.gz
wget -B ${BASE} -P ${DIR} multiverse_${VERSION}_win32_ia32.tar.gz
wget -B ${BASE} -P ${DIR} multiverse_${VERSION}_win32_x64.tar.gz

tar -xf ${DIR}/multiverse_${VERSION}_darwin_arm64.tar.gz -C ${DIR}/darwin_arm64
tar -xf ${DIR}/multiverse_${VERSION}_darwin_x64.tar.gz -C ${DIR}/darwin_x64
tar -xf ${DIR}/multiverse_${VERSION}_linux_arm64.tar.gz -C ${DIR}/linux_arm64
tar -xf ${DIR}/multiverse_${VERSION}_linux_ia32.tar.gz -C ${DIR}/linux_ia32
tar -xf ${DIR}/multiverse_${VERSION}_linux_x64.tar.gz -C ${DIR}/linux_x64
tar -xf ${DIR}/multiverse_${VERSION}_win32_ia32.tar.gz -C ${DIR}/win32_ia32
tar -xf ${DIR}/multiverse_${VERSION}_win32_x64.tar.gz -C ${DIR}/win32_x64