export const createInput = ({
    id,
    type,
    label,
    description,
    placeholder,
    design,
    backgroundColor,
    backgroundColorHover,
    color,
    fontSize,
    fontWeight,
    labelColor,
    labelFontSize,
    labelFontWeight,
    descColor,
    descFontSize,
    descFontWeight,
}) => {
    const defaults = {};
    defaults.padding = 10;
    defaults.border = 0;
    defaults.borderRadius = 0;

    switch(design) {
        case 'default':
            defaults.border = 1;
            defaults.borderRadius = 2;
            break;

        case 'bold':
            defaults.border = 3;
            break;

        case 'material':
            defaults.border = 1;
            break;
    }

    // Create input.
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.classList = 'forminator-input';
    switch(design) {
        case 'default':
        case 'flat':
        case 'bold':
            input.style.padding = (defaults.padding - defaults.border) + 'px';
            input.style.borderWidth = defaults.border + 'px';
            input.style.borderRadius = defaults.borderRadius + 'px';
            input.style.backgroundColor = backgroundColor;
            input.onmouseover = function() {
                input.style.backgroundColor = backgroundColorHover;
            }
            input.onmouseleave = function() {
                input.style.backgroundColor = backgroundColor;
            }
            break;

        case 'material':
            input.style.padding = '10px 0';
            input.style.paddingBottom = (defaults.padding - defaults.border) + 'px';
            input.style.borderWidth = 0;
            input.style.borderBottomWidth = defaults.border + 'px';
            input.style.borderRadius = defaults.borderRadius + 'px';
            input.style.backgroundColor = 'transparent';
            break;
    }
    input.style.color = color;
    input.style.fontSize = fontSize + 'px';
    input.style.fontWeight = fontWeight;

    const inputLabelWrapper = document.createElement('label');
    const inputLabelContent = document.createTextNode(label);
    inputLabelWrapper.appendChild(inputLabelContent);
    inputLabelWrapper.classList = 'forminator-label';
    inputLabelWrapper.style.color = labelColor;
    inputLabelWrapper.style.fontSize = labelFontSize + 'px';
    inputLabelWrapper.style.fontWeight = labelFontWeight;

    const inputDescWrapper = document.createElement('span');
    const inputDescContent = document.createTextNode(description);
    inputDescWrapper.appendChild(inputDescContent);
    inputDescWrapper.classList = 'forminator-description';
    inputDescWrapper.style.color = descColor;
    inputDescWrapper.style.fontSize = descFontSize + 'px';
    inputDescWrapper.style.fontWeight = descFontWeight;

    if ( 'undefined' !== typeof id ) {
        input.setAttribute('id', id );
        inputLabelWrapper.setAttribute('id', id + '--label');
        inputLabelWrapper.setAttribute('for', id);
    }
    
    if ( '' !== placeholder || 'undefined' !== typeof placeholder ) {
        input.setAttribute('placeholder', placeholder);
    }

    const field = document.createElement('div');
    field.classList = 'forminator-field';

    if ( '' !== label || 'undefined' !== typeof label ) {
        field.appendChild( inputLabelWrapper );
    }

    field.appendChild( input );

    if ( '' !== description || 'undefined' !== typeof description ) {
        field.appendChild( inputDescWrapper );
    }

    // Create column.
    const col = document.createElement('div');
    col.classList = 'forminator-col';
    col.appendChild(field);

    // Create row.
    const row = document.createElement('div');
    row.classList = 'forminator-row';
    row.appendChild(col);

    // Create form.
    const form = document.createElement('div');
    form.classList = 'forminator-ui forminator-custom-form';
    if ( 'none' !== design ) {
        form.setAttribute('data-design', design);
    }
    form.appendChild(row);

    return form;
};