import React from 'react';
import './App.css';
import {useFormik} from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import RamenDining from '@mui/icons-material/RamenDining';
import * as yup from 'yup';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

interface Dish {
    name: string;
    preparation_time: string;
    dish_type: 'pizza' | 'soup' | 'sandwich' | '';
    no_of_slices?: number;
    diameter?: number;
    spiciness_scale?: number;
    slices_of_bread?: number;
}

const initialValues: Dish = {
    name: '',
    preparation_time: '',
    dish_type: '',
    no_of_slices: undefined,
    diameter: undefined,
    spiciness_scale: undefined,
    slices_of_bread: undefined,
};


const validationSchema = yup.object().shape({
    name: yup.string().required('Required'),
    preparation_time: yup.string().required('Required'),
    dish_type: yup.string().required('Required'),
    no_of_slices: yup.number().when('dish_type', (values) => {
        if (values[0] === 'pizza') {
            return yup.number().required('Required').min(1, 'Minimum 1 slice');
        }
        return yup.number();
    }),
    diameter: yup.number().when('dish_type', (values) => {
        if (values[0] === 'pizza') {
            return yup.number().required('Required').min(1, 'Minimum 1 diameter');
        }
        return yup.number();
    }),
    spiciness_scale: yup.number().when('dish_type', (values) => {
        if (values[0] === 'soup') {
            return yup.number().required('Required').min(1, 'Minimum 1 spiciness scale').max(10, 'Maximum 10 spiciness scale');
        }
        return yup.number();
    }),
    slices_of_bread: yup.number().when('dish_type', (values) => {
        if (values[0] === 'sandwich') {
            return yup.number().required('Required').min(1, 'Minimum 1 slices of bread');
        }
        return yup.number();
    }),
});


function App() {
    const formik = useFormik<Dish>({
        initialValues, validationSchema: validationSchema, onSubmit: (values) => {
            let output: Dish;

            switch (values.dish_type) {
                case 'pizza':
                    output = {
                        name: values.name,
                        preparation_time: values.preparation_time,
                        dish_type: 'pizza',
                        no_of_slices: values.no_of_slices,
                        diameter: values.diameter,
                    };
                    break;
                case 'soup':
                    output = {
                        name: values.name,
                        preparation_time: values.preparation_time,
                        dish_type: 'soup',
                        spiciness_scale: values.spiciness_scale,
                    };
                    break;
                case 'sandwich':
                    output = {
                        name: values.name,
                        preparation_time: values.preparation_time,
                        dish_type: 'sandwich',
                        slices_of_bread: values.slices_of_bread,
                    };
                    break;
                default:
                    throw new Error("Invalid dish type");
            }

            alert(JSON.stringify(output, null, 2));
        }
    });

    return (<ThemeProvider theme={darkTheme}>
        <div className="App">

            <h1><RamenDining fontSize={"large"}/> DishChooser</h1>
            <form onSubmit={formik.handleSubmit} className="form">
                <TextField fullWidth={true} id="name" name="name" label="Dish name" type="text"
                           onChange={formik.handleChange} margin="dense" value={formik.values.name}
                           error={formik.touched.name && Boolean(formik.errors.name)}
                />
                <TextField fullWidth={true} id="preparation_time" name="preparation_time" type="time"
                           label="Preparation time" onChange={formik.handleChange} margin="dense"
                           value={formik.values.preparation_time} InputLabelProps={{shrink: true}}
                           inputProps={{step: 1}}
                           error={formik.touched.preparation_time && Boolean(formik.errors.preparation_time)}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="dish_type-label">Dish Type</InputLabel>
                    <Select
                        id="dish_type"
                        labelId="dish_type-label"
                        label="Dish Type"
                        onChange={(event) => {
                            formik.setFieldValue('dish_type', event.target.value);
                        }}
                        value={formik.values.dish_type}
                        error={formik.touched.dish_type && Boolean(formik.errors.dish_type)}
                    >
                        <MenuItem value="pizza">Pizza</MenuItem>
                        <MenuItem value="soup">Soup</MenuItem>
                        <MenuItem value="sandwich">Sandwich</MenuItem>
                    </Select>
                </FormControl>
                {formik.values.dish_type === 'pizza' ? (<>
                    <TextField fullWidth={true} id="no_of_slices"
                               name="no_of_slices" label="No of slices"
                               type="number" onChange={formik.handleChange}
                               margin="dense"
                               value={formik.values.no_of_slices}
                               error={formik.touched.no_of_slices && Boolean(formik.errors.no_of_slices)}

                    />
                    <TextField
                        fullWidth={true} id="diameter"
                        name="diameter" label="Diameter"
                        type="number"
                        onChange={formik.handleChange}
                        margin="dense"
                        value={formik.values.diameter}
                        error={formik.touched.diameter && Boolean(formik.errors.diameter)}/>
                </>) : null}
                {formik.values.dish_type === 'soup' ? (
                    <TextField fullWidth={true} id="spiciness_scale" name="spiciness_scale" label="Spiciness scale"
                               type="number" onChange={formik.handleChange} margin="dense"
                               value={formik.values.spiciness_scale}
                               error={formik.touched.spiciness_scale && Boolean(formik.errors.spiciness_scale)}
                    />) : null}
                {formik.values.dish_type === 'sandwich' ? (
                    <TextField fullWidth={true} id="slices_of_bread" name="slices_of_bread" label="Slices of bread"
                               type="number" onChange={formik.handleChange} margin="dense"
                               value={formik.values.slices_of_bread}
                               error={formik.touched.slices_of_bread && Boolean(formik.errors.slices_of_bread)}
                    />) : null}
                <Button type="submit" fullWidth={true} variant={"outlined"}>Submit</Button>
                <FormHelperText error className='helper'>
                    {formik.touched.name && formik.errors.name ? <p>Dish name: {formik.errors.name}</p> : null}
                    {formik.touched.preparation_time && formik.errors.preparation_time ?
                        <p>Preparation time: {formik.errors.preparation_time}</p> : null}
                    {formik.touched.dish_type && formik.errors.dish_type ?
                        <p>Dish type: {formik.errors.dish_type}</p> : null}
                    {formik.touched.no_of_slices && formik.errors.no_of_slices && formik.values.dish_type === 'pizza' ?
                        <p>No of slices: {formik.errors.no_of_slices}</p> : null}
                    {formik.touched.diameter && formik.errors.diameter && formik.values.dish_type === 'pizza' ?
                        <p>Diameter: {formik.errors.diameter}</p> : null}
                    {formik.touched.spiciness_scale && formik.errors.spiciness_scale && formik.values.dish_type === 'soup' ?
                        <p>Spiciness scale: {formik.errors.spiciness_scale}</p> : null}
                    {formik.touched.slices_of_bread && formik.errors.slices_of_bread && formik.values.dish_type === 'sandwich' ?
                        <p>Slices of bread: {formik.errors.slices_of_bread}</p> : null}
                </FormHelperText>

            </form>
        </div>
    </ThemeProvider>);
}

export default App;
