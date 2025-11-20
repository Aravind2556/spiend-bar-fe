export function getRangeForTitle(title, thresholdObj) {
    switch (title) {
        case "Cervical":
            return { min: thresholdObj.carvideRangeMin, max: thresholdObj.carvideRangeMax };

        case "Thoracic":
            return { min: thresholdObj.thoracicRangeMin, max: thresholdObj.thoracicRangeMax };

        case "Lumber":
            return { min: thresholdObj.lumberRangeMin, max: thresholdObj.lumberRangeMax };

        case "Sacrum":
            return { min: thresholdObj.sacralRangeMin, max: thresholdObj.sacralRangeMax };

        case "Left Clavicle":
            return { min: thresholdObj.leftCarvideRangeMin, max: thresholdObj.leftCarvideRangeMax };

        case "Right Clavicle":
            return { min: thresholdObj.rightCarvideRangeMin, max: thresholdObj.rightCarvideRangeMax };

        case "Left Ilium":
            return { min: thresholdObj.leftIliumRangeMin, max: thresholdObj.leftIliumRangeMax };

        case "Right Ilium":
            return { min: thresholdObj.rightIliumRangeMin, max: thresholdObj.rightIliumRangeMax };

        default:
            return { min: 0, max: 99999 };
    }
}
