const useQualityText = (x) => {
  return ["N", "R", "SR", "SSR"][x];
};

const usePreferenceText = (x) => {
  return ["盾", "战", "谋", "刺", "辅",'主公'][x];
};

const useCampText = (x) => {
  return ["魏国", "蜀国", "吴国", "群雄"][x];
};
const usePropertyName = (x) => {
  return ["耐力", "力量", "智力", "敏捷", "精神"][x];
};
const useRarityName = (x) => {
  return ["白", "蓝", "紫", "橙", "金", "红"][x];
};

export {
  useQualityText,
  useRarityName,
  usePreferenceText,
  useCampText,
  usePropertyName,
};
