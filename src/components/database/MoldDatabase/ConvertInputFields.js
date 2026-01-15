import {
  cm_To_in,
  cm_To_mm,
  in_To_cm,
  in_To_mm,
  mm_To_cm,
  mm_To_in
} from "../../FuncsForConversions/Distance/index";

import { g_To_oz,
  oz_To_g,
  sqcm_To_sqin,
  sqin_To_sqcm } from '../../FuncsForConversions/Speed/index';

const ConvertInputFields = ({
  UnitSettings,
  SelectedPart,
  UnitsForConversion,
  moldData,
  moldUnitData,
  PartData,
  partColumn,
  setmoldData,
  setmoldUnitData,
  setPartData,
  setUnitsForConversion,
}) => {
  function countDecimalPlaces(number) {
    const numberStr = number.toString();
    if (numberStr.includes(".")) {
      return numberStr.split(".")[1].length;
    } else {
      return 0;
    }
  }

  let Decimals = countDecimalPlaces(
    UnitSettings[`${SelectedPart}Unit`].decimals
  );

  if (SelectedPart === "Distance") {
    let UpdatedValues = {
      ["Mold_Stack_Height"]:
        UnitsForConversion.FromUnit === 22 && UnitsForConversion.ToUnit === 10
          ? cm_To_mm(moldData["Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 22
          ? mm_To_cm(moldData["Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 11
          ? mm_To_in(moldData["Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(moldData["Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 22
          ? in_To_cm(moldData["Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 22 &&
            UnitsForConversion.ToUnit === 11
          ? cm_To_in(moldData["Mold_Stack_Height"], Decimals)
          : moldData.Mold_Stack_Height,

      ["Mold_Vertical_Height"]:
        UnitsForConversion.FromUnit === 22 && UnitsForConversion.ToUnit === 10
          ? cm_To_mm(moldData["Mold_Vertical_Height"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 22
          ? mm_To_cm(moldData["Mold_Vertical_Height"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 11
          ? mm_To_in(moldData["Mold_Vertical_Height"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(moldData["Mold_Vertical_Height"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 22
          ? in_To_cm(moldData["Mold_Vertical_Height"], Decimals)
          : UnitsForConversion.FromUnit === 22 &&
            UnitsForConversion.ToUnit === 11
          ? cm_To_in(moldData["Mold_Vertical_Height"], Decimals)
          : moldData.Mold_Stack_Height,

      ["Req_Mold_Open_Stroke"]:
        UnitsForConversion.FromUnit === 22 && UnitsForConversion.ToUnit === 10
          ? cm_To_mm(moldData["Req_Mold_Open_Stroke"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 22
          ? mm_To_cm(moldData["Req_Mold_Open_Stroke"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 11
          ? mm_To_in(moldData["Req_Mold_Open_Stroke"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(moldData["Req_Mold_Open_Stroke"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 22
          ? in_To_cm(moldData["Req_Mold_Open_Stroke"], Decimals)
          : UnitsForConversion.FromUnit === 22 &&
            UnitsForConversion.ToUnit === 11
          ? cm_To_in(moldData["Req_Mold_Open_Stroke"], Decimals)
          : moldData.Req_Mold_Open_Stroke,

      ["Mold_Width"]:
        UnitsForConversion.FromUnit === 22 && UnitsForConversion.ToUnit === 10
          ? cm_To_mm(moldData["Mold_Width"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 22
          ? mm_To_cm(moldData["Mold_Width"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 11
          ? mm_To_in(moldData["Mold_Width"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(moldData["Mold_Width"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 22
          ? in_To_cm(moldData["Mold_Width"], Decimals)
          : UnitsForConversion.FromUnit === 22 &&
            UnitsForConversion.ToUnit === 11
          ? cm_To_in(moldData["Mold_Width"], Decimals)
          : moldData.Mold_Width,
    };

    document.getElementsByName("Mold_Stack_Height")[0].value = parseFloat(
      UpdatedValues["Mold_Stack_Height"]
    );

    document.getElementsByName("Mold_Vertical_Height")[0].value =
      parseFloat(UpdatedValues["Mold_Vertical_Height"]) || "";

    document.getElementsByName("Req_Mold_Open_Stroke")[0].value =
      parseFloat(UpdatedValues["Req_Mold_Open_Stroke"]) || "";

    document.getElementsByName("Mold_Width")[0].value =
      parseFloat(UpdatedValues["Mold_Width"]) || "";

    setmoldData({
      ...moldData,
      Mold_Stack_Height: parseFloat(UpdatedValues["Mold_Stack_Height"]),
      Mold_Vertical_Height: parseFloat(UpdatedValues["Mold_Vertical_Height"]),
      Req_Mold_Open_Stroke: parseFloat(UpdatedValues["Req_Mold_Open_Stroke"]),
      Mold_Width: parseFloat(UpdatedValues["Mold_Width"]),
    });

    setmoldUnitData({
      ...moldUnitData,
      Mold_Stack_Height: {
        value: parseFloat(UpdatedValues["Mold_Stack_Height"]),
        unit_id: UnitsForConversion.ToUnit,
      },
      Mold_Vertical_Height: {
        value: parseFloat(UpdatedValues["Mold_Vertical_Height"]),
        unit_id: UnitsForConversion.ToUnit,
      },
      Req_Mold_Open_Stroke: {
        value: parseFloat(UpdatedValues["Req_Mold_Open_Stroke"]),
        unit_id: UnitsForConversion.ToUnit,
      },
      Mold_Width: {
        value: parseFloat(UpdatedValues["Mold_Width"]),
        unit_id: UnitsForConversion.ToUnit,
      },
    });

    setUnitsForConversion({
      FromUnit: "",
      ToUnit: "",
    });
  } else if (SelectedPart === "Weight") {
    let unit = UnitSettings[`${SelectedPart}Unit`].unit_id;

    let UpdatedData = {};

    for (let i = 1; i < partColumn.length; i++) {
      if (PartData[4][`Part${i}`]) {
        UpdatedData[`Part${i}`] =
          unit === 9
            ? g_To_oz(PartData[4][`Part${i}`], Decimals)
            : unit === 8
            ? oz_To_g(PartData[4][`Part${i}`], Decimals)
            : PartData[4][`Part${i}`];
      }
    }

    setPartData((prevData) => {
      let newData = [...prevData];
      newData[4] = {
        ...newData[4],
        ...UpdatedData,
      };
      return newData;
    });

    setmoldUnitData({
      ...moldUnitData,
      Weight_of_one_Part: {
        ...moldUnitData.Weight_of_one_Part,
        unit_id: unit,
      },
    });
  } else if (SelectedPart === "RunnerWeight") {
    let unit = UnitSettings[`${SelectedPart}Unit`].unit_id;

    let UpdatedData = {};

    for (let i = 1; i < partColumn.length; i++) {
      if (PartData[6][`Part${i}`]) {
        UpdatedData[`Part${i}`] =
          unit === 9
            ? g_To_oz(PartData[6][`Part${i}`], Decimals)
            : unit === 8
            ? oz_To_g(PartData[6][`Part${i}`], Decimals)
            : PartData[6][`Part${i}`];
      }
    }

    setPartData((prevData) => {
      let newData = [...prevData];
      newData[6] = {
        ...newData[6],
        ...UpdatedData,
      };
      return newData;
    });

    setmoldUnitData({
      ...moldUnitData,
      Runner_Weight: {
        ...moldUnitData.Runner_Weight,
        unit_id: unit,
      },
    });
  } else if (SelectedPart === "Area") {
    let unit = UnitSettings[`${SelectedPart}Unit`].unit_id;

    let UpdatedData = {};

    for (let i = 1; i < partColumn.length; i++) {
      if (PartData[7][`Part${i}`]) {
        UpdatedData[`Part${i}`] =
          unit === 1
            ? sqin_To_sqcm(PartData[7][`Part${i}`], Decimals)
            : unit === 2
            ? sqcm_To_sqin(PartData[7][`Part${i}`], Decimals)
            : PartData[7][`Part${i}`];
      }
    }

    setPartData((prevData) => {
      let newData = [...prevData];
      newData[7] = {
        ...newData[7],
        ...UpdatedData,
      };
      return newData;
    });

    setmoldUnitData({
      ...moldUnitData,
      Part_Projected_Area: {
        ...moldUnitData.Part_Projected_Area,
        unit_id: unit,
      },
    });
  } else if (SelectedPart === "RunnerArea") {
    let unit = UnitSettings[`${SelectedPart}Unit`].unit_id;

    let UpdatedData = {};

    for (let i = 1; i < partColumn.length; i++) {
      if (PartData[8][`Part${i}`]) {
        UpdatedData[`Part${i}`] =
          unit === 1
            ? sqin_To_sqcm(PartData[8][`Part${i}`], Decimals)
            : unit === 2
            ? sqcm_To_sqin(PartData[8][`Part${i}`], Decimals)
            : PartData[8][`Part${i}`];
      }
    }

    setPartData((prevData) => {
      let newData = [...prevData];
      newData[8] = {
        ...newData[8],
        ...UpdatedData,
      };
      return newData;
    });

    setmoldUnitData({
      ...moldUnitData,
      Runner_Projected_Area: {
        ...moldUnitData.Runner_Projected_Area,
        unit_id: unit,
      },
    });
  }
};

export default ConvertInputFields;
