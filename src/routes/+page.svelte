<script>
  import imageAuthUrl from '$lib/auth.jpg'
  import imageNotificationUrl from '$lib/notification.jpg'
  import imageBillingUrl from '$lib/billing.jpg'
  import imageClientUrl from '$lib/client.jpg'
  import imageSymphonyUrl from '$lib/symphony.jpg'
</script>

<div>
  <section class="intro">
    <h2>The best benefit-cost authentication system around the block</h2>
    <p>
      Need a hassle-free authentication system with multi-factor authentication
      (MFA)? Tired of the high costs of popular services? Introducing Auth+, a
      flexible solution that lets you create and manage your teams effortlessly.
      Say goodbye to the dilemma of building from scratch or breaking the bank.
      Our platform offers a balance between customization and affordability.
      Auth+ has small startup as a target, offering all kind of system at low
      cost, but also offering support to customize. Monetizing for each system
      that the client wants to subscribe
    </p>
  </section>

  <section class="services">
    <h3>Services</h3>
    <div class="card_list">
      <div class="card_item" style="background-image: url({imageAuthUrl})">
        <div class="hide">
          <h4>Authentication</h4>
          <ul>
            <li>Typescript</li>
            <li>Express</li>
            <li>winston</li>
            <li>Knex</li>
            <li>Mocha</li>
            <li>ts-mockito</li>
            <li>casual</li>
          </ul>
        </div>
      </div>
      <div
        class="card_item"
        style="background-image: url({imageNotificationUrl})"
      >
        <div class="hide">
          <h4>Notification</h4>
          <ul>
            <li>Go</li>
            <li>Gin</li>
            <li>Zap</li>
            <li>Testify</li>
            <li>Gock</li>
            <li>Faker</li>
          </ul>
        </div>
      </div>
      <div class="card_item" style="background-image: url({imageBillingUrl})">
        <div class="hide">
          <h4>Billing</h4>
          <ul>
            <li>Rust</li>
            <li>Actix</li>
            <li>sqlx</li>
            <li>Mockall</li>
            <li>Fake</li>
          </ul>
        </div>
      </div>
      <div class="card_item" style="background-image: url({imageClientUrl})">
        <div class="hide">
          <h4>Client</h4>
          <ul>
            <li>Typescript</li>
            <li>Svelte</li>
            <li>Vite</li>
          </ul>
        </div>
      </div>
      <div class="card_item" style="background-image: url({imageSymphonyUrl})">
        <div class="hide">
          <h4>Symphony</h4>
          <ul>
            <li>Pulumi</li>
            <li>Prometheus</li>
            <li>Zipkin</li>
            <li>ELK</li>
            <li>Kafka</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="competitors">
    <h2>Evaluating Auth+ Against Competitors: A Comprehensive Guide</h2>
    <p>
      Before diving into comparisons, it's essential to grasp Auth+'s core
      features and unique selling points. What sets it apart from other
      authentication services? Developing an application requires integrating
      various functionalities. This text helps navigate some key services with
      their major competitors:
    </p>

    <h4>Authentication</h4>
    <p>
      This service verifies user identities and controls access to your
      application. Here's a look at some popular options:
    </p>
    <ul>
      <li>AuthRocket: https://authrocket.com/plans</li>
      <li>Auth0 https://auth0.com/pricing</li>
      <li>OneLogin: https://www.onelogin.com</li>
      <li>AWS Cognito: https://aws.amazon.com/pt/cognito/pricing</li>
    </ul>

    <h4>Notification</h4>
    <p>
      This service keeps users informed through messages like emails, push
      notifications, or in-app alerts. Explore these options:
    </p>
    <ul>
      <li>SendGrid: https://sendgrid.com/pricing</li>
      <li>Mailchimp: https://mailchimp.com/pt-br/pricing/marketing</li>
      <li>OneSignal: https://onesignal.com/pricing</li>
      <li>Amazon SNS: https://aws.amazon.com/pt/sns/pricing</li>
      <li>Braze: https://www.braze.com</li>
      <li>
        Zuora:
        https://www.zuora.com/products/billing-software/pricing-and-packaging/
      </li>
    </ul>
    <h4>Billing</h4>
    <p>
      This service manages subscriptions, recurring payments, and invoicing.
      Consider these options:
    </p>
    <ul>
      <li>Recurly: https://recurly.com/plans</li>
      <li>Chargebee: https://www.chargebee.com/pricing/?ref=navbar</li>
      <li>
        Zuora:
        https://www.zuora.com/products/billing-software/pricing-and-packaging/
      </li>
    </ul>
  </section>

  <section class="author">
    <h2>Author's Reflection</h2>
    <p>
      This ongoing project showcases a significant amount of my skills and
      expertise. Due to the complexity of each system, I've provided links for
      detailed descriptions. To simulate a real-world startup environment, these
      projects have been designed to challenge me in areas such as programming
      languages, technical concepts, and tools.
    </p>
  </section>
</div>

<style lang="scss">
  div {
    width: 100%;

    section.intro {
      padding: 5vmin;
      max-width: 60%;
    }

    section.services {
      background-color: rgb(231, 231, 231);
      padding: 3vmin;
    }
    div.card_list {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      align-content: center;
      flex-grow: 1;
      width: 100%;
      gap: 50px;
      width: 100%;
      overflow-x: auto;
      padding-bottom: 2vmin;
      div.card_item {
        list-style-type: none;
        background-repeat: repeat;
        background-size: cover;
        background-position: center;
        height: 650px;
        min-width: 400px;
        min-height: 100%;

        div.hide {
          opacity: 0;
          height: 100%;
          background: linear-gradient(
            rgba(255, 255, 255, 0.7),
            rgba(0, 0, 0, 0.9)
          );
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 1s;

          ul {
            color: rgb(63, 63, 63);
            li {
              color: white;
              list-style-type: none;
            }
          }
        }
        &:hover {
          & .hide {
            opacity: 1;
          }
        }
      }
    }

    section.competitors {
      padding: 5vmin;
      max-width: 60%;
      ul {
        width: 50%;
        margin: 0 0 40px 0;
        li {
          margin: 1vmin 0;
          padding: 2vmin;
          background-color: rgb(245, 245, 245);
          box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
          transition: all 0.5s;
          &:hover {
            box-shadow: 0 0 7px rgba(33, 33, 33, 0.7);
          }
        }
      }
    }

    section.author {
      padding: 5vmin;
      width: 100%;
      background-color: rgb(88, 88, 88);
      color: white;
    }
  }
</style>
