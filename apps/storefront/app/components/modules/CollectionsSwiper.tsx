import { Image } from "@shopify/hydrogen";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { SanityModuleCollectionsSwiper } from "~/lib/sanity";
import { toRoman } from "~/lib/utils";

import { Asterisk } from "../elements/Icons";
import { Section } from "../layout/Section";

type Props = {
  module: SanityModuleCollectionsSwiper;
};

const aspectRatios = ["344/519", "344/609", "344/444", "344/519"];

export default function CollectionModule({ module }: Props) {
  const {
    firstCollection,
    firstCollectionItems,
    secondCollection,
    secondCollectionItems,
    thirdCollection,
    thirdCollectionItems,
  } = module;
  const [firstSwiper, setFirstSwiper] = useState<any | null>(null);
  const [activeItems, setActiveItems] = useState<number>(0);
  const items = [
    firstCollectionItems,
    secondCollectionItems,
    thirdCollectionItems,
    firstCollectionItems,
    secondCollectionItems,
    thirdCollectionItems,
  ];

  const categories = [
    firstCollection,
    secondCollection,
    thirdCollection,
    firstCollection,
    secondCollection,
    thirdCollection,
  ];

  return (
    <Section className="mb-[200px]">
      <div className="col-span-12">
        <h3 className="mb-6">Shop by routine</h3>
        <div className="mb-6 w-screen">
          <Swiper
            slidesPerView={"auto"}
            loop={true}
            onSwiper={(e) => setFirstSwiper(e)}
            className="flex h-auto w-full overflow-visible"
            onSlideChange={(e) => setActiveItems(e.realIndex)}
          >
            {categories.map((category, i) => {
              return (
                <SwiperSlide
                  className="w-auto cursor-pointer"
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  onClick={() => {
                    [
                      firstSwiper && firstSwiper.slideToClickedSlide(),
                      // setActiveItems(i),
                    ];
                  }}
                >
                  {({ isActive }) => {
                    return (
                      <h2
                        className={`heading-1 mr-10 flex items-center gap-x-6 duration-500 ${
                          isActive ? "opacity-100" : "opacity-20"
                        }`}
                      >
                        {category?.split("|")[0] !== "*" ? (
                          <span className="heading-3 inline-flex h-[50px] w-[50px] items-center justify-center rounded-full border-[3px] border-black p-1">
                            {toRoman(Number(category?.split("|")[0]))}
                          </span>
                        ) : (
                          <span className="heading-3 inline-flex h-[50px] w-[50px] items-center justify-center rounded-full border-[3px] border-black p-1">
                            <Asterisk width={24} height={27} />
                          </span>
                        )}
                        {category?.split("|")[1]}
                      </h2>
                    );
                  }}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="grid-container relative grid">
          <AnimatePresence>
            {items[activeItems].map((product, i) => {
              return (
                <motion.div
                  exit={{ opacity: 0, scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
                  // eslint-disable-next-line react/no-array-index-key
                  key={product.productWithVariant._id + i}
                  className="col-span-3"
                >
                  <div
                    className="flex items-center justify-center px-21"
                    style={{
                      aspectRatio: aspectRatios[i],
                      background:
                        i % 2 === 0
                          ? "linear-gradient(180deg, #000 53.36%, rgba(79, 92, 96, 0.50) 83.01%, rgba(215, 229, 228, 0.50) 100%)"
                          : "black",
                    }}
                  >
                    <Image
                      src={product.productWithVariant.image}
                      sizes="100%"
                      className="h-auto w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <p>{product.productWithVariant.title}</p>
                    </div>
                    <div>
                      <p className="uppercase">
                        from {product.productWithVariant.price.minVariantPrice}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
