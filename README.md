![Sealpage logo](assets/sealpage-logo.svg)

# Sealpage

The Sealious-powered content management system that renders the site to the static files.

## New website project setup

To use Sealpage, which is just a tool, you'll need another NodeJS project where the Sealious collections and so on are configured. At the moment it is advisable you follow [Midline](https://hub.sealcode.org/source/midline-blog).

In new website project directory run:

```
npm ci
npm i sealcode/sealpage --save
```

### Linking Sealpage for development

To develop Sealpage itself, you'll have to add it in a different way, so that you use the latest Sealpage codebase.

In Sealpage directory run:

```
npm link .
```

In new website project directory run:

```
npm ci
npm link sealpage
```

## Day-to-day development

During this you'll be rather interested in working with new website project.

Remember to turn the database on:

```
docker-compose up -d
```

To build, run:

```
sealpage build
```

To enable admin dashboard, run:

```
sealpage admin
```

Note that both `build` and `admin` take arguments, so that site dir structure is more customizable.

To learn more about it simply type:

```
sealpage --help
```

## Creating External Components

Sealpage allows user to create user-defined components called **External Components** (EC).
Each EC has to follow a certain pattern and has to be registered in Sealpage.

To build an EC, we have to create a directory where our components will be stored and registered.
You can name it however you want but for the tutorial's sake we'll call it _ext-components_.

In the ext-components directory create an `index.js` file. This file will hold all user-defined ECs.

Create another file `Greet.html.js`. Here we define our component's logic.

Your file structure should look like this:

```
ext-components
    |_ index.js
    |_ Greet.html.js
```

Go into `Greet.html.js` and define a following EC:

```js
const Component = require('sealpage/components/component.class');

module.exports = class Greet extends Component {
	constructor(s) {
		super(s);
	}

	renderFn() {
		return 'Hello Sealpage';
	}

	static propsControls() {
		return {};
	}
};
```

It's pretty simple. As you can see our EC contains two methods:

-   renderFn - defines what to render. In this case we simply want to create block with a 'Hello Sealpage' written on it.

-   propsControls - describes form fields that will be used to edit our component parameters. For now we leave it empty. Please notice that propsControls is a _static_ method.

Another important thing is the `s` object but we will cover it later.

After declaring an EC we have to let Sealpage know that it exists. **Register** it.
Go back to the `ext-components/index.js` and paste the following code.

```js
const { register } = require('sealpage/components/index');
const Greet = require('./Greet.html.js');

const ext_components = [
	{
		component: Greet,
		name: 'Hello',
	},
];

register(ext_components);
```

Ok, so here we import our EC as well as the `register` method. Register takes only one argument - an array of External Components.
Everything that goes into the array will be registered in Sealpage. As you can see an array must have a following format:

```
    {
        component: ComponentClass
        name: String
    }
```

All that's left is to add a path to the `ext-components/index.js` in the app config so that sealpage will know where to find it.
Go to your app entrypoint and at the end of the returned object add one more value called `ec_path`:

```js
    const path = require('path');
    {
        ...
        ec_path: path.resolve(__dirname, 'path/to/ext-components/index.js')
    }
```

Now restart the server. You should now see the following message:

```
External Components path provided. Checking the file...
File succesfully found, proceeding...
```

And with that you succesfully created your first EC!

**propsControls**

Let's say we want to make our component more dynamic, ie. we want to change what is being displayed from the editor level.
We can achieve this by using propsControls. Let's edit our newly created EC to greet a certain user:

```js
class Greet extends Component {
	constructor(s) {
		super(s);
	}

	renderFn(s, { name }) {
		return `Hello ${name || ''}!`;
	}

	static propsControls() {
		return {
			name: {
				label: 'User to greet',
				control: 'text',
			},
		};
	}
}
```

Here we've added some new stuff. propsControls now returns **hello** - an object describing a field that has a label "User to greet" and is of type "textarea". Also renderFn has an additional argument that allows it to read from this object. It is important that the propsControls' key and the renderFn's arguments have the same name.

Restart the server and see what changes. Your component is now configurable!


## Settings
`S` object can manipulate app's global settings with built-in **Settings Manager**. Since SM is a class field you can access it both from the class directly or the class instance like this:

* `S.Settings`
* `new S(args).Settings`

The first syntax is mainly used for setting up global configuration, for example in your `index.js` file.

The second one will likely be used when dealing with **External Components**, since they will have built-in connection to the `S` class instance.

**Important**: `Settings` can be used only after `sealpage.getApp()`. Until then it is not avaliable. 

### Settings Manager API Reference:

**Args**:
* key: Name of a setting, will be used do identify it
* value: Value of a setting
* type: Type of a field that will be used to edit it inside GUI, type name must be known to Sealpage as a **propControl**

```js
async Settings.add({ string key, string value, string type }) => void
```
Adds setting to the configuration file.

```js
async Settings.remove(string key) => void
```
Removes setting from the configuration file.
Throws an error when key is not found.

```js
async Settings.edit({ string key, string | null value, string | null type }) => void
```
Edits given setting by replacing its value and type.
You can pass null as one of the argument (value, type) to leave it as it is.
Throws an error when key is not found.

```js
Settings.get(string key) => object | null
```
Returns given setting or null when setting is not found.

```js
Settings.getConfig() => object
```
Returns all settings in a form of an object.

There is also a way to provide user-defined settings manually.
You can pass them as an argument to the `sealpage.getApp()` function.

### Settings format
Settings have to be an instance of a javascript object as well as be of the following format:
```js
{
	setting_name: {
		value: setting_value,
		type: setting_type
	}
}
```

### Default settings
```js
{
		page_name: {
			value: 'Brand new Sealpage site',
			type: 'text',
		},
		logo: {
			value: default sealpage logo,
			type: 'text',
		},
			primary_color: {
			value: '#fff',
			type: 'text',
		},
			secondary_color: {
			value: '#000',
			type: 'text',
		},
};
```
