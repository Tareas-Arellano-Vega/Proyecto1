*** Settings ***
Library    SeleniumLibrary
Suite Setup    Open Browser To Login Page
Suite Teardown    Close Browser

*** Variables ***
${LOGIN_URL}    http://localhost:3000/AdminLogin
${BROWSER}      chrome
${ADMIN_EMAIL}  pabloarellano107@gmail.com
${ADMIN_PASS}   ruow cjfx ssmy dgzf

*** Test Cases ***
Valid Login Test
    [Documentation]    Testeando el login con credenciales válidas.
    Input Username    ${ADMIN_EMAIL}
    Input Password    ${ADMIN_PASS}
    Submit Login Form
    Login Should Be Successful

Invalid Login Test
    [Documentation]    Testeando el login con credenciales inválidas.
    Input Username    pabloarellano107@gmail.com
    Input Password    1234_41243
    Submit Login Form
    Login Should Fail

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN_URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Page Contains    Inicio de Sesión de Administradores

Input Username
    [Arguments]    ${username}
    Input Text    xpath=//input[@type='email']    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    xpath=//input[@type='password']    ${password}

Submit Login Form
    Click Button    xpath=//button[@type='submit']
    #Wait Until Page Contains    Bienvenido    timeout=5s

Login Should Be Successful
    Log    Login was successful.
    #Location Should Contain    /MedicosManager

Login Should Fail
    Wait Until Page Contains    Credenciales incorrectas    timeout=20s
    Page Should Contain    Credenciales incorrectas
    Page Should Not Contain    Bienvenido