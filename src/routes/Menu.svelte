<script lang="ts">
  import { credential } from '../stores/auth'
  import { resolve } from '$app/paths'
  import type { RouteId } from './$types'
  // Use the $ prefix to access the store value reactively
  async function logout() {
    if ($credential) {
      await credential.logout($credential.token)
      sessionStorage.removeItem('token')
    }
  }

  type Routes = {
    label: string
    path: RouteId
  }
  $: navItems = [
    { label: 'HOME', path: '/' },
    ...($credential
      ? [
          { label: 'INVOICES', path: '/invoices' },
          { label: 'MFA', path: '/mfa' },
          { label: 'USERS', path: '/users' }
        ]
      : [])
  ] as Routes[]
</script>

<nav
  class="sticky top-0 z-50 flex w-full items-center justify-between border-b border-stone-300 bg-white px-8 py-4 font-serif shadow-sm">
  <ul class="flex gap-8">
    {#each navItems as item (item.path)}
      <li class="list-none">
        <a
          href={resolve(item.path)}
          class="text-xs font-bold tracking-[0.2em] text-stone-500 no-underline transition-colors hover:text-stone-900">
          {item.label}
        </a>
      </li>
    {/each}
  </ul>

  {#if $credential != null}
    <div class="flex items-center gap-4">
      <button
        data-testid="logout-button"
        on:click={logout}
        aria-label="user logout"
        class="group flex cursor-pointer items-center gap-2 border-none bg-transparent p-2 transition-transform active:scale-95">
        <span
          class="text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-stone-900">
          Logout
        </span>
        <svg
          class="h-5 w-5 stroke-stone-500 transition-colors group-hover:stroke-stone-900"
          viewBox="0 0 177 202"
          fill="none"
          stroke-width="20"
          stroke-linecap="round">
          <path
            d="M33.7,64.3C22.1,77.2,15,94.3,15,113c0,40.1,32.5,72.7,72.7,72.7c40.1,0,72.7-32.5,72.7-72.7c0-18.7-7.1-35.8-18.7-48.7" />
          <line x1="87.8" y1="15" x2="87.8" y2="113" />
        </svg>
      </button>
    </div>
  {:else}
    <div class="flex items-center gap-4" data-testid="login-button">
      <a
        href={resolve('/login')}
        class="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 no-underline transition-colors hover:text-stone-900">
        Login
      </a>
    </div>
  {/if}
</nav>
