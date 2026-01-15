// Temperature conversion functions
const celsiusToFahrenheit = (celsius, decimals = 2) => {
  if (isNaN(celsius) || celsius === null || celsius === "") return "";
  const result = (parseFloat(celsius) * 9/5) + 32;
  return parseFloat(result.toFixed(decimals));
};

const fahrenheitToCelsius = (fahrenheit, decimals = 2) => {
  if (isNaN(fahrenheit) || fahrenheit === null || fahrenheit === "") return "";
  const result = (parseFloat(fahrenheit) - 32) * 5/9;
  return parseFloat(result.toFixed(decimals));
};

const ConvertInputFields = ({ UnitSettings, materialData, SelectedPart }) => {
  if (SelectedPart !== "Drying") {
    let DataKeys = {
      Min: `Min_${SelectedPart}_Temperature`,
      Max: `Max_${SelectedPart}_Temperature`,
      Avg: `Avg_${SelectedPart}_Temperature`,
    };

    let unit = UnitSettings[`${SelectedPart}TempUnit`].unit_id;

    function countDecimalPlaces(number) {
      const numberStr = number.toString();
      if (numberStr.includes(".")) {
        return numberStr.split(".")[1].length;
      } else {
        return 0;
      }
    }

    let Decimals = countDecimalPlaces(
      UnitSettings[`${SelectedPart}TempUnit`].decimals
    );

    let UpdatedValues = {
      [DataKeys.Min]:
        unit === 16
          ? fahrenheitToCelsius(materialData[DataKeys.Min], Decimals)
          : unit === 17
          ? celsiusToFahrenheit(materialData[DataKeys.Min], Decimals)
          : materialData[DataKeys.Min],

      [DataKeys.Max]:
        unit === 16
          ? fahrenheitToCelsius(materialData[DataKeys.Max], Decimals)
          : unit === 17
          ? celsiusToFahrenheit(materialData[DataKeys.Max], Decimals)
          : materialData[DataKeys.Max],
    };

    return UpdatedValues;
  } else {
    let unit = UnitSettings[`${SelectedPart}TempUnit`].unit_id;

    function countDecimalPlaces(number) {
      const numberStr = number.toString();
      if (numberStr.includes(".")) {
        return numberStr.split(".")[1].length;
      } else {
        return 0;
      }
    }

    let Decimals = countDecimalPlaces(
      UnitSettings[`${SelectedPart}TempUnit`].decimals
    );

    let UpdatedValues = {
      ["Drying_Temperature"]:
        unit === 16
          ? fahrenheitToCelsius(materialData["Drying_Temperature"], Decimals)
          : unit === 17
          ? celsiusToFahrenheit(materialData["Drying_Temperature"], Decimals)
          : materialData["Drying_Temperature"],
    };

    return UpdatedValues;
  }
};

const UpdateCalculations = ({
  UnitSettings,
  category,
  SelectedMaterialData,
  setSelectedMaterialData,
  setSelectedMaterialsUnitData,
  SelectedMaterialsUnitData,
}) => {
  const CalculateAverage = (min, max, Decimals) => {
    let avg = 0;

    let values = {
      min: isNaN(min) ? 0 : parseFloat(min),
      max: isNaN(max) ? 0 : parseFloat(max),
    };

    avg = (values.min + values.max) / 2;

    return isNaN(parseFloat(avg).toFixed(Decimals))
      ? ""
      : parseFloat(avg).toString().includes(".")
      ? parseFloat(avg).toFixed(Decimals)
      : parseFloat(avg);
  };

  function countDecimalPlaces(number) {
    const numberStr = number.toString();
    if (numberStr.includes(".")) {
      return numberStr.split(".")[1].length;
    } else {
      return 0;
    }
  }

  let Decimals = countDecimalPlaces(
    UnitSettings[`${category}TempUnit`].decimals
  );

  let DataKeys = {
    Min: `Min_${category}_Temperature`,
    Max: `Max_${category}_Temperature`,
    Avg: `Avg_${category}_Temperature`,
  };

  let UpdatedValues = {
    [DataKeys.Min]: isNaN(
      parseFloat(SelectedMaterialData[DataKeys.Min]).toFixed(Decimals)
    )
      ? ""
      : parseFloat(SelectedMaterialData[DataKeys.Min]).toString().includes(".")
      ? parseFloat(SelectedMaterialData[DataKeys.Min]).toFixed(Decimals)
      : parseFloat(SelectedMaterialData[DataKeys.Min]),

    [DataKeys.Max]: isNaN(
      parseFloat(SelectedMaterialData[DataKeys.Max]).toFixed(Decimals)
    )
      ? ""
      : parseFloat(SelectedMaterialData[DataKeys.Max]).toString().includes(".")
      ? parseFloat(SelectedMaterialData[DataKeys.Max]).toFixed(Decimals)
      : parseFloat(SelectedMaterialData[DataKeys.Max]),
    [DataKeys.Avg]: CalculateAverage(
      parseFloat(SelectedMaterialData[DataKeys.Min]),
      parseFloat(SelectedMaterialData[DataKeys.Max]),
      Decimals
    ),

    Drying_Temperature: isNaN(
      parseFloat(SelectedMaterialData.Drying_Temperature).toFixed(Decimals)
    )
      ? ""
      : parseFloat(SelectedMaterialData.Drying_Temperature)
          .toString()
          .includes(".")
      ? parseFloat(SelectedMaterialData.Drying_Temperature).toFixed(Decimals)
      : parseFloat(SelectedMaterialData.Drying_Temperature),
  };

  document.getElementsByName([DataKeys.Min])[0].value =
    UpdatedValues[DataKeys.Min];
  document.getElementsByName([DataKeys.Max])[0].value =
    UpdatedValues[DataKeys.Max];

  document.getElementsByName("Drying_Temperature")[0].value =
    UpdatedValues.Drying_Temperature;

  setSelectedMaterialData({
    ...SelectedMaterialData,
    [DataKeys.Min]: UpdatedValues[DataKeys.Min],
    [DataKeys.Max]: UpdatedValues[DataKeys.Max],
    [DataKeys.Avg]: UpdatedValues[DataKeys.Avg],

    Drying_Temperature: UpdatedValues.Drying_Temperature,
  });

  setSelectedMaterialsUnitData({
    ...SelectedMaterialsUnitData,
    [DataKeys.Min]: {
      ...SelectedMaterialsUnitData[DataKeys.Min],
      value: UpdatedValues[DataKeys.Min],
    },
    [DataKeys.Max]: {
      ...SelectedMaterialsUnitData[DataKeys.Max],
      value: UpdatedValues[DataKeys.Max],
    },
    [DataKeys.Avg]: {
      ...SelectedMaterialsUnitData[DataKeys.Avg],
      value: UpdatedValues[DataKeys.Avg],
    },

    Drying_Temperature: {
      ...SelectedMaterialsUnitData.Drying_Temperature,
      value: UpdatedValues.Drying_Temperature,
    },
  });
};

export default { ConvertInputFields, UpdateCalculations };
