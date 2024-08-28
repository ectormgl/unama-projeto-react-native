import { auth, signIn, signOut } from "@projeto/auth"
import { Button } from "@projeto/web-ui/button"

export async function AuthShowcase() {
    const session = await auth()

    if (!session) {
        return (
            <form>
                <Button
                    size="lg"
                    formAction={async () => {
                        "use server"
                        await signIn("GOOGLE")
                    }}
                >
                    Sign in with GOOGLE
                </Button>
            </form>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl">
                <span>Logged in as {session.user.name}</span>
            </p>

            <form>
                <Button
                    size="lg"
                    formAction={async () => {
                        "use server"
                        await signOut()
                    }}
                >
                    Sign out
                </Button>
            </form>
        </div>
    )
}
