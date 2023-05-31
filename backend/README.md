# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

- Run the app

```
npm run develop
# or
yarn develop
```

- Adjust the Media Library in Admin panel settings

```
Responsive friendly upload is false
Size optimization is true
Auto orientation is false
```

- Adjust the Advance settings in Admin panel settings

```
Default role for authenticated users is Authenticated
Reset password page is: http://localhost:3000/reset-password
Enable email confirmation is true
Redirection url is: http://localhost:3000
Reset password page is
```

- Adjust the Users & permissions Roles in settings on Admin panel settings

#### `Public`

```
Order alow: create
Product alow: find, findOne
Rating alow: find, findOne
Store alow: find, findOne
Upload alow: upload, findOne
User alow: callback, connect, emailConfirmation, forgotPassword, register, resetPassword, sendEmailConfirmation
```

#### `Authenticated`

```
Customer alow: create, update, find, findOne
Order alow: create, update, find, findOne
Product alow: create, update, delete, find, findOne
Rating alow: create, update, delete, find, findOne
Store alow: create, update, updateStatus, delete, find, findOne
Upload alow: upload, findOne
User permission alow: changePassword, me, update, destroy
Stripe allow: create, findOne, upgradeDowngrade, checkout, cancel, paymentMethods, deletePaymentMethod, webhook
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

- `NODE_ENV=production npm run build`
- `NODE_ENV=production node server.js` Or `NODE_ENV=production npm run start`

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

## Strapi Resources

- Errors: https://github.com/jshttp/http-errors#list-of-all-constructors

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
