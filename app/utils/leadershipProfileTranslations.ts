import { rebeccaProfileTranslations } from "./leadership/rebecca";
import { miyoungProfileTranslations } from "./leadership/miyoung";

export function getLeadershipProfile(slug: string) {
  const key = slug.toLowerCase();
  if (key === "rebecca") return rebeccaProfileTranslations;
  if (key === "miyoung") return miyoungProfileTranslations;
  return null;
}

export { rebeccaProfileTranslations } from "./leadership/rebecca";
export { miyoungProfileTranslations } from "./leadership/miyoung";
