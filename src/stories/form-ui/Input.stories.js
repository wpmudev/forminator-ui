import { createInput } from './Input';

export default {
    title: 'Form UI/Input',
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
        borderWidth: {
            name: '(Input) Border Width',
            control: {
                type: 'number',
                min: 0,
                max: 10
            }
        },
        borderRadius: {
            name: '(Input) Border Radius',
            control: {
                type: 'number',
                min: 0
            }
        },
        backgroundColor: {
            name: '(Input) Background Color',
            control: 'color'
        },
        color: {
            name: '(Input) Color',
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
    },
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
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: '#ededed',
    color: '#000000',
    fontSize: 16,
    fontWeight: 'normal',
    labelColor: '#777771',
    labelFontSize: 12,
    labelFontWeight: 'normal',
};

export const FlatDesign = Template.bind({});
FlatDesign.storyName = 'Flat';
FlatDesign.args = {
    ...DefaultDesign.args,
    id: 'full-name-flat',
    borderWidth: 0,
    borderRadius: 0
};

export const BoldDesign = Template.bind({});
BoldDesign.storyName = 'Bold';
BoldDesign.args = {
    ...DefaultDesign.args,
    id: 'full-name-bold',
    borderWidth: 3,
    borderRadius: 0
};

export const MaterialDesign = Template.bind({});
MaterialDesign.storyName = 'Material';
MaterialDesign.args = {
    ...DefaultDesign.args,
    id: 'full-name-material',
    borderWidth: 1,
    borderRadius: 0
};