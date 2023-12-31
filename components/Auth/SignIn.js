'use client';
import { forgotPasswordWithCredentials } from '@/actions/authActions';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Button from '../global/Button';
import Form from '../global/Form';

/**
 * Signs in users with desired providers and redirect the user to
 * callbackUrl after successfully signin in
 * @param {*}
 * @returns
 */
const SignIn = ({ callbackUrl }) => {
  async function handleCredentialsLogin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    /**
     * signIn will trigger
     * async signIn({ user, account, profile, email, credentials })
     * in callbacks
     */
    await signIn('credentials', { email, password, callbackUrl });
  }

  /**
   * sends an email with encrypted user id
   * @param {*} formData
   */
  async function handleForgotPassword(formData) {
    const email = formData.get('email');
    const res = await forgotPasswordWithCredentials({ email });
    if (res?.msg) alert(res?.msg);
  }

  return (
    <div>
      <h2>Sign In With NextAuth</h2>

      {/* Google Login */}
      <div style={{ margin: '30px 0' }}>
        {/* signIn will trigger async signIn({ user, account, profile, email, credentials }) in callbacks */}
        <button onClick={() => signIn('google', { callbackUrl })}>
          Continue with Google
        </button>
      </div>

      {/* Credentials Login */}
      <Form action={handleCredentialsLogin} style={{ margin: '30px 0' }}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button value="Login Using Credentials" />
      </Form>

      {/* Forgot password */}
      <h3>Forgot Password?</h3>
      <Form action={handleForgotPassword} style={{ margin: '10px 0' }}>
        <input type="email" name="email" placeholder="Email" required />
        <Button value="Forgot Password" />
      </Form>

      <div style={{ margin: '30px 0' }}>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
