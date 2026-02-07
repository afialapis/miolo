import React, {useState, useCallback, useEffect} from 'react'
import { cn } from "#cli/lib/utils.mjs"
import { Button } from "#cli/components/ui/patched/button.jsx"
import { Input } from "#cli/components/ui/input.jsx"
import { Label } from "#cli/components/ui/label.jsx"

export default function SecurityForm ({className, onChangePassword}) {
  const [current, setCurrent] = useState('')
  const [pwdNew, setPwdNew] = useState('')
  const [pwdRepeat, setPwdRepeat] = useState('')
  const [error, setError] = useState(true)
  const [ready, setReady] = useState(false)

  const validate= useCallback(() => {
    if ( (!current) || (!pwdNew) || (!pwdRepeat)) {
      //setError('Todos los campos son obligatorios')
      return false
    }
    if (pwdNew === current) {
      setError('La contraseña nueva no puede ser igual a la actual')
      return false
    }
    if (pwdNew !== pwdRepeat) {
      setError('Las contraseñas no coinciden')
      return false
    }
    setError(undefined)
    return true
  }, [pwdNew, pwdRepeat, current])

  const handleCallback = useCallback(async (ev) => {
    ev.preventDefault()
    if (!ready) return

    const {ok, error} = await onChangePassword({current: current, new: pwdNew})
    
    if (ok === true) {
      setError(undefined)
    } else {
      setError(error)
    }
  }, [onChangePassword, current, pwdNew, ready])

  useEffect(() => {
    const ok= validate()
    setReady(ok)
  }, [validate])

  return (
    <form className={cn("flex flex-col gap-6", className)}
          onSubmit={handleCallback}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-bcurrent">Cambiar contraseña</h2>

      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="current">Contraseña actual</Label>
          <Input
            id="current"
            type="password"
            required
            value={current}
            onKeyDown={validate}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="new">Contraseña nueva</Label>
          </div>
          <Input
            id="new"
            type="password"
            required
            value={pwdNew}
            onKeyDown={validate}
            onChange={(e) => setPwdNew(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="repeat">Repita la contraseña nueva</Label>
          </div>
          <Input
            id="repeat"
            type="password"
            required
            value={pwdRepeat}
            onKeyDown={validate}
            onChange={(e) => setPwdRepeat(e.target.value)}
          />
        </div>        
        { error &&
          <div
            className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center">
            <p className="text-red-500 text-sm">
              {error}
            </p>
          </div>
        }
        <Button type="submit" className="w-full" disabled={!ready}>
          Cambiar contraseña
        </Button>

      </div>

    </form>
  );
}
