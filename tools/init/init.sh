#!/usr/bin/env bash

npx ts-node ./src/Commands.ts addRole --name SuperAdmin --slug superadmin
npx ts-node ./src/Commands.ts addRole --name Admin --slug admin
npx ts-node ./src/Commands.ts addRole --name Client --slug client

npx ts-node ./src/Commands.ts addUser --email superadmin@narchjs.com --firstName Super --lastName Admin --password 1234567890 --isSuperAdmin true
npx ts-node ./src/Commands.ts addUser --email admin@narchjs.com --firstName Admin --lastName Admin --password 1234567890 --isSuperAdmin false
npx ts-node ./src/Commands.ts addUser --email client@narchjs.com --firstName Client --lastName Client --password 1234567890 --isSuperAdmin false

npx ts-node ./src/Commands.ts assignRoleToUser --slug superadmin --email superadmin@narchjs.com
npx ts-node ./src/Commands.ts assignRoleToUser --slug admin --email admin@narchjs.com
npx ts-node ./src/Commands.ts assignRoleToUser --slug client --email client@narchjs.com
