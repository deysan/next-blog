import qs from "qs";

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const currentUrl = qs.parse(params);

  if (value) {
    currentUrl[key] = value;
  } else {
    delete currentUrl[key];
  }

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringify(currentUrl);
}
