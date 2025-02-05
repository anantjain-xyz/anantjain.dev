export function Bio() {
  return (
    <section className="mt-8 mb-8 md:mb-12">
      <p className="mb-4">Hi! I’m Anant. 👋 </p>
      <p className="mb-4">I write about building startups and engineering teams.
        Until recently, I led the engineering groups building{" "}
        <a
          className="font-medium text-blue-800 dark:text-blue-500"
          href="https://brex.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Brex
        </a>
        's Travel, Bill Pay, Procurement, Vendors, and Banking products. Before
        Brex, I co-founded two startups: Compose Labs and EagerPanda.
      </p>
      <p className="mb-4">
        At{" "}
        <a
          className="font-medium text-blue-800 dark:text-blue-500"
          href="https://composelabs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Compose Labs
        </a>
        , we built tools to automatically generate videos from text articles
        (acquired by Brex in March 2020) and{" "}
        <a
          className="font-medium text-blue-800 dark:text-blue-500"
          href="https://youtu.be/zsblxTZ3vww?t=267"
          target="_blank"
          rel="noopener noreferrer"
        >
          EagerPanda
        </a>{" "}
        was a publishing platform with a realtime, multiplayer editor with
        version controls — think Google Docs + Medium + GitHub.
      </p>
      <p>
        Subscribe to my{" "}
        <a
          className="font-medium text-blue-800 dark:text-blue-500"
          href="https://anantjain.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          newletter on Substack
        </a>{" "}
        to get new posts delivered directly to your email.
      </p>
    </section>
  );
}
