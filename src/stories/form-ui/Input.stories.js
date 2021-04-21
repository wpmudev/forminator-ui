import { createInput } from './Input';

import "../assets/css/form-basic.min.css"; // Get Forminator basic styles.
import "../assets/css/form-ui.min.css"; // Get Forminator UI styles.
import "../assets/css/form-material.min.css"; // Get Forminator Material styles.

export default {
    title: 'Form UI/Components/Input',
    argTypes: {
        id: {
            name: 'Field ID',
            type: {
                name: 'string',
                required: true
            },
            control: 'text'
        },
        label: {
            name: 'Label',
            control: 'text'
        },
        description: {
            name: 'Description',
            control: 'text'
        },
        type: {
            name: '(Input) Type',
            control: {
                type: 'select',
                options: [
                    'text',
                    'number',
                    'email'
                ]
            },
        },
        placeholder: {
            name: '(Input) Placeholder',
            control: 'text'
        },
        design: {
            name: 'Design',
            control: {
                type: 'inline-radio',
                options: [
                    'default',
                    'flat',
                    'bold',
                    'material',
                    'none'
                ]
            }
        },
        backgroundColor: {
            name: '(Input) Background Color',
            control: 'color'
        },
        backgroundColorHover: {
            name: '(Input) Background Color - Hover',
            control: 'color'
        },
        color: {
            name: '(Input) Color',
            control: 'color'
        },
        colorHover: {
            name: '(Input) Color - Hover',
            control: 'color'
        },
        fontSize: {
            name: '(Input) Font Size',
            control: {
                type: 'number',
                min: 0
            }
        },
        fontWeight: {
            name: '(Input) Font Weight',
            control: {
                type: 'select',
                options: [
                    'lighter',
                    'normal',
                    'bold',
                    'bolder',
                ]
            },
        },
        labelColor: {
            name: '(Label) Color',
            control: 'color'
        },
        labelFontSize: {
            name: '(Label) Font Size',
            control: {
                type: 'number',
                min: 0
            }
        },
        labelFontWeight: {
            name: '(Label) Font Weight',
            control: {
                type: 'select',
                options: [
                    'lighter',
                    'normal',
                    'bold',
                    'bolder',
                ]
            },
        },
        descColor: {
            name: '(Description) Color',
            control: 'color'
        },
        descFontSize: {
            name: '(Description) Font Size',
            control: {
                type: 'number',
                min: 0
            }
        },
        descFontWeight: {
            name: '(Description) Font Weight',
            control: {
                type: 'select',
                options: [
                    'lighter',
                    'normal',
                    'bold',
                    'bolder',
                ]
            },
        },
    }
};

const Template = ({ ...args }) => {
    return createInput({ ...args });
};

export const DefaultDesign = Template.bind({});
DefaultDesign.storyName = 'Default';
DefaultDesign.args = {
    id: 'full-name-default',
    type: 'text',
    label: 'Full Name',
    description: 'Optional description for name field.',
    placeholder: 'E.g. John Doe',
    design: 'default',
    backgroundColor: '#ededed',
    backgroundColorHover: '#ededed',
    color: '#000000',
    colorHover: '#000000',
    fontSize: 16,
    fontWeight: 'normal',
    labelColor: '#777771',
    labelFontSize: 12,
    labelFontWeight: 'normal',
    descColor: '#777771',
    descFontSize: 12,
    descFontWeight: 'normal',
};

export const FlatDesign = Template.bind({});
FlatDesign.storyName = 'Flat';
FlatDesign.args = {
    ...DefaultDesign.args,
    id: 'full-name-flat',
    design: 'flat',
};

export const BoldDesign = Template.bind({});
BoldDesign.storyName = 'Bold';
BoldDesign.args = {
    ...DefaultDesign.args,
    id: 'full-name-bold',
    design: 'bold',
};

export const MaterialDesign = Template.bind({});
MaterialDesign.storyName = 'Material';
MaterialDesign.args = {
    ...DefaultDesign.args,
    id: 'full-name-material',
    design: 'material',
    backgroundColor: 'transparent',
    backgroundColorHover: 'transparent',
    backgroundColorFocus: 'transparent',
};

export const NoneDesign = Template.bind({});
NoneDesign.storyName = 'None';
NoneDesign.args = {
    id: 'full-name-none',
    type: 'text',
    label: 'Full Name',
    description: 'Optional description for name field.',
    placeholder: 'E.g. John Doe',
    design: 'none'
};