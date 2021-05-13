import '../../src/js/input-material';

export const createInput = ({
    id,
    design,
    label,
    description,
    required,
    errorState,
    errorMessage,
    placeholder,
    inputBorder,
    inputBorderHover,
    inputBorderError,
    inputBackground,
    inputBackgroundHover,
    inputColor,
    inputColorHover,
    inputFontSize,
    inputFontFamily,
    inputFontWeight,
    labelColor,
    requiredColor,
    labelFontSize,
    labelFontFamily,
    labelFontWeight,
    descColor,
    descFontSize,
    descFontWeight,
    descFontFamily,
    errorBackground,
    errorColor,
    errorFontSize,
    errorFontWeight,
    errorFontFamily
}) => {

    // INPUT: Editable styles.
    const inputCSS = {};
    inputCSS.padding = 10;
    inputCSS.borderWidth = 1;
    inputCSS.borderRadius = 2;
    inputCSS.borderColor = inputBorder;
    inputCSS.borderColorHover = inputBorderHover;
    inputCSS.borderColorError = inputBorderError;
    inputCSS.background = inputBackground;
    inputCSS.backgroundHover = inputBackgroundHover;
    inputCSS.color = inputColor;
    inputCSS.colorHover = inputColorHover;
    inputCSS.fontSize = inputFontSize + 'px';
    inputCSS.fontFamily = inputFontFamily;
    inputCSS.fontWeight = inputFontWeight;

    switch (design) {
        case 'flat' :
            inputCSS.borderWidth = 0;
            inputCSS.borderRadius = 0;
            break;

        case 'bold' :
            inputCSS.borderWidth = 3;
            inputCSS.borderRadius = 0;
            break;

        case 'material':
            inputCSS.borderWidth = 1;
    }

    // Create input.
    const input = document.createElement('input');
    input.classList = 'forminator-input';
    if ( '' !== id || 'undefined' !== typeof id ) {
        input.setAttribute('id', id );
    }
	if ( '' !== placeholder || 'undefined' !== typeof placeholder ) {
        input.setAttribute( 'placeholder', placeholder );
    }
    switch (design) {
        case 'default':
        case 'bold':
            input.style.padding = (inputCSS.padding - inputCSS.borderWidth) + 'px';
            input.style.borderWidth = inputCSS.borderWidth + 'px';
            input.style.borderRadius = inputCSS.borderRadius + 'px';
            if (errorState) {
                input.style.borderColor = inputCSS.borderColorError;
            } else {
                input.style.borderColor = inputCSS.borderColor;
            }
            input.style.background = inputCSS.background;
            input.style.color = inputCSS.color;
            input.style.fontSize = inputCSS.fontSize;
            if ( 'inherit' !== inputCSS.fontFamily ) {
                input.style.fontFamily = inputCSS.fontFamily;
            }
            input.style.fontWeight = inputCSS.fontWeight;
            break;

        case 'flat':
            input.style.padding = (inputCSS.padding - inputCSS.borderWidth) + 'px';
            input.style.borderWidth = inputCSS.borderWidth + 'px';
            if (errorState) {
                input.style.boxShadow = 'inset 2px 0 0 0 ' + inputCSS.borderColorError;
            }
            input.style.background = inputCSS.background;
            input.style.color = inputCSS.color;
            input.style.fontSize = inputCSS.fontSize;
            if ( 'inherit' !== inputCSS.fontFamily ) {
                input.style.fontFamily = inputCSS.fontFamily;
            }
            input.style.fontWeight = inputCSS.fontWeight;
            break;

        case 'material':
            if (errorState) {
                input.style.borderColor = inputCSS.borderColorError;
            } else {
                input.style.borderColor = inputCSS.borderColor;
            }
            input.style.color = inputCSS.color;
            input.style.fontSize = inputCSS.fontSize;
            if ( 'inherit' !== inputCSS.fontFamily ) {
                input.style.fontFamily = inputCSS.fontFamily;
            }
            input.style.fontWeight = inputCSS.fontWeight;
            break;
    }

    // REQUIRED: Editable styles.
    const requiredCSS = {};
    requiredCSS.color = requiredColor;

    // Create required (asterisk).
    const requiredAsterisk = document.createElement('span');
    requiredAsterisk.innerHTML = '*';
    requiredAsterisk.classList = 'forminator-required';
    requiredAsterisk.style.color = requiredCSS.color;

    // LABEL: Editable styles.
    const labelCSS = {};
    labelCSS.color = labelColor;
    labelCSS.fontSize = labelFontSize + 'px';
    labelCSS.fontFamily = labelFontFamily;
    labelCSS.fontWeight = labelFontWeight;

    // Create label.
    const inputLabelWrapper = document.createElement('label');
    inputLabelWrapper.innerHTML = label;
    if (required) {
        inputLabelWrapper.innerHTML += ' ';
        inputLabelWrapper.appendChild(requiredAsterisk);
    }
    inputLabelWrapper.classList = 'forminator-label';
    if ( '' !== id || 'undefined' !== typeof id ) {
        inputLabelWrapper.setAttribute('id', id + '--label');
        inputLabelWrapper.setAttribute('for', id);
    }
    switch (design) {
        case 'default':
        case 'flat':
        case 'bold':
            inputLabelWrapper.style.color = labelCSS.color;
            inputLabelWrapper.style.fontSize = labelCSS.fontSize;
            if ( 'inherit' !== labelCSS.fontFamily ) {
                inputLabelWrapper.style.fontFamily = labelCSS.fontFamily;
            }
            inputLabelWrapper.style.fontWeight = labelCSS.fontWeight;
            break;

        case 'material':
            inputLabelWrapper.style.color = labelCSS.color;
            inputLabelWrapper.style.fontSize = labelCSS.fontSize;
            if ( 'inherit' !== labelCSS.fontFamily ) {
                inputLabelWrapper.style.fontFamily = labelCSS.fontFamily;
            }
            inputLabelWrapper.style.fontWeight = labelCSS.fontWeight;

            // Focus.
            input.addEventListener('focus', function() {
                inputLabelWrapper.style.fontSize = inputCSS.fontSize;
                if ( 'inherit' !== inputCSS.fontFamily ) {
                    inputLabelWrapper.style.fontFamily = inputCSS.fontFamily;
                }
                inputLabelWrapper.style.fontWeight = inputCSS.fontWeight;
            });

            // Blur.
            input.addEventListener('blur', function() {
                inputLabelWrapper.style.fontSize = labelCSS.fontSize;
                if ( 'inherit' !== labelCSS.fontFamily ) {
                    inputLabelWrapper.style.fontFamily = labelCSS.fontFamily;
                }
                inputLabelWrapper.style.fontWeight = labelCSS.fontWeight;
            });
            break;
    }

    // ERROR MESSAGE: Editable styles.
    const errorCSS = {};
    errorCSS.background = errorBackground;
    errorCSS.color = errorColor;
    errorCSS.fontSize = errorFontSize + 'px';
    errorCSS.fontFamily = errorFontFamily;
    errorCSS.fontWeight = errorFontWeight;

    // Create error message.
    const inputErrorWrapper = document.createElement('span');
    inputErrorWrapper.innerHTML = errorMessage;
    inputErrorWrapper.classList = 'forminator-error-message';
    switch (design) {
        case 'default':
        case 'flat':
        case 'bold':
            inputErrorWrapper.style.borderRadius = inputCSS.borderRadius + 'px'; // Border radius needs to match input styles.
            inputErrorWrapper.style.background = errorCSS.background;
            inputErrorWrapper.style.color = errorCSS.color;
            inputErrorWrapper.style.fontSize = errorCSS.fontSize;
            if ( 'inherit' !== errorCSS.fontFamily ) {
                inputErrorWrapper.style.fontFamily = errorCSS.fontFamily;
            }
            inputErrorWrapper.style.fontWeight = errorCSS.fontWeight;
            break;

        case 'material':
            inputErrorWrapper.style.color = errorCSS.color;
            inputErrorWrapper.style.fontSize = errorCSS.fontSize;
            if ( 'inherit' !== errorCSS.fontFamily ) {
                inputErrorWrapper.style.fontFamily = errorCSS.fontFamily;
            }
            inputErrorWrapper.style.fontWeight = errorCSS.fontWeight;
            break;
    }

    // DESCRIPTION: Editable styles.
    const descCSS = {};
    descCSS.color = descColor;
    descCSS.fontSize = descFontSize + 'px';
    descCSS.fontFamily = descFontFamily;
    descCSS.fontWeight = descFontWeight;

    // Create description.
    const inputDescWrapper = document.createElement('span');
    const inputDescContent = document.createTextNode(description);
    inputDescWrapper.appendChild(inputDescContent);
    inputDescWrapper.classList = 'forminator-description';
    switch (design) {
        case 'default':
        case 'flat':
        case 'bold':
        case 'material':
            inputDescWrapper.style.color = descCSS.color;
            inputDescWrapper.style.fontSize = descCSS.fontSize;
            if ( 'inherit' !== descCSS.fontFamily ) {
                inputDescWrapper.style.fontFamily = descCSS.fontFamily;
            }
            inputDescWrapper.style.fontWeight = descCSS.fontWeight;
            break;
    }

    // Create field.
    const field = document.createElement('div');
    field.classList = 'forminator-field';
    if (errorState) {
        field.classList.add( 'forminator-has_error' );
    }
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
    form.classList = 'forminator-custom-form';
    if ( 'none' === design ) {
        form.classList.remove('forminator-ui');
    } else {
        form.classList.add('forminator-ui');
    }
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

	// Load material function.
	if ( 'material' === design ) {
		FUI.inputMaterial( input );
	}

    return form;
};
