import { Link } from "react-router-dom";

export function Landing() {
  return (
    <main className="f-screen h-screen flex items-center justify-center">
      <div>Landing</div>
      <Link to="/creator/personal">Creator</Link>
    </main>
  );
}
