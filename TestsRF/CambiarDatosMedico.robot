*** Settings ***
Library    SeleniumLibrary
Library    BuiltIn

*** Variables ***
${BASE_URL}                   http://localhost:3000
${medico_id}                  664549a1581e9312408f782d
${ADMIN_LOGIN_URL}            ${BASE_URL}/AdminLogin
${ADMIN_EMAIL}                pabloarellano107@gmail.com
${ADMIN_PASSWORD}             Arisa_1027
${DOCTOR_NAME}                Nicolle
${NEW_DOCTOR_FIRST_NAME}      Gregory
${NEW_DOCTOR_LAST_NAME}       House
${NEW_DOCTOR_PHOTO_URL}       https://static.vecteezy.com/system/resources/previews/009/749/880/non_2x/cute-girl-avatar-icon-cartoon-little-woman-profile-mascot-illustration-girl-head-face-business-user-logo-free-vector.jpg


${EMAIL_INPUT}                css:input[name="email"]
${PASSWORD_INPUT}             css:input[name="password"]
${LOGIN_BUTTON}               css:button[type="submit"]
${MEDICO_CARDS}               css:div[class="medico-card"]
${FIRST_NAME_INPUT}           css:input[name="first_name"]
${LAST_NAME_INPUT}            css:input[name="last_name"]
${PHOTO_URL_INPUT}            css:input[name="photo_url"]
${UPDATE_BUTTON}              css:button[class="btn-actualizar"]

*** Test Cases ***

Actualizar datos de un médico
    [Documentation]    Test para actualizar los datos de un médico en la interfaz de administración
    Open Browser    ${ADMIN_LOGIN_URL}    chrome    options=add_argument("--ignore-certificate-errors")
    Input Username    ${ADMIN_EMAIL}
    Input Password    ${ADMIN_PASSWORD}
    Submit Login Form
    Wait Until Element Is Visible    ${MEDICO_CARDS}
    Sleep    1s
    Click Editar Button For Doctor

    Input Text     xpath=//input[@id='nombre']  ${NEW_DOCTOR_FIRST_NAME}
    Input Text    xpath=//input[@id='apellido']    ${NEW_DOCTOR_LAST_NAME}
    Input Text    xpath=//input[@id='foto_url']     ${NEW_DOCTOR_PHOTO_URL}
    Click Button    xpath=//button[@type='submit']
    Go To  http://localhost:3000/MedicosManager
    Sleep    5s
    [Teardown]    Close Browser

*** Keywords ***
Input Username
    [Arguments]    ${username}
    Input Text    xpath=//input[@type='email']    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    xpath=//input[@type='password']    ${password}

Submit Login Form
    Click Button    xpath=//button[@type='submit']

Click Editar Button For Doctor
  Go To  http://localhost:3000/EditarMedico?id=664549a1581e9312408f782d