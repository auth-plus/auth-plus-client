import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
  PUBLIC_AUTH_URL: {
    public: true,
    static: true
  },
  PUBLIC_BILLING_URL: {
    public: true,
    static: true
  }
})
