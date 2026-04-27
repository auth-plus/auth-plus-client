<script lang="ts">
  import imageAuthUrl from '$lib/auth.jpg'
  import imageNotificationUrl from '$lib/notification.jpg'
  import imageBillingUrl from '$lib/billing.jpg'
  import imageClientUrl from '$lib/client.jpg'
  import imageSymphonyUrl from '$lib/symphony.jpg'
  import imageMonetizationUrl from '$lib/monetization.png'

  type Exhibits = {
    name: string
    img: string
    stack: string[]
    url: string
  }
  const exhibits = [
    {
      name: 'Authentication',
      img: imageAuthUrl,
      stack: ['TypeScript', 'Express', 'Winston', 'Knex', 'Mocha'],
      url: 'https://github.com/auth-plus/auth-plus-authentication'
    },
    {
      name: 'Notification',
      img: imageNotificationUrl,
      stack: ['Go', 'Gin', 'Zap', 'Testify', 'Gock'],
      url: 'https://github.com/auth-plus/auth-plus-notification'
    },
    {
      name: 'Billing',
      img: imageBillingUrl,
      stack: ['Rust', 'Actix', 'sqlx', 'Mockall', 'Fake'],
      url: 'https://github.com/auth-plus/auth-plus-billing'
    },
    {
      name: 'Client',
      img: imageClientUrl,
      stack: ['TypeScript', 'Svelte', 'Tailwind', 'Vite'],
      url: 'https://github.com/auth-plus/auth-plus-client'
    },
    {
      name: 'Monetization',
      img: imageMonetizationUrl,
      stack: ['Python', 'fastapi', 'sqlalchemy', 'pytest'],
      url: 'https://github.com/auth-plus/auth-plus-monetization'
    },
    {
      name: 'Symphony',
      img: imageSymphonyUrl,
      stack: ['Pulumi', 'Prometheus', 'Zipkin', 'ELK', 'Kafka'],
      url: 'https://github.com/auth-plus/auth-plus-symphony'
    }
  ] satisfies Exhibits[]
</script>

<div class="min-h-screen bg-stone-50 font-serif text-stone-900">
  <header class="border-b border-stone-300 px-8 py-20 text-center">
    <h1 class="mb-4 text-5xl uppercase tracking-tight">Auth+ Gallery</h1>
    <p class="mx-auto max-w-2xl italic text-stone-600">
      A curated collection of modern infrastructure and secure systems architecture.
    </p>
  </header>

  <section class="mx-auto max-w-4xl px-8 py-24 text-lg leading-relaxed">
    <h2 class="mb-8 text-3xl text-stone-800">Curator's Note</h2>
    <p class="mb-6">
      Auth+ represents a balance between customization and affordability. Designed as a
      high-benefit, low-cost solution for startups, it challenges the traditional dilemma of
      building from scratch versus high-cost third-party services.
    </p>
  </section>

  <section class="bg-stone-200 py-24">
    <div class="mx-auto max-w-7xl px-8">
      <h3 class="mb-12 text-center text-sm uppercase tracking-[0.2em] text-stone-500">
        Permanent Collection: Services
      </h3>

      <div class="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        {#each exhibits as exhibit (exhibit.name)}
          <a
            href={exhibit.url}
            target="_blank"
            rel="external noopener noreferrer"
            class="group block no-underline hover:no-underline">
            <div
              class="bg-white p-4 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
              <div class="aspect-[3/4] overflow-hidden">
                <img
                  src={exhibit.img}
                  alt={exhibit.name}
                  class="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0" />
              </div>
            </div>
            <div class="mt-2 border-l-2 border-stone-400 pl-4 transition-colors duration-300">
              <h4 class="text-xl font-bold uppercase tracking-widest text-stone-900">
                {exhibit.name}
              </h4>
              <ul class="mt-2 flex flex-wrap gap-2 text-sm text-stone-600">
                {#each exhibit.stack as tech, i (i)}
                  <li class="after:ml-2 after:content-['•'] last:after:content-['']">{tech}</li>
                {/each}
              </ul>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-5xl px-8 py-24">
    <h2 class="mb-12 text-center text-3xl underline underline-offset-8">Comparative Studies</h2>
    <div class="grid gap-12 md:grid-cols-3">
      <div class="space-y-4">
        <h4 class="border-b border-stone-300 pb-2 font-bold">Authentication Landscape</h4>
        <p class="text-sm italic">Evaluating identity control and access.</p>
        <ul class="space-y-1 text-sm text-stone-600">
          <li>AuthRocket</li>
          <li>Auth0</li>
          <li>AWS Cognito</li>
        </ul>
      </div>
      <div class="space-y-4">
        <h4 class="border-b border-stone-300 pb-2 font-bold">Communication Methods</h4>
        <p class="text-sm italic">Engaging users through diverse alerts.</p>
        <ul class="space-y-1 text-sm text-stone-600">
          <li>SendGrid</li>
          <li>Mailchimp</li>
          <li>OneSignal</li>
        </ul>
      </div>
      <div class="space-y-4">
        <h4 class="border-b border-stone-300 pb-2 font-bold">Fiscal Management</h4>
        <p class="text-sm italic">Recurring payments and subscription logic.</p>
        <ul class="space-y-1 text-sm text-stone-600">
          <li>Recurly</li>
          <li>Chargebee</li>
          <li>Zuora</li>
        </ul>
      </div>
    </div>
  </section>

  <footer class="bg-stone-900 px-8 py-20 text-center text-stone-400">
    <div class="mx-auto max-w-2xl">
      <h2 class="mb-4 text-xl text-white">About the Architect</h2>
      <p class="text-sm italic leading-relaxed">
        This ongoing project showcases technical expertise across multiple programming languages and
        tools, simulating a real-world startup environment.
      </p>
    </div>
  </footer>
</div>
