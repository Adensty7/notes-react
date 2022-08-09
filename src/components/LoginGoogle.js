import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const LoginGoogle = () => {

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "763416293364-4lisv1ojj8ukjt7gajnh90d1pjiulivb.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { size: "large"}
    )
  }, []);
  return ( 
    <div>
        <div id='signInDiv'></div>
    </div>
   );
}
 
export default LoginGoogle;