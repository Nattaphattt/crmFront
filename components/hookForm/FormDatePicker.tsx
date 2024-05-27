"use client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { FormDatePickerProps } from "#/utils/formProps";

export const FormDatePicker = ({ name, control, label, views,...props }: FormDatePickerProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => {
                    return (
                        <DatePicker
                            label={label}
                            views={views}
                            value={value}
                            onChange={onChange}
                            slotProps={{
                                textField: { size: "small" },
                                actionBar: {
                                    actions: ["clear"],
                                },
                            }}
                            onAccept={onChange}
                            {...props}
                        />
                    )
                }}
            />
        </LocalizationProvider>
    );
};