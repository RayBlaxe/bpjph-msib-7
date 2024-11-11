import { Link } from "gatsby";
import React, { useCallback, useMemo, useState } from "react";
import SearchForm from "./form";
import { FormattedMessage } from "react-intl";
import ImgsViewer from "react-images-viewer";
import Infographics from "./infographics";
import { normalizeUrl } from "../utils";

const SideCard = (props) => {
  const { articles, locale, infographics, showSearch = false } = props;
  const [imageState, setImageState] = useState({
    image: [{ src: "" }],
    open: false,
  });

  const previewImage = useCallback((value) => {
    const url = normalizeUrl(value.url);
    setImageState({ image: [{ src: url }], open: true });
  }, []);

  const onClose = () => setImageState({ ...imageState, open: false });

  if (!articles || articles.length === 0) return null;

  return (
    <div className="mb-5 py-2 md:py-5">
      {showSearch ? (
        <>
          <p className="mb-2 w-full text-base font-semibold text-gray-500 sm:col-span-4 sm:text-center sm:text-base">
            <FormattedMessage id="check" defaultMessage={"Cek"} />{" "}
            <span className="text-fontSecondary">
              <FormattedMessage
                id="halal_product"
                defaultMessage={"Produk Halal"}
              />
            </span>
          </p>
          <div className="mb-3">
            <SearchForm className="mb-3" />
          </div>
        </>
      ) : (
        <div />
      )}
      <div className={"w-full"}>
        <h1 className="text-md mb-3 border-b-2 border-green font-semibold text-fontPrimary">
          <FormattedMessage
            id="recent_articles"
            defaultMessage={"Artikel Terkini"}
          />
        </h1>
        <div className="rounded-md bg-white px-5 py-2">
          {articles.map((item, index) => (
            <Item
              data={item}
              key={index}
              locale={locale}
              isLast={index === articles.length - 1}
            />
          ))}
        </div>
      </div>

      <Infographics data={infographics} previewImage={previewImage} />
      <ImgsViewer
        imgs={imageState.image}
        currImg={0}
        isOpen={imageState.open}
        onClickPrev={console.log}
        onClickNext={console.log}
        onClose={onClose}
        backdropCloseable={true}
        theme={{
          footerCount: {
            display: "none",
          },
        }}
      />

      <div className="mt-8 w-full relative">
        <h1 className="text-md mb-3 border-b-2 border-green font-semibold text-fontPrimary relative z-10">
          <FormattedMessage id="viewers" defaultMessage={"Pengunjung"} />
        </h1>
        <div className="-mt-8 relative z-0">
          <a href="https://worldflagcounter.com/details/iMX" target="_blank" rel="noopener noreferrer">
            <img
              src="https://worldflagcounter.com/iMX/"
              alt="Flag Counter"
              border="0"
            />
          </a>
        </div>
      </div>

    </div>
  );
};

const Item = ({ data, isLast, locale }) => {
  const localeUrl = locale === "id" ? "" : `/${locale}`;
  const link = `${localeUrl}/detail/${data.slug}`;
  const publishedAt = useMemo(() => {
    if (!data || !data.date) return "";
    return data.date;
  }, [data]);

  return (
    <Link
      to={link}
      className={`flex flex-col py-2 ${!isLast ? "border-b" : ""}`}
    >
      <div className="col-span-1 mr-2 pb-2 text-sm font-bold text-fontPrimary">
        {data.title}
      </div>
      <div className="text-start text-xs text-fontPrimary text-neutral-500 sm:text-justify md:col-span-3">
        {data.description}
      </div>
      <span className="mt-2 text-right text-xs text-gray-400">
        {publishedAt}
      </span>
    </Link>
  );
};

export default SideCard;
