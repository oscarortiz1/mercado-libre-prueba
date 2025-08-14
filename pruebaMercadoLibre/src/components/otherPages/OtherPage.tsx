import { useSearchParams } from "react-router-dom";

export default function OtherPage() {
  const [searchParams] = useSearchParams();

  const referrer = searchParams.get("referrer");
  const token = searchParams.get("token");

  return (
    <div>
      <h1>Siguiente página</h1>
      <p>Referrer: {referrer}</p>
      <p>Token: {token}</p>
    </div>
  );
}
