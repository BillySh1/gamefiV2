const useShopItems = () => [
  [
    {
      tokenId: 10,
      img: require("../../assets/store/item/type_0_0.svg"),
      name: "粮草",
    },
    {
      tokenId: 11,
      img: require("../../assets/store/item/type_0_1.svg"),
      name: "战鼓",
    },
  ],
  [
    {
      tokenId: 9,
      img: require("../../assets/store/item/type_1_0.svg"),
      name: "两仪石",
    },
  ],
  [
    {
      tokenId: 4,
      img: require("../../assets/store/item/type_2_0.svg"),
      name: "幸运石",
    },
    {
      tokenId: 5,
      img: require("../../assets/store/item/type_2_1.svg"),
      name: "天佑石",
    },
    {
      tokenId: 6,
      img: require("../../assets/store/item/type_2_2.svg"),
      name: "神眷石",
    },
    {
      tokenId: 7,
      img: require("../../assets/store/item/type_2_2.svg"),
      name: "突破",
    },
    {
      tokenId: 8,
      img: require("../../assets/store/item/type_2_2.svg"),
      name: "进阶",
    },
    {
      tokenId: 0,
      img: require("../../assets/store/item/type_2_2.svg"),
      name: "凡卷",
    },
    {
      tokenId: 1,
      img: require("../../assets/store/item/type_2_2.svg"),
      name: "良卷",
    },
    {
      tokenId: 2,
      img: require("../../assets/store/item/type_2_2.svg"),
      name: "狂卷",
    },
    {
      tokenId: 3,
      img: require("../../assets/store/item/type_2_2.svg"),
      name: "神卷",
    },
  ],
];

const useGetShopDetailByTokenId = (id) => {
  let res;
  useShopItems().map((x) =>
    x.find((i) => {
      if (i.tokenId == id) {
        res = i;
      }
    })
  );
  return res;
};

export { useShopItems, useGetShopDetailByTokenId };
