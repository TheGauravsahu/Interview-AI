export default function ErrorOccurred({ error }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Oops! An Error Occurred</h1>
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    </div>
  );
}
