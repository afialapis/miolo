import {useState, useCallback} from "react"
import { cn } from "#cli/lib/utils"
import { Button } from "#cli/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "#cli/components/ui/card"
import { Input } from "#cli/components/ui/input"
import { Label } from "#cli/components/ui/label"

export function LoginForm({className, onLogin}) {
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [valid, setValid] = useState(true)

  const handleCallback = useCallback(async (ev) => {
    ev.preventDefault()
    const result = await onLogin(username, pwd)
    setValid(result?.authenticated === true)
  }, [username, pwd, onLogin])
    
  
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>miolo-demo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCallback}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="miolo-demo"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
