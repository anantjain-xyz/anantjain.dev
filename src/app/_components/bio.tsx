export function Bio() {
  return (
    <section className="mt-8 mb-8 md:mb-12">
      <p className="mb-4">
        Hi! I’m Anant. Welcome to my little home on the web.{" "}
      </p>
      <p className="mb-4">
        {" "}
        I'm part of the engineering team at{" "}
        <a
          className="text-blue-600 dark:text-blue-500 hover:underline"
          href="https://brex.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Brex
        </a>
        . Before Brex, I co-founded two startups: Compose Labs and EagerPanda.
      </p>

      <p className="mb-4">
        At{" "}
        <a
          className="text-blue-600 dark:text-blue-500 hover:underline"
          href="https://composelabs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Compose Labs
        </a>
        , we built tools to automatically generate videos from text articles —
        Brex acquired the team in March 2020.{" "}
        <a
          className="text-blue-600 dark:text-blue-500 hover:underline"
          href="https://youtu.be/zsblxTZ3vww?t=267"
          target="_blank"
          rel="noopener noreferrer"
        >
          EagerPanda
        </a>{" "}
        was a publishing platform with a realtime, multiplayer editor with
        version controls (think Google Docs + Medium + GitHub).
      </p>

      <p className="mb-4">
        After spending 10+ years across multiple engineering and product roles
        in high-growth startups, I'm currently focusing on building and
        operating highly functional engineering teams in a distributed,
        remote-first world. You can reach me at{" "}
        <a
          className="text-blue-600 dark:text-blue-500 hover:underline"
          href="mailto:me@anantjain.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          me@anantjain.dev
        </a>{" "}
        or{" "}
        <a
          className="text-blue-600 dark:text-blue-500 hover:underline"
          href="https://twitter.com/@anantja_in"
        >
          @anantja_in
        </a>
        .
      </p>
      <p>
        Subscribe to my{" "}
        <a
          className="text-blue-600 dark:text-blue-500 hover:underline"
          href="https://anantjain.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          newletter on Substack
        </a>{" "}
        to get new posts delivered directly to your email inbox.
      </p>
    </section>
  );
}
