export interface FormField {
    data: FormFieldJSON[];
}

export interface FormFieldJSON {
    // fld_FieldName: string;
    // name: string;
    // value: string;
    // controlType: OptionJSON[];
    // controlValueType: OptionJSON[];
    // selectItems: [];
    // fld_UpdateChildFields: boolean;
    // disableChildFields: boolean;
    // isMasked: boolean;
    // maskOffSet: string;
    // isUsed: boolean;
    // ctrlValMaxLen: boolean;
    // ctrlValMinLen: boolean;
    // required: boolean;
    // colSpan: string;
    // controlHeight: string;
    // controlWidth: string;
    // copy2ClipBrd: boolean;
    // dateFormatType: string;
    // datePattern: "dd/MM/yyyy HH:mm:ss"
    // displayInClient: boolean;
    // displayInClientFromDependency: boolean;
    // enableMakeCall: boolean;
    // fieldRowID: string;
    // fixedLengthValue: boolean;
    // fld_Enable_Script: boolean;
    // fld_Enable_Search: boolean;
    // fld_GridProperty: string;
    // fld_isNewRow: boolean;
    // fld_useInFilter: boolean;
    // formattedValue: string;
    // height: string;
    // isEditable: boolean;
    // isNumeric: boolean;
    // isSeparator: boolean;
    // isUsedFromDependency: boolean;
    // orgAlt1PhNo: string;
    // orgAlt2PhNo: string;
    // orgAlt3PhNo: string;
    // orgPhoneNo: string;
    // rowSpan: string;
    // rows: string;
    // separatorText: string;
    // style: string;
    // timeInput: boolean;
    // timeOnly: boolean;
    // width: string;


    // validators: ValidatorJSON;
    // option: OptionJSON[];




    colSpan: string;
    controlHeight: string;
    controlType: OptionJSON[];
    controlValueType: OptionJSON[];
    controlWidth: string;
    copy2ClipBrd: boolean;
    ctrlValMaxLen: string;
    ctrlValMinLen: string;
    dateFormatType: string;
    datePattern: "dd/MM/yyyy HH:mm:ss"
    disableChildFields: boolean;
    displayInClient: boolean;
    displayInClientFromDependency: boolean;
    enableMakeCall: boolean;
    fieldRowID: string;
    fixedLengthValue: string;
    fld_Enable_Script: boolean;
    fld_Enable_Search: boolean;
    fld_FieldName: string;
    name: string;
    fld_GridProperty: string;
    fld_UpdateChildFields: boolean;
    fld_isNewRow: boolean;
    fld_useInFilter: boolean;
    formattedValue: string;
    height: string;
    isEditable: boolean;
    isMasked: boolean;
    isNumeric: boolean;
    isSeparator: boolean;
    isUsed: boolean;
    isUsedFromDependency: boolean;
    maskOffSet: string;
    option:  OptionJSON[];
    orgAlt1PhNo: string;
    orgAlt2PhNo: string;
    orgAlt3PhNo: string;
    orgPhoneNo: string;
    required: boolean;
    rowSpan: string;
    rows: string;
    selectItems: [];
    length: string;
    separatorText: string;
    style: string;
    timeInput: boolean;
    timeOnly: boolean;
    value: string;
    width: string;

    validators: ValidatorJSON;




    // name: string;
    label: string;
    // value: string;
    type: string;
    // validators: string;
    options: OptionJSON[];
}

interface ValidatorJSON {
    required?: boolean;
    email?: boolean;
    minLength?: boolean;
    MaxLength?: boolean;
    pattern?: string;
    ctrlValMinLen?: string;
}

interface OptionJSON {
    label: string;
    value: string;
}

