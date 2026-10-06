"use client";

export default function Error({ error, reset }) {
  return (
    <div className="api-error">
      <h2>Couldn&apos;t load the page</h2>
      <p>
        The API didn&apos;t respond. Make sure the backend is running on <code>http://127.0.0.1:8010</code> (see the
        README), then try again.
      </p>
      <p className="muted">{error.message}</p>
      <button className="btn-outline" onClick={() => reset()}>Try again</button>
    </div>
  );
}
