import React, {useState, useCallback} from 'react'
import { cn } from "#cli/lib/utils.mjs"
import { Button } from "#cli/components/ui/patched/button.jsx"
import { Input } from "#cli/components/ui/input.jsx"
import { Label } from "#cli/components/ui/label.jsx"

import useSessionContext from '#cli/context/session/useSessionContext.mjs'

export function LoginForm({className, forgotLink}) {
  const {login, fetcher} = useSessionContext()
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [valid, setValid] = useState(true)

  const handleLocalLogin = useCallback(async (ev) => {
    ev.preventDefault()
    const {authenticated} = await login({username: email, password: pwd})
    setValid(authenticated === true)
  }, [email, pwd, login])
    

  const handleGoogleLogin = useCallback(async (ev) => {
    ev.preventDefault()
    const {authenticated} = await fetcher.get('/auth/google')
    setValid(authenticated === true)
  }, [fetcher])
    

  return (
    <>
      <form className={cn("flex flex-col gap-6", className)}
            onSubmit={handleLocalLogin}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">miolo-sample</h1>

        </div>
        <br/>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(valid ? 'valid' : 'invalid')}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className={cn(valid ? 'valid' : 'invalid')}
            />
          </div>
          { (!valid) &&
            <div
              className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center">
              <p className="text-red-500 text-sm">
                Email o contraseña incorrectos
              </p>
            </div>
          }
          <Button type="submit" className="w-full">
            Login
          </Button>
          {forgotLink != undefined
            ? 
            <div
              className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center">
              <a href={forgotLink}
                className="bg-background text-muted-foreground relative z-10 px-2 ml-auto text-sm underline-offset-4 hover:underline">
                Has olvidado la contraseña?
              </a>
            </div>
            : null
          }
        </div>
        {/*
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
        */}
      </form>
      
      <div
        className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or
        </span>
      </div>
      <Button variant="outline" className="w-full" onClick={() => window.location.href = '/auth/google'}>

        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47"/>
          <path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4"/>
          <path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00"/>
          <polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"/>
          <path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435"/>
          <polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"/>
          <path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"/>
        </svg>

        Login with Google
      </Button>
    </>
  )
}
