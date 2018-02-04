# Setup New Resource


## Step 1
* Clone This Directory
```bash
    RESOURCE=****
    RESOURCES=****
cp -R src/templates/basic src/templates/$RESOURCES
mv src/templates/$RESOURCES/components/resources src/templates/$RESOURCES/components/$RESOURCES
mv src/templates/$RESOURCES/components/resources/resources.vue src/templates/$RESOURCES/components/$RESOURCES/$RESOURCES.vue
mv src/templates/$RESOURCES/components/resources/top-resource.vue src/templates/$RESOURCES/components/$RESOURCES/top-$RESOURCE.vue
mv src/templates/$RESOURCES/store/modules/resources.js src/templates/$RESOURCES/store/modules/$RESOURCES.js
```

## Step 2
* Change the resources directory to the directory name that you want to create
```bash
    mv src/templates/basic/components/resources src/templates/basic/components/********
```

* Set up the vagrantfile
```bash
    cd scotchbox
    nano Vagrantfile
```

* Comment out the old line and add a new one for the new folder

```bash
    #config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=666"]
    config.vm.synced_folder "~/freedomdriven", "/var/www"
```

* Start the VM
```bash
    vagrant up
```

* Your server is now listening on http://192.168.33.10/
* Add an entry to your host file
```bash
    sudo sh -c 'echo "192.168.33.10 reimobile.local" >> /etc/hosts'
    sudo sh -c 'echo "192.168.33.10 api.reimobile.local" >> /etc/hosts'
    sudo sh -c 'echo "192.168.33.10 leadpropeller.local" >> /etc/hosts'
    sudo sh -c 'echo "192.168.33.10 api.leadpropeller.local" >> /etc/hosts'
```

## Check Out Application

* Add your public key to the github repo
* Clone the project

```bash
    cd ~/freedomdriven
    git clone git@github.com:freedomdriven/api.leadpropeller.git
```

## Before Continuing

* Make sure you've followed all instructions in the readme for Lead Propeller first. It contains instructions on how to get your VM set up with the right packages, php version, etc.

## Application configuration

* Run composer
```bash
    vagrant ssh
    cd /var/www/api.leadpropeller
    composer install -vvv
```

* `api.leadpropeller` needs softlinks set up to the directories in `leadpropeller` that hold the sites and blog themes, because both applications want direct access to those things through the file system
```bash
    cd api.leadpropeller/storage/public
    ln -s ../../../leadpropeller/public/sites
```

* Set up a softlink from the vendor directory to our main javascript directory. Some of our imports expect this when running gulp/browserify.
```bash
    cd api.leadpropeller/vendor
    ln -s ../resources/assets/js
```

* Install the node modules and run gulp
```bash
    npm install
    pushd node_modules &&  ln -s ../resources/assets/js app && popd
    gulp
```


* If a database.php file does not exist under app/config/local and you're using Laravel 4.2 (reimobile, leadpropeller), create one by copying it from app/config/ and configuring it with parameters for your database
```php
 'default' => 'mysql'
 ...
    'mysql' => array(
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'leadpropeller',
    'username'  => 'leadpropeller',
    'password'  => 'leadpropeller',
    ...
```

* If you don't have a .env file and you're on Laravel 5.x (api.leadpropeller, api.reimobile), get a copy from another developer or make one and fill in the config values
```bash
    cp .env_example .env
    editor .env
```
```
    DB_CONNECTION=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_DATABASE=reimobile
    DB_USERNAME=reimobile
    DB_PASSWORD=reimobile
```

## Database Configuration
:warning: This only needs to be done once for the reimobile projects and once for the leadpropeller projects

* Connect to 127.0.0.1:3306 (the mysql server) with your sql tool of choice as `root/root`, with ssh forwarding set up to 192.168.33.10:22 as `vagrant/vagrant`. You could also set up port forwarding and connect to 192.168.33.10:3306 directly without tunneling.

* Create the leadpropeller database

```sql
        CREATE SCHEMA leadpropeller;
```
* Create the `leadpropeller` user for the application, set password as `leadpropeller`, and ensure it has privileges and access to the schema

* Populate the tables
```bash
    vagrant ssh
    cd /var/www/api.leadpropeller
    php artisan migrate --seed
```

## Apache Configuration
* Add a virtual host
```bash
    cd scotchbox
    vagrant ssh
    sudo sh -c 'echo "
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        ServerName api.leadpropeller.local
        ServerAlias api.leadpropeller.local
        DocumentRoot /var/www/api.leadpropeller/public
        ErrorLog ${APACHE_LOG_DIR}/api.leadpropeller.error.log
        CustomLog ${APACHE_LOG_DIR}/api.leadpropeller.access.log combined
</VirtualHost>" >> /etc/apache2/sites-enabled/scotchbox.local.conf'
```

* Restart apache
```bash
    sudo service apache2 restart
```

## Test
```bash
    exit
    curl api.leadpropeller.dev -I
```
If you see a 200 OK, it's party time :beers:

## Php Unit
```bash
   cp .env.example .env.testing
```
set the database variables and leave everything else blank. This is how its going to run on Jenkins.
Need to get it setup with php storm will update this when we do a walk threw with a new person.
