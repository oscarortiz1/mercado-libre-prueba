import { useSearchParams } from "react-router-dom";
import { useT } from "../../i18n/useT";

export default function OtherPage() {
  const [searchParams] = useSearchParams();
  const { t } = useT();

  const referrer = searchParams.get("referrer");
  const token = searchParams.get("token");

  return (
    <div>
      {referrer !== null && token !== null ? (
        <>
          <h1>{t("title.next")}</h1>
          <p>{t("title.referrer")}: {referrer}</p>
          <p>{t("title.token")}: {token}</p>
        </>
      ) : (
        <p>{t("title.missingParams")}</p>
      )}
    </div>
  );
}
