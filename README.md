![express-validata logo](https://res.cloudinary.com/drtob/image/upload/v1594162678/ylmupu9ytsdu0oykz7ck.png)

<!-- [link:eva] [![npm][badge:license]]() [![Build Status][badge:github-actions]][link:github-actions] [![Coverage Status][badge:coveralls]][link:coveralls] -->

> **EXPRESS-VALIDATA** - An efficient joi validator middleware

<!-- [Documentation][link:doc-homepage] -->

Express-validata is an efficient joi validator middleware for sanitizing inputs.

100% Free and Open Source!

## What's included

- **Validates any input -** It can sanitize any input defined in Joi schema

- **Inheritance -** Supports inheritance. It's now time to write your joi schema in small re-usable component that can be inherited.

- **Any input source validation -** it can validate any input source (e.g req.body, req.query, req.params).

# Motivation

Repeating validation logic across routes isn't a good practice. Writing validation/sanitation logic alongside your business logic is not something you want to do in this era.
Won't you prefer having the ability to compose your validation logic within a middleware? That's the genesis of express-validata. The ease of perfoming your validation without repeating yourself or needing to write countless lines of code just to sanitize inputs. With express-validata,
you can easily leverage on a middleware that supports validating inputs from all sources ( req.body, req.query, req.params) with ability to define and re-use joi schema across routes.

## Quick Start

Install express-validata:

```bash
npm i express-validata
```

or use yarn

```bash
yarn add express-validata
```

> **DEPENDS ON JOI** - You must install and Define your schema with Joi

```js
const express = require('express');
const bodyParser = require('body-parser');

const joi = require('joi'); // required to define schema

const { validata } = require('express-validata'); // validation middleware

// Create Express server
const app = express();

// Express configuration
app.set('port', Number(process.env.PORT) || 8080);
app.use(bodyParser.json());

// // // || JOI SCHEMA  || \\ \\
const baseSchema = joi.object({
  limit: joi.string(),
  page: joi.string(),
});

const bodySchema = joi.object({
  firstName: joi.string(),
  lastName: joi.string(),
});

const querySchema = joi.object({
  lang: joi.string(),
});

const paramsSchema = joi.object({
  id: joi.string(),
});

// // // || JOI SCHEMA  || \\ \\

app.post(
  '/test',
  validata(
    { body: bodySchema, query: querySchema, params: paramsSchema },
    {
      baseSchema: {
        query: [baseSchema],
      },
    },
  ),
  (req, res) => {
    return res.status(200).json({
      status: true,
      message: 'search successful',
      data: 'good',
    });
  },
);

app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env'),
  );
  console.log('  Press CTRL-C to stop\n');
});
```

### Explanation

You can validate different data sources (e.g req.body, req.query, req.params) by defining joi schemas for each source. You could even define a generic schema that's re-usable across many routes and set it as baseSchema for the intended data source. These generic joi schema (re-usable joi schema component) gets concatenated to the mainSchema and therefore forms a whole enforcable joi schema

### Testing

You can clone the repo and move the sandbox folder to a folder on the same level with express-validata.
Run the following command in express-validata folder

```bash
npm link
```

Run the following command in sandbox folder

```bash
npm link express-validata
```

You can now play as you like in the sandbox!

## How can I support the developers?

- Star our GitHub repo :star:
- Create pull requests, submit bugs, suggest new features or documentation updates :wrench:
<!-- - Read us on [Medium][link:akveo-medium] -->
- Follow us on [Twitter][link:drtobbyas-twitter]
<!-- - Like our page on [Facebook][link:akveo-facebook] -->

## License

[MIT](LICENSE.txt) license.

## From Developers

Made with :heart: by [Tobbyas Techwares][link:tobbyas-techwares-homepage]. Follow us on [Twitter][link:drtobbyas-twitter] to get the latest news first!
We're always happy to receive your feedback!

[link:tobbyas-techwares-homepage]: https://tobbyas.com
[link:drtobbyas-twitter]: https://twitter.com/drtobbyas
