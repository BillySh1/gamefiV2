const useShopItems = () => [
  [
    {
      tokenId: 12,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/type_0_0.png",
      name: "粮草",
      intro:
        "《宋史·食货志三》:“即今所在粮草尽乏，漕臣计无所出，文移指空而已。” ",
    },
    {
      tokenId: 11,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/type_0_1.png",
      name: "衅鼓",
      intro:
        "上古时的一种祭礼。上古凡重要器物（如钟、鼓等）制成后，一定要杀牛、羊、猪等，把它们的血涂在新器物上表示祭，称作衅。 古代战争时杀人或杀牲把血涂在鼓上行祭:君之惠，不以累臣衅鼓。",
    },
    {
      tokenId: 8,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/jinjie.png",
      name: "并尊盟约",
      intro: "英雄进阶的必备材料",
    },
    {
      tokenId: 9,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/lingyu.png",
      name: "金镶灵玉",
      intro: "提高进阶后属性的可选材料",
    },
  ],
  [
    {
      tokenId: 0,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/up_1.png",
      name: "纵横卷",
      intro: "用做普通品质卡牌升级的材料 ",
    },
    {
      tokenId: 1,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/up_2.png",
      name: "太公略",
      intro: "用做优秀品质卡牌升级的材料 ",
    },
    {
      tokenId: 2,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/up_3.png",
      name: "广雅笺",
      intro: "用做史诗品质卡牌升级的材料 ",
    },
    {
      tokenId: 3,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/up_4.png",
      name: "大禹谟",
      intro: "用做传说品质卡牌升级的材料 ",
    },
  ],
  [
    {
      tokenId: 4,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/type_2_0.png",
      name: "幸运石",
      intro: "提高出现优秀品质概率的宝石",
    },
    {
      tokenId: 5,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/type_2_1.png",
      name: "天佑石",
      intro: "提高出现史诗品质概率的宝石",
    },
    {
      tokenId: 6,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/type_2_2.png",
      name: "神眷石",
      intro: "提高出现传说品质概率的宝石",
    },
    {
      tokenId: 10,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/type_1_0.png",
      name: "两仪石",
      intro: "太极生两仪，两仪生四象， 两仪石是英雄重生的必备材料",
    },
    {
      tokenId: 7,
      img: "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/store/item/yuruyi.png",
      name: "玉灵瓶",
      intro: "英雄突破的材料",
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
