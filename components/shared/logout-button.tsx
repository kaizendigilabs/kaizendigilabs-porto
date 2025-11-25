"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const supabase = createBrowserClient()

  async function handleLogout() {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success("Logged out successfully")
      router.push("/login")
      router.refresh()
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Spinner className="mr-2" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 size-4" />
          Logout
        </>
      )}
    </Button>
  )
}
