import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-zinc-900">
            Kaizen Dashboard
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Sign in to manage your content
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@kaizendigilabs.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <Button formAction={login} className="w-full bg-zinc-900 hover:bg-zinc-800">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}
