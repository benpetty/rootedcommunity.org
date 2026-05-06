import { blockContentType } from "./blockContent";
import { contactPageType } from "./contactPage";
import { getInvolvedPageType } from "./getInvolvedPage";
import { homePageType } from "./homePage";
import { impactMetricType } from "./impactMetric";
import { impactPageType } from "./impactPage";
import { missionPageType } from "./missionPage";
import { partnerType } from "./partner";
import { personType } from "./person";
import { programType } from "./program";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes = [
  blockContentType,
  siteSettingsType,
  homePageType,
  missionPageType,
  impactPageType,
  getInvolvedPageType,
  contactPageType,
  programType,
  personType,
  partnerType,
  impactMetricType,
];
