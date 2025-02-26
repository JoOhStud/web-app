#!/bin/sh

cd /usr/share/nginx/html/assets
env | grep ^ENV_VAR_  | cut -d= -f1 |
while read kv;
do 
    for f in *.js ;
    do 
        fsub=$(envsubst "\$$kv" < $f) ;
        echo "$fsub" > "$f" ; 
    done
done
