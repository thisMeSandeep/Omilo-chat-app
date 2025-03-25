import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import NavbarMini from '../components/NavbarMini';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, email, password, agreed });
  };

  return (
    <>
      <NavbarMini />

      <main className="min-h-screen px-4 bg-omilo-light-bg dark:bg-omilo-dark-bg flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md mt-20 p-8 rounded-lg border-t-4 border-t-omilo-primary shadow-xl border border-white/10">
          {/* heading */}
          <h1 className='text-center font-semibold text-3xl text-omilo-text-primary dark:text-white mb-3'>Create an account</h1>

          {/* para */}
          <p className='text-center text-sm text-omilo-text-secondary dark:text-omilo-dark-text-secondary mb-5'>
            Enter your details below to create your Omilo account
          </p>

          {/* username */}
          <div className='mb-5'>
            <label htmlFor="username" className='text-omilo-text-primary dark:text-white'>Username</label>
            <div className='relative mt-2'>
              <User className='size-5 absolute top-1/2 left-4 -translate-y-1/2 text-omilo-text-secondary dark:text-omilo-dark-text-secondary' />
              <input
                type='text'
                placeholder='rimsonX'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='w-full pl-12 pr-4 outline-none focus:ring-2 ring-offset-2 ring-omilo-primary rounded-md py-2 text-omilo-text-primary dark:text-white border border-gray-200 dark:border-white/10'
              />
            </div>
          </div>

          {/* email */}
          <div className='mb-5'>
            <label htmlFor="email" className='text-omilo-text-primary dark:text-white'>Email</label>
            <div className='relative mt-2'>
              <Mail className='size-5 absolute top-1/2 left-4 -translate-y-1/2 text-omilo-text-secondary dark:text-omilo-dark-text-secondary' />
              <input
                type='email'
                placeholder='name@example.com'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full pl-12 pr-4 outline-none focus:ring-2 ring-offset-2 ring-omilo-primary rounded-md py-2 text-omilo-text-primary dark:text-white border border-gray-200 dark:border-white/10'
              />
            </div>
          </div>

          {/* password */}
          <div>
            <label htmlFor="password" className='text-omilo-text-primary dark:text-white'>Password</label>
            <div className='relative mt-2'>
              <Lock className='size-5 absolute left-4 top-1/2 -translate-y-1/2 text-omilo-text-secondary dark:text-omilo-dark-text-secondary' />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-omilo-text-secondary dark:text-omilo-dark-text-secondary focus:outline-none'
              >
                {showPassword ? <EyeOff className='size-5' /> : <Eye className='size-5' />}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className='w-full px-12 outline-none focus:ring-2 ring-offset-2 ring-omilo-primary rounded-md py-2 text-omilo-text-primary dark:text-white border border-gray-200 dark:border-white/10'
              />
            </div>
          </div>

          {/* terms and services */}
          <div className='flex items-center text-sm gap-3 mt-5 dark:text-white'>
            <input
              type='checkbox'
              id='terms'
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className='cursor-pointer'
            />
            <label htmlFor='terms' className='cursor-pointer'>
              I agree to the <span className='text-omilo-primary hover:underline cursor-pointer'>terms of service</span> and
              <span className='text-omilo-primary hover:underline cursor-pointer'> privacy policy</span>
            </label>
          </div>

          {/* button */}
          <button
            type='submit'
            disabled={!agreed}
            className={`flex items-center justify-center gap-2 w-full mt-5 rounded-md py-2 text-white text-sm group 
              ${agreed ? "bg-omilo-primary" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Sign up <ArrowRight className='size-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out' />
          </button>

          {/* sign in link */}
          <span className='mt-5 text-sm flex items-center justify-center gap-2'>
            <p className='text-omilo-text-secondary dark:text-omilo-dark-text-secondary'>Already have an account?</p>
            <Link to="/login" className='text-omilo-primary font-semibold'> Sign In</Link>
          </span>
        </form>
      </main>
    </>
  );
}

export default SignUp;
