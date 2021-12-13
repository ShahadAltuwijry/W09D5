# User stories

- **Register**: You can register in this social media app and share your thoughts or your favorite shots, but before that you'll have to confirm your account by writing a code sent to your email.
- **Login**: If you already registred you can just login and immediately start sharing.
- **Loging in with Google**: Know how sometimes you're way too lazy or in a hurry to register on another site? Yes we feel you that's why, we provided a Logging in Using Google account so now you dont have to go with that confirmation proccess.
- **Reset Password**: Forgot your password? no worries we got you, you can click on the "forgot password" link shown in the login page to provide us with your registred email and our system will send you a security code & link to reset your password.
- **Posting**: Both users and Admins can Post a post of thier own, and it'll show up in the main page publicly for all users to view.
- **Delete post**: Users and Admins can easily delete their own posts, but Admins can delete any post of any user.
- **Commenting on posts**: All users will get to add comments by clicking the button shown in the right bottom side of the post on the main page, when clicking on the comment button you'll be aple to view all the comments on this post & the number of likes with the usernames of the people who liked it.
- **Liking posts**: Admins and Users can like any post they want, the usernames of everyone who liked the post will show up when opening the post.
- **Logout**: After you finish using the app you can logout instantly.

# Components

- **Landing**
- **Login**
- **Register**
- **Full Post**
- **Buttons**
- **Confirm**
- **Forgot password**
- **Reset Pass**
- **user**

# Fronend Links & Access

| Path             | Permissions | Behavior                                                                                                                                                                                                                      |
| ---------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /                | Public      | Landing page, if not logged in yet it'll give the visitor two options: Logging in for users who are users & registring for new users. If logged in the user can view, like other people post and can also add and delete his. |
| /Register        | Public      | Register new user, the default role of the registration is user & admins can register using the backend.                                                                                                                      |
| /Confirm         | privet      | after registering you'll be navigated to this page so that you'll write the code sent to your email.                                                                                                                          |
| /login           | Public      | Users logging in page, after logging in it will instently navigate you to you Landing page.                                                                                                                                   |
| /postDetails/:id | Privet      | Only registred users can access this page and view the post details (comments & likes).                                                                                                                                       |
| /forgetPass      | Public      | By going to this page you'll be asked to write you account email so that we can send you the link to reset, you can get to this page by clicking the forgot password link on the login page.                                  |
| /resetPass/:id   | Privet      | You'll be able to reset your password here but you'll only get your link for this page on your email after writing it in the forgotPass page.                                                                                 |

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
