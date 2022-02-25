
const useQualityText = (x)=>{
    return ['普通','优秀','史诗','传说'][x]
}

const usePreferenceText = (x)=>{
    return ['盾','战','谋','刺','辅'][x]
}

const useCampText = (x)=>{
    return ['魏国','蜀国','吴国','群雄'][x]
}
const usePropertyName = (x)=>{
    return ['耐力','力量','智力','敏捷','精神'][x]
}

export {
    useQualityText,
    usePreferenceText,
    useCampText,
    usePropertyName
}