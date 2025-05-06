#!/bin/bash

out=" ";
for i in `cat ./env/.env.example`; do out+="--build-arg $i " ; done;
echo $out;

docker build $out -t temp --progress=plain .