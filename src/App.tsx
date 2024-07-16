import Locale from "./components/locale";
import React from "react";
import useTranslation from "./hooks/useTranslation";

export type SSProps = {
  startTime: string;
  endTime: string;
  locale?: string;
};

export const getServerSideProps = async (locale?: string) => {
  const startTime = new Date().toISOString();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const endTime = new Date().toISOString();

  return {
    props: {
      startTime,
      endTime,
      locale,
    },
  };
};

type DataProps = {
  data?: SSProps;
};

const App: React.FC<DataProps> = ({ data }) => {
  const [count, setCount] = React.useState(0);

  const { t, currentLocale, getLocales, getLocaleName, setLocale } =
    useTranslation(data?.locale);

  return (
    <React.StrictMode>
      <div>
        <h1>{t("welcome")}</h1>
        <p>{t("about.counter", 10)}</p>
        <p>{t("about.content")}</p>
        <p>{t("currentLocale", currentLocale)}</p>
        <Locale as="p">
          {t("withLocale", "bau bau!", getLocaleName(currentLocale))}
        </Locale>
        {data && (
          <div>
            <p>{t("startTime", data.startTime)}</p>
            <p>{t("endTime", data.endTime)}</p>
          </div>
        )}

        <select
          name="locale"
          value={currentLocale}
          onChange={(e) => setLocale(e.currentTarget.value)}
        >
          {getLocales().map(({ key, name }) => {
            return (
              <option key={`locale-${key}`} value={key}>
                {name}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <button onClick={() => setCount(count + 1)}>count: {count}</button>
      </div>
    </React.StrictMode>
  );
};

export default App;
