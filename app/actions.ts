"use server";

import dayjs from "dayjs";

// Server Action
export async function create(_prevState: unknown, formData: FormData) {
  console.log("here", _prevState, formData);
  const rawFormData = {
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  };

  const startDate = dayjs(rawFormData.startDate as string).toISOString();
  const endDate = dayjs(rawFormData.endDate as string).toISOString();

  // This server action doesn't know anything about languages
  // So depending on the language on the client their value will change

  console.log({ rawFormData, startDate, endDate });

  return {
    startDate,
    endDate,
  };
}
