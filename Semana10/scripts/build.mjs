import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
if(!existsSync('data/rick-characters.json.gz')){const refresh=spawnSync(process.execPath,['scripts/refresh-data.mjs'],{stdio:'inherit'});if(refresh.status!==0)process.exit(refresh.status||1)}
const build=spawnSync(process.execPath,['node_modules/next/dist/bin/next','build','--webpack'],{stdio:'inherit',env:{...process.env,LAB_BUILD_SNAPSHOT:'1'}});process.exit(build.status||0);
