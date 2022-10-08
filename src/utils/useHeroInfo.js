import i18n from "../i18n";
const t = i18n.global.t;
const useQualityText = (x) => {
  return ["N", "R", "SR", "SSR"][x];
};

const usePreferenceText = (x) => {
  return [t('job_0'), t('job_1'), t('job_2'), t('job_3'), t('job_4'), "主公"][x];
};

const useCampText = (x) => {
  return [t('camp_0'), t('camp_1'), t('camp_2'), t('camp_3')][x];
};
const usePropertyName = (x) => {
  return ["耐力", "力量", "智力", "敏捷", "精神"][x];
};
const useRarityName = (x) => {
  return [t('rarity_0'), t('rarity_1'), t('rarity_2'), t('rarity_3'), t('rarity_4'), t('rarity_5')][x];
};

export {
  useQualityText,
  useRarityName,
  usePreferenceText,
  useCampText,
  usePropertyName,
};
