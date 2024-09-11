"use client";

import { Button, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import "dayjs/locale/de";
import { deDE } from "@mui/x-date-pickers/locales";
import { create } from "./actions";
import { useFormState } from "react-dom";

const locales = ["de", "en"];
type LocaleKey = (typeof locales)[number];

const initialState = {
  startDate: null,
  endDate: null,
};

export default function Form() {
  const [state, formAction] = useFormState(create, initialState);
  const [locale, setLocale] = useState<LocaleKey>("en");
  const [formState, setFormState] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const localeText =
    locale === "de"
      ? deDE.components.MuiLocalizationProvider.defaultProps.localeText
      : undefined;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={locale}
      localeText={localeText}
    >
      <ToggleButtonGroup
        value={locale}
        exclusive
        fullWidth
        onChange={(event, newLocale) => {
          if (newLocale != null) {
            setLocale(newLocale);
          }
        }}
      >
        {locales.map((localeItem) => (
          <ToggleButton key={localeItem} value={localeItem}>
            {localeItem}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Stack
        component="form"
        spacing={2}
        sx={{ marginTop: "32px" }}
        alignItems="center"
        action={formAction}
      >
        <h1>Form</h1>

        <DatePicker
          label="Start Date"
          value={formState.startDate}
          onChange={(date) => setFormState({ ...formState, startDate: date })}
          name="startDate"
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />

        <DatePicker
          label="End Date"
          value={formState.endDate}
          onChange={(date) => setFormState({ ...formState, endDate: date })}
          name="endDate"
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>

      <pre
        style={{
          margin: "0 auto",
          display: "block",
          textAlign: "center",
          marginTop: "32px",
        }}
      >
        {JSON.stringify(state, null, 2)}
      </pre>
    </LocalizationProvider>
  );
}
