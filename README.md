# Social Media

## User stories

- **Register**: You can register in this social media app and share your thoughts or your favorite shots, but before that you'll have to confirm your account by writing a code sent to your email.
- **Login**: If you already registred you can just login and immediately start sharing.
- **Loging in with Google**: Know how sometimes you're way too lazy or in a hurry to register on another site? Yes we feel you that's why, we provided a Logging in Using Google account so now you dont have to go with that confirmation proccess.
- **Reset Password**: Forgot your password? no worries we got you, you can click on the "forgot password" link shown in the login page to provide us with your registred email and our system will send you a security code & link to reset your password.
- **Posting**: Both users and Admins can Post a post of thier own, and it'll show up in the main page publicly for all users to view.
- **Delete post**: Users and Admins can easily delete their own posts, but Admins can delete any post of any user.
- **Commenting on posts**: All users will get to add comments by clicking the button shown in the right bottom side of the post on the main page, when clicking on the comment button you'll be aple to view all the comments on this post & the number of likes with the usernames of the people who liked it.
- **Liking posts**: Admins and Users can like any post they want, the usernames of everyone who liked the post will show up when opening the post.
- **Logout**: After you finish using the app you can logout instantly.

## Components

- **Landing**
- **Login**
- **Register**
- **Full Post**
- **Buttons**
- **Confirm**
- **Forgot password**
- **Reset Pass**
- **user**

## Fronend Links & Access

| Path             | Permissions | Behavior                                                                                                                                                                                                                      |
| ---------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /                | Public      | Landing page, if not logged in yet it'll give the visitor two options: Logging in for users who are users & registring for new users. If logged in the user can view, like other people post and can also add and delete his. |
| /Register        | Public      | Register new user, the default role of the registration is user & admins can register using the backend.                                                                                                                      |
| /Confirm         | Private      | after registering you'll be navigated to this page so that you'll write the code sent to your email.                                                                                                                          |
| /login           | Public      | Users logging in page, after logging in it will instently navigate you to you Landing page.                                                                                                                                   |
| /postDetails/:id | Private      | Only registred users can access this page and view the post details (comments & likes).                                                                                                                                       |
| /forgetPass      | Public      | By going to this page you'll be asked to write you account email so that we can send you the link to reset, you can get to this page by clicking the forgot password link on the login page.                                  |
| /resetPass/:id   | Private      | You'll be able to reset your password here but you'll only get your link for this page on your email after writing it in the forgotPass page.                                                                                 |


# UML Diagram

![Untitled Diagram drawio (5)](https://user-images.githubusercontent.com/92247858/145883389-0c71abdb-25b7-4bae-83a2-faef3d72ca80.png)


