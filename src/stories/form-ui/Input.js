export const createInput = ({
    design,
    label,
    description,
    errorMessage
}) => {

    // Editable.
    const styles = {};
    styles.padding = 10;
    styles.border = 1;
    styles.borderRadius = 2;

    switch (design) {
        case 'flat' :
            styles.border = 0;
            styles.borderRadius = 0;
            break;

        case 'bold' :
            styles.border = 3;
            styles.borderRadius = 0;
            break;
    }

    // Create input.
    const input = document.createElement('input');
    input.classList = 'forminator-input';
    switch (design) {
        case 'default':
        case 'flat':
        case 'bold':
            input.style.padding = (styles.padding - styles.border) + 'px';
            input.style.borderWidth = styles.border + 'px';
            input.style.borderRadius = styles.borderRadius + 'px';
            break;
    }

    // Create label.
    const inputLabelWrapper = document.createElement('label');
    const inputLabelContent = document.createTextNode(label);
    inputLabelWrapper.appendChild(inputLabelContent);
    inputLabelWrapper.classList = 'forminator-label';

    // Create error message.
    const inputErrorWrapper = document.createElement('span');
    const inputErrorContent = document.createTextNode(errorMessage);
    inputErrorWrapper.appendChild(inputErrorContent);
    inputErrorWrapper.classList = 'forminator-error-message';

    // Create description.
    const inputDescWrapper = document.createElement('span');
    const inputDescContent = document.createTextNode(description);
    inputDescWrapper.appendChild(inputDescContent);
    inputDescWrapper.classList = 'forminator-description';

    // Create field.
    const field = document.createElement('div');
    field.classList = 'forminator-field';
    if ( 'undefined' !== typeof label && '' !== label ) {
        field.appendChild(inputLabelWrapper);
    }
    field.appendChild(input);
    if ( 'undefined' !== typeof errorMessage && '' !== errorMessage ) {
        field.appendChild(inputErrorWrapper);
    }
    if ( 'undefined' !== typeof description && '' !== description ) {
        field.appendChild(inputDescWrapper);
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
    switch (design) {
        case 'default' :
        case 'flat' :
        case 'bold' :
            form.classList.add('forminator-styled');
            form.classList.remove('forminator-material');
            break;

        case 'material' :
            form.classList.add('forminator-material');
            form.classList.remove('forminator-styled');
            break;

        default:
            form.classList.remove('forminator-styled');
            form.classList.remove('forminator-material');
            break;
    }
    form.appendChild(row);

    return form;
};
