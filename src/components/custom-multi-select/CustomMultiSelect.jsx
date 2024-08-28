import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from "@mui/material";
import {useState} from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function CustomMultiSelect({ value, onChange, options, placeHolder, classNames }) {
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        onChange(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const getLabelName = (selectedValues) => {
        const temp = selectedValues.map((data) => {
            return options.find(option => option.value === data).label
        })
        return temp.join(', ');
    }

    return (
        <div>
            <FormControl className={`my-2 ${classNames}`}>
                <InputLabel id="demo-multiple-checkbox-label">{placeHolder}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={getLabelName}
                    MenuProps={MenuProps}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            <Checkbox checked={value.indexOf(option.value) > -1} />
                            <ListItemText primary={option.label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );

}
