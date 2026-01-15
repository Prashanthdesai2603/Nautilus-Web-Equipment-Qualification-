import EquipmentQualification from "../../../assets/Icons/EQIcon.png";
import database from "../../../assets/Icons/database.png";

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
];
