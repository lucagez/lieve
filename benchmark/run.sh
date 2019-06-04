#!/bin/bash

set -e

for file in benchmark/*.js;
  do
    node "$file";
done;
