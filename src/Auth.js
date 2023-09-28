import React, { useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';

function AuthComponent() {
  const [user, setUser] = useState(null);

  Hub.listen('auth', ({ payload }) => {
    switch (payload.event) {
      case 'signIn':
      case 'cognitoHostedUI':
        getUserData();
        break;
      case 'signOut':
        setUser(null);
        break;
      default:
        break;
    }
  });

  const getUserData = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <AmplifySignOut />
        </div>
      ) : (
        <AmplifyAuthenticator>
          <AmplifySignIn />
          <AmplifySignUp
            slot="sign-up"
            formFields={[
              {
                type: 'username',
                label: 'Username',
                placeholder: 'Enter your username',
                required: true,
              },
              {
                type: 'password',
                label: 'Password',
                placeholder: 'Enter your password',
                required: true,
              },
              {
                type: 'email',
                label: 'Email',
                placeholder: 'Enter your email',
                required: true,
              },
            ]}
          />
        </AmplifyAuthenticator>
      )}
    </div>
  );
}

export default AuthComponent;
