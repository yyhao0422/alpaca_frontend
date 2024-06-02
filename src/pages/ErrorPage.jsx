export default function ErrorPage({ message }) {
  return (
    <div>
      <h1>An error occurred</h1>
      <p>Error Message: {message}</p>
    </div>
  );
}
