
exports.error_messages = {
    not_exist: { status_code: 404, message: "Employee Not found." },
    wrong_pass: { status_code: 400, message: "Incorrect Password" },
    un_authorized: { status_code: 401, message: "Only Admin can do this." },
    emailRequired: { status_code: 400, message: "Enter a Valid Email it is required." },
    validPassword: { status_code: 400, message: "Password input Invalid please choose strong password using 123, #$%,ABCD." },
    comparePass:{status_code:400, message:"New Password and Confirm password are not same check and re-enter again."},
    al_exist: { status_code: 403, message: "Employee is Already exist with this email address." },
    not_done:{status_code:400,message:"request failed"},
    numberNotValid:{status_code:400,message:"Mobile Number is not valid"}

}

exports.responses = {
    succeeded: { status_code: 200, message: 'Request Successfully Completed.' },
    deleted: { status_code: 200, message: 'deleted Successfully Completed.' },
    AllEmployeeList:{status_code:200, message:"All Employee Details List"},
    Employee:{status_code:200, message:"Employee Details"}

}