#!/usr/bin/env bash

npx ts-node ./src/Commands.ts addRole --name SuperAdmin --slug superadmin
npx ts-node ./src/Commands.ts addRole --name Admin --slug admin
npx ts-node ./src/Commands.ts addRole --name operator --slug operator

npx ts-node ./src/Commands.ts addUser --email superadmin@narchjs.com --firstName Super --lastName Admin --password 1234567890 --isSuperAdmin true
npx ts-node ./src/Commands.ts addUser --email admin@narchjs.com --firstName Admin --lastName Admin --password 1234567890 --isSuperAdmin false
npx ts-node ./src/Commands.ts addUser --email operator@narchjs.com --firstName Operator --lastName Operator --password 1234567890 --isSuperAdmin false

npx ts-node ./src/Commands.ts assignRoleToUser --slug superadmin --email superadmin@narchjs.com
npx ts-node ./src/Commands.ts assignRoleToUser --slug admin --email admin@narchjs.com
npx ts-node ./src/Commands.ts assignRoleToUser --slug operator --email operator@narchjs.com

npx ts-node ./src/Commands.ts syncRolesPermission

