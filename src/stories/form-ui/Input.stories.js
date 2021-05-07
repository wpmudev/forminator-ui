import { createInput } from './Input';

import "../assets/css/form-basic.min.css"; // Get Forminator basic styles.
import "../assets/css/form-ui.min.css"; // Get Forminator UI styles.
import "../assets/css/form-material.min.css"; // Get Forminator Material styles.

const listFontFamily = [
    'inherit',
    'cursive',
    'monospace',
    'system-ui',
];

const listFontWeight = [
    'lighter',
    'normal',
    'bold',
    'bolder'
];

export default {
    title: 'Form UI/Components/Input',
    argTypes: {
        design: {
            name: 'Form Design',
            control: {
                type: 'inline-radio',
                options: [
                    'default',
                    'flat',
                    'bold',
                    'material',
                    'basic',
                    'none'
                ]
            }
        },
        id: {
            name: 'Field ID',
            type: {
                name: 'string',
                required: true
            },
            control: 'text'
        },
        label: {
            name: 'Field Label',
            control: 'text'
        },
        placeholder: {
            name: 'Placeholder',
            control: 'text'
        },
        description: {
            name: 'Field Description',
            control: 'text'
        },
        required: {
            name: 'Required',
            control: {
                type: 'boolean'
            }
        },
        errorState: {
            name: 'Error State',
            control: {
                type: 'boolean'
            }
        },
        errorMessage: {
            name: 'Error Message',
            control: 'text'
        },
        // Category: Colors.
        inputBorder: {
            name: 'Border Color',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Input'
            }
        },
        inputBorderHover: {
            name: 'Border Color (Hover)',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Input'
            }
        },
        inputBorderError: {
            name: 'Border Color (Error)',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Input'
            }
        },
        inputBackground: {
            name: 'Background Color',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Input'
            }
        },
        inputBackgroundHover: {
            name: 'Background Color (Hover)',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Input'
            }
        },
        inputColor: {
            name: 'Value Color',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Input'
            }
        },
        inputColorHover: {
            name: 'Value Color (Hover)',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Input'
            }
        },
        labelColor: {
            name: 'Label Color',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Fields Basics'
            }
        },
        requiredColor: {
            name: 'Required Asterisk',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Fields Basics'
            }
        },
        descColor: {
            name: 'Description Color',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Fields Basics'
            }
        },
        errorBackground: {
            name: 'Error Message Background',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Fields Basics'
            }
        },
        errorColor: {
            name: 'Error Message Color',
            control: 'color',
            table: {
                category: 'Colors',
                subcategory: 'Fields Basics'
            }
        },
        // Category: Fonts.
        inputFontSize: {
            name: 'Font Size (in px)',
            control: {
                type: 'number',
                min: 0
            },
            table: {
                category: 'Fonts',
                subcategory: 'Input'
            }
        },
        inputFontFamily: {
            name: 'Font Family',
            control: {
                type: 'select',
                options: listFontFamily
            },
            table: {
                category: 'Fonts',
                subcategory: 'Input'
            }
        },
        inputFontWeight: {
            name: 'Font Weight',
            control: {
                type: 'select',
                options: listFontWeight
            },
            table: {
                category: 'Fonts',
                subcategory: 'Input'
            }
        },
        labelFontSize: {
            name: 'Font Size (in px)',
            control: {
                type: 'number',
                min: 0
            },
            table: {
                category: 'Fonts',
                subcategory: 'Fields Label'
            }
        },
        labelFontFamily: {
            name: 'Font Family',
            control: {
                type: 'select',
                options: listFontFamily
            },
            table: {
                category: 'Fonts',
                subcategory: 'Fields Label'
            }
        },
        labelFontWeight: {
            name: 'Font Weight',
            control: {
                type: 'select',
                options: listFontWeight
            },
            table: {
                category: 'Fonts',
                subcategory: 'Fields Label'
            }
        },
        descFontSize: {
            name: 'Font Size (in px)',
            control: {
                type: 'number',
                min: 0
            },
            table: {
                category: 'Fonts',
                subcategory: 'Fields Description'
            }
        },
        descFontFamily: {
            name: 'Font Family',
            control: {
                type: 'select',
                options: listFontFamily
            },
            table: {
                category: 'Fonts',
                subcategory: 'Fields Description'
            }
        },
        descFontWeight: {
            name: 'Font Weight',
            control: {
                type: 'select',
                options: listFontWeight
            },
            table: {
                category: 'Fonts',
                subcategory: 'Fields Description'
            }
        },
        errorFontSize: {
            name: 'Font Size (in px)',
            control: {
                type: 'number',
                min: 0
            },
            table: {
                category: 'Fonts',
                subcategory: 'Fields Error Message'
            }
        },
        errorFontFamily: {
            name: 'Font Family',
            control: {
                type: 'select',
                options: listFontFamily
            },
            table: {
                category: 'Fonts',
                subcategory: 'Fields Error Message'
            }
        },
        errorFontWeight: {
            name: 'Font Weight',
            control: {
                type: 'select',
                options: listFontWeight
            },
            table: {
                category: 'Fonts',
                subcategory: 'Fields Error Message'
            }
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
    label: 'Full Name',
    description: 'Optional description for name field.',
    required: false,
    errorState: false,
    errorMessage: 'This field is required. Please input a valid value.',
    placeholder: 'E.g. John Doe',
    design: 'default',
    inputBorder: '#777771',
    inputBorderHover: '#17A8E3',
    inputBorderError: '#E04562',
    inputBackground: '#EDEDED',
    inputBackgroundHover: '#E6E6E6',
    inputColor: '#000000',
    inputColorHover: '#000000',
    inputFontSize: 16,
    inputFontFamily: 'inherit',
    inputFontWeight: 'normal',
    requiredColor: '#E04562',
    labelColor: '#777771',
    labelFontSize: 12,
    labelFontFamily: 'inherit',
    labelFontWeight: 'bold',
    descColor: '#777771',
    descFontSize: 12,
    descFontFamily: 'inherit',
    descFontWeight: 'normal',
    errorBackground: '#F9E4E8',
    errorColor: '#E04562',
    errorFontSize: 12,
    errorFontFamily: 'inherit',
    errorFontWeight: 'normal',
};

export const FlatDesign = Template.bind({});
FlatDesign.storyName = 'Flat';
FlatDesign.args = {
    ...DefaultDesign.args,
    // id: 'full-name-flat',
    design: 'flat',
};

export const BoldDesign = Template.bind({});
BoldDesign.storyName = 'Bold';
BoldDesign.args = {
    ...DefaultDesign.args,
    // id: 'full-name-bold',
    design: 'bold',
};

// export const MaterialDesign = Template.bind({});
// MaterialDesign.storyName = 'Material';
// MaterialDesign.args = {
//     ...DefaultDesign.args,
//     id: 'full-name-material',
//     design: 'material',
//     backgroundColor: 'transparent',
//     backgroundColorHover: 'transparent',
//     backgroundColorFocus: 'transparent',
// };

export const BasicDesign = Template.bind({});
BasicDesign.storyName = 'Basic';
BasicDesign.args = {
    ...DefaultDesign.args,
    id: 'full-name-basic',
    design: 'basic'
};

export const NoneDesign = Template.bind({});
NoneDesign.storyName = 'None';
NoneDesign.args = {
    ...DefaultDesign.args,
    id: 'full-name-none',
    design: 'none'
};