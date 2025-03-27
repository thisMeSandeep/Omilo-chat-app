import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader, CircleX } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import NavbarMini from '../components/NavbarMini';
import useUserStore from '../store/userStore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const loading = useUserStore((state) => state.loading);
  const message = useUserStore((state) => state.message);
  const loginUser = useUserStore((state) => state.loginUser)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password
    };
    console.log(formData)
    try {
      const isSuccess = await loginUser(formData);
      if (isSuccess) {
        navigate('/dashboard')
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <NavbarMini />

      <main className="min-h-screen px-4 bg-omilo-light-bg dark:bg-omilo-dark-bg flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded-lg border-t-4 border-t-omilo-primary shadow-xl border border-white/10">
          {/* heading */}
          <h1 className='text-center font-semibold text-3xl text-omilo-text-primary dark:text-white mb-3'>Welcome back</h1>

          {/* para */}
          <p className='text-center text-sm text-omilo-text-secondary dark:text-omilo-dark-text-secondary mb-5'>Enter your credentials to access your account</p>

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
              <Lock className='size-5 left-4 absolute top-1/2 -translate-y-1/2 text-omilo-text-secondary dark:text-omilo-dark-text-secondary' />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-omilo-text-secondary dark:text-omilo-dark-text-secondary focus:outline-none cursor-pointer'
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

          {/* Error message */}
          {message && (
            <p className="text-sm text-red-500 mt-2 text-center flex items-center justify-center gap-2">
              <CircleX className="size-4" />{message}!
            </p>
          )}

          {/* button */}
          <button type='submit' className='flex items-center justify-center gap-2 w-full mt-8 rounded-md py-2 bg-omilo-primary text-white text-sm group'>
            {loading ? <Loader className='size-5 animate-spin ' /> : <span className='flex items-center justify-center gap-2'> Sign in <ArrowRight className='size-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out' /></span>}
          </button>

          {/* sign up link */}
          <span className='mt-5 text-sm flex items-center justify-center gap-2'>
            <p className='text-omilo-text-secondary dark:text-omilo-dark-text-secondary'>Don't have an account?</p>
            <Link to="/signUp" className='text-omilo-primary font-semibold'> Sign Up</Link>
          </span>
        </form>
      </main>
    </>
  );
}

export default Login;
