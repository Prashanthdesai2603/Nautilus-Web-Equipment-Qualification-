import {
  insec_To_mmsec,
  mmsec_To_insec,
  g_To_oz,
  oz_To_g,
} from "../../FuncsForConversions/Speed/index";

import {
  psi_To_MPa,
  MPa_To_psi,
  psi_To_bar,
  bar_To_psi,
  MPa_To_bar,
  bar_To_MPa,
} from "../../FuncsForConversions/Pressure/index";

import {
  cm_To_mm,
  mm_To_cm,
  mm_To_in,
  in_To_mm,
  cm_To_in,
  in_To_cm,
} from "../../FuncsForConversions/Distance/index";

import {
  UStons_To_Metrictons,
  Metrictons_To_UStons,
  UStons_To_kN,
  kN_To_UStons,
  Metrictons_To_kN,
  kN_To_Metrictons,
} from "../../FuncsForConversions/Tonnage/index";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from "../../FuncsForConversions/Temperature/index";

const ConvertInputFields = ({
  UnitSettings,
  SelectedPart,
  UnitsForConversion,
  machineData,
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
    SelectedPart === "Tonnage"
      ? 0.12
      : UnitSettings[`${SelectedPart}Unit`].decimals
  );

  // us - 18, met - 19, kn - 20
  if (SelectedPart === "Tonnage") {
    let UpdatedValues = {
      ["Tonnage"]:
        UnitsForConversion.FromUnit === 18 && UnitsForConversion.ToUnit === 19
          ? UStons_To_Metrictons(machineData["Tonnage"], Decimals)
          : UnitsForConversion.FromUnit === 19 &&
            UnitsForConversion.ToUnit === 18
          ? Metrictons_To_UStons(machineData["Tonnage"], Decimals)
          : UnitsForConversion.FromUnit === 19 &&
            UnitsForConversion.ToUnit === 20
          ? Metrictons_To_kN(machineData["Tonnage"], Decimals)
          : UnitsForConversion.FromUnit === 20 &&
            UnitsForConversion.ToUnit === 19
          ? kN_To_Metrictons(machineData["Tonnage"], Decimals)
          : UnitsForConversion.FromUnit === 18 &&
            UnitsForConversion.ToUnit === 20
          ? UStons_To_kN(machineData["Tonnage"], Decimals)
          : UnitsForConversion.FromUnit === 20 &&
            UnitsForConversion.ToUnit === 18
          ? kN_To_UStons(machineData["Tonnage"], Decimals)
          : machineData["Tonnage"],
    };

    return [
      {
        Tonnage: UpdatedValues["Tonnage"],
      },
      {
        Tonnage: {
          value: UpdatedValues["Tonnage"],
          unit_id: UnitsForConversion.ToUnit,
        },
      },
    ];
  }

  //Screw_Diameter
  if (SelectedPart === "ScrewDistance") {
    let UpdatedValues = {
      ["Screw_Diameter"]:
        UnitsForConversion.FromUnit === 10 && UnitsForConversion.ToUnit === 11
          ? mm_To_in(machineData["Screw_Diameter"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(machineData["Screw_Diameter"], Decimals)
          : machineData["Screw_Diameter"],
    };

    return [
      {
        Screw_Diameter: UpdatedValues["Screw_Diameter"],
      },
      {
        Screw_Diameter: {
          value: UpdatedValues["Screw_Diameter"],
          unit_id: UnitsForConversion.ToUnit,
        },
      },
    ];
  }

  // MPa - 12, psi - 13, bar - 14
  if (SelectedPart === "Pressure") {
    let UpdatedValues = {
      ["Max_Machine_Pressure"]:
        UnitsForConversion.FromUnit === 12 && UnitsForConversion.ToUnit === 13
          ? MPa_To_psi(machineData["Max_Machine_Pressure"], Decimals)
          : UnitsForConversion.FromUnit === 13 &&
            UnitsForConversion.ToUnit === 12
          ? psi_To_MPa(machineData["Max_Machine_Pressure"], Decimals)
          : UnitsForConversion.FromUnit === 12 &&
            UnitsForConversion.ToUnit === 14
          ? MPa_To_bar(machineData["Max_Machine_Pressure"], Decimals)
          : UnitsForConversion.FromUnit === 14 &&
            UnitsForConversion.ToUnit === 12
          ? bar_To_MPa(machineData["Max_Machine_Pressure"], Decimals)
          : UnitsForConversion.FromUnit === 13 &&
            UnitsForConversion.ToUnit === 14
          ? psi_To_bar(machineData["Max_Machine_Pressure"], Decimals)
          : UnitsForConversion.FromUnit === 14 &&
            UnitsForConversion.ToUnit === 13
          ? bar_To_psi(machineData["Max_Machine_Pressure"], Decimals)
          : machineData["Max_Machine_Pressure"],
    };

    return [
      {
        Max_Machine_Pressure: UpdatedValues["Max_Machine_Pressure"],
        Max_Plastic_Pressure: UpdatedValues["Max_Machine_Pressure"],
      },
      {
        Max_Machine_Pressure: {
          value: UpdatedValues["Max_Machine_Pressure"],
          unit_id: UnitsForConversion.ToUnit,
        },
        Max_Plastic_Pressure: {
          value: UpdatedValues["Max_Machine_Pressure"],
          unit_id: UnitsForConversion.ToUnit,
        },
      },
    ];
  }

  if (SelectedPart === "Speed") {
    let UpdatedValues = {
      ["Max_Injection_Speed"]:
        UnitsForConversion.FromUnit === 7 && UnitsForConversion.ToUnit === 6
          ? insec_To_mmsec(machineData["Max_Injection_Speed"], Decimals)
          : UnitsForConversion.FromUnit === 6 && UnitsForConversion.ToUnit === 7
          ? mmsec_To_insec(machineData["Max_Injection_Speed"], Decimals)
          : machineData["Max_Injection_Speed"],
    };

    return [
      {
        Max_Injection_Speed: UpdatedValues["Max_Injection_Speed"],
      },
      {
        Max_Injection_Speed: {
          value: UpdatedValues["Max_Injection_Speed"],
          unit_id: UnitsForConversion.ToUnit,
        },
      },
    ];
  }

  if (SelectedPart === "Weight") {
    let UpdatedValues = {
      ["Max_shot_Capacity(Wt)"]:
        UnitsForConversion.FromUnit === 9 && UnitsForConversion.ToUnit === 8
          ? oz_To_g(machineData["Max_shot_Capacity(Wt)"], Decimals)
          : UnitsForConversion.FromUnit === 8 && UnitsForConversion.ToUnit === 9
          ? g_To_oz(machineData["Max_shot_Capacity(Wt)"], Decimals)
          : machineData["Max_shot_Capacity(Wt)"],
    };

    return [
      {
        ["Max_shot_Capacity(Wt)"]: UpdatedValues["Max_shot_Capacity(Wt)"],
      },
      {
        ["Max_shot_Capacity(Wt)"]: {
          value: UpdatedValues["Max_shot_Capacity(Wt)"],
          unit_id: UnitsForConversion.ToUnit,
        },
      },
    ];
  }

  if (SelectedPart === "Temperature") {
    let UpdatedValues = {
      ["Max_Melt_Temperature"]:
        UnitsForConversion.FromUnit === 17 && UnitsForConversion.ToUnit === 16
          ? fahrenheitToCelsius(machineData["Max_Melt_Temperature"], Decimals)
          : UnitsForConversion.FromUnit === 16 &&
            UnitsForConversion.ToUnit === 17
          ? celsiusToFahrenheit(machineData["Max_Melt_Temperature"], Decimals)
          : machineData["Max_shot_Capacity(Wt)"],
    };

    return [
      {
        ["Max_Melt_Temperature"]: UpdatedValues["Max_Melt_Temperature"],
      },
      {
        ["Max_Melt_Temperature"]: {
          value: UpdatedValues["Max_Melt_Temperature"],
          unit_id: UnitsForConversion.ToUnit,
        },
      },
    ];
  }
  if (SelectedPart === "Distance") {
    let UpdatedValues = {
      ["Min_allowable_Mold_Stack_Height"]:
        UnitsForConversion.FromUnit === 22 && UnitsForConversion.ToUnit === 10
          ? cm_To_mm(machineData["Min_allowable_Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 22
          ? mm_To_cm(machineData["Min_allowable_Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 11
          ? mm_To_in(machineData["Min_allowable_Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(machineData["Min_allowable_Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 22
          ? in_To_cm(machineData["Min_allowable_Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 22 &&
            UnitsForConversion.ToUnit === 11
          ? cm_To_in(machineData["Min_allowable_Mold_Stack_Height"], Decimals)
          : machineData["Min_allowable_Mold_Stack_Height"],

      ["Max_allowable_Mold_Stack_Height"]:
        UnitsForConversion.FromUnit === 22 && UnitsForConversion.ToUnit === 10
          ? cm_To_mm(machineData["Max_allowable_Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 22
          ? mm_To_cm(machineData["Max_allowable_Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 11
          ? mm_To_in(machineData["Max_allowable_Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(machineData["Max_allowable_Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 22
          ? in_To_cm(machineData["Max_allowable_Mold_Stack_Height"], Decimals)
          : UnitsForConversion.FromUnit === 22 &&
            UnitsForConversion.ToUnit === 11
          ? cm_To_in(machineData["Max_allowable_Mold_Stack_Height"], Decimals)
          : machineData["Max_allowable_Mold_Stack_Height"],

      ["Max_Mold_Open_Daylight"]:
        UnitsForConversion.FromUnit === 22 && UnitsForConversion.ToUnit === 10
          ? cm_To_mm(machineData["Max_Mold_Open_Daylight"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 22
          ? mm_To_cm(machineData["Max_Mold_Open_Daylight"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 11
          ? mm_To_in(machineData["Max_Mold_Open_Daylight"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(machineData["Max_Mold_Open_Daylight"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 22
          ? in_To_cm(machineData["Max_Mold_Open_Daylight"], Decimals)
          : UnitsForConversion.FromUnit === 22 &&
            UnitsForConversion.ToUnit === 11
          ? cm_To_in(machineData["Max_Mold_Open_Daylight"], Decimals)
          : machineData["Max_Mold_Open_Daylight"],

      ["Tiebar_Clearance-Width"]:
        UnitsForConversion.FromUnit === 22 && UnitsForConversion.ToUnit === 10
          ? cm_To_mm(machineData["Tiebar_Clearance-Width"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 22
          ? mm_To_cm(machineData["Tiebar_Clearance-Width"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 11
          ? mm_To_in(machineData["Tiebar_Clearance-Width"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(machineData["Tiebar_Clearance-Width"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 22
          ? in_To_cm(machineData["Tiebar_Clearance-Width"], Decimals)
          : UnitsForConversion.FromUnit === 22 &&
            UnitsForConversion.ToUnit === 11
          ? cm_To_in(machineData["Tiebar_Clearance-Width"], Decimals)
          : machineData["Tiebar_Clearance-Width"],

      ["Max_Mold_Vertical_Height"]:
        UnitsForConversion.FromUnit === 22 && UnitsForConversion.ToUnit === 10
          ? cm_To_mm(machineData["Max_Mold_Vertical_Height"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 22
          ? mm_To_cm(machineData["Max_Mold_Vertical_Height"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 11
          ? mm_To_in(machineData["Max_Mold_Vertical_Height"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(machineData["Max_Mold_Vertical_Height"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 22
          ? in_To_cm(machineData["Max_Mold_Vertical_Height"], Decimals)
          : UnitsForConversion.FromUnit === 22 &&
            UnitsForConversion.ToUnit === 11
          ? cm_To_in(machineData["Max_Mold_Vertical_Height"], Decimals)
          : machineData["Max_Mold_Vertical_Height"],

      ["Max_Mold_Width"]:
        UnitsForConversion.FromUnit === 22 && UnitsForConversion.ToUnit === 10
          ? cm_To_mm(machineData["Max_Mold_Width"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 22
          ? mm_To_cm(machineData["Max_Mold_Width"], Decimals)
          : UnitsForConversion.FromUnit === 10 &&
            UnitsForConversion.ToUnit === 11
          ? mm_To_in(machineData["Max_Mold_Width"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 10
          ? in_To_mm(machineData["Max_Mold_Width"], Decimals)
          : UnitsForConversion.FromUnit === 11 &&
            UnitsForConversion.ToUnit === 22
          ? in_To_cm(machineData["Max_Mold_Width"], Decimals)
          : UnitsForConversion.FromUnit === 22 &&
            UnitsForConversion.ToUnit === 11
          ? cm_To_in(machineData["Max_Mold_Width"], Decimals)
          : machineData["Max_Mold_Width"],
    };

    return [
      {
        Min_allowable_Mold_Stack_Height:
          UpdatedValues["Min_allowable_Mold_Stack_Height"],
        Max_allowable_Mold_Stack_Height:
          UpdatedValues["Max_allowable_Mold_Stack_Height"],
        Max_Mold_Open_Daylight: UpdatedValues["Max_Mold_Open_Daylight"],
        "Tiebar_Clearance-Width": UpdatedValues["Tiebar_Clearance-Width"],
        Max_Mold_Vertical_Height: UpdatedValues["Max_Mold_Vertical_Height"],
        Max_Mold_Width: UpdatedValues["Max_Mold_Width"],
      },
      {
        Min_allowable_Mold_Stack_Height: {
          value: UpdatedValues["Min_allowable_Mold_Stack_Height"],
          unit_id: UnitsForConversion.ToUnit,
        },

        Max_allowable_Mold_Stack_Height: {
          value: UpdatedValues["Max_allowable_Mold_Stack_Height"],
          unit_id: UnitsForConversion.ToUnit,
        },

        Max_Mold_Open_Daylight: {
          value: UpdatedValues["Max_Mold_Open_Daylight"],
          unit_id: UnitsForConversion.ToUnit,
        },

        "Tiebar_Clearance-Width": {
          value: UpdatedValues["Tiebar_Clearance-Width"],
          unit_id: UnitsForConversion.ToUnit,
        },

        Max_Mold_Vertical_Height: {
          value: UpdatedValues["Max_Mold_Vertical_Height"],
          unit_id: UnitsForConversion.ToUnit,
        },

        Max_Mold_Width: {
          value: UpdatedValues["Max_Mold_Width"],
          unit_id: UnitsForConversion.ToUnit,
        },
      },
    ];
  }
};

export default ConvertInputFields;
