#!/usr/bin/env bash

cd $(dirname $(readlink -f $0))
cd ..

RELEASE_TAG=$(git tag --points-at HEAD | grep -e '^v[0-9][0-9]*[.][0-9][0-9]*[.][0-9][0-9]*$' | grep -ve '[.]0$' | head -n 1)
RELEASE_TAG_REGEX='^v[0-9]'
echo "tag - $RELEASE_TAG"
if [[ ${RELEASE_TAG} =~ $RELEASE_TAG_REGEX ]]; then
    VERSION_TAG="${RELEASE_TAG}"
    echo "version - ${VERSION_TAG}"
    echo "BUILD_VERSION=${VERSION_TAG}" > build.env
    exit 0
fi

if [[ ! -z ${GIT_BRANCH} ]]; then
    CURRENT_BRANCH=$(echo $GIT_BRANCH | sed 's;origin/;;')
else
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
fi

MASTER_REGEX='^master$'
RELEASE_REGEX='^release/'
FEATURE_REGEX='^fabsight-'
USER_FEATURE_REGEX='/fabsight-'

    BRANCH_LABEL="fabsight"

echo "label - ${BRANCH_LABEL}"

VERSION_TAG=$BRANCH_LABEL"-"$( git describe --match 'v*' --first-parent --long --always) #| sed "s/-\([^-]\+\)-/-\1$BRANCH_LABEL/" )
echo "version - ${VERSION_TAG}"
echo "BUILD_VERSION=${VERSION_TAG}" > build.env
