export const createInput = ({
    id,
    type,
    label,
    description,
    placeholder,
    borderWidth,
    borderRadius,
    backgroundColor,
    color,
    fontSize,
    fontWeight,
    labelColor,
    labelFontSize,
    labelFontWeight,
}) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.classList = 'forminator-input';
    input.style.padding = (10 - borderWidth) + 'px';
    input.style.borderWidth = borderWidth + 'px';
    input.style.borderRadius = borderRadius + 'px';
    input.style.backgroundColor = backgroundColor;
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
    form.appendChild(row);

    return form;
};