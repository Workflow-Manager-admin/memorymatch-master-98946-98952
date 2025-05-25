#!/bin/bash
cd /home/kavia/workspace/code-generation/memorymatch-master-98946-98952/main_container_for_memorymatch_master
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

