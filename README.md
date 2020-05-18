
# shades

![](public/logo.png)

Your one-stop shop for AWS ECS inspection.

This project is designed to allow developer inspection into running ECS services in all of your AWS regions of your AWS account in a secure, but delegated fashion.

Some things you will see:

- All running clusters
- All services for each cluster
- Nice high level information about each service such as:
  - Container configuration
  - Running port
  - Environment Variable and SSM configuration
  - Event Log

*NOTE: You will be able to see secrets defined via environment variables if they are not caught by the [blacklist function]().*

## Quickstart

Here are the steps needed to get this running locally. It does assume that you have some sort of credentials setup to AWS, but other than that...

- `cp .env.example .env` and fill out values
- `npm i`
- `docker-compose up`
- `npm start`

## Runtime Dependencies

- Redis
- Node >= 10

## Customization

### Secrets Obfuscation

When running shades as a centralized application, you may want to hide secrets to the viewers of your environments.

By default, shades will do it's best to obfuscate all secret values with a simple blacklist/whitelist approach.

List of values hidden by default:

- `PASS`
- `TOKEN`
- `KEY`
- `SECRET`
- `RSA_`
- `_PW`
- `_PWD`

As of right now, modifying these lists requires forking and deploying your forked version. To the lists, simply modify the array in `start/hooks.js`.

### Authentication

Auth0 has already been integrated, but has been commented out for general use. If you wish to deploy this application and want to delegate authentication to Auth0, you will need to fork and modify.

To enable Auth0, simply:

- Uncomment custom provider in `start/app.js`
- Uncomment named middleware in `start/kernel.js`
- Add auth0 middleware to all logged in routes like so:

```js
    Route.get('/', 'ClusterController.index').middleware(['auth0']);
```

- Add AUTH0 environment variables

```bash
    AUTH0_DOMAIN=https://<tenant>.auth0.com
    AUTH0_CALLBACK_URL=<url>/auth/callback
    AUTH0_CLIENT_ID=
    AUTH0_CLIENT_SECRET=
```
