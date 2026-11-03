import axios from "axios"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ROUTE_API } from "../lib/route"

const api = axios.create({ baseURL: ROUTE_API })

// The API answers with either { message } or { errors: { msg } }
export function getErrorMessage(error) {
    const data = error?.response?.data
    return data?.errors?.msg || data?.message || "Something went wrong, please try again"
}

export const useAuth = create(
    persist(
        (set, get) => ({
            token: null,
            user: null, // { name, email, role }
            hydrated: false,

            async signup(values) {
                await api.post("/auth/signup", values)
            },

            async signin(values) {
                const { data } = await api.post("/auth/signin", values)
                set({ token: data.token, user: data.user })
            },

            logout() {
                set({ token: null, user: null })
            },

            // Drop a stored token the API no longer accepts
            async verify() {
                const { token } = get()
                if (!token) return
                try {
                    await api.get("/auth/verifyToken", { headers: { token } })
                } catch (error) {
                    if (error.response) set({ token: null, user: null })
                }
            },
        }),
        {
            name: "foodaway-user",
            skipHydration: true,
            partialize: ({ token, user }) => ({ token, user }),
        }
    )
)
