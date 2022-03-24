const combineMap = [
  ["五子良将", "裸衣恶来", "夏侯之势", "鬼道洛神"],
  ["五虎上将", "桃园三结义", "卧龙凤雏", "良师益友"],
  ["东吴四英杰", "苦肉计施", "国色天香", "江东虎臣"],
  ["乱世孽缘", "悬壶济世", "酒池肉林", "黄巾之乱"],
];

const findCombineIndex = (camp,name)=>{
  return combineMap[camp].findIndex(x=>{
    return x == name
  })
}

export { combineMap,findCombineIndex };
