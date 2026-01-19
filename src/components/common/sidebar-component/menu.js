import EquipmentQualification from "../../../assets/Icons/EQIcon.png";
import database from "../../../assets/Icons/database.png";
import importIcon from "../../../assets/Icons/EQIcon.png"; // Using existing icon for now

export const MENUITEMS = [
  {
    path: "/databases",
    title: "Databases",
    icon: database,
    type: "link",
    badgeType: "primary",
    active: true,
  },
  {
    path: "/dashboard",
    title: "Equipment Qualification",
    icon: EquipmentQualification,
    type: "link",
    badgeType: "primary",
    active: true,
  },
  {
    path: "/Tonnage",
    title: "TOP",
    // icon: EquipmentQualification,
    type: "link",
    badgeType: "primary",
    active: true,
  },
  {
    title: "Import Databases",
    icon: importIcon,
    type: "sub",
    active: false,
    children: [
      { path: "/database/ImportMaterial", title: "Import Material", type: "link" },
      { path: "/database/ImportMachine", title: "Import Machine", type: "link" },
      { path: "/database/ImportMold", title: "Import Mold", type: "link" },
    ],
  },
];
