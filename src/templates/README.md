# Setup New Resource


## Step 1
* Clone This Directory
```bash
RESOURCE=Todo
resource=todo
RESOURCES=Todos
resources=todos

cp -R src/templates/basic src/templates/src
find src/templates/src -type f -exec sed -i '' 's:Resources:'$RESOURCES':g' {} \;
find src/templates/src -type f -exec sed -i '' 's:Resource:'$RESOURCE':g' {} \;
find src/templates/src -type f -exec sed -i '' 's:resources:'$resources':g' {} \;
find src/templates/src -type f -exec sed -i '' 's:resource:'$resource':g' {} \;

mv src/templates/src/components/resources src/templates/src/components/$resources

mv src/templates/src/components/$resources/resources.vue src/templates/src/components/$resources/$resources.vue
mv src/templates/src/components/$resources/top-resource.vue src/templates/src/components/$resources/top-$resource.vue
mv src/templates/src/store/modules/resources.js src/templates/src/store/modules/$resources.js

cp -R src/templates/src/ src
rm -rf src/templates/src

```
